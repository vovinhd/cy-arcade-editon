<script>
import { browser } from "$app/env";
import { fly } from 'svelte/transition';


import QrCode from "$lib/components/qr-code.svelte";
import { StatusBar } from '@capacitor/status-bar';
import { onMount } from "svelte";
const hideStatusBar = async () => {
  await StatusBar.hide();
};

onMount(() => {
    hideStatusBar().catch((e) => console.log("not hiding status bar on web")); 
})

</script>

<div class="bg-zinc-50 rounded-md shadow-lg hero inset-16 grid grid-flow-row" style="grid-template-rows: 1fr 1fr;" out:fly={{ x: -200, duration: 500 }}>
    <!-- <h1 class="text-center p-8 text-2xl">Attract Screen</h1> -->

    <div>

    <div class="">
        <img src="/kiko-slogan.webp" alt="logo" />
    </div>

    <p class="   px-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, nemo, aut consequuntur saepe accusantium molestias obcaecati doloremque veniam fugit odit in ratione quae itaque dolorem possimus a reiciendis earum ducimus.
    </p>
    </div>

    <!-- <div class="flex felx-col place-content-center py-8">
        <QrCode codeValue="o" squareSize=800/>
    </div> -->

    <div class="grid place-content-center  py-8 mb-16 relative">
        <!-- <a class=" absolute right-1/2 translate-x-1/2 action-button w-60 text-center bg-heart text-white shadow-2xl animate-ping" href="/challengeselect"> Let's a go </a> -->
       <div class="relative">
           <div class="z-1 animate-blob opacity-60 absolute mix-blend-multiply filter blur-2xl -top-24 -left-36 w-56 h-56 bg-heart-light rounded-full"/>
           <div class="z-1 animate-blob  opacity-60 absolute mix-blend-multiply filter blur-2xl -top-24 left-36 w-56 h-56 bg-yellow-300 rounded-full"/>
           <div class="z-1 animate-blob animation-delay-2000 opacity-60 absolute mix-blend-multiply filter blur-2xl -top-32 left-16 w-56 h-56 bg-indigo-300 rounded-full"/>
           <div class="z-1 animate-blob animation-delay-4000 opacity-60 absolute mix-blend-multiply filter blur-2xl -top-16 -left-16 w-56 h-56 bg-green-300 rounded-full"/>
           <a class="relative z-10 action-button max-w-full text-center ring-heart-dark ring-2 ring-offset-2 bg-heart text-white text-2xl shadow-2xl" href="/challengeselect"> Los geht's </a>  

       </div>
    </div>

</div>



