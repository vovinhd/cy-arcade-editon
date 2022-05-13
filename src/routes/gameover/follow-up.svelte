<script>
import { goto } from "$app/navigation";
import Actions from "$lib/components/actions.svelte";

import QrCode from "$lib/components/qr-code.svelte";
import { appContext } from "$lib/context";

const makeFollowupLink = () => {
    const {selectedChallenge, selectedFollowupOption} = $appContext
    let followUpParams = {
        ch: selectedChallenge?.id,
        opt: selectedFollowupOption?.delay ?? 0
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

    <div class="heading">
        title
    </div>

    <div class="text-center text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit molestias voluptates, magni delectus </div>


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