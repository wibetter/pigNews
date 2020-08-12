<!--
 * @Description: 视频集锦-最新视频
 * @Author: wibetter
 -->
<template>
  <CommonVideos :params="params" :dataApi="dataApi"></CommonVideos>
</template>
<script>
import CommonVideos from '$pages/common/videos';

/* 引进项目配置文件 */
import APIList from '$config/APIList';

export default {
  data() {
    return {
      dataApi: APIList.lastestVideos,
      params: {
        ch: 'video',
      },
    };
  },
  components: {
    CommonVideos,
  },
  mounted() {
    this.$store.commit('currentVideoPage', 'new');
  },
};
</script>
