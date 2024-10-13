<template>
    <div class="orderDetails-container">
        <van-nav-bar
            title="订单"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <ToLogin v-if="!storeToken" />
        <div v-else>
            <van-list v-if="dataList.length" finished-text="没有更多了">
                <van-swipe-cell v-for="data of dataList" :key="data.num">
                    <div class="card-box">
                        <van-card
                            :num="data.num"
                            :price="data.price"
                            :desc="data.desc"
                            :title="data.title"
                            :thumb="data.thumb"
                            :lazy-load="true"
                        />
                    </div>
                </van-swipe-cell>
            </van-list>
            <van-empty v-else description="暂无数据" />
            <van-submit-bar
                v-if="dataList.length"
                button-text="提交订单"
                :price="totalPrice"
                @submit="goSubmitOrder"
            />
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { addOrder } from '@/api/order';
import ToLogin from '@/components/toLogin.vue';
import { useStore } from 'vuex';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import emitter from '@/utils/events';
const router = useRouter();
const store = useStore();
const dataList = computed(() => [...store.getters.storePreOrderList]);
const storeToken = computed(() => store.getters.storeToken);
const totalPrice = computed(() => {
    let num = 0;
    dataList.value.forEach(v => {
        num += Number(v.price) * v.num;
    });
    return num * 100;
});
const onClickLeft = () => history.back();
const goSubmitOrder = async () => {
    try {
        const { data } = await addOrder({
            list: dataList.value
        });
        showToast(data.message);
        router.push({ name: 'home' });
        emitter.emit('togetShoppingList', { type: 'reset', isGet: 1 });
    } catch (err) {
        console.error(err);
    }
};
</script>
<style lang="scss" scoped>
.card-box {
    display: flex;
    width: 100%;
    .van-checkbox {
        padding: 0 10px;
    }
    .van-card {
        flex: 1;
    }
}
</style>
