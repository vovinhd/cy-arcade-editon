<script lang="ts">
    import OutA from '$lib/components/out-a.svelte';
</script>

<div class="grid grid-flow-row gap-4">
    <div>
        Ca. 5 %. der historischen CO₂-Emissionen wurden von Deutschland
        verursacht
    </div>
    <div class="mx-auto">
        <img class="h-[350px] object-contain" src="/historic-emissions-diagram.png" />
    </div>
    <div class="text-sm">
        Die Ländergrößen zeigen die CO₂ Emissionen aus der Energienutzung 1850-2011. Diese historischen (auch "kumulativen") Emissionen bleiben relevant, weil CO₂ über Jahrhunderte in der Luft bleiben kann. Europa und die USA dominieren, da sie für etwa die Hälfte aller jemals ausgestoßenen CO₂ Emissionen verantwortlich sind.
    </div>
</div>

siehe
<OutA
    href="https://ourworldindata.org/grapher/cumulative-co-emissions?tab=chart&country=OWID_WRL~DEU"
    >carbonmap.org</OutA
>
