import { Client, WebSocketAdapterText, Session, type Match, type MatchData, type Socket, type WriteStorageObject } from '@heroiclabs/nakama-js';
import { v4 } from 'uuid';
import { writable } from 'svelte/store';
import { appContext, matchdata, matchstatus, ownPresenceId, singlePlayer } from './context';
import { goto } from '$app/navigation';
import type { MatchState } from './types';

export const ssr = false;
console.log('nk use ssl', import.meta.env.VITE_NAKAMA_USE_SSL);
var client = new Client(
    import.meta.env.VITE_NAKAMA_CLIENT_API_KEY,
    import.meta.env.VITE_NAKAMA_HOST,
    import.meta.env.VITE_NAKAMA_PORT,
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    7000,
    true
);
let deviceId: string;
let session: Session;
let reconnectHandle
let matchId, _ownPresenceId; 

export let socket: Socket = client.createSocket(
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    false,
    new WebSocketAdapterText()
);
export const nkReady = writable(false);
export const init = async () => {
    if (reconnectHandle) {
        clearInterval(reconnectHandle)
    } 
    deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await createSession();
    await connectSocket(session);

    nkReady.set(true);
    console.log(session.token);
    return session;
};

export const createSession = async () => {
    var create = true;
    let session = await client.authenticateDevice(deviceId, create, deviceId);
    console.info('Successfully authenticated:', session);
    return session;
};

export const connectSocket = async (session) => {
    var appearOnline = true;

    let deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await socket.connect(session, appearOnline);
    console.log('Connected to Nakama gameserver:', session);
    return socket;
};

socket.ondisconnect = async (e) => {
    console.log('connection to gameserver lost!');
    nkReady.set(false);
    setTimeout(async () => {
        try {
            await init();
            await socket.joinMatch(matchId)
        } catch (e) {
            console.warn('match disbanded! switching to single player');
            singlePlayer.set(true)
            appContext.update(ctx => ({...ctx, reason: 'connection lost'}));
            goto('/gameover/draw');
        }
    }, 2000); 

    // localStorage.setItem("LAST_MATCH_ID", matchId);

    // downgrade to single player if connection to server is lost during match

};

export const leaveMatch = async () => {
    if(matchId) {
        await socket.leaveMatch(matchId);
        console.log('left match');
    }
}

socket.onmatchmakermatched = async (matched) => {
    matchId = matched.match_id
    const match : Match = await socket.joinMatch(matched.match_id, matched.token);
    matchstatus.set(match);
    ownPresenceId.set(match.self.session_id); 
    _ownPresenceId = match.self.session_id;
    console.log(match);
    // goto(`/quiz/question/${match.data.current_question}`);
};

export enum OpCode {
    server_match_end = 1,
    server_presence_ready = 2,
    server_match_started = 3,
    server_start_questions = 4,
    server_question_timeleft = 5,
    server_question_timeout = 6,
    server_show_result = 7,
    server_show_next_question = 8,
    server_show_match_summary = 9,
    server_match_result = 10,
    server_ack_answer = 101,
    client_set_answer = 100,
    client_set_ready = 200,
    server_presence_left = 300,

}


const getMpQuizResult = (matchData: MatchState, $ownPresenceId: string): number =>  {

    console.log(matchData)

    // count correct answers in match data for each presence id
    let correctAnswers: {presenceId: string, correct: number}[] = Object.keys(matchData.presences).map(presenceId => {
        return {presenceId,
             correct: Object.values(matchData.answers).reduce((numCorrect, answer) => {
            if (answer[presenceId].correct) 
                return numCorrect + 1;
            return numCorrect;
        }, 0)}
    })

    console.log(correctAnswers)

    let ownResult = correctAnswers.find(ans => ans.presenceId === $ownPresenceId); 
    let opponentResult = correctAnswers.find(ans => ans.presenceId !== $ownPresenceId);

    return ownResult.correct - opponentResult.correct;
    

}

socket.onmatchdata = (matchData) => {
    // console.log('received match data', matchData);

    matchdata.set(matchData);

    switch (matchData.op_code) {
        case OpCode.server_match_started:
            console.log('match started');
            let appCtx;
            appContext.update(ctx => {
                let newCtx = {...ctx, contextId: matchId}
                appCtx = newCtx;
                return newCtx
            });
            sendAnalytics('start_mp', {

            }, matchId);
            goto(`/quiz/question/${matchData.data.current_question}`);
        case OpCode.server_match_end:
            appContext.update(ctx => ({...ctx, matchDone: true}));

            console.log('Match ended');
            break;
        case OpCode.server_presence_left:
            console.log('Presence left');
            let context
            appContext.update(ctx => {
                context = ctx; 
                return ctx
            });
            if (context.matchDone) {
                break;
            }
            console.warn('opponent left, ending match');
            leaveMatch();
            appContext.update(ctx => ({...ctx, reason: 'opponent left'}));
            goto('/gameover/draw');
            break;
        case OpCode.server_show_next_question: 
            console.log('Goto next question');
            break;
        
        case OpCode.server_match_result:
            let result = getMpQuizResult(matchData.data, _ownPresenceId);
            console.log("Match ended, match result:", matchData.data, result);
            appContext.update(ctx => ({...ctx, result, matchDone: true}));
            if (result === 0) {
                goto('/gameover/draw');
            } else if (result > 0) {
                goto('/gameover/won');
            } else {
                goto('/gameover/lost');
            }
        break;
        default:
            // console.log('Unsupported op code');
            break;
    }
};

export const sendMatchData = (opcode, data = null, presence = null) => {
    socket.sendMatchState(matchId, opcode, data, presence )
}



export const sendAnalytics = async (event: string, data: any, contextId?: string) => {

    let writeObjects: WriteStorageObject[] = [{
        collection: 'client_telemetry',
        key: `${event}_ctx:${contextId ?? 'NO_CONTEXT'}_evId:${v4()}`,
        permission_read: 0,
        permission_write: 0,
        value: {
            event,
            device: deviceId,
            data,
            contextId: contextId ?? null,
        }
    }];

    try {
        await client.writeStorageObjects(session, writeObjects)
    } catch (e) {
        console.error(e);
    }

}
