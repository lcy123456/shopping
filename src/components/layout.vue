<template>
    <div class="layout-container">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </van-pull-refresh>
        <Tabbar />
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import Tabbar from '@/components/tabbar.vue';
import emitter from '@/utils/events';
import { useRouter } from 'vue-router';
const router = useRouter();
const routerName = computed(() => router.currentRoute.value.name);
const isCurrentRouteUser = () => {
    return routerName.value === 'user';
};
const loading = ref(false);
const onRefresh = () => {
    if (isCurrentRouteUser()) {
        loading.value = false;
        return;
    }
    emitter.emit('onRefresh');
};
emitter.off('onRefreshFinish');
emitter.on('onRefreshFinish', () => {
    loading.value = false;
});
</script>
<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: auto;
}
.van-pull-refresh {
    min-height: 90%;
}
</style>
