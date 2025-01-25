<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useDataStore } from './DataStore';

const store = useDataStore();

onMounted(() => {
    store.init();
});
</script>

<template>
<RouterView />
<Toast />
</template>