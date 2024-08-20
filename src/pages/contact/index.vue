<template>
    <div class="concat-container">
        <van-nav-bar
            title="收货地址"
            left-text="返回"
            :right-text="isOrder ? '确定' : ''"
            left-arrow
            @click-left="onClickLeft"
            @click-right="submitOrder"
        />
        <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { showToast } from 'vant';
const type = ref('');
const router = useRouter();
const store = useStore();
const addressList = computed(() => store.getters.storeAddressList);
const chosenAddressId = ref(0);
const onClickLeft = () => history.back();
type.value = router.currentRoute._value.query.type;

store.dispatch('address/toGetAddressList');
chosenAddressId.value = addressList.value.find(v => v.isDefault)?.id;
const isOrder = computed(() => type.value === 'order');

const onAdd = () => router.push({ name: 'contactAdd' });
const onEdit = contact =>
    router.push({ name: 'contactAdd', query: { id: contact.id } });
const submitOrder = () => {
    if (!chosenAddressId.value) {
        showToast('请选择地址');
        return;
    }
    store.commit('address/SET_ADDRESS_ID', chosenAddressId.value);
    router.push({ name: 'orderDetails' });
};
</script>
