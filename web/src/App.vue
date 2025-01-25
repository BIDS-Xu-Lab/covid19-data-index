<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useDataStore } from './DataStore';

const store = useDataStore();

onMounted(() => {
});
</script>

<template>
<RouterView />
<Toast />
</template>