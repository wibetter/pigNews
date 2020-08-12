import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    title: '小猪新闻',
    version: '0.0.1', // 当前版本号
    clientType: 'wap', // 客户端标识，默认是wap,如果是微信客户端则"weixin",
    isLogin: false, // 记录当前用户是否登录
    isFirstVisit: true,
    loadding: false, // 是否显示loadding图
    currentVideoPage: 'new', // 默认视频tab页
    currentPhotoPage: 'jx', // 默认图集tab页
  },
  getters: {
    version(state) {
      return state.version;
    },
    clientType(state) {
      return state.clientType;
    },
    clientTypeValue(state) {
      // 客户端类型（5：PC，6：手机浏览器）
      let clientType;
      if (state.clientType === 'wap') {
        clientType = 6;
      } else {
        // 其他客户端均认为是PC
        clientType = 5;
      }
      return clientType;
    },
    isLogin(state) {
      return state.isLogin;
    },
    isFirstVisit(state) {
      return state.isFirstVisit;
    },
    loadding(state) {
      return state.loadding;
    },
    currentVideoPage(state) {
      return state.currentVideoPage;
    },
    currentPhotoPage(state) {
      return state.currentPhotoPage;
    },
  },
  mutations: {
    setTitle(state, newTitle) {
      window.document.title = newTitle;
      state.title = newTitle;
    },
    setClientType(state, clientType) {
      state.clientType = clientType;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setIsFirstVisit(state, isFirst) {
      state.isFirstVisit = isFirst;
    },
    showLoadding(state) {
      state.loadding = true;
    },
    currentVideoPage(state, type) {
      state.currentVideoPage = type;
    },
    currentPhotoPage(state, type) {
      state.currentPhotoPage = type;
    },
  },
  actions: {
    setTitle(context, newTitle) {
      context.commit('setTitle', newTitle);
    },
    checkClient(context) {
      return new Promise((resolve) => {
        const WebViewInfo = window.WebViewInfo || {};
        // 判断当前客户端
        const ua = WebViewInfo.ua || window.navigator.userAgent.toLowerCase();
        const isWeixin =
          WebViewInfo.isWeixin ||
          /micromessenger/i.test(ua) ||
          typeof navigator.wxuserAgent !== 'undefined';

        let clientType = 'pc';

        if (isWeixin) {
          clientType = 'weixin';
        } else if (WebViewInfo.isIOS || ua.match(/iphone|ipod|ipad/gi)) {
          clientType = 'wap';
        } else if (WebViewInfo.isAndroid || ua.match(/Android/i)) {
          clientType = 'wap';
        }
        if (clientType !== 'wap') {
          context.commit('setClientType', clientType);
        }
        resolve();
      });
    },
  },
});
