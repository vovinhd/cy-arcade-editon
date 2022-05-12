<script lang="ts">
import { outlinkState } from "$lib/context";
import { fade } from "svelte/transition";

import QrCode from "./qr-code.svelte";


const close = () => {
    outlinkState.update(v => ({...v, show: false}))
}

</script>
{#if $outlinkState.show}
<div class="fixed inset-0 w-full h-full bg-opacity-60 bg-black z-50" on:click|stopPropagation={(_) => close()} transition:fade>
    <div class="shadow-md rounded-md bg-zinc-50  grid p-8 inset-24 absolute">
        <p class="heading">{@html $outlinkState.text}</p>
        <div class="flex flex-col ">
            <QrCode codeValue={$outlinkState.href}/>
        </div>
    </div>
</div>
{/if}