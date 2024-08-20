<template>
    <div class="login-container">
        <van-field
            v-model="form.username"
            left-icon="user-circle-o"
            required
            placeholder="请输入用户名"
        />
        <van-field
            v-model="form.password"
            left-icon="shield-o"
            type="password"
            required
            placeholder="请输入密码"
        />
        <van-button class="login-btn" type="primary" @click="goLogin">
            登录
        </van-button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import md5 from 'md5';
const store = useStore();
const router = useRouter();
const form = ref({
    username: '',
    password: ''
});
const goLogin = async () => {
    try {
        await store.dispatch('user/goLogin', {
            ...form.value,
            password: md5(form.value.password)
        });
        router.push({ name: 'home' });
    } catch (err) {
        console.error('err--', err);
    }
};
</script>
<style lang="scss" scoped>
.login-container {
    width: 90%;
    margin: 200px auto;
}
.login-btn {
    display: block;
    margin: 60px auto;
    width: 90%;
}
</style>
