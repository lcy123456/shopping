<template>
    <div class="shoppingCart-container">
        <van-nav-bar title="购物车" />
        <ToLogin v-if="!storeToken" />
        <div v-else>
            <van-list
                v-if="dataList.length"
                :loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
            >
                <van-swipe-cell v-for="data of dataList" :key="data.num">
                    <div class="card-box">
                        <van-checkbox
                            v-model="data.checked"
                            @change="setPrice"
                        ></van-checkbox>
                        <van-card
                            :num="data.num"
                            :price="data.price"
                            :desc="data.desc"
                            :title="data.title"
                            :thumb="data.thumb"
                            :lazy-load="true"
                        >
                            <template #num>
                                <van-stepper
                                    v-model="data.stepper"
                                    theme="round"
                                    button-size="22"
                                    @change="setPrice"
                                />
                            </template>
                        </van-card>
                    </div>
                    <template #right>
                        <van-button
                            square
                            text="删除"
                            type="danger"
                            class="delete-button"
                        />
                    </template>
                </van-swipe-cell>
            </van-list>
            <van-empty v-else description="暂无数据" />
            <van-submit-bar
                v-if="dataList.length"
                button-text="提交订单"
                :price="totalPrice"
                :disabled="!submitDisabled"
                @submit="goSubmitOrder"
            >
                <van-checkbox v-model="checked" @change="changeCheck">
                    全选
                </van-checkbox>
            </van-submit-bar>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import emitter from '@/utils/events';
import ToLogin from '@/components/toLogin.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const offset = 10;
const dataList = computed(() => [...store.getters.storeShoppingList]);
const storeToken = computed(() => store.getters.storeToken);
const routerName = computed(() => router.currentRoute.value.name);
const submitDisabled = computed(() =>
    dataList.value.some(obj => obj.checked === true)
);
const totalPrice = ref(0);

const checked = ref(false);
const changeCheck = event => {
    console.log(event);
    dataList.value.forEach(v => {
        v.checked = event;
    });
};
const onLoad = () => {
    if (!isCurrentRoute() || loading.value) return;
    loading.value = true;
    togetShoppingList();
};
const isCurrentRoute = () => {
    return routerName.value === 'shopping-cart';
};
const setPrice = () => {
    let num = 0;
    dataList.value.forEach(v => {
        num += v.checked ? Number(v.price) * (v.stepper || 1) : 0;
    });
    totalPrice.value = num * 100;
};
const togetShoppingList = async parmas => {
    const { type, isGet } = parmas;
    if (!isCurrentRoute() && !isGet) return;
    if (type === 'reset') {
        finished.value = false;
    }
    loading.value = true;
    try {
        const list = await store.dispatch('order/toGetShoppingList', {
            type,
            offset
        });
        if (!list.length || list.length < offset) {
            finished.value = true;
        }
        loading.value = false;
    } catch (err) {
        console.error(err);
    }
    type && isCurrentRoute() && emitter.emit('onRefreshFinish');
};
const goSubmitOrder = () => {
    const list = [];
    dataList.value.forEach(v => {
        v.checked &&
            list.push({
                ...v,
                num: v.stepper || 1
            });
    });
    store.commit('order/SET_PRE_ORDER_LIST', list);
    router.push({ name: 'contact', query: { type: 'order' } });
};
togetShoppingList({ type: 'reset' });
emitter.on('onRefresh', togetShoppingList.bind(null, { type: 'reset' }));
emitter.on('togetShoppingList', togetShoppingList);
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
.delete-button {
    height: 100%;
}
.van-submit-bar {
    bottom: 55px;
}
</style>
