import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//导入pinia
import { createPinia } from "pinia";
//导入pinia持久化插件
import { createPersistedState } from "pinia-persistedstate-plugin";
//导入element-plus框架
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/index.css";
//导入TDesign
import TDesign from 'tdesign-mobile-vue';
import 'tdesign-mobile-vue/es/style/index.css';
//导入封装的axios
import request from "@/utils/request";
// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

pinia.use(persist);
app.use(router).use(ElementPlus).use(pinia).use(TDesign);
app.config.globalProperties.Request = request;
app.mount("#app");
