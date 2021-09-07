import { createApp } from 'vue'
import App from './App.vue'
import Vue3Step from '../packages/index.js'
const app = createApp(App)
app.use(Vue3Step)
app.mount('#app')