<template>
    <div class="productionInfo-container">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="image in info.imgList" :key="image">
                <img class="swipe-img" :src="image" />
            </van-swipe-item>
        </van-swipe>
        <div class="content-box">
            <h1>{{ info.title }}</h1>
            <p class="flex">
                <span>¥{{ info.price }}</span>
                <span>x{{ info.num }}</span>
            </p>
            <p>{{ info.desc }}</p>
            <p>{{ info.content }}</p>
        </div>
        <div class="footer">
            <van-action-bar>
                <van-action-bar-icon
                    icon="cart-o"
                    text="购物车"
                    @click="goShoppingCart"
                />
                <van-action-bar-button
                    type="warning"
                    text="加入购物车"
                    @click="toShoppingAdd"
                />
                <van-action-bar-button
                    type="danger"
                    text="立即购买"
                    @click="toBuy"
                />
            </van-action-bar>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getProductInfo } from '@/api/product';
import { shoppingAdd } from '@/api/order';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const onClickLeft = () => history.back();
const id = router.currentRoute._value.query.id;
const info = ref({
    imgList: []
});
const toGetProductInfo = async () => {
    try {
        const { data } = await getProductInfo(id);
        info.value = data;
    } catch (err) {
        console.error(err);
    }
};
toGetProductInfo();
const toShoppingAdd = async () => {
    try {
        const { data } = await shoppingAdd({
            id: info.value.id
        });
        showToast(data.message);
        await store.dispatch('order/toGetShoppingList', {
            offset: 10
        });
    } catch (err) {
        console.error(err);
    }
};
const goShoppingCart = () => {
    router.push({ name: 'shopping-cart' });
};
const toBuy = () => {
    store.commit('order/SET_PRE_ORDER_LIST', [
        {
            ...info.value,
            num: 1
        }
    ]);
    router.push({ name: 'contact', query: { type: 'order' } });
};
</script>
<style lang="scss" scoped>
.productionInfo-container {
    padding-bottom: 70px;
}
.content-box {
    padding: 20px;
    font-size: 16px;
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.footer {
    background: #dedede38;
    position: fixed !important;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
}
.add-btn {
    width: fit-content;
    display: flex;
    float: right;
    margin-right: 20px;
}
.swipe-img {
    width: 100%;
}
</style>
