<script lang="ts">
    import { goto } from "$app/navigation";
import ContinueButton from "$lib/components/continue-button.svelte";

    import { appContext } from "$lib/context";
    import { onMount } from "svelte";

    import { fly, fade } from "svelte/transition";

    let opponentReady = false;
    let minReadingTimeOver = false;
    let timer = 0;
    let minReadingTime = 5000;
    let continueLabel = "Bereit";
    const getSingleplayerQuizResult = () => {
        return $appContext.selectedAnswers.find((answer) => !answer.correct);
    };
    const nextQuestionOrResult = () => {
        if (!minReadingTimeOver) {
            console.log("wait")
            return
        }
        const nextQuestionId = $appContext.quiz[$appContext.currentQuestionId];
        console.log($appContext);
        if (nextQuestionId) {
            goto(`/quiz/question/${nextQuestionId}`);
        } else {
            if ($appContext.singlePlayer) {
                goto(
                    `/gameover/${getSingleplayerQuizResult() ? "won" : "lost"}`
                );
            }
        }
    };

    let timerUpdate, timeOut;

    const finish = () => {
        clearInterval(timerUpdate);
        clearTimeout(timeOut);
        timer = minReadingTime;
        minReadingTimeOver = true;
    };

    onMount(() => {
        timerUpdate = setInterval(() => {
            timer = timer + 16;
        }, 16);

        timeOut = setTimeout(() => {
            finish();
        }, minReadingTime);
    });
    let currentlySelectedAnswer;
    $: {
        continueLabel = opponentReady ? "Weiter" : "Bereit";
        currentlySelectedAnswer = $appContext.currentSelectedAnswer;
    }
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-4 p-8 content-grid "
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
>
    <div>
        <div
            class="{currentlySelectedAnswer?.correct
                ? 'bg-nature-light'
                : 'bg-zinc-400'} text-white text-2xl rounded-md shadow-sm p-8 text-center selected-answer"
            class:correct={!!$appContext.currentSelectedAnswer?.correct}
        >
            {currentlySelectedAnswer
                ? currentlySelectedAnswer.answerText
                : "keine Antwort gewählt"}
            {currentlySelectedAnswer?.correct ? "✔" : "❌"}
        </div>
    </div>

    <div class="text-center pb-4 pt-8 px-8  text-2xl title">
        Hättest du's gewusst?
    </div>
    <div class="h-full  main">
        <slot />
    </div>

    <div class="grid grid-flow-col place-content-end actions">
        {#if opponentReady}
            <div class="grid content-center" in:fade>
                <span class="p-4 rounded-full bg-zinc-200 w-96 text-center">
                    dein/e Mitspieler/in ist bereit
                </span>
            </div>
        {/if}
        <!-- <div class=" btn-cta relative ">
            <div
                class="absolute grid grid-flow-col h-full  shadow-sm bg-heart "
                style="width: {100 * Math.min(1.0, timer / minReadingTime)}%"
            />
            <button
                class="absolute w-full h-full"
                on:click={(e) => nextQuestionOrResult()}
                class:btn-disabled={!minReadingTimeOver}
                disabled={!minReadingTimeOver}
            >
                {continueLabel}
            </button>
        </div> -->
        <div class="cursor-pointer" on:click={(e) => nextQuestionOrResult()}>
            <ContinueButton ready={minReadingTimeOver} />

        </div>
    </div>
</div>

<style lang="scss">
    .correct {
        @apply bg-nature;
    }

    .content-grid {
        @apply grid grid-flow-row;
        grid-template-rows: 8rem 8rem 1fr 5rem;
    }

    .btn-cta {
        @apply w-full rounded-full text-white shadow-sm bg-heart-light overflow-clip text-clip bg-clip-content;
    }
    .btn-disabled {
        @apply text-opacity-40;
    }

    .title {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
        animation-delay: 200ms;
    }

    .selected-answer {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
    }

    .main {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
    }

    .actions {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
        animation-delay: 1800ms;

    }
</style>
