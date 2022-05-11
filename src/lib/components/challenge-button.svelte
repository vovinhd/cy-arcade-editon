<script lang="ts">
    import { appContext } from "$lib/context";
    import type { ApplicationContext, Challenge } from "$lib/types";

    export let challenge: Challenge;

    let selected = false;

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
                    return { ...value, selectedChallenge: challenge };
                }
            });

    };
</script>

<div on:click={(e) => selectChallenge(e)} class:selected>
    <span>{challenge.text}</span>
    <slot name="explanation" />
</div>

<style lang="scss">
    .selected {
        @apply bg-slate-700;
    }
</style>
