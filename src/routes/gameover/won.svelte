<script lang="ts">
    import { goto } from "$app/navigation";

import FollowupOptionSelect from "$lib/components/followup-option-select.svelte";
import { appContext } from "$lib/context";

const selectFollowupOption = () => {
        goto(`/gameover/follow-up`)
    }

    let interacted = false
</script>
<div>
    {#if interacted}
        <div>
            Möchest du deine Challenge dem Klimaschutz spenden? *todo formulierung
        </div>
        <FollowupOptionSelect showNoop/>
    {:else}
    <div on:click={() => interacted = true}>
        Herzlichen Glückwunsch, du hast gewonnen
    </div>
    {/if}
    <button on:click={(_) => selectFollowupOption()} disabled={!!$appContext.selectedFollowupOption}>weiter</button>


</div>