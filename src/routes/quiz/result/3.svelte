<script lang="ts">
  import OutA from '$lib/components/out-a.svelte'
  import { Chart, registerables } from 'chart.js'
  import { onMount } from 'svelte'
  const labels = [
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
    '1996',
    '1995',
    '1994',
    '1993',
    '1992',
    '1991',
    '1990',
  ].reverse()

  const values = [
    59.11,
    53.85,
    49.05,
    45.16,
    42.29,
    40.68,
    39.22,
    37.9,
    36.71,
    34.08,
    25.92,
    18.01,
    10.57,
    6.12,
    4.17,
    2.9,
    2.06,
    1.11,
    0.44,
    0.3,
    0.18,
    0.11,
    0.07,
    0.05,
    0.04,
    0.03,
    0.018,
    0.012,
    0.009,
    0.006,
    0.002,
    0.002,
  ].reverse()

  const newInstalls = [
    5.26,
    4.8,
    3.89,
    2.87,
    1.61,
    1.46,
    1.32,
    1.19,
    2.63,
    8.16,
    7.91,
    7.44,
    4.45,
    1.95,
    1.27,
    0.84,
    0.95,
    0.67,
    0.14,
    0.12,
    0.06,
    0.04,
    0.02,
    0.01,
    0.01,
    0.01,
    0.006,
    0.003,
    0.003,
    0.004,
    0.0,
    0.0,
  ].reverse()

  const data = {
    labels: labels,
    datasets: [
      // {
      //   label: "kumuliert [GW]",
      //   backgroundColor: "rgb(99, 99, 255)",
      //   borderColor: "rgb(99, 99, 255)",
      //   data: values,
      // },
      {
        label: 'Neu installiert [GW]',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
        data: newInstalls,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 1,
      },
    ],
  }

  const totalDuration = 700
  const delayBetweenPoints = totalDuration / newInstalls.length
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(['y'], true).y

  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0
        }
        ctx.xStarted = true
        return ctx.index * delayBetweenPoints
      },
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0
        }
        ctx.yStarted = true
        return ctx.index * delayBetweenPoints
      },
    },
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      animation,
      plugins: {
        legend: true,
      },
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return value + ' GW'
            },
          },
        },
      },
    },
  }

  let chartElement
  onMount(() => {
    Chart.register(...registerables)
    const myChart = new Chart(
      chartElement,
      // @ts-ignore
      config,
    )
  })
</script>

<style lang="scss">
  @for $i from 0 through 5 {
    .chart :nth-child(#{$i + 1}) {
      animation-delay: 150ms * $i + 1s;
    }
  }
</style>

<div class="grid grid-flow-row gap-4">
  <div>
    Nach einer massiven Reduzierung der Einspeisevergütung brach die Anzahl neu
    installierter Photovoltaik-Anlagen 2013-2015 massiv ein.
  </div>
  <div>
    <canvas
      class="md:min-h-[352px] md:max-w-[600px] mx-auto"
      bind:this={chartElement}
      id="solar-chart" />
  </div>
</div>

<OutA href="https://www.volker-quaschning.de/datserv/pv-deu/index.php">
  volker-quaschning
</OutA>
