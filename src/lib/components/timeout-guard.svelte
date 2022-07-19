<script lang="ts">
    import { goto } from '$app/navigation';

    import { page } from '$app/stores';
    import { leaveMatch } from '$lib/client';
    import {
        appContext,
        clearAppContext,
        emptyApplicationContext,
    } from '$lib/context';
    import { onDestroy, onMount } from 'svelte';

    export let limit = 60 * 5 * 1000;
    let timeout = limit;
    let timerUpdate;
    const invalidateTimers = () => {
        clearInterval(timerUpdate);
    };

    const restartGame = () => {
        invalidateTimers();
        leaveMatch();
        clearAppContext();
        goto('/');
    };

    // const clearAppContext = () => {
    //     appContext.set(emptyApplicationContext);
    //     // appContext.set({ ...$appContext, quizStart: '1' });
    // };

    const resetTimer = () => {
        timeout = limit;
    };

    page.subscribe((currentPage) => {
        resetTimer();
    });

    onMount(() => {
        timerUpdate = setInterval(() => {
            timeout -= 1000;
            if (timeout <= 60 * 1000) {
                console.log('reset soon:', timeout);
            }
            if (timeout <= 0) {
                restartGame();
            }
        }, 1000);
    });
    onDestroy(() => {
        invalidateTimers();
    });
</script>

<div class="hidden">Timeout: {timeout}</div>
