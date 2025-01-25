<script setup>
import { onMounted, ref } from "vue";

import { useDataStore } from "../DataStore";
import Header from "../components/Header.vue";

const store = useDataStore();
const feedback = ref({
    subject: "",
    body: "",
    name: "",
})

function onClickSubmit() {
    // if if subject, body, and name are not filled out, show a toast
    if (feedback.value.subject === "" || feedback.value.body === "" || feedback.value.name === "") {
        store.msg("Please fill out all fields", "Error", "error");
        return;
    }

    let url = `mailto:${store.admin_email}?subject=${feedback.value.subject}&body=${feedback.value.body}\\n\\n${feedback.value.name}`;

    // open this url in a new tab
    window.open(url, "_blank");
}

</script>

<template>
<Header />

<div class="w-full flex justify-center">

<div class="flex flex-row" style="width: 88rem;">

<div class="flex flex-col p-4 bg-white rounded-lg w-full gap-4 pb-10">

    <div class="text-4xl font-bold text-center my-4">
        Feedback Submission
    </div>

    <div class="flex flex-col gap-4 w-2/3"
        style="margin: 0 auto;">

        <p>
            For any feedback, you could contact us at <a href="mailto:firat.tiryaki@uth.tmc.edu">firat.tiryaki@uth.tmc.edu</a>.
        </p>

        
        <label for="subject">
            <span class="text-red-500">*</span>
            Subject
        </label>
        <InputText id="subject" v-model="feedback.subject" class="mb-4" />


        <label for="body">
            <span class="text-red-500">*</span>
            Feedback
        </label>
        <Textarea id="body" v-model="feedback.body" 
            rows="5" 
            fluid />


        <label for="name">
            <span class="text-red-500">*</span>
            Name
        </label>
        <InputText id="name" v-model="feedback.name" class="mb-4" />


        <Button label="Submit" 
            class="my-4"
            @click="onClickSubmit"
            severity="secondary"/>
    </div>

</div>

    
</div>

</div>

</template>

<style scoped>
</style>
