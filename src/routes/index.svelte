<script>
    import { browser } from '$app/env';
    import { fly } from 'svelte/transition';

    import QrCode from '$lib/components/qr-code.svelte';
    import { StatusBar } from '@capacitor/status-bar';
    import { onMount } from 'svelte';
    import BlobAnim from '$lib/components/blob-anim.svelte';
    import Sponsors from '$lib/components/sponsors.svelte';
    const hideStatusBar = async () => {
        await StatusBar.hide();
    };

    onMount(() => {
        //hideStatusBar().catch((e) => console.log("not hiding status bar on web"));
    });
</script>

<svelte:head>
    <meta
        name="description"
        content="Interaktives Exponant von Climactivity für die Dokumenta in Kassel"
    />
</svelte:head>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero md:inset-16 md:mb-48 inset-0 inset-y-16 grid grid-flow-row attract md:overflow-hidden"
    style="grid-template-rows: 1fr 1fr;"
    out:fly={{ x: -200, duration: 500 }}
>
    <!-- <h1 class="text-center p-8 text-2xl">Attract Screen</h1> -->

    <div>
        <div class="">
            <img
                src="/kiko-slogan.webp"
                alt="logo"
                width="100%"
                max-height="200px"
                class="object-contain h-56"
            />
        </div>

        <p class="  md:text-2xl md:px-16 px-8 py-8">
            Wir entwickeln eine neue Version unserer App, die dir beim
            Klimaschutz hilft. Sie wird im Herbst veröffentlicht, aber hier
            kannst du sie jetzt schon ausprobieren.
        </p>
    </div>

    <!-- <div class="flex felx-col place-content-center py-8">
        <QrCode codeValue="o" squareSize=800/>
    </div> -->

    <div class="grid place-content-center  py-8 mb-16 relative">
        <!-- <a class=" absolute right-1/2 translate-x-1/2 action-button w-60 text-center bg-heart text-white shadow-2xl animate-ping" href="/challengeselect"> Let's a go </a> -->
        <div class="relative ">
            <BlobAnim />

            <a
                sveltekit:prefetch
                class="relative z-10 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl"
                href="/tutorial"
            >
                Los geht's
            </a>
        </div>
    </div>
</div>
<div class="absolute bottom-8 grid place-content-center w-full">
    <Sponsors />
</div>
