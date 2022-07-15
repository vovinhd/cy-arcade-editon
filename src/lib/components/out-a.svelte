<script lang="ts">
    import QrCode from './qr-code.svelte';

    import { fade } from 'svelte/transition';
    import { outlinkState } from '$lib/context';
    import { Capacitor } from '@capacitor/core';
    import { page } from '$app/stores';
    export let href: string;
    const disableOutboundLinks = import.meta.env.VITE_DISABLE_OUTBOUND_LINKS;
    let data: HTMLAnchorElement;
    const show = () => {
        const show = !$outlinkState.show && disableOutboundLinks;
        outlinkState.set({
            show,
            href,
            text: data?.innerHTML,
        });
    };
</script>

{#if $page.routeId === 'challengeselect'}
    <slot />
{:else}
    <a
        class="underline"
        href={disableOutboundLinks || Capacitor.getPlatform() === 'ios'
            ? '#'
            : href}
        target={disableOutboundLinks ? '' : '_blank'}
        rel="noopener noreferrer"
        on:click|stopPropagation={(_) => show()}
        bind:this={data}><slot /></a
    >
{/if}
