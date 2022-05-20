<!-- see https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1 -->
<script>
    import { onMount } from "svelte";

    export let codeValue;
    export let size = 300;
    onMount(() => {
        let script = document.createElement("script");
        script.src =
            "/qrcode.min.js";
        document.head.append(script);

        script.onload = function () {
            // @ts-ignore
            qrcode = new QRCode("qrcode", {
                text: codeValue,
                width: size,
                height: size,
                colorDark: "#000000",
                colorLight: "#ffffff",
                // @ts-ignore
                correctLevel: QRCode.CorrectLevel.L,
            });
        };
    });
</script>


<div id="qrcode" style="width: {size}px; height: {size}px; margin: auto"/>



<style>
    #qrcode {
        /* width: 500px;
        height: 500px; */
        margin-top: 15px;
    }
</style>
