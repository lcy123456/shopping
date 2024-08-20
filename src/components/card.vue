<template>
    <div class="card-container">
        <van-card
            :num="data.num"
            :price="data.price"
            :desc="data.desc"
            :title="data.title"
            :thumb="data.thumb"
            :lazy-load="true"
        >
            <template #num>
                <div> </div>
            </template>
        </van-card>
    </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            num: '',
            price: '',
            desc: '',
            title: '',
            thumb: ''
        })
    }
});
const data = computed(() => props.data);
</script>
