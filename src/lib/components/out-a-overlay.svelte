<script lang="ts">
import { outlinkState } from "$lib/context";
import { fade } from "svelte/transition";

import QrCode from "./qr-code.svelte";
let qrSize;

const close = () => {
    outlinkState.update(v => ({...v, show: false}))
}

</script>
{#if $outlinkState.show}
<div class="fixed inset-0 w-full h-full  bg-opacity-60 bg-black z-50" on:click|stopPropagation={(_) => close()} transition:fade>
    <div class="shadow-md rounded-md bg-zinc-50  grid p-8 md:inset-24 md:bg-opacity-100 bg-opacity-60 absolute max-w-xl mx-auto">
        <p class="heading">{@html $outlinkState.text}</p>
        <div>
            <div bind:clientWidth={qrSize} class="flex flex-col ">
                <QrCode size={qrSize} codeValue={$outlinkState.href}/>
            </div>
            <p class="text-sm py-2">{$outlinkState.href}</p> 
    
        </div>

    </div>
</div>
{/if}