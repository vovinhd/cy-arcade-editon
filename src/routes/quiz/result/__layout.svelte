<script lang="ts">
    import { fly } from 'svelte/transition';

    let opponentReady  = true
    const nextQuestionOrResult = () => {

    }
</script>

<div class="bg-zinc-50 rounded-md shadow-lg hero inset-32" out:fly={{ x: -200, duration: 500 }}>
    <slot/>
    {#if opponentReady}
    <span>
        dein/e Mitspieler/in ist bereit
    </span>
    {/if}
    <button on:click={(e) => nextQuestionOrResult()}>Weiter</button>
</div>