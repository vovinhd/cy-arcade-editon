<script lang="ts">
    import { goto } from "$app/navigation";

    import { init, nkReady, socket } from "$lib/client";
import Actions from "$lib/components/actions.svelte";
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

    <div class="p-8 grid grid-flow-row gap-4">
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

        <ChallengeButton
        challenge={{
            id: "bike",
            text: "Mit dem Rad zur arbeit",
            options: [
                { option: "Ich probiere es für eine Woche", delay: 7 },
                { option: "Ich probiere es für zwei Woche", delay: 14 },
                { option: "Ich probiere es für vier Woche", delay: 28 },
            ],
        }}
    >
        <div slot="explanation">
            Ich fahre die nächsten Wochen mit dem Fahrrad zur Arbeit, statt mit dem Auto 
            
        </div>
    </ChallengeButton>


    <ChallengeButton
    challenge={{
        id: "wlist",
        text: "Wunschliste führen",
        options: [
            { option: "Ich probiere es für eine Woche", delay: 7 },
            { option: "Ich probiere es für zwei Woche", delay: 14 },
            { option: "Ich probiere es für vier Woche", delay: 28 },
        ],
    }}
>
    <div slot="explanation">
        Ich führe die nächsten Wochen eine Wunschliste und kaufe nur Dinge, die mindestens einen Tag auf der Wunschliste gestanden haben
    </div>
</ChallengeButton>

    </div>

    <Actions>
        <button class="action-button"
            disabled={hasSelectedChallenge}
            on:click={(_) => startSingle()}>Alleine Spielen</button
        >
        <button class="action-button" disabled={true}>Bereit</button>
    </Actions>
</div>

<style lang="scss">

    .content {
        grid-template-rows: 8rem 1fr 8rem;
    }
</style>
