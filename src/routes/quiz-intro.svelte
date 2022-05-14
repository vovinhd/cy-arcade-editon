<script>
    import { fly } from "svelte/transition";

    import { goto, prefetch } from "$app/navigation";
    import Actions from "$lib/components/actions.svelte";
import { onMount } from "svelte";
    let hasSelectedChallenge = false;

    const startSingle = () => {
        goto("/quiz/question/1");
    };

    onMount(() => prefetch("/quiz/question/1"));
</script>


<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-4 grid grid-flow-row content max-w-3xl"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
    style="grid-template-rows:8rem 1fr 8rem;"
>

<h1 class="heading">Anleitung</h1>

<div class="px-16">
    <div class="grid grid-flow-row gap-4 hints">
        <div class="rounded-lg bg-gradient-to-bl from-blue-100 to-white h-56 grid place-content-center text-2xl p-8 quiz relative shadow-sm">
            <img src="/confusion.svg" alt="" class=" blur-sm w-56 h-56 -bottom-2 right-4 rotate-12 absolute"/>

            <div class="relative blur-0">
                3 Fragen aus verschiedenen Bereichen des Klimaschutzes
            </div>

        </div>

        <div class="rounded-lg bg-gradient-to-bl from-lime-100 to-white h-56 grid place-content-center text-2xl p-8 quiz relative shadow-sm">
            <img src="/players.svg" alt="" class=" blur-sm w-56 h-56 -bottom-2 right-4 rotate-12 absolute"/>

            <div class="relative blur-0">
                alleine oder gegen die Person gegenüber
            </div>

        </div>
        <div class="rounded-lg bg-gradient-to-bl from-rose-100 to-white h-56 grid place-content-center text-2xl p-8 quiz relative shadow-sm">
            <img src="/heart.svg" alt="" class=" blur-sm w-56 h-56 -bottom-2 right-4 rotate-12 absolute"/>

            <div class="relative blur-0">
                Wer verliert macht seine Challenge 😉
            </div>

        </div>
    </div>
</div>
<div class="actions px-8">
    <Actions>
        <button
            class="action-button bg-heart text-white"
            disabled={hasSelectedChallenge}
            on:click={(_) => startSingle()}>Alleine Spielen</button
        >
        <button class="action-button" disabled={true}>Bereit</button>
    </Actions>
</div>

</div>

<style lang="scss">



    .content {
        grid-template-rows: 4rem 4rem 1fr 8rem;
        .actions {
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
        } 
        h1, .explanation {
            opacity: 0;
            animation: fadeInDown 1s ease forwards;

        }
    }

    .hints > *{
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