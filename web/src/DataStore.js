import { defineStore } from 'pinia';
import router from './router';

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
    }
}),

getters: {
},

actions: {
    gotoPage(page) {
        this.current_page = page;
        this.router.push("/" + page);
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