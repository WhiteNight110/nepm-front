import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//导入pinia
import { createPinia } from 'pinia';
//导入pinia持久化插件
import { createPersistedState } from 'pinia-persistedstate-plugin';

//导入element-plus框架
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';


// 引入TDesign组件库
import TDesign from 'tdesign-mobile-vue';
import 'tdesign-mobile-vue/es/style/index.css';

//导入图标
import "@/assets/icon/iconfont.css";

//导入封装的axios
import request from "@/utils/request";

// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)

app.use(router).use(ElementPlus).use(TDesign).use(pinia);
app.config.globalProperties.Request = request;
app.mount('#app')
// createApp(App).use(router).use(ElementPlus).mount('#app')