<script lang="ts">
    import { goto } from "$app/navigation";

    import { init, nkReady, socket } from "$lib/client";
import ChallengeButton from "$lib/components/challenge-button.svelte";
import OutA from "$lib/components/out-a.svelte";
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";
    onMount( async () => {
        let session = init().then( (session) => {
            console.log(session);
            if (!session) goto("/");

        }).catch(e => console.error(e)) 
    });
</script>

<div
    class="bg-zinc-50 rounded-md shadow-lg hero inset-4"
    in:fly={{ x: 200, duration: 500 }}
>
    <h1 class="heading">Challenge Select screen</h1>

    <ChallengeButton challenge={{
        id: "oekostrom",
        text: "Zu zertifizertem Ökostrom wechseln",
        options: [
            "Ich wechsel in 2 Wochen",
            "Ich wechsel in 4 Wochen",
            "Ich wechsel in 2 Monaten",
        ]
    }}>
    <div slot="explanation">
        Ich wechsle zu einem Stromanbieter mit Label aus der <OutA href="https://utopia.de/bestenlisten/die-besten-oekostrom-anbieter/">Utopia-Bestenliste</OutA>
    </div>
    </ChallengeButton>
</div>
