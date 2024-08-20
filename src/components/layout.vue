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
import { ref } from 'vue';
import Tabbar from '@/components/tabbar.vue';
import emitter from '@/utils/events';
const loading = ref(false);
emitter.off('onRefreshFinish');
emitter.on('onRefreshFinish', () => {
    loading.value = false;
});
const onRefresh = () => {
    emitter.emit('onRefresh');
};
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
