import { Client, WebSocketAdapterText, Session } from '@heroiclabs/nakama-js';
import { v4 } from 'uuid';
import { writable } from 'svelte/store';
import { matchstatus } from './context';
import { goto } from '$app/navigation';

export const ssr = false;
console.log('nk use ssl', import.meta.env.VITE_NAKAMA_USE_SSL);
var client = new Client(
    import.meta.env.VITE_NAKAMA_CLIENT_API_KEY,
    import.meta.env.VITE_NAKAMA_HOST,
    import.meta.env.VITE_NAKAMA_PORT,
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    3000,
    true
);
let deviceId: string;
let session: Session;
export let socket = client.createSocket(
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    true,
    new WebSocketAdapterText()
);
export const nkReady = writable(false);
export const init = async () => {
    deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await createSession();
    socket = await connectSocket();

    nkReady.set(true);
    console.log(session.token);
    return session;
};

export const createSession = async () => {
    var create = true;
    session = await client.authenticateDevice(deviceId, create, deviceId);
    console.info('Successfully authenticated:', session);
    return session;
};

export const connectSocket = async () => {
    var appearOnline = true;

    let deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await socket.connect(session, appearOnline);
    return socket;
};

socket.ondisconnect = (e) => {
    console.log('connection to gameserver lost!');
    nkReady.set(false);

    setTimeout(() => {
        console.log('attempting to reconnect');
        init();
    }, 3000);
};

socket.onmatchmakermatched = async (matched) => {
    const match = await socket.joinMatch(matched.match_id, matched.token);
    matchstatus.set(match);
    console.log(match);
    goto('/quiz/question/1');
};
