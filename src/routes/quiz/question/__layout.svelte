<script lang="ts">
    import { fly } from "svelte/transition";
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero md:inset-4 inset-0"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
>
    <slot />
</div>
