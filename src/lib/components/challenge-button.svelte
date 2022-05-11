<script lang="ts">
    import { appContext } from "$lib/context";
    import type { ApplicationContext, Challenge } from "$lib/types";
    import { fade } from "svelte/transition";

    export let challenge: Challenge;

    let selected = false;
let explanation : HTMLDivElement
    appContext.subscribe(
        (value: ApplicationContext) => {
            selected = challenge.id === value.selectedChallenge?.id
        }
    );

    const selectChallenge = (e: Event) => {
        appContext.update((value: ApplicationContext) => {
                let isAlreadySelected = challenge.id === value.selectedChallenge?.id
                if(isAlreadySelected) {
                    return { ...value, selectedChallenge: null };

                } else {
                    return { ...value, selectedChallenge: {...challenge, explanation: explanation.innerHTML} };
                }
            });

    };
</script>

<div on:click={(e) => selectChallenge(e)} class:selected class="block rounded-md shadow-lg bg-white p-8">
    <span>{challenge.text}</span>
    <div class="{selected ? "scale-y-100" : "hidden scale-y-0"} transition-all" bind:this={explanation}><slot name="explanation" /></div>
</div>

<style lang="scss">
    .selected {
        @apply bg-zinc-200;
    }

</style>
