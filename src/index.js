import Vue from 'vue';
import router from '$router/index';
import App from './App';
import store from '$store/index';
import jumpPageMixin from '$utils/jumpPageMixin';

/* 引入公共的静态资源 */
import '$public/css/base.css';

Vue.config.productionTip = false;

// 全局混入方法，用于实现页面跳转
Vue.mixin(jumpPageMixin);

// 全局后置钩子
router.afterEach((to) => {
  // 暂无处理逻辑
  console.log(to);
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
