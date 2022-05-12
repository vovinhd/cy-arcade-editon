import { writable } from "svelte/store";
import type { ApplicationContext, OutlinkState } from "./types";

export const appContext = writable<ApplicationContext>({
    opponentAnswers: [],
    selectedAnswers: [],
    quiz: {
        '1': '2',
        '2': '3',
    },
    singlePlayer: true
})

export const outlinkState = writable<OutlinkState>({
    href: "",
    show: false,
    text: ""
})