import axios from 'axios'; // 引入axios
import { showToast } from 'vant';
import store from '@/stores';
import router from '@/router';

const service = axios.create({
    baseURL: import.meta.env.VITE_API,
    timeout: 1000 * 600
});
service.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            Authorization: store.state.user.userInfo.token
                ? `Bear ${store.state.user.userInfo.token}`
                : ''
        };
        return config;
    },
    error => {
        showToast(error);

        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const { code, data } = response.data;
        const { message } = data;
        if (code === 503) {
            router.push({ name: 'login' });
            return Promise.reject(message);
        }
        if (code !== 200) {
            showToast(message || '异常，请重试');
            return Promise.reject(message);
        }
        return response.data;
    },
    error => {
        showToast('异常，请重试');
        return Promise.reject(error);
    }
);

export default service;
