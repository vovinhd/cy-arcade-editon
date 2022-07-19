<script lang="ts">
    import { goto, prefetch } from '$app/navigation';
    import { page } from '$app/stores';
    import { OpCode, sendAnalytics, sendMatchData, socket } from '$lib/client';
    import { appContext, matchstatus, singlePlayer } from '$lib/context';

    import type { Answer } from '$lib/types';
    import { onMount } from 'svelte';

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
        console.log(answer);
        appContext.update((v) => ({ ...v, currentSelectedAnswer: answer }));
    };

    const opponentAnswered = () => {
        return true;
    };

    const showResult = () => {
        console.log($page.routeId, `quiz/question/${id}`);
        if (!($page.routeId === `quiz/question/${id}` || pauseTimer)) {
            console.error('runaway timer in question-layout!');
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
        sendAnalytics(
            'question_answer',
            {
                question_id: id,
                answer: selectedanswer ?? 'dnf',
                time: graceTime + maxTime - timer,
                single_player: $singlePlayer,
            },
            $appContext.contextId
        );

        invalidateTimers();
        if (!$singlePlayer)
            sendMatchData(OpCode.client_set_answer, selectedanswer);
        showResult();
    };

    const invalidateTimers = () => {
        clearInterval(timerUpdate);
        clearTimeout(timeOut);
    };
    onMount(() => {
        invalidateTimers();

        appContext.update(
            (value) =>
                (value = {
                    ...value,
                    currentQuestionId: id,
                    currentSelectedAnswer: null,
                })
        );

        prefetch(`/quiz/result/${id}`);
        if (pauseTimer) return;
        // let timer = graceTime + maxTime;

        timerUpdate = setInterval(() => {
            timer = timer - 200;
            // console.log(timer);
            if (timer <= -graceTime) {
                finish();
            }
        }, 200);

        // timeOut = setTimeout(() => {
        //     finish();
        // }, graceTime + maxTime);
    });

    page.subscribe((v) => {
        invalidateTimers();
    });
</script>

<main class="grid h-full content overflow-y-auto">
    <div class="w-full mx-auto flex flex-row place-content-center z-1">
        <div
            class=" w-full rounded-t-md shadow-sm bg-zinc-600 h-8 overflow-hidden bg-opacity-20"
            id="timer"
            min="0"
        >
            <div
                class="{timer / maxTime < 0.7
                    ? 'animate-pulse'
                    : ''} transition-transfrom duration-200 w-full shadow-sm bg-red-400 bg-gradient-to-r from-red-600 to-red-400 h-8"
                id="timer"
                min="0"
                max={maxTime}
                value={timer}
                style="transform-origin: top left;
                transition-timing-function: linear;
                transform: scale({Math.min(1.0, timer / maxTime)}, 1);"
            />
        </div>
    </div>

    <div class="p-8 question">
        <div
            class="md:heading text-center text-lg bg-water-light bg-opacity-90  p-8 text-white rounded-md shadow-md"
        >
            <slot name="question" />
        </div>
    </div>

    <div class="grid ">
        <slot name="answers" {selectAnswer} />
    </div>

    <div
        class="grid grid-flow-row place-items-end content-center {selectedanswer
            ? 'selected'
            : 'unselected'}"
    >
        <div
            class="action-button bg-heart text-white {selectAnswer
                ? 'chBounce'
                : ''}"
        >
            <button on:click={(e) => lockAnswer(e)}> Auswählen </button>
        </div>
    </div>
</main>

<style lang="scss">
    @keyframes bounce {
        0%,
        100% {
            transform: translateY(-10%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
    }
    .chBounce {
        animation-delay: 1000ms;
        animation: bounce 1s infinite;
    }
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
