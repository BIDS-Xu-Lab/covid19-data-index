<script setup>
import { onMounted, ref, watch } from "vue";
import * as toolbox from "../toolbox";
import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";
import { Checkbox } from "primevue";
import { useRouter } from "vue-router";
import markdownit from 'markdown-it';
const router = useRouter();
const md = markdownit();

const store = useDataStore();

function onChangePage(page) {
    console.log("onChangePage", page);
    store.page = page.page + 1;
    store.search();
}

function onChangeFilter(e) {
    store.search();
}

onMounted(() => {
});

watch(
    () => store.search_engine,
    (newValue, oldValue) => {
        if (newValue != oldValue) {
            store.page = 0;
            store.search();
        }
    }
);

</script>

<template>
<Header />

<div class="w-full flex justify-center">

<div class="flex flex-row" style="width: 88rem;">

    <div class="flex flex-col gap-5 mr-5" style="width: 20rem;">

        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="flex flex-row justify-between mb-4">
                <div class="font-bold">
                    <font-awesome-icon :icon="['fas', 'chart-column']" />
                    Data Type
                </div>

                <div>
                    <span class="cursor-pointer border px-3 py-1 rounded-lg bg-red-100 hover:bg-red-300" 
                        @click="store.resetFilter('data_type')">
                        clear
                    </span>
                </div>
            </div>


            <div class="flex flex-col min-h-10">
                <div v-for="item in store.search_results?.data?.aggregations.data_type.buckets"
                    class="flex flex-row justify-between">
                    <div class="flex items-center gap-2">
                        <Checkbox 
                            v-model="store.filters.data_type"
                            @value-change="onChangeFilter"
                            :value="item.key" />
                        {{ item.key }}
                    </div>
                    <div>
                        {{ toolbox.addComma(item.doc_count) }}
                    </div>
                </div>
            </div>
        </div>


        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="flex flex-row justify-between mb-4">
                <div class="font-bold">
                    <font-awesome-icon :icon="['fas', 'earth-americas']" />
                    Country
                </div>

                <div>
                    <span class="cursor-pointer border px-3 py-1 rounded-lg bg-red-100 hover:bg-red-300" 
                        @click="store.resetFilter('country')">
                        clear
                    </span>
                </div>
            </div>


            <div class="flex flex-col min-h-10">
                <div v-for="item in store.search_results?.data?.aggregations.country.buckets"
                    class="flex flex-row justify-between">
                    <div class="flex items-center gap-2">
                        <Checkbox 
                            v-model="store.filters.country"
                            @value-change="onChangeFilter"
                            :value="item.key" />
                        {{ item.key }}
                    </div>
                    <div>
                        {{ toolbox.addComma(item.doc_count) }}
                    </div>
                </div>
            </div>
        </div>


    </div>



    <div class="flex flex-col gap-5" style="width: calc(100% - 20rem)">


        <div class="flex flex-col p-4 bg-white rounded-lg">
            <div class="flex justify-between">
                <div class="font-bold text-blue-600">
                    <span v-if="store.search_results?.pagination">
                        {{ toolbox.addComma(store.search_results.pagination.total) }} record(s) found 
                        <span v-if="store.keyword">
                            for "<span class="italic">{{ store.keyword }}</span>"
                        </span>

                        in {{ store.search_results.timings.total }} ms
                    </span>
                    <span v-else-if="store.search_engine == null">
                        Loading datasets ...
                    </span>
                    <span v-else>
                        Search any keyword
                    </span>
                </div>

                <div class="flex flex-row justify-end gap-2">
                    <Tag v-for="filter in store.selected_filters"
                        class="flex flex-row items-center"
                        :class="'tag-' + filter.facet"
                        v-tooltip.bottom="filter.facet + ': ' + filter.name"
                        severity="secondary">
                        <span class="mr-1">
                            {{ filter.name }}
                        </span>
                        <span @click="store.removeFilter(filter)">
                            <font-awesome-icon icon="fa-solid fa-xmark" 
                                class="cursor-pointer" />
                        </span>
                    </Tag>
                </div>
            </div>
        </div>

        <div class="flex flex-col p-4 bg-white rounded-lg">

            <Paginator v-if="store.search_results?.pagination"
                :rows="store.per_page" 
                :first="1"
                @page="onChangePage"
                :totalRecords="store.search_results?.pagination?.total">
            </Paginator>

            <div class="flex flex-col gap-4">
                <div v-for="item in store.search_results?.data?.items"
                    class="flex flex-col py-2 border-b border-gray-500">
                    <div class="flex flex-row justify-between">
                        <div class="font-bold cursor-pointer" 
                            @click="store.gotoDatasetPage(item.id)">
                            {{ item.title }}
                        </div>
                        <div class="w-48 text-right">
                            <Button severity="info" 
                                size="small"
                                @click="store.gotoDatasetPage(item.id)"
                                label="Details" />
                        </div>
                    </div>
                    <div class="text-sm description"
                        v-html="md.render(item.description)">
                    </div>

                </div>
            </div>

            <Paginator :rows="store.per_page" 
                @page="onChangePage"
                :totalRecords="store.search_results?.pagination?.total">
            </Paginator>
        </div>
    </div>



</div>

</div>

</template>

<style scoped>
.description {
    max-height: 6rem;

    /* wrap text */
    text-wrap: break-word;
    overflow: hidden;
}

.tag-data_type {
    background-color: #85d3ef;
}
.tag-country {
    background-color: #f9ee93;
}
</style>
