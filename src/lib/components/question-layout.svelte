<script lang="ts">
    import { goto, prefetch } from "$app/navigation";
    import { page } from "$app/stores";
    import { appContext } from "$lib/context";

    import type { Answer } from "$lib/types";
    import { onMount } from "svelte";

    let pauseTimer = false;
    let lockedanswer = false;
    let selectedanswer: Answer;
    export let graceTime = 2 * 1000;
    export let maxTime = 40 * 1000;
    let timer = graceTime + maxTime;
    export let id: string;
    let timerUpdate, timeOut;

    const selectAnswer = (answer: Answer) => {
        selectedanswer = answer;
        console.log(answer)
        appContext.update(v => ({...v, currentSelectedAnswer: answer}))
    };

    const opponentAnswered = () => {
        return true;
    };

    const showResult = () => {
        console.log($page.routeId,  `quiz/question/${id}` );
        if (!($page.routeId === `quiz/question/${id}` || pauseTimer)) {
            console.error("runaway timer in question-layout!");
            return;
        } else {
            goto(`/quiz/result/${id}`);
        }
    };

    const lockAnswer = (e: Event) => {
        lockedanswer = true;
        if (opponentAnswered()) finish();
    };

    const finish = () => {
        invalidateTimers();
        showResult();
    };

    const invalidateTimers = () => {
        clearInterval(timerUpdate);
        clearTimeout(timeOut);

    }
    onMount(() => {
        appContext.update(
            (value) => (value = { ...value, currentQuestionId: id, currentSelectedAnswer: null })
        );

        prefetch(`/quiz/result/${id}`)
        if (pauseTimer) return;
        timerUpdate = setInterval(() => {
            timer = timer - 16;
        }, 16);

        timeOut = setTimeout(() => {
            finish();
        }, graceTime + maxTime);
    });

    page.subscribe(v => {
        invalidateTimers()
    })
</script>

<main class="grid h-full content">
    <div class="w-full mx-auto flex flex-row place-content-center z-1">
        <div
            class=" w-full rounded-t-md shadow-sm bg-zinc-600 h-6 overflow-hidden bg-opacity-20"
            id="timer"
            min="0"
        >
            <div
                class=" w-full shadow-sm bg-green-400 bg-gradient-to-r from-green-600 to-green-700< h-6"
                id="timer"
                min="0"
                max={maxTime}
                value={timer}
                style="width: {100 * Math.min(1.0, timer / maxTime)}%"
            />
        </div>
    </div>

    <div class="p-8 question">
        <div class="md:heading text-center text-lg bg-water-light bg-opacity-90  p-8 text-white rounded-md shadow-md">
            <slot name="question" />
        </div>
    </div>

    <div class="grid ">
        <slot name="answers" {selectAnswer} />
    </div>

    <div class="grid grid-flow-row place-items-end content-center">
        <div class="action-button bg-heart text-white {selectedanswer ? "selected": "unselected"}">
            <button on:click={(e) => lockAnswer(e)}> Auswählen </button>
        </div>
    </div>
</main>


<style lang="scss">
    .content {
        grid-template-rows: 5rem 1fr 2fr 7rem;
    }

    .question {
        opacity: 0;
        animation: fadeInDown 1s ease forwards;
    }

    .selected {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
        animation-delay: 0s;

    }
    .unselected {
        opacity: 0;
    }
</style>