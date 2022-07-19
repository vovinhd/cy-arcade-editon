<script lang="ts">
    import { goto } from '$app/navigation';

    import { init, nkReady, socket } from '$lib/client';
    import Actions from '$lib/components/actions.svelte';
    import BackButton from '$lib/components/back-button.svelte';
    import ChallengeButton from '$lib/components/challenge-button.svelte';
    import OutA from '$lib/components/out-a.svelte';
    import { appContext } from '$lib/context';
    import { onMount } from 'svelte';

    import { fly } from 'svelte/transition';

    let hasSelectedChallenge = false;

    // const startSingle = () => {
    //     goto("/quiz/question/1");
    // };
    onMount(async () => {
        init()
            .then((session) => {
                console.log(session);
                if (!session) goto('/');
            })
            .catch((e) => console.error(e));
    });

    appContext.subscribe((value) => {
        hasSelectedChallenge = !value.selectedChallenge;
    });
</script>

<svelte:head>
    <meta name="description" content="Challenge-Auswahl" />
</svelte:head>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero md:inset-4 inset-0 grid
  grid-flow-row content"
    in:fly={{ x: 200, duration: 500 }}
>
    <BackButton target="/tutorial" />

    <h1 class="heading">Challenge-Auswahl</h1>

    <div class="explanation text-center text-lg md:pt-8 md:px-16 px-2">
        Such dir eine Challenge aus, auf die du Lust hast
    </div>

    <div class="md:px-8 md:py-6 p-2 grid grid-flow-row gap-4 challenges">
        <div>
            <ChallengeButton
                challenge={{
                    id: 'oekostrom',
                    text: 'Zu zertifizertem Ökostrom wechseln',
                    options: [
                        { option: 'Ich wechsel in 2 Wochen', delay: 14 },
                        { option: 'Ich wechsel in 4 Wochen', delay: 28 },
                        { option: 'Ich wechsel in 2 Monaten', delay: 60 },
                    ],
                }}
            >
                <div slot="explanation">
                    Ich wechsle zu einem Stromanbieter mit Label aus der
                    <OutA
                        href="https://utopia.de/bestenlisten/die-besten-oekostrom-anbieter/"
                    >
                        Utopia-Bestenliste
                    </OutA>
                </div>
            </ChallengeButton>
        </div>
        <div>
            <ChallengeButton
                challenge={{
                    id: 'bike',
                    text: 'Mit dem Rad zur Arbeit',
                    options: [
                        { option: 'Ich probiere es für eine Woche', delay: 7 },
                        {
                            option: 'Ich probiere es für zwei Wochen',
                            delay: 14,
                        },
                        {
                            option: 'Ich probiere es für vier Wochen',
                            delay: 28,
                        },
                    ],
                }}
            >
                <div slot="explanation">
                    Ich fahre die nächsten Wochen mit dem Fahrrad zur Arbeit,
                    statt mit dem Auto
                </div>
            </ChallengeButton>
        </div>

        <div>
            <ChallengeButton
                challenge={{
                    id: 'wlist',
                    text: 'Wunschliste führen',
                    options: [
                        { option: 'Ich probiere es für eine Woche', delay: 7 },
                        {
                            option: 'Ich probiere es für zwei Wochen',
                            delay: 14,
                        },
                        {
                            option: 'Ich probiere es für vier Wochen',
                            delay: 28,
                        },
                    ],
                }}
            >
                <div slot="explanation">
                    Ich führe die nächsten Wochen eine Wunschliste und kaufe nur
                    Dinge, die mindestens einen Tag auf der Wunschliste
                    gestanden haben
                </div>
            </ChallengeButton>
        </div>
    </div>

    {#if !hasSelectedChallenge}
        <div class="actions px-8 mb-12">
            <Actions>
                <!-- <button
                    class="action-button"
                    disabled={hasSelectedChallenge}
                    on:click={(_) => startSingle()}>Alleine Spielen</button
                > -->
                <a
                    sveltekit:prefetch
                    class="action-button text-center bg-heart text-white"
                    href="quiz-intro"
                    disabled={hasSelectedChallenge}
                >
                    Auswählen
                </a>
            </Actions>
        </div>
    {/if}
</div>

<style lang="scss">
    .content {
        grid-template-rows: 2rem 1rem 1fr 4rem;
    }
    @media (min-width: 760px) {
        .content {
            grid-template-rows: 4rem 4rem 1fr 8rem;
        }
    }
    .content {
        grid-template-rows: 4rem 4rem 1fr 8rem;
        .actions {
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0s;
        }
        h1,
        .explanation {
            opacity: 0;
            animation: fadeInDown 1s ease forwards;
        }
    }

    .challenges {
        * {
            opacity: 0;
            animation: fadeInDown 1s ease forwards;
        }
    }
    @for $i from 0 through 3 {
        .content :nth-child(#{$i + 1}) {
            animation-delay: 200ms * $i;
        }
        .challenges :nth-child(#{$i + 1}) {
            animation-delay: 200ms * $i;
        }
    }
</style>
