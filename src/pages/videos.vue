<!--
 * @Description: 视频集锦
 * @Author: wibetter
 -->
<template>
  <div class="videos-page clearfix">
    <div class="tab-box">
      <div
        class="tab-item"
        :class="{ active: current === 'new' }"
        @click="jumpVideos('new')"
      >
        最新
      </div>
      <div
        class="tab-item"
        :class="{ active: current === 'NBA' }"
        @click="jumpVideos('NBA')"
      >
        NBA
      </div>
      <div
        class="tab-item"
        :class="{ active: current === 'football' }"
        @click="jumpVideos('football')"
      >
        足球
      </div>
    </div>
    <div class="videos-box">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <FooterView :pageKey="'videos'" />
  </div>
</template>
<script>
import FooterView from '$components/index/footerView';

export default {
  data() {
    return {
      defaultCurrent: 'new', // 当前tab值
    };
  },
  components: {
    FooterView,
  },
  computed: {
    current() {
      return this.$store.getters.currentVideoPage || this.defaultCurrent;
    },
  },
  methods: {
    jumpVideos(type) {
      this.$store.commit('currentVideoPage', type);
      this.gotoVideos(this, type);
    },
  },
};
</script>
<style lang="scss">
.videos-page {
  position: relative;
  background-color: #fff;
  padding-bottom: px2rem(85);
  min-height: 100vh;
  box-sizing: border-box;

  .tab-box {
    position: fixed;
    top: 0;
    left: 0;
    height: px2rem(80);
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: px2rem(23) px2rem(24) px2rem(24) px2rem(24);
    background-color: #fff;
    box-sizing: border-box;
    z-index: 10;

    @include borderTopOrBtm(top);

    .tab-item {
      float: left;
      margin-right: px2rem(40);
      font-family: PingFangSC-Regular;
      font-size: px2rem(34);
      color: #626262;
      line-height: px2rem(34);
      box-sizing: border-box;
      cursor: pointer;
    }

    .tab-item.active {
      font-size: px2rem(40);
      font-family: PingFangSC-Medium;
      color: #ff3934;
      text-align: center;
    }
  }
}

.videos-box {
  position: relative;
  margin-top: px2rem(80);
}
</style>
