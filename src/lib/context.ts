import { writable } from 'svelte/store';
import type { ApplicationContext, OutlinkState } from './types';

export const emptyApplicationContext = {
    opponentAnswers: [],
    selectedAnswers: [],
    quiz: {
        '1': '2',
        '2': '3',
        '5': '6',
        '6': '7',
    },
    quizStart: '1',
    singlePlayer: true,
};

export const appContext = writable<ApplicationContext>(emptyApplicationContext);

export const outlinkState = writable<OutlinkState>({
    href: '',
    show: false,
    text: '',
});

import { SafeArea } from 'capacitor-plugin-safe-area';
import type { Match, MatchData } from '@heroiclabs/nakama-js';

export const insets = writable({ top: 0, bottom: 0, left: 0, right: 0 });
SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
    let { top, bottom, left, right } = _insets;
    insets.set({ top, bottom, left, right });
});

export const matchstatus = writable<Match>(null);
export const matchdata = writable<MatchData>(null);
export const singlePlayer = writable<Boolean>(true);
