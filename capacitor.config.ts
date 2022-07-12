import { CapacitorConfig } from '@capacitor/cli';
import * as dotenv from 'dotenv';
dotenv.config();

let config: CapacitorConfig = {
    appId: 'de.climactivity.exhib',
    appName: 'cy-arcade-editon',
    webDir: 'build',
    bundledWebRuntime: false,
    ios: {},
};

let configRemote: CapacitorConfig = {
    appId: 'de.climactivity.exhibremote',
    appName: 'cy-arcade-remote',
    webDir: 'build',
    bundledWebRuntime: false,
    ios: {},
};

if (process.env.CAP_USE_SERVER === 'true') {
    let server = {
        url: process.env.CAP_SERVER_ADDR,
        cleartext: process.env.CAP_USE_CLEARTEXT === 'true',
    };
    config = { ...configRemote, server };
}

console.log(config);

export default config;
