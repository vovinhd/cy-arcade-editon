<script lang="ts">
    import { fly, fade } from 'svelte/transition';

    import { goto, prefetch } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import { onMount } from 'svelte';
    import { nkReady, socket } from '$lib/client';
    import { matchstatus, singlePlayer } from '$lib/context';
    let hasSelectedChallenge = false;

    const startSingle = () => {
        singlePlayer.set(true);

        goto('/quiz/question/1');
    };

    onMount(() => prefetch('/quiz/question/1'));

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
        const query = '*';
        const stringProperties = { region: 'europe', mode: 'wissensspeicher' };
        const numericProperties = { skill: 125 };
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
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-0 md:inset-4 grid
  grid-flow-row content max-w-3xl z-0"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
    style="grid-template-rows:8rem 1fr 8rem;"
>
    {#if matchmakerTicket}
        <div
            in:fade={{ delay: 250, duration: 200 }}
            class="absolute w-full h-full grid place-content-center z-50 pointer-events-none"
        >
            Suche nach Mitspielern...
        </div>
    {/if}
    <h1 class="heading">Anleitung</h1>

    <div class="md:px-16 ">
        <div class="grid grid-flow-row gap-4 hints md:text-2xl ">
            <div
                class="rounded-lg bg-gradient-to-bl from-blue-100 to-white md:h-56 grid
        place-content-center p-8 quiz relative "
            >
                <img
                    src="/confusion.svg"
                    alt=""
                    class="blur-[2px] md:blur-sm  md:w-56 md:h-56 w-16 h-16 top-2 right-4 rotate-12
          absolute"
                />

                <div class="relative blur-0">
                    3 Fragen aus verschiedenen Bereichen des Klimaschutzes
                </div>
            </div>

            <div
                class="rounded-lg bg-gradient-to-bl from-lime-100 to-white md:h-56 grid
        place-content-center p-8 quiz relative "
            >
                <img
                    src="/players.svg"
                    alt=""
                    class="blur-[2px] md:blur-sm  md:w-56 md:h-56 w-16 h-16 top-2 right-4 rotate-12
          absolute"
                />

                <div class="relative blur-0">
                    alleine oder gegen die Person gegenüber
                </div>
            </div>
            <div
                class="rounded-lg bg-gradient-to-bl from-rose-100 to-white md:h-56 grid
        place-content-center p-8 quiz relative "
            >
                <img
                    src="/heart.svg"
                    alt=""
                    class="blur-[2px] md:blur-sm  md:w-56 md:h-56 w-16 h-16 top-2 right-4 rotate-12
          absolute"
                />

                <div class="relative blur-0">
                    Wer verliert macht die Challenge 😉
                </div>
            </div>
        </div>
    </div>
    <div class="actions px-8">
        <Actions>
            <button
                class="action-button bg-heart text-white"
                disabled={hasSelectedChallenge}
                on:click={(_) => startSingle()}
            >
                Alleine Spielen
            </button>
            <div class=" z-20 mr-8 ">
                <div
                    class="bg-green-500 w-[1000px] h-[4000px] bottom-0 right-[0px] absolute {!!matchmakerTicket
                        ? 'searching'
                        : 'not-searching'} z-60 transition-all matchmaker"
                />
                <button
                    class="action-button  w-full z-50 relative bg-white shadow-none border"
                    disabled={false}
                    on:click={(e) => startMatchmaker()}
                    >{nkReady
                        ? matchmakerTicket
                            ? 'Abbrechen'
                            : 'Bereit'
                        : 'Keine Verbindung 🤨'}</button
                >
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
