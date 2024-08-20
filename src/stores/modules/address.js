import { getAddressList } from '@/api/address';
const state = {
    addressId: '',
    addressList: []
};
const mutations = {
    SET_ADDRESS_LIST(state, list) {
        list.forEach(v => {
            v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;
        });
        state.addressList = [...list];
    },
    SET_ADDRESS_ID(state, id) {
        state.addressId = id;
    }
};
const actions = {
    async toGetAddressList({ commit }) {
        try {
            const { data } = await getAddressList();
            commit('SET_ADDRESS_LIST', data);
            return data;
        } catch (err) {
            console.error(err);
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
