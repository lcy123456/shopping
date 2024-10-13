<template>
    <div class="concat-add-container">
        <van-nav-bar
            title="新增收货地址"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :address-info="addressEditInfo"
            :search-result="searchResult"
            :show-delete="false"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { areaList } from '@vant/area-data';
import { addAddress } from '@/api/address';
import { showToast } from 'vant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
const id = router.currentRoute._value.query.id;
const store = useStore();
const addressEditInfo = computed(() =>
    store.getters.storeAddressList.find(v => Number(v.id) === Number(id))
);
const onClickLeft = () => history.back();
const searchResult = ref([]);

const onSave = async content => {
    try {
        const { data } = await addAddress({
            ...content,
            id: id
        });
        showToast(data.message);
    } catch (err) {
        console.error(err);
    }
};
const onDelete = () => showToast('delete');
</script>
<style lang="scss" scoped>
.concat-add-container {
    padding-bottom: 70px;
}
</style>
