<!--
 * @Description: 高清图集-欧洲杯
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
        cid: 'g_euro2016', // 欧洲杯
      },
    };
  },
  components: {
    CommonPhotos,
  },
  mounted() {
    this.$store.commit('currentPhotoPage', 'euro2016');
  },
};
</script>
