<script>

    import BgCanvas from "$lib/components/bg-canvas.svelte";
import OutAOverlay from "$lib/components/out-a-overlay.svelte";
import "../app.css";
</script>

<svelte:head>
    <title>climactivity Wissensspeicher Demo</title>
    {#if import.meta.env.VITE_DISABLE_ZOOM}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    {/if}
</svelte:head>

<div class="w-[100vw] min-h-[100vh] bg-container ">
    <OutAOverlay/>
    <div class="bg">
        <div class="w-full h-full bg-slate-800 transition-colors">
            <BgCanvas/>
        </div>
    </div>

    <div class="safearea">
        <main class="grid grid-flow-row place-content-center ">
                <slot/>
        </main>
        <!-- <span id="bg-attr" class="text-white text-opacity-20 text-center">made with ❤️ @climactivity</span> -->
    </div>
</div>

<style lang="scss">
    .safearea {
        z-index: 1;
        position: relative;
        min-height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr 2rem;
        grid-auto-flow: row;
        @apply pt-2 grid place-content-center;
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
