<script lang="ts">
    import { goto } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import { fade } from 'svelte/transition';
    import FollowupOptionSelect from '$lib/components/followup-option-select.svelte';
    import { appContext } from '$lib/context';
    import BlobAnim from '$lib/components/blob-anim.svelte';

    const selectFollowupOption = () => {
        if (interacted) {
            goto(`/gameover/follow-up`);
        } else {
            interacted = true;
        }
    };

    let interacted = false;
</script>

<div class="grid grid-flow-row place-content-stretch h-full">
    <div out:fade>
        <div
            class="text-4xl text-center bg-nature text-white font-bold grid place-content-center {interacted
                ? 'h-40'
                : 'h-80'} transition-all animate-cheer"
        >
            Herzlichen Glückwunsch, du hast gewonnen
        </div>
    </div>

    {#if interacted}
        <div in:fade class="grid grid-flow-row p-8 h-full">
            <div>Möchest du deine Challenge dem Klimaschutz spenden?</div>
            <div class="grid grid-flow-row">
                <FollowupOptionSelect showNoop />
            </div>
            <div>
                <Actions>
                    <button
                        class="relative z-10 action-button max-w-full text-center  ring-offset-2 bg-heart text-white text-2xl shadow-2xl"
                        on:click={(_) => selectFollowupOption()}
                    >
                        Weiter
                    </button>
                </Actions>
            </div>
        </div>
    {:else}
        <div>
            <div
                class="text-center animate-cheer animation-delay-2000 opacity-0"
            >
                Du hattest {Math.abs($appContext.result)} Frage(n) mehr richtig
            </div>

            <div
                class="text-white bg-nature rounded-full mx-4 md:px-24 md:mx-24 py-2 text-center animate-cheer animation-delay-2000 opacity-0"
            >
                Danke das du mitgespielt hast
            </div>
        </div>

        <div
            class="grid place-content-center  py-8 mb-16 relative animation-delay-4000 animate-cheer opacity-0"
        >
            <!-- <a class=" absolute right-1/2 translate-x-1/2 action-button w-60 text-center bg-heart text-white shadow-2xl animate-ping" href="/challengeselect"> Let's a go </a> -->
            <div class="relative">
                <BlobAnim />
                <button
                    class="relative z-10 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl"
                    on:click={(_) => selectFollowupOption()}
                >
                    Weiter
                </button>
            </div>
        </div>
    {/if}
</div>
