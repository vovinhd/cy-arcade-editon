import { writable } from "svelte/store";
import type { ApplicationContext } from "./types";

export const appContext = writable<ApplicationContext>({
    opponentAnswers: [],
    selectedAnswers: [],
    quiz: {
        '1': '2',
        '2': '3',
    },
    singlePlayer: true
})