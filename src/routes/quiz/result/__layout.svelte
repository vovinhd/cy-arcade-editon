<script lang="ts">
    import { goto, prefetch } from '$app/navigation';
    import { session } from '$app/stores';
    import {
        leaveMatch,
        OpCode,
        sendAnalytics,
        sendMatchData,
        socket,
    } from '$lib/client';
    import ContinueButton from '$lib/components/continue-button.svelte';

    import {
        appContext,
        clearAppContext,
        matchdata,
        matchstatus,
        ownPresenceId,
        singlePlayer,
    } from '$lib/context';
    import type { MatchData } from '@heroiclabs/nakama-js';
    import { onMount } from 'svelte';

    import { fly, fade } from 'svelte/transition';

    let opponentReady = false;
    let opponentCorrect = false;
    let selfReady = false;
    let minReadingTimeOver = false;
    let timer = 0;
    let minReadingTime = 1000;
    let continueLabel = 'Bereit';
    const getSingleplayerQuizResult = () => {
        let selectAnswers = $appContext.selectedAnswers;
        if (selectAnswers.length === 0) {
            console.warn('no matchdata found!');
            return false;
        }
        let results = $appContext.selectedAnswers.map(
            (answer) => answer.correct
        );
        console.log(results);
        return results.every((result) => result === true); // i know that === true is redundant, but (result) => result also looks questionionable
    };

    let opponentResult = null;
    const nextQuestionId = $appContext.quiz[$appContext.currentQuestionId];
    const nextQuestionOrResult = () => {
        console.log($appContext);

        if (nextQuestionId) {
            goto(`/quiz/question/${nextQuestionId}`);
        } else {
            if ($appContext.singlePlayer) {
                let result = getSingleplayerQuizResult();

                sendAnalytics(
                    'singleplayer_result',
                    {
                        question_id: $appContext.currentQuestionId,
                        answers: $appContext.selectedAnswers,
                        result,
                        single_player: true,
                        selected_challenge: $appContext.selectedChallenge,
                    },
                    $appContext.contextId
                );

                goto(`/gameover/${result ? 'won' : 'lost'}`);
            }
        }
    };

    const cancel = () => {
        sendAnalytics(
            'match_cancel',
            {
                question_id: $appContext.currentQuestionId,
                answer: currentlySelectedAnswer,
                single_player: $singlePlayer,
                selected_challenge: $appContext.selectedChallenge,
            },
            $appContext.contextId
        );

        console.log('cancel');
        leaveMatch();
        clearAppContext(true);
        goto('/');
    };

    const setReady = () => {
        selfReady = true;
        readyCounter += 1;
        sendMatchData(OpCode.client_set_ready, { readFor: timer, ready: true });
    };

    let readyCounter = 0;

    matchdata.subscribe((matchdata: MatchData) => {
        if (!matchdata) {
            return;
        }

        if (matchdata.data.answers) {
            let answers =
                matchdata.data.answers[matchdata.data.current_question];
            if (answers) {
                Object.keys(answers).forEach((key) => {
                    if (key !== $ownPresenceId) {
                        opponentResult = answers[key];
                        if (opponentResult.correct) {
                            opponentCorrect = true;
                        }
                    }
                });

                console.log(
                    $ownPresenceId,
                    matchdata.data,
                    answers,
                    opponentResult,
                    opponentCorrect
                );
            }
        }

        if (matchdata.op_code == OpCode.server_show_next_question) {
            nextQuestionOrResult();
        } else if (matchdata.op_code == OpCode.server_presence_ready) {
            console.log('presence ready');
            opponentReady = true;
            if (selfReady) {
                if (readyCounter === 2) {
                    opponentReady = true;
                }
            } else if (readyCounter === 1) {
                opponentReady = true;
            }
        }
    });

    const readyOrNextQuestion = () => {
        if (!minReadingTimeOver) {
            return;
        }
        console.log($singlePlayer);
        if ($singlePlayer) {
            console.log('single player');
            nextQuestionOrResult();
        }
        setReady();
    };

    let timerUpdate, timeOut;

    const finish = () => {
        clearInterval(timerUpdate);
        clearTimeout(timeOut);
        timer = minReadingTime;
        minReadingTimeOver = true;
    };

    onMount(() => {
        if (nextQuestionId) prefetch(`/quiz/question/${nextQuestionId}`);
        console.log(
            nextQuestionId ? 'next q ' + nextQuestionId : 'last question'
        );
        timerUpdate = setInterval(() => {
            timer = timer + 16;
        }, 16);

        timeOut = setTimeout(() => {
            finish();
        }, minReadingTime);
    });
    let currentlySelectedAnswer = $appContext.currentSelectedAnswer;
    if (currentlySelectedAnswer) {
        appContext.update((v) => ({
            ...v,
            selectedAnswers: [...v.selectedAnswers, v.currentSelectedAnswer],
        }));
    }
    $: {
        continueLabel = opponentReady ? 'Weiter' : 'Bereit';
    }
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero md:inset-4 inset-0 md:p-8 p-2 content-grid overflow-x-hidden "
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
>
    <div class="absolute top-0 right-0 text-sm p-1 bg-white border rounded-md">
        <button class="" on:click={(e) => cancel()}>Spiel beenden</button>
    </div>
    <div>
        <div
            class="{currentlySelectedAnswer?.correct
                ? 'bg-nature-light'
                : 'bg-zinc-400'} text-white text-2xl rounded-md shadow-sm p-8 text-center selected-answer"
            class:correct={!!$appContext.currentSelectedAnswer?.correct}
        >
            {currentlySelectedAnswer
                ? currentlySelectedAnswer.answerText
                : 'keine Antwort gewählt'}
            {currentlySelectedAnswer?.correct ? '✔' : '❌'}
        </div>
    </div>

    <div class=" pb-4 pt-8 px-8 ">
        {#if !$singlePlayer && opponentResult}
            <div class="text-center pb-2  text-2xl title">
                Dein/e Mitspieler/in lag {opponentCorrect
                    ? 'richtig'
                    : 'falsch'}
            </div>
        {/if}
        <div class="text-center  text-2xl title">Hättest du's gewusst?</div>
    </div>
    <div class="h-full  main">
        <slot />
    </div>

    <div
        class="grid grid-flow-col  {opponentReady
            ? 'place-content-between'
            : 'place-content-end'} actions"
    >
        {#if opponentReady}
            <div class="grid content-center" in:fade>
                <span class="p-4 rounded-full bg-zinc-200  text-center">
                    {selfReady
                        ? 'Du bist bereit'
                        : 'dein/e Mitspieler/in ist bereit'}
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

        <div class="cursor-pointer" on:click={(e) => readyOrNextQuestion()}>
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
