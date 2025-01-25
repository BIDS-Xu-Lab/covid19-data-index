import { createWebHistory, createRouter } from 'vue-router'

import HomePage from './pages/Home.vue';
import AboutPage from './pages/About.vue';
import Submit from './pages/Submit.vue';
import Statistics from './pages/Statistics.vue';
import FeedbackPage from './pages/Feedback.vue';
import DetailPage from './pages/Detail.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/submit', component: Submit },
    { path: '/statistics', component: Statistics },
    { path: '/feedback', component: FeedbackPage },

    { path: '/detail/:id', component: DetailPage },
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.VITE_BASE_PATH || './'
    ),
    routes,
})

export default router