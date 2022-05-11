<!-- see https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1 -->
<script>
    import { onMount } from "svelte";

    export let codeValue;

    onMount(() => {
        let script = document.createElement("script");
        script.src =
            "/qrcode.min.js";
        document.head.append(script);

        script.onload = function () {
            // @ts-ignore
            qrcode = new QRCode("qrcode", {
                text: codeValue,
                width: 500,
                height: 500,
                colorDark: "#000000",
                colorLight: "#ffffff",
                // @ts-ignore
                correctLevel: QRCode.CorrectLevel.L,
            });
        };
    });
</script>

<div id="qrcode" />

<style>
    #qrcode {
        width: 500px;
        height: 500px;
        margin-top: 15px;
    }
</style>
