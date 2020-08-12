<!--
 * @Description: 高清图集
 * @Author: wibetter
 -->
<template>
  <div class="photos-page clearfix">
    <div class="tab-box" ref="wrapper">
      <div class="tab-item-cont">
        <div
          class="tab-item"
          :class="{ active: current === 'jx' }"
          id="jx"
          @click="jumpPhotos('jx')"
        >
          精选
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'NBA' }"
          id="NBA"
          @click="jumpPhotos('NBA')"
        >
          NBA
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'CBA' }"
          id="CBA"
          @click="jumpPhotos('CBA')"
        >
          CBA
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'chinaFootball' }"
          id="chinaFootball"
          @click="jumpPhotos('chinaFootball')"
        >
          中国足球
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'globalFootball' }"
          id="globalFootball"
          @click="jumpPhotos('globalFootball')"
        >
          国际足球
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'othersport' }"
          id="othersport"
          @click="jumpPhotos('othersport')"
        >
          综合体育
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'premiership' }"
          id="premiership"
          @click="jumpPhotos('premiership')"
        >
          英超
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'seriea' }"
          id="seriea"
          @click="jumpPhotos('seriea')"
        >
          意甲
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'laliga' }"
          id="laliga"
          @click="jumpPhotos('laliga')"
        >
          西甲
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'chLeague' }"
          id="chLeague"
          @click="jumpPhotos('chLeague')"
        >
          中超
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'tennis' }"
          id="tennis"
          @click="jumpPhotos('tennis')"
        >
          网球
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'golf' }"
          id="golf"
          @click="jumpPhotos('golf')"
        >
          高尔夫
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'schoolbasket' }"
          id="schoolbasket"
          @click="jumpPhotos('schoolbasket')"
        >
          校园篮球
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'f1' }"
          id="f1"
          @click="jumpPhotos('f1')"
        >
          赛车
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'chess' }"
          id="chess"
          @click="jumpPhotos('chess')"
        >
          棋牌
        </div>
        <div
          class="tab-item"
          :class="{ active: current === '_3v3' }"
          id="_3v3"
          @click="jumpPhotos('_3v3')"
        >
          3X3
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'euro2016' }"
          id="euro2016"
          @click="jumpPhotos('euro2016')"
        >
          欧洲杯
        </div>
        <div
          class="tab-item"
          :class="{ active: current === 'horsemanship' }"
          id="horsemanship"
          @click="jumpPhotos('horsemanship')"
        >
          马术
        </div>
      </div>
    </div>
    <div class="photos-box">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <FooterView :pageKey="'photos'" />
  </div>
</template>
<script>
// import BScroll from 'better-scroll';
import BScroll from '@better-scroll/core';
import FooterView from '$components/index/footerView';

export default {
  data() {
    return {
      scrollDom: {}, // 记录滚动对象
      defaultCurrent: 'jx', // 当前tab值
      /**
          【备注】图集类型
          1、精选（cid=jx）
          2、NBA（cid=k）
          3、CBA（cid=cba）
          4、中国足球（cid=n）
          5、国际足球（cid=g）
          6、综合体育（cid=o）
          7、英超（cid=g_pl）
          8、意甲（cid=g_seriea）
          9、西甲（cid=g_laliga）
          10、中超（cid=n_j）
          11、网球（cid=t）
          12、高尔夫（cid=golf）
          13、校园篮球（cid=schoolbasket）
          14、赛车（cid=f1）
          15、棋牌（cid=go）
          16、3X3（cid=sportsevents_3v3）
          17、欧洲杯（cid=g_euro2016）
          18、马术（cid=o_e）
         */
    };
  },
  components: {
    FooterView,
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollDom = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        click: true,
      });
      this.scrollDom.scrollToElement(`#${this.current}`, 400, -120);
    });
  },
  activated() {
    // if (this.scrollDom) this.scrollDom.refresh();
  },
  computed: {
    current() {
      return this.$store.getters.currentPhotoPage || this.defaultCurrent;
    },
  },
  methods: {
    jumpPhotos(type) {
      this.$store.commit('currentPhotoPage', type);
      this.scrollDom.scrollToElement(`#${type}`, 400, -120);
      this.gotoPhotos(this, type);
    },
  },
};
</script>
<style lang="scss">
.photos-page {
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
    overflow-x: scroll;
    overflow-y: hidden;
    overflow-scrolling: touch;

    padding: px2rem(23) px2rem(24) px2rem(24) px2rem(24);
    background-color: #fff;
    box-sizing: border-box;
    z-index: 10;

    @include borderTopOrBtm(top);

    .tab-item-cont {
      position: relative;
      width: px2rem(2330);
      padding-right: px2rem(24);
    }

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

.photos-box {
  position: relative;
  margin-top: px2rem(80);
}
</style>
