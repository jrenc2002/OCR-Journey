import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/homeview'
  },
  {
    path: '/homeview',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    children: [
      {
        path: '/mainview',
        name: 'MainView',
        meta: {
          title: '显示界面',
          permiss: '1',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/MainView.vue'),
      },]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
