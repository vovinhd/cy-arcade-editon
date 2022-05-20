<script lang="ts">

import QrCode from "./qr-code.svelte";

import { fade } from "svelte/transition";
import { outlinkState } from "$lib/context";
export let href: string
const disableOutboundLinks = import.meta.env.VITE_DISABLE_OUTBOUND_LINKS;
let data: HTMLAnchorElement
const show = () => {
    const show = !$outlinkState.show && disableOutboundLinks;
    outlinkState.set({
        show, href, text: data?.innerHTML
    })
}

</script>

<a class="underline"href={disableOutboundLinks ? '#': href} target={disableOutboundLinks ? '': "_blank"} rel="noopener noreferrer" on:click|stopPropagation={(_) => show()} bind:this={data}><slot/></a>
