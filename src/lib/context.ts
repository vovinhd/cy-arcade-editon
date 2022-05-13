import { writable } from "svelte/store";
import type { ApplicationContext, OutlinkState } from "./types";

export const emptyApplicationContext = {
    opponentAnswers: [],
    selectedAnswers: [],
    quiz: {
        '1': '2',
        '2': '3',
    },
    singlePlayer: true
}

export const appContext = writable<ApplicationContext>(emptyApplicationContext)

export const outlinkState = writable<OutlinkState>({
    href: "",
    show: false,
    text: ""
})


