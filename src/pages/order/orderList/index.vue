<template>
    <div class="order-list-container">
        <van-nav-bar
            title="订单数据"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="card-box">
            <van-list
                v-if="orderList.length"
                :loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
            >
                <Card v-for="item of orderList" :key="item.id" :data="item" />
            </van-list>
            <van-empty v-else description="暂无数据" />
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import Card from '@/components/card.vue';
import { useStore } from 'vuex';
const store = useStore();
const searchValue = ref('');
const loading = ref(false);
const finished = ref(false);
const offset = 10;
const onLoad = () => {
    if (loading.value) return;
    loading.value = true;
    searchValue.value = '';
    toGetOrderList();
};
const orderList = computed(() => store.getters.storeOrderList);
const toGetOrderList = async type => {
    if (type === 'reset') {
        finished.value = false;
    }
    try {
        const data = await store.dispatch('order/toGetOrderList', {
            offset,
            type
        });
        loading.value = false;
        if (!data.length || data.length < offset) {
            finished.value = true;
        }
    } catch (err) {
        console.error(err);
    }
};
toGetOrderList('reset');
const onClickLeft = () => history.back();
</script>
<style lang="scss" scoped>
.swipe-img {
    width: 100%;
}
.van-list {
    width: 100%;
    .card-container {
        margin-bottom: 10px;
    }
}
</style>
