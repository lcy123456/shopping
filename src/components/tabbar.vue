<template>
    <div class="tabbar-container">
        <van-tabbar placeholder :route="true">
            <van-tabbar-item replace to="/home" icon="home-o">
                商品
            </van-tabbar-item>
            <van-tabbar-item replace to="/shopping-cart" icon="shopping-cart-o">
                购物车
            </van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="user-o">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
