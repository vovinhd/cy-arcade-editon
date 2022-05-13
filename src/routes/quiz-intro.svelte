<script>
    import { fly } from "svelte/transition";

    import { goto } from "$app/navigation";
    import Actions from "$lib/components/actions.svelte";
    let hasSelectedChallenge = false;

    const startSingle = () => {
        goto("/quiz/question/1");
    };
</script>


<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-4 grid grid-flow-row content max-w-3xl"
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: -200, duration: 500 }}
>


<div class="actions px-8">
    <Actions>
        <button
            class="action-button"
            disabled={hasSelectedChallenge}
            on:click={(_) => startSingle()}>Alleine Spielen</button
        >
        <button class="action-button" disabled={true}>Bereit</button>
    </Actions>
</div>

</div>