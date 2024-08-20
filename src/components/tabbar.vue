<template>
    <div class="tabbar-container">
        <van-tabbar v-model="active" placeholder @change="change">
            <van-tabbar-item icon="home-o">商品 </van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const active = ref(0);
const routerName = router.currentRoute.value.name;
const routerMap = {
    0: 'home',
    1: 'shopping-cart',
    2: 'user'
};
const index = Object.values(routerMap).indexOf(routerName);
active.value = index !== -1 ? index : 0;
const change = index => {
    router.push({ name: routerMap[index] });
};
</script>
