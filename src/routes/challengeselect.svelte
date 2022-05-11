<script lang="ts">
    import { goto } from "$app/navigation";

    import { init, nkReady, socket } from "$lib/client";
    import ChallengeButton from "$lib/components/challenge-button.svelte";
    import OutA from "$lib/components/out-a.svelte";
    import { appContext } from "$lib/context";
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";

    let hasSelectedChallenge = false;

    const startSingle = () => {
        goto("/quiz/question/1");
    };
    onMount(async () => {
        init()
            .then((session) => {
                console.log(session);
                if (!session) goto("/");
            })
            .catch((e) => console.error(e));
    });

    appContext.subscribe((value) => {
        console.log(value);
        hasSelectedChallenge = !value.selectedChallenge;
    });
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-4 grid grid-flow-row content"
    in:fly={{ x: 200, duration: 500 }}
>
    <h1 class="heading">Challenge Select screen</h1>

    <div class="p-8">
        <ChallengeButton
            challenge={{
                id: "oekostrom",
                text: "Zu zertifizertem Ökostrom wechseln",
                options: [
                    { option: "Ich wechsel in 2 Wochen", delay: 14 },
                    { option: "Ich wechsel in 4 Wochen", delay: 28 },
                    { option: "Ich wechsel in 2 Monaten", delay: 60 },
                ],
            }}
        >
            <div slot="explanation">
                Ich wechsle zu einem Stromanbieter mit Label aus der <OutA
                    href="https://utopia.de/bestenlisten/die-besten-oekostrom-anbieter/"
                    >Utopia-Bestenliste</OutA
                >
            </div>
        </ChallengeButton>
    </div>

    <div class="grid grid-flow-col content-center place-content-around ">
        <div>
            <button
                disabled={hasSelectedChallenge}
                on:click={(_) => startSingle()}>Alleine Spielen</button
            >
        </div>
        <div>
            <button disabled={true}>Bereit</button>
        </div>
    </div>
</div>

<style lang="scss">

    .content {

    }
    button {
        @apply rounded-full shadow-md px-8 py-4 transition-all
    }
    button:disabled {
        @apply bg-storm-light shadow-none
    }
</style>
