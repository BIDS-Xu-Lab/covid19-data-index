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
</div>

</div>

</template>

<style scoped>
</style>
