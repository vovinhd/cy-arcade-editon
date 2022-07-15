<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<div
    class="bg-opacity-0 md:bg-white md:bg-opacity-100  shadow-lg  lg:rounded-md  grid grid-flow-row place-content-end pt-8 pb-2  slider overflow-hidden"
    style=""
    transition:fly={{ y: 200, duration: 500 }}
>
    <div class="text-center absolute w-full">Gefördert durch</div>
    <div class="slide-track grid grid-flow-col place-content-start " style="">
        <img src="/sp_bmu.png" />
        <img src="/sp_bremen.jpeg" />
        <img src="/sp_lotto.jpeg" />
        <img src="/sp_uwb.jpg" />
        <img src="/sp_exist.png" />
        <!-- <img src="/Mobilitaet.jpeg" /> -->

        <img src="/sp_bmu.png" />
        <img src="/sp_bremen.jpeg" />
        <img src="/sp_lotto.jpeg" />
        <img src="/sp_uwb.jpg" />
        <img src="/sp_exist.png" />
        <!-- <img src="/Mobilitaet.jpeg" /> -->
    </div>
</div>

<style lang="scss">
    $animationSpeed: 40s;
    $sponsorWidth: 14rem;
    $sponsorHeight: 9rem;
    $gapWidth: 1rem;
    $width: calc(($sponsorWidth + $gapWidth) * 5);
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
