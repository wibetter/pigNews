/**
 将相关页跳转方法定义在mixin中(以便后端随时调整为多页面)
 */
const routeBaseQuery = {
  // __native_pull_refresh: 0
};
const jumpPageMixin = {
  methods: {
    gotoNews(_ths) {
      const ths = _ths || this;
      const routeQuery = { ...routeBaseQuery };
      ths.$router.push({ name: 'news', query: routeQuery });
    },
    gotoPhotos(_ths, type) {
      const ths = _ths || this;
      const routeQuery = { ...routeBaseQuery };
      let photoType = type;
      if (!type && ths.$store && ths.$store.getters.currentPhotoPage) {
        photoType = ths.$store.getters.currentPhotoPage;
      }
      ths.$router.push({ name: `${photoType}-photos`, query: routeQuery });
    },
    gotoVideos(_ths, type) {
      const ths = _ths || this;
      const routeQuery = { ...routeBaseQuery };
      let videoType = type;
      if (!type && ths.$store && ths.$store.getters.currentVideoPage) {
        videoType = ths.$store.getters.currentVideoPage;
      }
      ths.$router.push({ name: `${videoType}-videos`, query: routeQuery });
    },
  },
};

export default jumpPageMixin;
