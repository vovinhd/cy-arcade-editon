<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { appContext } from "$lib/context";

import type { Answer } from "$lib/types";
import { onMount } from "svelte";


    let lockedanswer = false; 
    let selectedanswer: Answer;
    export let graceTime = 2 * 1000; 
    export let maxTime = 40 * 1000;  
    let timer = graceTime + maxTime
    export let id: string

    const selectAnswer = (answer:Answer) => {
        selectedanswer = answer;
    }

    const opponentAnswered = () => {
        return true
    }
    
    const showResult = () => {
        console.log($page.routeId)
        if(!$page.routeId.startsWith("quiz/question")) {
            console.error("runaway timer in question-layout!")
            return
        }
        goto(`/quiz/result/${id}`)
    }

    const lockAnswer = (e: Event) => {
        lockedanswer = true; 
        if (opponentAnswered()) showResult()
    } 

    onMount(() => {
        let timerUpdate = setInterval(()=> {
            timer = timer - 16
        }, 16)

        setTimeout(() => {
            clearInterval(timerUpdate);
            showResult();
        }, graceTime + maxTime)

        appContext.update(value => value = {...value, currentQuestionId: id})
    })
</script>

<main >
    <div>
        <progress id="timer" min="0" max={maxTime} value={timer} />
    </div>

    <div>
        <slot name="question"/>
    </div>

    <div>
        <slot name="answers" {selectAnswer}/>
    </div>

    <div>
        <button on:click={(e) => lockAnswer(e)}>
            Auswählen
        </button>
    </div>
</main>