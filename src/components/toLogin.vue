<template>
    <div class="toLogin-container">
        <van-button class="login-btn" type="danger" round @click="goLogin">
            去登录
        </van-button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goLogin = () => {
    router.push({ name: 'login' });
};
</script>
<style scoped lang="scss">
.toLogin-container {
    width: 100%;
    overflow: auto;
    .login-btn {
        display: block;
        margin: 100px auto;
    }
}
</style>
