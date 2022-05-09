<script>
import QrCode from "$lib/components/qr-code.svelte";
import { StatusBar } from '@capacitor/status-bar';
import { onMount } from "svelte";
const hideStatusBar = async () => {
  await StatusBar.hide();
};

onMount(() => {
    hideStatusBar().catch((e) => console.log("not hiding status bar on web"))
})
</script>

<div class="bg-zinc-50 rounded-md shadow-lg w-96">
    <h1 class="text-center p-8 text-2xl">Attract Screen</h1>

    <p class="   px-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, nemo, aut consequuntur saepe accusantium molestias obcaecati doloremque veniam fugit odit in ratione quae itaque dolorem possimus a reiciendis earum ducimus.
    </p>

    <div class="flex felx-col place-content-center py-8">
        <QrCode codeValue="o" squareSize=800/>
    </div>

</div>



