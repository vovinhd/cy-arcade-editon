<script lang="ts">
import { appContext } from "$lib/context";
import type { FollowupOption } from "$lib/types";
export let showNoop = false
const selectOption = (option?: FollowupOption) => {
    let selectedFollowupOption =  option ? option : {option: "Nein danke", delay: 0};
    selectedOptionText = selectedFollowupOption.option
    appContext.update(value => {
        return {...value, selectedFollowupOption}
    })
}
let selectedOptionText
const selected = (optionText) => $appContext.selectedFollowupOption?.option === optionText
</script>

{#if $appContext.selectedChallenge} 
<div class="text-center text-sm">dein Einsatz</div>

<div class="p-8 space-y-4">
<div class="font-bold">{$appContext.selectedChallenge.text}</div>
{#if $appContext.selectedChallenge.explanation}
<div>{@html $appContext.selectedChallenge.explanation}</div>
{/if}
</div>
<div class="pt-0 p-8 space-y-4">
    <div class="text-center text-sm">&nbsp;</div>
{#each $appContext.selectedChallenge.options as option}
    <div class="{selected(option.option) ? "selected" : ""} followup-btn"on:click={() => selectOption(option)}>{option.option}</div>
{/each}
{#if showNoop} 
<div class="{selectedOptionText === "Nein danke" ? "selected" : ""} followup-btn"  on:click={() => selectOption()}>Nein danke</div>

{/if}
</div>

{/if}


<style lang="scss">
    .followup-btn {
        @apply bg-slate-200 rounded-md shadow-sm px-4 py-2 transition-all;
        &:active {
            @apply bg-slate-300
        }
    }

    .selected {
        @apply bg-nature-light
    }
</style>