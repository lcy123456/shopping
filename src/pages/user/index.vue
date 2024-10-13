<template>
    <div class="user-container">
        <van-nav-bar title="我的" />
        <div class="content-box">
            <div class="header">
                <van-image
                    round
                    width="5rem"
                    height="5rem"
                    :src="userInfo.avatar"
                />
                <span v-if="userInfo.token">{{ userInfo.username }}</span>
                <span v-else class="login" @click="goLogin">登录</span>
            </div>
            <div class="cells">
                <van-cell title="我的订单" is-link to="orderList" />
                <van-cell title="历史订单" is-link to="historyOrder" />
                <van-cell title="收货地址" is-link to="contact" />
            </div>
            <van-button class="logout-btn" type="primary" @click="goLogout">
                登出
            </van-button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const userInfo = computed(() => store.getters.storeUserInfo);
const router = useRouter();
const goLogout = async () => {
    try {
        await store.dispatch('user/goLogout');
    } catch (err) {
        console.error('err--', err);
    }
};
const goLogin = () => {
    router.push({ name: 'login' });
};
</script>
<style lang="scss" scoped>
.logout-btn {
    width: 100%;
    margin-top: 100px;
}
.content-box {
    padding: 20px;
    .header {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .cells {
        margin-top: 20px;
    }
}
.login {
    color: var(--van-blue);
}
</style>
