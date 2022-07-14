<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<div
    class="bg-opacity-0 md:bg-zinc-50 md:bg-opacity-100  shadow-lg   lg:rounded-md  grid grid-flow-row place-content-end pt-8 pb-2  slider overflow-hidden"
    style=""
    out:fly={{ x: -200, duration: 500 }}
>
    <div class="text-center absolute w-full">Gefördert durch</div>
    <div
        class="slide-track grid grid-flow-col gap-4 place-content-start "
        style=""
    >
        <img src="/Energie.jpeg" />
        <img src="/Konsum.jpeg" />
        <img src="/Ernaehrung.jpeg" />
        <img src="/Engagement_gesellschaftlich.jpeg" />
        <img src="/Engagement_privat.jpeg" />
        <img src="/Mobilitaet.jpeg" />

        <img src="/Energie.jpeg" />
        <img src="/Konsum.jpeg" />
        <img src="/Ernaehrung.jpeg" />
        <img src="/Engagement_gesellschaftlich.jpeg" />
        <img src="/Engagement_privat.jpeg" />
        <img src="/Mobilitaet.jpeg" />
    </div>
</div>

<style lang="scss">
    $animationSpeed: 20s;
    $width: calc((9rem + 1rem) * 6);
    @mixin white-gradient {
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    @mixin white-gradient {
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
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
        }

        .slide-track > * {
            @apply h-36 w-36 object-cover;
        }
    }
</style>
