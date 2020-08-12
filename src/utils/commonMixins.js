/**
 将登录验证定义在mixin中
 */
export const beforeCreateMixin = {
  beforeCreate() {
    if (!this.$store.getters.isLogin) {
      this.$store.dispatch('checkClient').then(() => {
        // if (this.$store.getters.isAPP) {
        //   this.$store.dispatch('setShareConfig');
        // }
        this.$store.dispatch('checkLogin').then(() => {
          if (this.$store.getters.isLogin) {
            // 表示已经登录
            this.$store.dispatch('getUserInfo');
            // 显示数据加载中效果，避免用户此时在页面进行任何操作
            this.$store.commit('showLoadding');
            this.$store.dispatch('getAccountInfo').then(() => {
              this.$store.commit('hideLoadding');
            });
          } else {
            // 未登录则自动跳转到登录界面
            this.$store.dispatch('toLogin');
          }
        });
      });
    }
  },
};
