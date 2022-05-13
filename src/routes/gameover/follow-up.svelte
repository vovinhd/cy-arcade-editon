<script>
import { goto } from "$app/navigation";
import Actions from "$lib/components/actions.svelte";

import QrCode from "$lib/components/qr-code.svelte";
import { appContext, emptyApplicationContext } from "$lib/context";

const makeFollowupLink = () => {
    const {selectedChallenge, selectedFollowupOption} = $appContext
    let followUpParams = {
        ch: selectedChallenge?.id,
        opt: selectedFollowupOption?.delay ?? 0
    }
    let encodedParams = btoa(JSON.stringify(followUpParams))
    console.log(followUpParams, encodedParams)
    
    return encodedParams;
}

const resetGame = () => {
    clearAppContext()
    goto("/")
}

const restartGame = () => {
    clearAppContext()
    goto("/challengeselect")

}

const clearAppContext = () => {
    appContext.set(emptyApplicationContext);
}
</script>
<div>

    <div class="heading">
        Danke für's spielen
    </div>

    <div class="text-center text-sm">
        {#if $appContext.selectedChallenge}
            Falls wir dich an deine Challenge erinnern dürfen scanne einfach diesen Code 
        {:else}
            Falls du dich für unseren Newsletter interesierst geht's hier lang 👇
        {/if}
    </div>


    <div class="grid place-content-center p-8">
        <QrCode codeValue={`https://climactivity.de/exhib-exit-survey/?challenge=${makeFollowupLink()}`}/>

    </div>


    <Actions>
        <button class="action-button" on:click={(_) => resetGame()}>Beenden</button>
        <button class="action-button" on:click={(_) => restartGame()}>neues Spiel</button>
    </Actions>

</div>

<style lang="scss">

</style>