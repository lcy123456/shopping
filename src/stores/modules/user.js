import { login, logout, getUserInfo } from '@/api/user';
const state = {
    userInfo: {
        token: '',
        name: '',
        avatar: ''
    }
};
const mutations = {
    SET_USER_INFO(state, info) {
        state.userInfo = {
            ...info
        };
    }
};
const actions = {
    async goLogin({ commit, state }, params) {
        const { data } = await login(params);
        commit('SET_USER_INFO', {
            ...state.userInfo,
            ...data
        });
        const userInfo = await getUserInfo();
        commit('SET_USER_INFO', {
            ...state.userInfo,
            ...userInfo.data
        });
    },
    async goLogout({ commit }) {
        await logout();
        commit('SET_USER_INFO', {});
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
