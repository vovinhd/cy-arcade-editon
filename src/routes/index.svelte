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
    class=" hero bg-zinc-50 rounded-md shadow-lg  grid  attract"
    style=""
    transition:fly={{ x: -200, duration: 500 }}
>
    <!-- <h1 class="text-center p-8 text-2xl">Attract Screen</h1> -->

    <div>
        <div class="">
            <img
                src="/kiko-slogan.webp"
                alt="logo"
                width="100%"
                max-height="200px"
                class="logo"
            />
        </div>

        <p class="   md:px-16 px-8 py-8">
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
                class="cta relative z-50 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl"
                href="/tutorial"
            >
                Los geht's
            </a>
        </div>
    </div>
</div>
<div
    class="absolute md:bottom-8 bottom-0 grid place-content-center w-full sponsors"
>
    <Sponsors />
</div>

<style lang="scss">
    .attract {
        top: 0rem /* 64px */;
        bottom: 0rem /* 64px */;
        right: 0px;
        left: 0px;
        padding-bottom: 4rem;
        grid-auto-flow: row;
        grid-template-rows: 1fr 1fr;
    }

    .logo {
        object-fit: contain;
        height: 14rem;
    }
    @media (min-width: 768px) {
        .attract {
            top: 4rem /* 64px */;
            right: 4rem /* 64px */;
            bottom: 4rem /* 64px */;
            left: 4rem /* 64px */;
            margin-bottom: 12rem /* 192px */;
            overflow: hidden;
            font-size: 1.5rem /* 24px */;
            line-height: 2rem /* 32px */;
        }
    }
    @media (max-height: 350px) and (min-width: 768px) {
        .attract {
            top: 0rem /* 64px */;
            right: 0rem /* 64px */;
            bottom: 0rem /* 64px */;
            left: 0rem /* 64px */;
        }
        .cta {
            z-index: 10000 !important;
            position: fixed;
            right: 1rem;
        }
        .sponsors {
            display: none;
        }
    }
    @media (max-height: 826px) and (min-width: 768px) {
        .attract {
            top: 0rem /* 64px */;
            bottom: 0rem /* 64px */;
            right: 0px;
            left: 0px;
            font-size: 1rem /* 24px */;
            line-height: 1.5rem /* 32px */;
            grid-auto-flow: column;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr;
        }

        .logo {
            height: 8rem;
        }
    }
</style>
