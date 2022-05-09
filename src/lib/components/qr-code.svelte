<!-- see https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1 -->
<script>
    import { onMount } from "svelte";

    export let codeValue;
    export let squareSize;

    let qrcode;

    onMount(() => {
        let script = document.createElement("script");
        script.src =
            "qrcode.min.js";
        document.head.append(script);

        script.onload = function () {
            qrcode = new QRCode("qrcode", {
                text: `https://climactivity.de/exhib-exit-survey/?challenges=${codeValue}`,
                width: squareSize,
                height: squareSize,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
            });
        };
    });
</script>

<div id="qrcode" />

<style>
    #qrcode {
        width: 200px;
        height: 200x;
        margin-top: 15px;
    }
</style>
