<script>
    import BgCanvas from '$lib/components/bg-canvas.svelte';
    import OutAOverlay from '$lib/components/out-a-overlay.svelte';
    import '../app.css';
    import { insets } from '$lib/context';
    import { init, nkReady } from '$lib/client';
    import { onMount } from 'svelte';
    import TimeoutGuard from '$lib/components/timeout-guard.svelte';
import { page } from '$app/stores';

    onMount(() => {
        if (!$nkReady) {
            init();
        }
    });
</script>

<svelte:head>
    <title>climactivity Wissensspeicher Demo</title>
    {#if import.meta.env.VITE_DISABLE_ZOOM}
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
    {:else}
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
    {/if}
</svelte:head>

<div class="w-[100vw] min-h-[100vh] bg-container  overflow-hidden">
    {#if import.meta.env.VITE_USE_TIMER === 'true'}
        {#key $page.url.href}
            <TimeoutGuard limit={60 * 5 * 1000} />
        {/key}
    {/if}
    <OutAOverlay />
    <div class="bg">
        <div class="w-full h-full bg-slate-800 transition-colors">
            <BgCanvas />
        </div>
    </div>

    <div
        class="safearea relative"
        style={`top: ${$insets.top}; left: ${$insets.left}; right: ${$insets.right}; bottom: ${$insets.bottom};`}
    >
        <main
            class="grid grid-flow-row place-content-center absolute "
            style={`top: ${$insets.top}px; left: ${$insets.left}px; right: ${$insets.right}px; bottom: ${$insets.bottom}px;`}
        >
            <slot />
        </main>
    </div>
</div>

<style lang="scss">
    .safearea {
        z-index: 1;
        position: absolute;
        min-height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr 2rem;
        grid-auto-flow: row;
        @apply pt-0 grid place-content-center inset-0;
    }

    .bg-container {
        height: 100vh;
        width: 100vw;
        position: relative;
    }

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: fill;
        z-index: 0;
    }
</style>
