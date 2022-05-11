<script lang="ts">
import { appContext } from "$lib/context";
import type { FollowupOption } from "$lib/types";
export let showNoop = false
const selectOption = (option?: FollowupOption) => {
    appContext.update(value => {
        return {...value, selectedFollowupOption: option ? option : {option: "Nein danke", delay: 0}}
    })
}

</script>

{#if $appContext.selectedChallenge} 
<div>dein Einsatz</div>
<div>Challenge</div>
{#each $appContext.selectedChallenge.options as option}
    <div on:click={() => selectOption(option)}>{option.option}</div>
{/each}
{#if showNoop} 
<div on:click={() => selectOption()}>Nein danke</div>
{/if}
<div>ChallengeOptionen</div>

{/if}

