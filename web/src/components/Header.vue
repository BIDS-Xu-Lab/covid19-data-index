<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../DataStore";
const router = useRouter();
const store = useDataStore();

const onSubmitSearch = (e) => {
    console.log('* search for', store.keyword);
    store.page = 0;
    store.search()
    
    router.push({
        path: '/search',
        query: {
            keyword: store.keyword,
        }
    })
}
</script>
<template>

<div class="w-full flex justify-center pt-5 text-white mb-5"
    style="height: 180px; background: url('/img/header_bg.png') no-repeat; background-size: cover; ">
    <div class="relative" style="width: 88rem;">
        <div class="relative flex flex-row items-center justify-between"
            style="top: 0; left: 50%; transform: translateX(-50%); width: 100%;">
            <div class="flex flex-row items-center">
                <div class="navi-item"
                    :class="{ 'navi-item-active': store.current_page == '' }"
                    @click="store.gotoPage('')">
                    Home
                </div>
                <div class="navi-item"
                    :class="{ 'navi-item-active': store.current_page == 'about' }"
                    @click="store.gotoPage('about')">
                    About
                </div>
                <div class="navi-item"
                    :class="{ 'navi-item-active': store.current_page == 'submit' }"
                    @click="store.gotoPage('submit')">
                    Submit
                </div>
                <div class="navi-item"
                    :class="{ 'navi-item-active': store.current_page == 'statistics' }"
                    @click="store.gotoPage('statistics')">
                    Statistics
                </div>
            </div>

            <div>
                <div class="navi-item"
                    :class="{ 'navi-item-active': store.current_page == 'feedback' }"
                    @click="store.gotoPage('feedback')">
                    Feedback
                </div>
            </div>
        </div>
        
        <div class="absolute"
            style="top: 0; left: 50%; transform: translateX(-50%); text-align: center;">
            <div class="text-4xl font-bold" style="font-family: Impact, sans-serif;">
                COVID-19 DATA INDEX
            </div>
            <div class="text-xl" style="font-family: Impact, sans-serif;">
                SEARCH FOR COVID-19 DATASETS
            </div>
        </div>

        <div class="flex flex-row items-center mt-10">
            <img src="/img/icon_white.png" 
                class="mr-6"
                style="width: 40px;">

            <input type="text" 
                v-model="store.keyword"
                class="bg-white text-black"
                placeholder="Search for datasets"
                @keyup.enter="onSubmitSearch"
                style="width: calc(100% - 7rem); border-radius: 2rem; padding: 0.5rem 1rem; font-size: 1.5rem; text-align: center;">
            
            <span class="text-black"
                @click="onSubmitSearch"
                style="margin-left: -5rem; cursor: pointer;">
                Search
            </span>
        </div>
    </div>

</div>
</template>

<style scoped>
.navi-item {
    padding: 1rem 1.5rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
}
.navi-item:hover {
    cursor: pointer;
    background-color: white;
    color: black;
}
.navi-item-active {
    border-bottom: 2px solid white;
}
</style>
