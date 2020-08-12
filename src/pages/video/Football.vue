<!--
 * @Description: 视频集锦-足球
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
      dataApi: APIList.videosData,
      params: {
        ch: 'video',
        pageid: 13, // 足球
        lid: 2531, // 足球
      },
    };
  },
  components: {
    CommonVideos,
  },
  mounted() {
    this.$store.commit('currentVideoPage', 'football');
  },
};
</script>
