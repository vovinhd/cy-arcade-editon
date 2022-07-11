<script lang="ts">
    import OutA from '$lib/components/out-a.svelte';

    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    let chartElement;

    /*

    Wohnen 	2,16 t
    Strom 	0,54 t
    Mobilität 	2,16 t
    Ernährung 	1,69 t
    Sonstiger Konsum 	3,39 t
    Öffentliche Emissionen 	0,84 t

    */
    const data = {
        labels: [
            'Wohnen',
            'Strom',
            'Mobilität',
            'Ernährung',
            'Öffentliche Emissionen',
            'Sonstiger Konsum',
        ],
        datasets: [
            {
                label: 'Emissionen nach Bereichen',
                data: [2.15, 0.54, 2.15, 1.69, 0.84, 3.39],
                backgroundColor: [
                    'rgb(174, 209, 79)',
                    'rgb(174, 209, 79)',
                    'rgb(174, 209, 79)',
                    'rgb(174, 209, 79)',
                    'rgb(174, 209, 79)',
                    'rgb(236, 58, 112)',
                ],
                hoverOffset: 4,
                borderColor: [
                    'rgb(149, 193, 30)',
                    'rgb(149, 193, 30)',
                    'rgb(149, 193, 30)',
                    'rgb(149, 193, 30)',
                    'rgb(149, 193, 30)',
                    'rgb(228, 0, 69)',
                ],
                borderWidth: [1, 1, 1, 1, 1, 3],
                inflateAmount: [0, 0, 0, 0, 0, 0],
            },
        ],
    };

    const config = {
        type: 'pie',
        data: data,
    };

    onMount(() => {
        Chart.register(...registerables);
        const myChart = new Chart(
            chartElement,
            // @ts-ignore
            config
        );
    });
</script>

<div class="grid grid-flow-row gap-4">
    <div>
        Von durchschnittlichen 10,78 Tonnen emittierten CO₂ entfallen 3,39
        Tonnen auf den sonstigen Konsum.
    </div>
    <div>
        <canvas
            class="md:min-h-[352px] md:max-w-[600px] mx-auto"
            bind:this={chartElement}
            id="solar-chart"
        />
    </div>
</div>

siehe <OutA href="https://uba.co2-rechner.de/de_DE/footprint#panel-calc"
    >UBA CO2-Rechner</OutA
>
