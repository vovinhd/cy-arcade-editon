import { writable } from 'svelte/store';
import type { ApplicationContext, OutlinkState } from './types';

export const emptyApplicationContext = {
    opponentAnswers: [],
    selectedAnswers: [],
    quiz: {
        '1': '2',
        '2': '3',
    },
    singlePlayer: true,
};

export const appContext = writable<ApplicationContext>(emptyApplicationContext);

export const outlinkState = writable<OutlinkState>({
    href: '',
    show: false,
    text: '',
});

import { SafeArea } from 'capacitor-plugin-safe-area';

export const insets = writable({ top: 0, bottom: 0, left: 0, right: 0 });
SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
    let { top, bottom, left, right } = _insets;
    insets.set({ top, bottom, left, right });
});

export const matchstatus = writable({});
