import {
    getShoppingList,
    getOrderList,
    getHistoryOrderList
} from '@/api/order';
const state = {
    shoppingList: [],
    preOrderList: [],
    orderList: [],
    hisotryOrderList: []
};
const mutations = {
    SET_SHOPPING_LIST(state, list) {
        state.shoppingList = [...list];
    },
    SET_PRE_ORDER_LIST(state, list) {
        state.preOrderList = [...list];
    },
    SET_ORDER_LIST(state, list) {
        state.orderList = [...list];
    },
    SET_HISTORY_ORDER_LIST(state, list) {
        state.hisotryOrderList = [...list];
    }
};
const baseGetList = async ({ store, params, dataList, api, mutations }) => {
    const { type, offset } = params;
    const { commit } = store;
    try {
        const { data } = await api({
            id: type === 'reset' ? '' : dataList[dataList.length - 1]?.id,
            offset
        });
        const l = type === 'reset' ? [...data] : [...dataList, ...data];
        commit(mutations, l);
        return data;
    } catch (err) {
        console.error(err);
    }
};
const actions = {
    async toGetShoppingList(store, params) {
        return baseGetList({
            store,
            params,
            dataList: store.state.shoppingList,
            api: getShoppingList,
            mutations: 'SET_SHOPPING_LIST'
        });
    },
    async toGetOrderList(store, params) {
        return baseGetList({
            store,
            params,
            dataList: store.state.orderList,
            api: getOrderList,
            mutations: 'SET_ORDER_LIST'
        });
    },
    async toGetHistoryOrderList(store, params) {
        return baseGetList({
            store,
            params,
            dataList: store.state.hisotryOrderList,
            api: getHistoryOrderList,
            mutations: 'SET_HISTORY_ORDER_LIST'
        });
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
