import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        'path': '/',
        'redirect': '/mainview'
    },
    {
        'path': '/homeview',
        'name': 'HomeView',
        'component': () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
        'children': [
            {
                'path': '/mainview',
                'name': 'MainView',
                'meta': {
                    'title': '显示界面'
                },
                'component': () => import(/* webpackChunkName: "login" */ '../views/MainView.vue')
            },
            {
                'path': '/tableview',
                'name': 'TableView',
                'meta': {
                    'title': '表格识别'
                },
                'component': () => import(/* webpackChunkName: "login" */ '../views/MainView.vue')
            }
        ]
    }

];

const router = createRouter({
    'history': createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
