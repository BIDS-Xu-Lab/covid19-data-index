<script setup>
import { onMounted, ref, watch, provide } from "vue";

import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";

import 'echarts';
import VChart, { THEME_KEY } from 'vue-echarts';
provide(THEME_KEY, 'light');

const store = useDataStore();

const chart_data_type = ref(null);
const chart_bar_country = ref(null);

let option_data_type = {
    title: {
        text: 'Data Type Distribution',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'horizontal',
        left: 'center',
        top: 40
    },
    series: [
    {
        name: 'Data Type',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
    ]
};

let option_bar_country = {
    title: {
        text: 'Country Distribution',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        name: 'Country',
        type: 'category',
        data: [],
        axisLabel: {
            interval: 0,
        }
    },
    yAxis: {
        name: 'Count',
        type: 'value',
        max: 2000
    },
    series: [
    {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: '#efefef'
        },
        itemStyle: {
            color: '#fabc58'
        },
    }
    ]
};

function updateCharts() {
    // for data type
    option_data_type.series[0].data = store.stats.data_type.map(item => { return { "name": item.key, "value": item.doc_count} });
    chart_data_type.value?.setOption(option_data_type);

    // for country
    option_bar_country.xAxis.data = store.stats.country.map(item => item.key);
    option_bar_country.series[0].data = store.stats.country.map(item => item.doc_count);
    chart_bar_country.value?.setOption(option_bar_country);
}

watch(() => store.stats, async (newValue, oldValue) => {
    if (newValue !== null) {
        updateCharts();
    }
}, { immediate: true });

onMounted(async () => {
    if (store.stats) {
        updateCharts();
    }
});

</script>

<template>
<Header />

<div class="w-full flex justify-center">

<div class="flex flex-row" style="width: 88rem;">
    <div class="flex flex-col p-4 bg-white rounded-lg w-full gap-4">

        <div class="text-4xl font-bold text-center my-4">
            Statistics
        </div>

        <div v-if="!store.stats" class="text-center">
            Loading statistics ...
        </div>

        <div v-show="store.stats" class="flex flex-col w-full mb-4"
            style="margin: 0 auto;">
            <div style="width: 100%; height: 600px;">
                <v-chart 
                    ref="chart_data_type" 
                    :manual-update="true" 
                    autoresize />
            </div>
        </div>


        <div v-show="store.stats" class="flex flex-col w-full mb-4"
            style="margin: 0 auto;">
            <div style="width: 100%; height: 500px;">
                <v-chart 
                    ref="chart_bar_country" 
                    :manual-update="true" 
                    autoresize />
            </div>
        </div>


    </div>
</div>

</div>

</template>

<style scoped>
</style>
