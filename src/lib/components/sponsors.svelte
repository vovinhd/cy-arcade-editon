<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<div
    class="bg-opacity-0 md:bg-white md:bg-opacity-100  shadow-lg  lg:rounded-md  grid grid-flow-row place-content-end pt-8 pb-2  slider overflow-hidden"
    style=""
    transition:fly={{ y: 200, duration: 500 }}
>
    <div class="text-center absolute w-full md:visible hidden aaaaa">
        Gefördert durch
    </div>
    <div class="slide-track grid grid-flow-col place-content-start " style="">
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bmu.png"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bmwi.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bremen.jpeg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_esf.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_esf_claim.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_eu.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_exist.png"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_lotto.jpeg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_uwb.jpg"
        />

        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bmu.png"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bmwi.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_bremen.jpeg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_esf.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_esf_claim.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_eu.jpg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_exist.png"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_lotto.jpeg"
        />
        <img
            alt="Sponsoren Logo"
            aria-roledescription="Sponsoren Logo"
            src="/sp/sp_uwb.jpg"
        />
    </div>
</div>

<style lang="scss">
    .aaaaa {
        visibility: inherit;
    }
    $animationSpeed: 40s;
    $sponsorWidth: 14rem;
    $sponsorHeight: 9rem;
    $gapWidth: 1rem;
    $width: calc(($sponsorWidth + $gapWidth) * 9);
    @mixin white-gradient {
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 1) 0%,
            rgba(250, 250, 250, 0) 100%
        );
    }

    @mixin white-gradient {
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 1) 0%,
            rgba(250, 250, 250, 0) 100%
        );
    }

    // Animation
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX($width);
        }
    }

    // Styling
    .slider {
        height: 12rem;
        overflow: hidden;
        position: relative;
        width: 48rem;

        &::before,
        &::after {
            @include white-gradient;
            content: '';
            height: 100%;
            position: absolute;
            width: 8rem;
            z-index: 2;
        }

        &::after {
            right: 0;
            top: 0;
            transform: rotateZ(180deg);
        }

        &::before {
            left: 0;
            top: 0;
        }

        .slide-track {
            animation: scroll $animationSpeed linear infinite;
            display: flex;
            width: calc($width * 2);
            gap: $gapWidth;
        }

        .slide-track > * {
            object-fit: contain;
            width: $sponsorWidth;
            height: $sponsorHeight;
        }
    }
</style>
