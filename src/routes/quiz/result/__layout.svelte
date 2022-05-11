<script lang="ts">
import { goto } from '$app/navigation';

import { appContext } from '$lib/context';

    import { fly } from 'svelte/transition';

    let opponentReady  = true
    const getSingleplayerQuizResult = () => {
        return $appContext.selectedAnswers.find(answer => !answer.correct)
    }
    const nextQuestionOrResult = () => {

        const nextQuestionId = $appContext.quiz[$appContext.currentQuestionId];
        if (nextQuestionId) {
            goto(`/quiz/question/${nextQuestionId}`)
        } else {
            if ($appContext.singlePlayer) {
                goto(`/gameover/${getSingleplayerQuizResult() ? 'won' : 'lost'}`)

            }
        }
    }
</script>

<div class="bg-zinc-50 rounded-md shadow-lg hero inset-32" out:fly={{ x: -200, duration: 500 }}>
    <slot/>
    {#if opponentReady}
    <span>
        dein/e Mitspieler/in ist bereit
    </span>
    {/if}
    <button on:click={(e) => nextQuestionOrResult()}>Weiter</button>
</div>