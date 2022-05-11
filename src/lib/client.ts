
import { Client, WebSocketAdapterText, Session  } from '@heroiclabs/nakama-js';
import { v4 } from "uuid"; 
import { writable } from 'svelte/store';

export const ssr = false
var client = new Client(
    import.meta.env.VITE_NAKAMA_CLIENT_API_KEY,
    import.meta.env.VITE_NAKAMA_HOST, 
    import.meta.env.VITE_NAKAMA_PORT, 
    import.meta.env.VITE_NAKAMA_USE_SSL,
    3000,
    true
);
let deviceId: string;
let session: Session; 
export let socket = client.createSocket(true, true, new WebSocketAdapterText());
export const nkReady = writable(false);
export const init = async () => {
    deviceId = await localStorage.getItem("NK_DEVICE_ID"); 
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem("NK_DEVICE_ID", deviceId);
    }    
    session = await createSession();
    socket = await connectSocket(); 

    // console.log(session.token)
    return session
}


export const createSession = async() => {
    var create = true;
    session = await client.authenticateDevice(deviceId, create, deviceId);
    console.info("Successfully authenticated:", session);
    return session;
}

export const connectSocket = async () => {
    var appearOnline = true;

    let deviceId = await localStorage.getItem("NK_DEVICE_ID"); 
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem("NK_DEVICE_ID", deviceId);
    }
    session = await socket.connect(session, appearOnline);
    return socket
    

}

