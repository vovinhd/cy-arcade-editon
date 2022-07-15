<script lang="ts">
    import { goto } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';
    import FollowupOptionSelect from '$lib/components/followup-option-select.svelte';

    import { appContext, singlePlayer } from '$lib/context';

    const selectFollowupOption = () => {
        goto(`/gameover/follow-up`);
    };
</script>

<div class="grid grid-flow-row place-content-stretch h-full">
    <div class="heading">
        Du hast zwar nicht gewonnen, aber der Klimaschutz schon!
    </div>

    {#if $appContext.result}
        <div class="text-center">
            Dein/e Mitspieler/in hatte {Math.abs($appContext.result)} Frage(n) mehr
            richtig
        </div>
    {/if}

    <div>
        <div
            class="text-white bg-nature rounded-full px-24 mx-24 py-2 text-center"
        >
            Danke, dass du mitgespielt hast
        </div>
    </div>

    <div>
        <FollowupOptionSelect />
    </div>

    <Actions>
        <button
            class="action-button transition-colors duration-500 {$appContext.selectedFollowupOption
                ? 'bg-heart text-white'
                : 'bg-white'}"
            on:click={(_) => selectFollowupOption()}
            disabled={$appContext.selectedChallenge &&
                !$appContext.selectedFollowupOption}>weiter</button
        >
    </Actions>
</div>
