import { createApp } from 'vue';
import router from '@/router';
import './styles/globa.css';
import App from './App.vue';
import store from './stores';
import { Lazyload } from 'vant';
const app = createApp(App);

app.use(store).use(router).mount('#app');

app.use(Lazyload);

// 注册时可以配置额外的选项
app.use(Lazyload, {
    lazyComponent: true
});
