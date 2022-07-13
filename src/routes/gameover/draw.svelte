<script lang="ts">
    import { goto } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import FollowupOptionSelect from '$lib/components/followup-option-select.svelte';

    import { appContext } from '$lib/context';

    const selectFollowupOption = () => {
        goto(`/gameover/follow-up`);
    };
</script>

<div class="grid grid-flow-row place-content-stretch h-full">
    {#if $appContext.reason}
        <div class="p-8">
            <div class="heading">
                {$appContext.reason === 'opponent left'
                    ? 'Deine Mitspieler/in ist gegangen 😮'
                    : 'Etwas ist schief gelaufen 🤦‍♀️'}
            </div>
        </div>

        <Actions>
            <button
                class="action-button"
                on:click={async (e) => {
                    await goto('/');
                    location.reload(true);
                }}
            >
                Neu laden
            </button>
        </Actions>
    {:else}
        <div class="heading">
            Du hast zwar nicht gewonnen, aber der Klimaschutz
        </div>
        <div class="text-center">Ihr hattet Gleichstand</div>

        <div>
            <div
                class="text-white bg-nature rounded-full px-24 mx-24 py-2 text-center"
            >
                Danke das du mitgespielt hast
            </div>
        </div>

        <div>
            <FollowupOptionSelect />
        </div>

        <Actions>
            <button
                class="action-button"
                on:click={(_) => selectFollowupOption()}
                disabled={!!$appContext.reason ||
                    ($appContext.selectedChallenge &&
                        !$appContext.selectedFollowupOption)}>weiter</button
            >
        </Actions>
    {/if}
</div>
