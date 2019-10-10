import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        signedIn: false,
        loading: false,
        userInfo: null,
        refreshToken: null,
        accessToken: null
    },
    mutations: {
        resetState: (state) => {
                state.signedIn = false,
                state.loading = false,
                state.userInfo = null,
                state.refreshToken = null,
                state.accessToken = null
            },
        setSignedIn: (state, value) => {
            state.signedIn = value
        },
        setLoading: (state, value) => {
            state.loading = value
        },
        setUserInfo: (state, value) => {
            state.userInfo = value
        },
        setRefreshToken: (state, value) => {
            state.refreshToken = value
        },
        setAccessToken: (state, value) => {
            state.accessToken = value
        }
    }
});