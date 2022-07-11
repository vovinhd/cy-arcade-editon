<script lang="ts">
    import { goto } from '$app/navigation';

    import { page } from '$app/stores';
    import { leaveMatch } from '$lib/client';
    import { appContext, emptyApplicationContext } from '$lib/context';
    import { onMount } from 'svelte';

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

    const clearAppContext = () => {
        appContext.set(emptyApplicationContext);
        appContext.set({ ...$appContext, quizStart: '5' });
    };

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
</script>

<div class="hidden">Timeout: {timeout}</div>
