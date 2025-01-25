<script setup>
import { onMounted, ref } from "vue";

import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";

const store = useDataStore();

</script>

<template>
<Header />

<div class="w-full flex justify-center">

<div class="flex flex-row" style="width: 88rem;">

    <div class="flex flex-col p-4 bg-white rounded-lg w-full gap-4">

        <div class="text-4xl font-bold text-center my-4">
            Data Source Submission
        </div>

        <div class="flex flex-col gap-4 w-2/3"
            style="margin: 0 auto;">
        <p>
            For data submission, please contact us at <a href="mailto:firat.tiryaki@uth.tmc.edu">firat.tiryaki@uth.tmc.edu</a>.
        </p>
    
        </div>
    </div>
</div>

</div>

</template>

<style scoped>
</style>
