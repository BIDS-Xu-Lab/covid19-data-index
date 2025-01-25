import { defineStore } from 'pinia';
import router from './router';
import itemsjs from 'itemsjs';
import { data } from 'autoprefixer';

export const useDataStore = defineStore('jarvis', {

state: () => ({
    version: '0.9.5',

    // current current_view
    current_page: '/',

    // for the router
    router: router,

    // keyword
    keyword: '',

    // popular datasets
    popular_dataset_ids: [
        816,
        1062,
        1058,
        768,
        809,
        765,
        764,
        1081,
        810,
    ],

    // for stats
    stats: {
        by_data_type: [
        {
            name: 'Clinical',
            count: 1853,
        },
        {
            name: 'Other',
            count: 1177,
        },
        {
            name: 'Imaging',
            count: 1108,
        },
        {
            name: 'Epidemiology',
            count: 1016,
        },
        {
            name: 'Social Science',
            count: 600,
        },
        {
            name: 'Literature',
            count: 119,
        },
        {
            name: 'Omics',
            count: 52,
        },
        {
            name: 'Transportation',
            count: 40,
        },
        {
            name: 'Climate',
            count: 30,
        },
        {
            name: 'Various',
            count: 22,
        },
        ]
    },

    datasets: [],
    datasets_dict: {},
    search_engine: null,
}),

getters: {
},

actions: {
    gotoPage(page) {
        this.current_page = page;
        this.router.push("/" + page);
    },

    init: async function() {
        await this.loadData();
        this.buildDict();
        this.buildIndex();
    },

    loadData: async function() {
        // send a fetch request to the /data-covid19-data.index.jsonl
        const response = await fetch(
            '/data-covid19-data-index.jsonl'
        );
    
        // parse the response as jsonl
        const data = await response.text();
        
        // parse the lines as json
        const lines = data.split('\n');
        const json = [];
        for (const line of lines) {
            if (line.trim() === '') {
                continue;
            }
            json.push(JSON.parse(line));
        }
        this.datasets = json;
    
        console.log('* loaded ' + json.length + ' records');
    },

    buildDict: function() {
        const dict = {};
        for (const dataset of this.datasets) {
            dict[dataset.id] = dataset;
        }
        this.datasets_dict = dict;
    },

    buildIndex: function() {
        this.search_engine = itemsjs(this.datasets, {
            searchableFields: ['title', 'description', 'organization', 'data_type'],
        });

        console.log('* built index');
    },
    
    msg(
        message, 
        title='Message', 
        type='info',
        life=3000
    ) {
        this.toast.add({
            detail: message,
            summary: title,
            severity: type,
            life: life
        });
    },
}
});