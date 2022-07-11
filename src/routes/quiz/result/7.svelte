<script lang="ts">
    import OutA from '$lib/components/out-a.svelte';
</script>

<div class="grid grid-flow-row gap-4">
    <div>
        <!-- <h2 class="font-bold ">
            Fußabdruck des Stromverbrauchs einer Person in einem
            durchschnittlichen deutschen Haushalt
        </h2> -->
        <p>
            Beim Wechsel zu Ökostrom reduziert sich dein Fußabdruck des
            Stromverbrauchs von 540 auf 40 kgCO₂eq Berücksichtigt ist hierbei
            auch die Vorkette, also der CO₂-Ausstoß, der bei der Gewinnung, dem
            Transport, der Produktion oder aufgrund von Verlusten entsteht.
        </p>
    </div>
    <div class="mx-auto">
        <img src="/oekostrom-diagram.png" />
    </div>
    <span class="text-storm-light text-sm">Angaben in kgCO₂eq</span>
</div>

siehe
<OutA href="https://uba.co2-rechner.de/de_DE/living-pt#panel-calc"
    >UBA CO2-Rechner</OutA
>
