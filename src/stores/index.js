import { createStore } from 'vuex';
import user from './modules/user';
import order from './modules/order';
import address from './modules/address';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';

const vuexPersisted = createPersistedState({
    storage: {
        getItem: key => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: key => localStorage.removeItem(key)
    },
    reducer(state) {
        const { user, order, address } = state;
        const { userInfo } = user;
        const { shoppingList, preOrderList, orderList, hisotryOrderList } =
            order;
        const { addressList } = address;
        return {
            user: {
                userInfo
            },
            order: {
                shoppingList,
                preOrderList,
                orderList,
                hisotryOrderList
            },
            address: {
                addressList
            }
        };
    }
});

const store = createStore({
    modules: {
        user,
        order,
        address
    },
    getters,
    plugins: [vuexPersisted]
});

export default store;
