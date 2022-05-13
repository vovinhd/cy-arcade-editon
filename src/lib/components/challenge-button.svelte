<script lang="ts">
    import { appContext } from "$lib/context";
    import type { ApplicationContext, Challenge } from "$lib/types";
    import { fade } from "svelte/transition";

    export let challenge: Challenge;

    let selected = false;
    let explanation: HTMLDivElement;
    appContext.subscribe((value: ApplicationContext) => {
        selected = challenge.id === value.selectedChallenge?.id;
    });

    const selectChallenge = (e: Event) => {
        appContext.update((value: ApplicationContext) => {
            let isAlreadySelected =
                challenge.id === value.selectedChallenge?.id;
            if (isAlreadySelected) {
                return { ...value, selectedChallenge: null };
            } else {
                return {
                    ...value,
                    selectedChallenge: {
                        ...challenge,
                        explanation: explanation.innerHTML,
                    },
                };
            }
        });
    };
</script>

<div
    on:click={(e) => selectChallenge(e)}
    class="{selected
        ? ' bg-nature text-white p-8 shadow-lg'
        : 'bg-white text-zinc-800 m-6 p-2 shadow-sm'} 
        block rounded-md transition-all duration-200 active:translate-y-1 "
>
    <div class="{selected
        ? '  '
        : ' '}font-semibold py-2  ">{challenge.text}</div>
    <div
        class="{selected
            ? 'bg-white  '
            : ' '}
            transition-all duration-500 text-zinc-800 py-4 rounded-md -ml-2 pl-2"
    >
        <div
            class="
                transition-all duration-500"
            bind:this={explanation}
        >
            <slot name="explanation" />
        </div>
    </div>
</div>

<style lang="scss">
</style>
