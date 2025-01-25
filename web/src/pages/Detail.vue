<script setup>
import { onMounted, ref } from "vue";

import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";
import { useRoute, useRouter } from 'vue-router';
import markdownit from 'markdown-it';


const md = markdownit();
const router = useRouter();
const route = useRoute();

const store = useDataStore();
const dataset_id = route.params.id;

onMounted(() => {
    
});

</script>

<template>
<Header />

<div class="w-full flex justify-center">

<div class="flex flex-col" style="width: 88rem;">


<div v-if="store.datasets_dict[dataset_id]">
    
    <div class="text-4xl font-bold text-center my-4">
        {{ store.datasets_dict[dataset_id].title }}
    </div>

    <div class="flex flex-col p-4 bg-white rounded-lg">
        <table>
            <tr>
                <th>
                    Title: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].title }}
                </td>
            </tr>
            <tr>
                <th>
                    Description: 
                </th>
                <td v-html="md.render(store.datasets_dict[dataset_id].description)">
                </td>
            </tr>
            <tr>
                <th>
                    Identifier: 
                </th>
                <td>
                    {{ dataset_id }}
                </td>
            </tr>
            <tr>
                <th>
                    Authors: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].authors }}
                </td>
            </tr>
            <tr>
                <th>
                    Organization: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].organization }}
                </td>
            </tr>
            <tr>
                <th>
                    Country: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].country }}
                </td>
            </tr>
            <tr>
                <th>
                    Data Type: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].data_type }}
                </td>
            </tr>
            <tr>
                <th>
                    Source URL: 
                </th>
                <td>
                    <a target="_blank" :href="store.datasets_dict[dataset_id].source_url">
                        {{ store.datasets_dict[dataset_id].source_url }}
                    </a>
                </td>
            </tr>
            <tr>
                <th>
                    Data URLs: 
                </th>
                <td>
                    <p v-for="url in store.datasets_dict[dataset_id].data_urls">
                        <a target="_blank" :href="url">
                            {{ url }}
                        </a>
                    </p>
                </td>
            </tr>
            <tr>
                <th>
                    Date Created: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].date_created }}
                </td>
            </tr>
            <tr>
                <th>
                    Date Updated: 
                </th>
                <td>
                    {{ store.datasets_dict[dataset_id].date_updated }}
                </td>
            </tr>
        </table>
    </div>

</div>


</div>

</div>

</template>

<style scoped>
th {
    text-align: right;
    padding: 1rem;
    color: white;
    background-color: #0663c6;
    
    border-bottom: 1px solid #ccc;
}
td {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
}
</style>
