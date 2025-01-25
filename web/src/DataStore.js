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

    // search related
    keyword: '',
    search_engine: null,
    search_config: {
        searchableFields: [
            'title', 
            'description', 
            'organization', 
        ],
        aggregations: {
            data_type: {
                title: 'Data Type',
                size: 10
            },
            country: {
                title: 'Country',
                size: 10
            },
        }
    },
    filters: {
        data_type: [],
        country: [],
    },
    selected_filters: [],
    page: 1,
    per_page: 10,
    sort_by: 'best_match',
    search_results: {},
}),

getters: {
},

actions: {
    gotoPage(page) {
        if (this.current_page === page) {
            return;
        }

        this.current_page = page;
        this.router.push("/" + page);
    },

    gotoDatasetPage(id) {
        this.router.push("/detail/" + id);
    },

    init: async function() {
        await this.loadData();
        this.buildDict();
        await this.buildIndex();
    },

    loadData: async function() {
        // send a fetch request to the /data-covid19-data.index.jsonl
        // something like this:
        // { 
        //     "id": 2, 
        //     "title": "COVID19 Cases Switzerland", 
        //     "description": "COVID19 Cases Switzerland ", 
        //     "data_type": "Epidemiology", 
        //     "authors": "DanielProbst",
        //     "organization": "Unknown", 
        //     "country": "Unknown", 
        //     "source_url": "https:\/\/www.kaggle.com\/daenuprobst\/covid19-cases-switzerland", 
        //     "data_urls": ["https:\/\/www.kaggle.com\/daenuprobst\/covid19-cases-switzerland\/download"], 
        //     "date_created": "2020-04-28", 
        //     "date_updated": "2020-07-03" 
        // }

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

        return new Promise((resolve, reject) => {

            this.search_engine = itemsjs(
                this.datasets, 
                this.search_config
            );
            console.log('* built index');

            resolve();
        });

    },
    
    search: function() {
        if (!this.keyword.trim()) {
            return [];
        }

        let results = this.search_engine.search({
            query: this.keyword.trim(),
            filters: this.filters,
            per_page: this.per_page,
            page: this.page,
            sort: this.sort_by,
        });

        this.selected_filters = [];
        for (const [key, value] of Object.entries(this.filters)) {
            for (const name in value) {
                this.selected_filters.push({
                    name: value[name],
                    facet: key
                })
            }
        }

        console.log(`* search ${this.keyword} results`, results);
        this.search_results = results;
    },

    resetFilters: function (facet, name) {
        this.filters[facet] = this.filters[facet].filter(v => {
            return v !== name;
        });
    },
    reset: function () {
        var filters = {};
        Object.keys(this.search_config).map(function (v) {
            filters[v] = [];
        })

        this.filters = filters;
        this.query = '';
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