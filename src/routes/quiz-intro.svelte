<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { Capacitor } from '@capacitor/core';
    import { goto, prefetch } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import { onMount } from 'svelte';
    import { init, nkReady, sendAnalytics, socket } from '$lib/client';
    import { appContext, matchstatus, singlePlayer } from '$lib/context';
    import BackButton from '$lib/components/back-button.svelte';
    import { v4 } from 'uuid';
    let hasSelectedChallenge = false;

    const startSingle = () => {
        singlePlayer.set(true);
        appContext.update((ctx) => {
            return {
                ...ctx,
                selectedAnswers: [],
                contextId: v4(),
            };
        });

        sendAnalytics(
            'startSingle',
            {
                start_question: $appContext.quizStart,
                selected_challenge: $appContext.selectedChallenge.id,
            },
            $appContext.contextId
        );

        goto(`/quiz/question/${$appContext.quizStart}`);
    };

    onMount(() => {
        prefetch(`/quiz/question/${$appContext.quizStart}`);
        console.log($appContext);
    });

    let useMatchmaker = import.meta.env.VITE_NAKAMA_USE_MATCHMAKER;
    let canStartMatchmaker;
    let matchmakerTicket;
    $: {
        canStartMatchmaker = !$nkReady && !!matchmakerTicket;
        console.log(
            !$nkReady,
            matchmakerTicket,
            !!matchmakerTicket,
            canStartMatchmaker
        );
    }

    const stopMatchmaker = async () => {
        if (matchmakerTicket !== null && !matchmakerTicket.ticket) {
            matchmakerTicket = null;
            return;
        }
        if (matchmakerTicket !== null) {
            console.log('matchmaker stopped');

            // remoove the matckmaking ticket from the server by passing the
            // **TICKET**, not the matchmakerTicket object
            socket.removeMatchmaker(matchmakerTicket.ticket);
            matchmakerTicket = null;
        }
    };
    const startMatchmaker = async () => {
        if (matchmakerTicket) {
            await stopMatchmaker();
            return;
        }
        console.log('matchmaker started');
        singlePlayer.set(false);
        const minPlayers = 2;
        const maxPlayers = 2;
        let query, stringProperties;
        if (
            import.meta.env.VITE_IS_EXHIB === 'true' ||
            Capacitor.getPlatform() === 'ios'
        ) {
            query = '+properties.region:wissensspeicher';
            stringProperties = {
                region: 'wissensspeicher',
                mode: 'wissensspeicher',
                q_set: $appContext.quizStart === '1' ? '1' : '2',
            };
        } else {
            query = '+properties.region:europe';
            stringProperties = {
                region: 'europe',
                mode: 'wissensspeicher',
                q_set: $appContext.quizStart === '1' ? '1' : '2',
            };
        }
        const numericProperties = {};
        try {
            matchmakerTicket = await socket.addMatchmaker(
                query,
                minPlayers,
                maxPlayers,
                stringProperties,
                numericProperties
            );

            console.log(matchmakerTicket);
        } catch (error) {
            console.error(error);
        }
    };

    onMount(() => {
        if (!$nkReady) {
            console.warn('Not connected to Nakama!');
            init();
        }
    });
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-0 md:inset-4 grid
  grid-flow-row content max-w-3xl z-0 relative"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
    style="grid-template-rows:8rem 1fr 16rem;"
>
    <BackButton target="/challengeselect" />

    {#if matchmakerTicket}
        <div
            in:fade={{ delay: 250, duration: 200 }}
            class="absolute w-full h-full grid place-content-center z-50 pointer-events-none"
        >
            {#if import.meta.env.VITE_IS_EXHIB === 'true'}
                Warte auf Mitspieler...
            {:else}
                Suche nach Mitspielern...
            {/if}
        </div>
    {/if}
    <h1 class="heading md:mt-0 mt-8">Spielmodus</h1>

    <div class="md:px-16 ">
        <div class="grid grid-flow-row gap-4 hints md:text-2xl ">
            <div
                class="rounded-lg bg-gradient-to-bl  md:h-56 grid
                md:place-content-center place-content-start p-8 quiz relative "
            >
                <!-- <img
                    src="/heart.svg"
                    alt=""
                    class="blur-[2px] md:blur-sm  md:w-56 md:h-56 w-16 h-16 top-2 right-4 rotate-12
          absolute"
                /> -->

                <div class="relative blur-0">
                    Du spielst um diese Challenge:
                </div>
            </div>

            <div class="">
                <div class="inline-block -rotate-3 w-full">
                    {#if $appContext.selectedChallenge}
                        <div
                            class="bg-lime-200 rounded-sm shadow-md  md:h-56 grid 
            md:place-content-center place-content-start p-8 quiz relative "
                        >
                            <div class="text-center text-xl font-semibold">
                                {$appContext.selectedChallenge.text}
                            </div>
                            <br />
                            <div class="text-md">
                                {@html $appContext.selectedChallenge
                                    .explanation}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <div class="actions px-8 grid grid-flow-row ">
        <div class="grid grid-flow-row h-20">
            <button
                class="action-button bg-white "
                disabled={hasSelectedChallenge}
                on:click={(_) => startSingle()}
            >
                Alleine Spielen
            </button>
            <div class=" z-20 w-full pr-16 ">
                <div
                    class="bg-green-500 w-[1000px] h-[4000px] bottom-0 right-[0px] absolute {!!matchmakerTicket
                        ? 'searching'
                        : 'not-searching'} z-60 transition-all matchmaker"
                />
                <button
                    class="action-button z-50 relative {matchmakerTicket
                        ? 'bg-white text-strom'
                        : 'bg-heart text-white'} border w-full"
                    disabled={!$nkReady}
                    on:click={(e) => startMatchmaker()}
                    >{$nkReady
                        ? matchmakerTicket
                            ? 'Abbrechen'
                            : Capacitor.getPlatform() === 'ios'
                            ? 'Match mit der Person gegenüber'
                            : 'Bereit für ein Match'
                        : 'Keine Verbindung 🤨'}</button
                >
                {#if !$nkReady}
                    <button
                        class="action-button"
                        on:click={async (e) => {
                            await goto('/');
                            location.reload(true);
                        }}
                    >
                        Neu laden
                    </button>
                {/if}
            </div>
        </div>
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
