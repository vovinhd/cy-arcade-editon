<script lang="ts">
import { compute_slots } from "svelte/internal";

import QrCode from "./qr-code.svelte";

import { fade } from "svelte/transition";
    export let href: string;
    let disableOutboundLinks = import.meta.env.VITE_DISABLE_OUTBOUND_LINKS;
    let showInfo = false
</script>

<a href={disableOutboundLinks ? '#': href} on:click|stopPropagation={(_) => showInfo = !showInfo && disableOutboundLinks}><slot/></a>
{#if showInfo}
<div class="relative">

<div class="absolute inset-0 w-full h-full bg-opacity-60 bg-black" on:click|stopPropagation={(_) => showInfo = false} transition:fade>
    <div class="shadow-md rounded-md bg-zinc-50  flex flex-col content-center align-middle p-8 inset-44 absolute">
        <p class="heading"><slot/></p>
        <div class="flex flex-col ">
            <QrCode codeValue={href}/>

        </div>
    </div>
</div>
</div>

{/if}