<script lang="ts">
import { appContext } from "$lib/context";

import type { Answer } from "$lib/types";

    export let answer: Answer; 
    export let callback
    let selected = false

    appContext.subscribe(v => selected = v.currentSelectedAnswer === answer)
</script>
<button class:selected={selected} {...$$props} on:click={(e) => callback(answer)}>{answer.answerText}</button>

<style lang="scss">
    .selected {
        @apply bg-nature text-white
    }

    button {
        transition: all;
        transition-duration: 30ms;
        &:active {
            transform: translateY(3%);
            @apply shadow-none
        }

    }

</style>