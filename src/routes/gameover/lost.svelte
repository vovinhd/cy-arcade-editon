<script lang="ts">
import { goto } from "$app/navigation";
import FollowupOptionSelect from "$lib/components/followup-option-select.svelte";

import { appContext } from "$lib/context";


    const selectFollowupOption = () => {
        goto(`/gameover/follow-up`)
    }
</script>

<div class="grid grid-flow-row">
    <div class="heading">CTA</div>
    <FollowupOptionSelect />
    <div>Danke das du mitgespielt hast</div>
    <button on:click={(_) => selectFollowupOption()} disabled={!!$appContext.selectedFollowupOption}>weiter</button>
</div>