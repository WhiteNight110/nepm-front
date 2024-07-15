import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).use(ElementPlus).use(DataVVue3).use(router).mount('#app')
