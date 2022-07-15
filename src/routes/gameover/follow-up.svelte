<script>
    import { goto } from '$app/navigation';
    import Actions from '$lib/components/actions.svelte';

    import QrCode from '$lib/components/qr-code.svelte';
    import { appContext, emptyApplicationContext } from '$lib/context';
    import { onMount } from 'svelte';

    const makeFollowupLink = () => {
        const { selectedChallenge, selectedFollowupOption } = $appContext;
        let followUpParams = {
            ch: selectedChallenge?.id,
            opt: selectedFollowupOption?.delay ?? 0,
        };
        let encodedParams = btoa(JSON.stringify(followUpParams));
        console.log(followUpParams, encodedParams);

        return `https://climactivity.de/exhib-exit-survey/?challenge=${encodedParams}`;
    };

    const resetGame = async () => {
        clearAppContext();
        await goto('/');
        location.reload(true);
    };

    const restartGame = () => {
        clearAppContext();
        goto('/challengeselect');
    };

    const clearAppContext = () => {
        appContext.set(emptyApplicationContext);
        appContext.set({ ...$appContext, quizStart: '5' });
    };

    let followupLink;
    onMount(() => (followupLink = makeFollowupLink()));
</script>

<div
    class="grid grid-flow-row h-full"
    style="grid-template-rows: 8rem, 1fr, auto;"
>
    <div class="heading">Danke, dass du mitgespielt hast!</div>

    <div>
        <div class="text-center text-md">
            {#if $appContext.selectedChallenge && $appContext.selectedFollowupOption && $appContext.selectedFollowupOption.delay}
                Manchmal gehen gute Vorsätze im Alltag unter. Wir erinnern dich
                gern noch mal an deine Challenge. Scanne einfach diesen Code:
            {:else}
                Falls du dich für unseren Newsletter interesierst geht's hier
                lang 👇
            {/if}
        </div>

        <div class="grid place-content-center p-8">
            <QrCode codeValue={followupLink} />
            <a
                class="text-sm"
                target="_blank"
                rel="noopener noreferrer"
                href={followupLink}>{followupLink}</a
            >
        </div>
    </div>
    {#if $appContext.quizStart === '1'}
        <div class="text-center text-md">
            <span class="text-nature-dark">Tipp:</span> bei einer zweiten Runde gibt
            es neue Fragen 😉
        </div>

        <Actions>
            <button class="action-button" on:click={(_) => resetGame()}
                >Beenden</button
            >
            <button
                class="action-button bg-heart text-white"
                on:click={(_) => restartGame()}>neues Spiel</button
            >
        </Actions>
    {:else}
        <Actions>
            <button class="action-button" on:click={(_) => resetGame()}
                >Beenden</button
            >
        </Actions>
    {/if}
</div>

<style lang="scss">
</style>
