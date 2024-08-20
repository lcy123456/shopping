<template>
    <div class="order-list-container">
        <div class="card-box">
            <van-list
                :loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
            >
                <Card v-for="item of dataList" :key="item.num" :data="item" />
            </van-list>
        </div>
    </div>
</template>
<script setup>
import { getProductList } from '@/api/product';
import { ref, computed } from 'vue';
import Card from '@/components/card.vue';
import emitter from '@/utils/events';
import { useRouter } from 'vue-router';
const router = useRouter();
const searchValue = ref('');
const loading = ref(false);
const finished = ref(false);
const dataList = ref([]);
const offset = 10;
const routerName = computed(() => router.currentRoute.value.name);
const onLoad = () => {
    if (!isCurrentRoute()) return;
    loading.value = true;
    searchValue.value = '';
    toGetProductList();
};
const isCurrentRoute = () => {
    return routerName.value === 'order-list';
};
const toGetProductList = async (type, keyword) => {
    if (!isCurrentRoute()) return;
    if (type === 'reset') {
        finished.value = false;
    }
    try {
        const { data } = await getProductList({
            id:
                type === 'reset'
                    ? ''
                    : dataList.value[dataList.value.length - 1]?.id,
            offset,
            keyword
        });
        dataList.value =
            type === 'reset' ? [...data] : [...dataList.value, ...data];
        loading.value = false;
        if (!data.length || data.length < offset) {
            finished.value = true;
        }
    } catch (err) {
        console.error(err);
    }
    type && isCurrentRoute() && emitter.emit('onRefreshFinish');
};
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
