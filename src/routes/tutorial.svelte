<script lang="ts">
    import { fly } from 'svelte/transition';
    import { prefetch } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import { onMount } from 'svelte';
    import BackButton from '$lib/components/back-button.svelte';

    onMount(() => prefetch('/challengeselect'));
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-0 md:inset-4 grid
  grid-flow-row content max-w-3xl z-0"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
    style="grid-template-rows:8rem 1fr 8rem;"
>
    <BackButton target="/" />
    <h1 class="heading md:mt-0 mt-8">Anleitung</h1>

    <!-- <a href="#" class="6 "> -->
    <div class="grid md:px-16 grid-flow-row gap-4 hints md:text-2xl ">
        <div
            class="rounded-lg bg-gradient-to-bl from-yellow-100 to-white md:h-36 grid
md:place-content-center place-content-start p-8 quiz relative "
        >
            <img
                src="/check.svg"
                alt=""
                class="blur-[2px] md:blur-sm  md:w-56 md:h-36 w-16 h-16 top-2 right-4 rotate-12
  absolute"
            />

            <div class="relative blur-0 text-center">
                ➤ Such dir eine Challenge als Spieleinsatz aus
            </div>
        </div>

        <div
            class="rounded-lg bg-gradient-to-bl from-blue-100 to-white md:h-36 grid
        md:place-content-center place-content-start p-8 quiz relative "
        >
            <img
                src="/confusion.svg"
                alt=""
                class="blur-[2px] md:blur-sm  md:w-56 md:h-36 w-16 h-16 top-2 right-4 rotate-12
          absolute"
            />

            <div class="relative blur-0 text-center">
                ➤ Beantworte drei Fragen aus verschiedenen Bereichen des
                Klimaschutzes
            </div>
        </div>

        <div
            class="rounded-lg bg-gradient-to-bl from-lime-100 to-white md:h-36 grid
                md:place-content-center place-content-start p-8 quiz relative "
        >
            <img
                src="/players.svg"
                alt=""
                class="blur-[2px] md:blur-sm  md:w-56 md:h-36 w-16 h-16 top-2 right-4 rotate-12
          absolute"
            />

            <div class="relative blur-0 text-center">
                ➤ Spiele alleine oder gegen die Person gegenüber
            </div>
        </div>
        <div
            class="rounded-lg bg-gradient-to-bl from-rose-100 to-white md:h-36 grid
                md:place-content-center place-content-start p-8 quiz relative "
        >
            <img
                src="/heart.svg"
                alt=""
                class="blur-[2px] md:blur-sm  md:w-56 md:h-36 w-16 h-16 top-2 right-4 rotate-12
          absolute"
            />

            <div class="relative blur-0">
                ➤ Wer verliert macht die Challenge 😉
            </div>
        </div>
    </div>
    <!-- </a> -->
    <div class="actions px-8">
        <Actions>
            <div class="relative mx-auto ">
                <a
                    sveltekit:prefetch
                    class="relative z-10 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl"
                    href="/challengeselect"
                >
                    Los geht's
                </a>
            </div>
        </Actions>
    </div>
</div>

<style lang="scss">
    .matchmaker {
        transition: all;
        transition-duration: 1000ms;
        transition-timing-function: ease-in-out;
    }
    .searching {
        clip-path: circle(4000px at 50% 50%);
    }

    .not-searching {
        clip-path: circle(0px at 100% 100%);
    }
    .content {
        grid-template-rows: 4rem 4rem 1fr 8rem;
        .actions {
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
        }
        h1,
        .explanation {
            opacity: 0;
            animation: fadeInDown 1s ease forwards;
        }
    }

    .hints > * {
        opacity: 0;
        animation: fadeInDown 1s ease forwards;
    }

    @for $i from 0 through 4 {
        .content :nth-child(#{$i + 1}) {
            animation-delay: 200ms * $i;
        }
        .hints :nth-child(#{$i + 1}) {
            animation-delay: 200ms * $i;
        }
    }
</style>
