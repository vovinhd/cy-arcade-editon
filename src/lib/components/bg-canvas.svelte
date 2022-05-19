<script>
    import { browser } from '$app/env';

    import { onMount } from 'svelte';

    let el;
    export const ssr = false;
    onMount(async () => {
        if (browser) {
            const bg = await import('./bg.js');
            bg.createScene(el);
        }
    });
</script>

<canvas bind:this={el} />
