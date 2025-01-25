<script setup>
import { onMounted, ref } from "vue";
import * as toolbox from "../toolbox";

import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";

const store = useDataStore();

</script>

<template>
<Header />


<div class="w-full flex justify-center">

<div class="flex flex-row" style="width: 88rem;">

    <div class="flex flex-col gap-5 mr-5" style="width: 20rem;">

        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="font-bold">
                <font-awesome-icon :icon="['fas', 'chart-column']" />
                Data Type
            </div>

            <div class="border-l-4 font-bold border-blue-500 pl-2 bg-blue-100 my-2 text-blue-800">
                All Types
            </div>

            <div v-if="store.stats"
                class="flex flex-col">
                <div v-for="item in store.stats.data_type"
                    class="flex flex-row justify-between">
                    <div>
                        {{ item.key }}
                    </div>
                    <div>
                        {{ toolbox.addComma(item.doc_count) }}
                    </div>
                </div>
            </div>
            <div v-else>
                Loading ...
            </div>
        </div>


        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="font-bold">
                <font-awesome-icon :icon="['fas', 'earth-americas']" />
                Country
            </div>

            <div class="border-l-4 font-bold border-blue-500 pl-2 bg-blue-100 my-2 text-blue-800">
                All Countries
            </div>

            <div v-if="store.stats"
                class="flex flex-col">
                <div v-for="item in store.stats.country"
                    class="flex flex-row justify-between">
                    <div>
                        {{ item.key }}
                    </div>
                    <div>
                        {{ toolbox.addComma(item.doc_count) }}
                    </div>
                </div>
            </div>
            <div v-else>
                Loading ...
            </div>
        </div>



        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="font-bold mb-4">
                <font-awesome-icon :icon="['fas', 'earth-americas']" />
                Word Cloud
            </div>

            <div class="flex flex-col">
                <img src="/img/word-cloud.png" alt="">
            </div>
        </div>


    </div>


    <div class="flex flex-col gap-5" style="width: calc(100% - 20rem)">


        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="flex justify-between mb-4">
                <div class="font-bold">
                    <font-awesome-icon :icon="['fas', 'cubes-stacked']" />
                    Overview
                </div>

                <div class="flex flex-row justify-between">

                </div>
            </div>

            <div class="flex flex-row gap-2 px-2">
                <div v-for="idx in [1,2,3]"
                    class="w-1/3 p-4 border-2 rounded-sm shadow-lg">
                    <img :src="'/img/o' + idx + '.png'" alt="">
                </div>
            </div>
        </div>



        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="flex justify-between mb-4">
                <div class="font-bold">
                    <font-awesome-icon :icon="['fas', 'cubes-stacked']" />
                    Popular Datasets
                </div>

                <div class="text-gray-500">
                    <span class="text-red-900">
                        6,017 
                    </span>
                    Datasets in Total
                </div>

            </div>

            <div v-if="store.datasets.length > 0"
                class="flex flex-col gap-4">
                <template v-for="id in store.popular_dataset_ids">
                    <div v-if="store.datasets_dict[id]"
                        class="flex flex-row justify-between pop-dataset gap-2">

                        <div class="mr-2" style="width: 180px;">
                            <img :src="'/img/thumb-' + id + '.png'" 
                                style="height: 100px; width: 100%;"
                                alt="" />
                        </div>

                        <div class="flex flex-col" style="width: calc(100% - 200px);">
                            <div class="title cursor-pointer"
                                @click="store.gotoDatasetPage(id)">
                                {{ store.datasets_dict[id].title }}
                            </div>
                            <div class="description">
                                {{ store.datasets_dict[id].description }}
                            </div>
                            <div>
                                Date : 2020-02-15
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else
                class="flex flex-col gap-4">
                Loading datasets ...
            </div>
        </div>

    </div>

</div>
</div>

</template>

<style scoped>
.pop-dataset {
    border: 1px solid #ccc;
    width: 100%;
    height: 11rem;
    padding: 1rem;
    box-shadow: 0 2px 4px 0 #c7c7c7;
}
.title {
    color: #8bab42;
    font-weight: bold;
}
.description {
    line-height: 1.2rem;
    margin-bottom: 0.5rem;
    height: 4.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
