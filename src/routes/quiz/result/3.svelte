<script>
  import OutA from "$lib/components/out-a.svelte";
  import { Chart, registerables } from "chart.js";
  import { onMount } from "svelte";
  const labels = [
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
  ].reverse();

  const values = [
    59.11, 53.85, 49.05, 45.16, 42.29, 40.68, 39.22, 37.9, 36.71, 34.08, 25.92,
    18.01, 10.57, 6.12, 4.17, 2.9, 2.06, 1.11, 0.44, 0.3, 0.18, 0.11, 0.07,
    0.05, 0.04, 0.03, 0.018, 0.012, 0.009, 0.006, 0.002, 0.002,
  ].reverse();

  const newInstalls = [
    5.26, 4.8, 3.89, 2.87, 1.61, 1.46, 1.32, 1.19, 2.63, 8.16, 7.91, 7.44, 4.45,
    1.95, 1.27, 0.84, 0.95, 0.67, 0.14, 0.12, 0.06, 0.04, 0.02, 0.01, 0.01,
    0.01, 0.006, 0.003, 0.003, 0.004, 0.0, 0.0,
  ].reverse();

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
        label: "Neu installiert [GW]",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: newInstalls,
      },

    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };

  let chartElement;
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
  Nach einer massiven Reduzierung der Einspeisevergütung brach die Anzahl neu installierter Photovoltaic-Anlagen 2013-2015 massiv ein. 
</div>
<div>
  <canvas bind:this={chartElement} id="solar-chart" />
</div>
</div>

<!-- <pre>
    Jahr	kumuliert	neu
    2021	59,11	5,26
    2020	53,85	4,8
    2019	49,05	3,89
    2018	45,16	2,87
    2017	42,29	1,61
    2016	40,68	1,46
    2015	39,22	1,32
    2014	37,9	1,19
    2013	36,71	2,63
    2012	34,08	8,16
    2011	25,92	7,91
    2010	18,01	7,44
    2009	10,57	4,45
    2008	6,12	1,95
    2007	4,17	1,27
    2006	2,9	0,84
    2005	2,06	0,95
    2004	1,11	0,67
    2003	0,44	0,14
    2002	0,3	0,12
    2001	0,18	0,06
    2000	0,11	0,04
    1999	0,07	0,02
    1998	0,05	0,01
    1997	0,04	0,01
    1996	0,03	0,01
    1995	0,018	0,006
    1994	0,012	0,003
    1993	0,009	0,003
    1992	0,006	0,004
    1991	0,002	0,0
    1990	0,002	0,0
</pre> -->

<OutA href="https://www.volker-quaschning.de/datserv/pv-deu/index.php"
  >volker-quaschning</OutA
>

<style lang="scss">
  @for $i from 1 through 100 {
    .percentage-#{$i} {
      $value: ($i * 1%);
      height: $value;
    }
  }

  @for $i from 0 through 5 {
    .chart :nth-child(#{$i + 1}) {
      animation-delay: 150ms * $i + 1s;
    }
  }
</style>
