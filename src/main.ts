import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'

import router from './router'
import './tailwindcss.css'
import { createPinia } from 'pinia';
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
