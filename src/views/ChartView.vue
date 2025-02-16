<template>
    <div class="chart">
      <h1>This is an Chart page</h1>
      <highcharts :options="pieChart"></highcharts>
    </div>
  </template>
  <script lang="ts" setup>
    import { key } from '@/store';
    import { useStore } from 'vuex';
    const store = useStore(key);

    let pieChart : pieChart;
    let pieData : pieData[];
    let counts = store.state.Cards.reduce((accumulator:accumulator, currentIssue) => {

    const statusName = currentIssue.typeName ?? '';

    if (!Object.prototype.hasOwnProperty.call(accumulator, statusName)) {
      accumulator[statusName!] = 0;
    }

    accumulator[statusName!]++;
    return accumulator;
    }, {});

    const colorPick = (type:string): string  =>{
      switch (type) {
        case "Todo":
          return "#f4f4f4";
        case "Doing":
          return "#bbffe0";
          case "Pending":
          return "#fddeea";
          case "Done":
          return "#9cd6ff";
        default:
          return "#ffffff";
      }
    }


    pieData = Object.keys(counts).map(key => ({
        name: key,
        y: counts[key],
        color: colorPick(key) 
    }));  



    pieChart = {
    chart: { type: 'pie'},
            title: { text: '' },
            series: [
            {
                name: '',
                colorByPoint: true,
                data: pieData
            }
        ]
    };

</script>