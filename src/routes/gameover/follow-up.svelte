<script>
import { goto } from "$app/navigation";
import Actions from "$lib/components/actions.svelte";

import QrCode from "$lib/components/qr-code.svelte";
import { appContext } from "$lib/context";

const makeFollowupLink = () => {
    const {selectedChallenge, selectedFollowupOption} = $appContext
    let followUpParams = {
        ch: selectedChallenge?.id,
        opt: selectedFollowupOption
    }
    let encodedParams = encodeURIComponent(JSON.stringify(followUpParams))
    console.log(followUpParams, encodedParams)

    return encodedParams;
}

const resetGame = () => {
    goto("/")
}

const restartGame = () => {
    goto("/challengeselect")

}
</script>
<div>


    <QrCode codeValue={`https://climactivity.de/exhib-exit-survey/?challenges=${makeFollowupLink()}`}/>


    <Actions>
        <button class="action-button" on:click={(_) => resetGame()}>Beenden</button>
        <button class="action-button" on:click={(_) => restartGame()}>neues Spiel</button>
    </Actions>

</div>

<style lang="scss">

</style>