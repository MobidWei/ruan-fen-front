import { createApp } from 'vue';
import App from './App.vue'; // 导入您的根组件
import router from './router'; // 如果您使用 vue-router
import store from './store'; // 如果您使用 Vuex
 
// 创建 Vue 应用实例
const app = createApp(App);