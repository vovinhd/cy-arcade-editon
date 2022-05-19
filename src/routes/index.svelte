<script>
import { browser } from "$app/env";
import { fly } from 'svelte/transition';


import QrCode from "$lib/components/qr-code.svelte";
import { StatusBar } from '@capacitor/status-bar';
import { onMount } from "svelte";
import BlobAnim from "$lib/components/blob-anim.svelte";
const hideStatusBar = async () => {
  await StatusBar.hide();
};

onMount(() => {
    //hideStatusBar().catch((e) => console.log("not hiding status bar on web")); 
})

</script>


<svelte:head>
    <meta name="description" content="Interaktives Exponant von Climactivity für die Dokumenta in Kassel"/>
</svelte:head>


<div class="bg-zinc-50 rounded-md shadow-lg hero md:inset-16 inset-0 inset-y-16 grid grid-flow-row " style="grid-template-rows: 1fr 1fr;" out:fly={{ x: -200, duration: 500 }}>
    <!-- <h1 class="text-center p-8 text-2xl">Attract Screen</h1> -->

    <div>

    <div class="">
        <img src="/kiko-slogan.webp" alt="logo" width="100%" max-height="400"/>
    </div>

    <p class="  md:text-lg md:px-16 px-8 py-8">
        Wir entwickeln eine neue App, die dir beim Klimaschutz hilft. Sie ist noch nicht so weit, aber hier kannst Du sie ausprobieren.
    </p>
    </div>

    <!-- <div class="flex felx-col place-content-center py-8">
        <QrCode codeValue="o" squareSize=800/>
    </div> -->

    <div class="grid place-content-center  py-8 mb-16 relative">
        <!-- <a class=" absolute right-1/2 translate-x-1/2 action-button w-60 text-center bg-heart text-white shadow-2xl animate-ping" href="/challengeselect"> Let's a go </a> -->
       <div class="relative ">
    <BlobAnim/>

        <a sveltekit:prefetch class="relative z-10 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl" href="/challengeselect"> Los geht's </a>  

       </div>
    </div>

</div>



