<!--
 * @Description: 高清图集-赛车
 * @Author: wibetter
 -->
<template>
  <CommonPhotos :params="params" :dataApi="dataApi"></CommonPhotos>
</template>
<script>
import CommonPhotos from '$pages/common/photos';

/* 引进项目配置文件 */
import APIList from '$config/APIList';

export default {
  data() {
    return {
      dataApi: APIList.photosData,
      params: {
        ch: '2',
        cid: 'f1', // 赛车
      },
    };
  },
  components: {
    CommonPhotos,
  },
  mounted() {
    this.$store.commit('currentPhotoPage', 'f1');
  },
};
</script>
