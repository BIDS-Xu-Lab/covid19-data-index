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
            About
        </div>

        <p class="text-lg">
            Diverse types of datasets, including clinical, epidemiological, imaging, omics, socio-demographic, environment, and transportation data are being generated on a daily basis in response to the COVID-19 pandemic. To make these datasets easily findable and reusable for researchers, we have developed the COVID-19 Data Index (<a href="https://covid19dataindex.org">covid19dataindex.org</a>), which collects and indexes all types of COVID-19 datasets from major data repositories, publications, and individual online sources. Our ultimate goal is to make the COVID-19 Data Index a one-stop shop for researchers who are looking for COVID-19 datasets, thus enabling timely scientific discoveries across disciplines.
        </p>

        <p class="text-lg">
            The COVID-19 Data Index supports the well-recognized <a target="_blank" href="http://www.nature.com/articles/sdata201618">FAIR</a> principles of Findability, Accessibility, Interoperability and Reusability for data sharing. We follow widely used <a target="_blank" href="https://schema.org">schema.org</a> specifications for metadata representation.
        </p>

        <p>
            The COVID-19 Data Index is developed and maintained by teams at the School of Biomedical Informatics (SBMI) at The University of Texas Health Science Center at Houston (UTHealth) and the Department of Biomedical Informatics (DBMI) at University of California at San Diego (UCSD) Health. We welcome user feedback and we are open to collaborations to further improve the COVID-19 Data Index.
        </p>

        <p>
            The COVID-19 Data Index was supported in part by grant UTHealth CCTS Pilot Project 0015300 and NSF OIA-1937136, "Open Knowledge Network: Knowledge Open Network Queries For Research (KONQUER)." It is built on the DataMed platform, which was previously funded by the NIH under the Big Data to Knowledge program.
        </p>

        <p>
            For more information, please contact us at <a href="mailto:firat.tiryaki@uth.tmc.edu">firat.tiryaki@uth.tmc.edu</a>
        </p>

        <p class="flex flex-row justify-center items-center gap-20">
            <img src="/img/logo-sbmi.png" 
                style="width: 100px; height: 100%;"
                alt="Logo of the School of Biomedical Informatics at The University of Texas Health Science Center at Houston" />
            <img src="/img/logo-ucsd.png"
                style="width: 100px; height: 100%;"
                alt="Logo of the University of California at San Diego" />
        </p>
    </div>
</div>

</div>

</template>

<style scoped>
</style>
