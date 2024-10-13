import { createRouter, createWebHistory } from 'vue-router';

import Layout from '@/components/layout.vue';
import HomePage from '@/pages/home/index.vue';
import ProductInfo from '@/pages/home/productInfo/index.vue';
import ShoppingCart from '@/pages/shoppingCart/index.vue';
import Contact from '@/pages/contact/index.vue';
import ContactAdd from '@/pages/contact/contactAdd/index.vue';
import User from '@/pages/user/index.vue';
import Login from '@/pages/login/index.vue';
import OrderDetails from '@/pages/order/orderDetails/index.vue';
import OrderList from '@/pages/order/orderList/index.vue';
import HistoryOrder from '@/pages/order/historyOrder/index.vue';

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: HomePage
            },
            {
                path: 'shopping-cart',
                name: 'shopping-cart',
                component: ShoppingCart
            },
            {
                path: 'user',
                name: 'user',
                component: User
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/productInfo',
        name: 'productInfo',
        component: ProductInfo
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
        children: [
            {
                path: 'add',
                name: 'contactAdd',
                component: ContactAdd
            }
        ]
    },
    {
        path: '/contactAdd',
        name: 'contactAdd',
        component: ContactAdd
    },
    {
        path: '/orderDetails',
        name: 'orderDetails',
        component: OrderDetails
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: OrderList
    },
    {
        path: '/historyOrder',
        name: 'historyOrder',
        component: HistoryOrder
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;
