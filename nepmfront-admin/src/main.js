import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


//导入element-plus框架
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

//导入图标
import "@/assets/icon/iconfont.css";

//导入封装的axios
import request from "@/utils/request";

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

// const app = createApp(App);
// app.use(router).use(ElementPlus)
// app.config.globalProperties.Request = request;
// app.mount('#app')
createApp(App).use(router).use(ElementPlus).mount('#app')