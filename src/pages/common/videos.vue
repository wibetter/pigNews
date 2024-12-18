<template>
  <div class="videos-page clearfix">
    <div class="newsList" id="newsBox">
      <component
        v-bind:is="test"
        :params="{
          ch: '2',
          cid: 'k', // NBA
        }"
        :dataApi="APIList.photosData"
      ></component>
      <div class="news-item" v-for="item in newsList" :key="item.docID">
        <div class="news-title">{{ item.title }}</div>
        <div class="item-imgbox">
          <div
            class="news-img"
            :style="{ backgroundImage: 'url(' + item.imgurl + ')' }"
          ></div>
          <div v-if="item.runtime" class="video-runtime">
            {{ item.runtime }}
          </div>
          <img
            class="video-player"
            src="#assetsPublicPath#/img/ico-video.png"
          />
        </div>
        <div class="news-info">
          <div class="left media-mark">{{ item.source || '小猪新闻' }}</div>
          <div
            v-if="item.playCount && item.playCount != 0"
            class="cmt-num right"
          >
            {{ agreeDataFormat(item.playCount) }}次播放
          </div>
        </div>
      </div>
      <div class="loadRecommend" v-if="isLoad">
        <img
          class="loadding-img"
          src="#assetsPublicPath#/img/loadding.gif"
        />正在加载中
      </div>
      <div class="moreRecommend" v-else @click="onClickBottom">
        {{ tipText }}
      </div>
    </div>
    <FooterView :pageKey="'videos'" />
  </div>
</template>
<script>
import FooterView from '$components/index/footerView';
import scrollToBottom from '$utils/scrollToBottom';
import NBAPhotos from '$pages/photo/NBA';
const jxPhotos = () => import('$pages/photo/jx');
const CBAPhotos = () => import('$pages/photo/CBA');
/* 引进项目配置文件 */
import APIList from '$config/APIList';

const components = {
  NBAPhotos,
  jxPhotos,
  CBAPhotos,
};

/**
 * 视频模板页
 */
export default {
  props: {
    dataApi: {
      type: String,
    },
    params: {
      type: Object,
    },
  },
  data() {
    return {
      newsList: [],
      idList: [],
      tipText: '上划或点击查看更多',
      isLoad: false,
      isAlive: true,
      scrollHelper: {},
      isFirstVisit: true,
      page: 1,
      page_size: 10,
      APIList,
      test: 'NBAPhotos',
    };
  },
  components: {
    FooterView,
    ...components,
  },
  created() {
    this.getNews();
  },
  mounted() {
    this.isFirstVisit = false;
    // 滚动到底部自动加载更多
    this.scrollHelper = scrollToBottom({
      container: window,
      target: '#newsBox',
      triggerDistance: 100,
      callBack: this.getMoreNews,
      time: 30,
    });
    this.scrollHelper.start();
  },
  activated() {
    this.isAlive = true;
    this.scrollHelper.start();
  },
  deactivated() {
    this.isAlive = false;
    this.scrollHelper.stop();
  },
  methods: {
    onReachBottom() {
      // 页面上拉触底事件的处理函数
      this.getMoreNews();
    },
    onClickBottom() {
      // 底部查看更多点击事件的处理函数
      this.getMoreNews();
    },
    getMoreNews() {
      if (this.isAlive) {
        this.page += 1;
        this.getNews();
      }
    },
    getNews() {
      if (this.isLoad) return;
      this.isLoad = true;
      const currentTime = new Date().getTime();
      const _this = this;
      const $ = window.$ || window.jQuery;
      $.ajax({
        url: _this.dataApi,
        data: {
          size: _this.page_size,
          page: _this.page,
          ..._this.params,
        },
        timeout: 10e3,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: `callbackFunction_${currentTime}`,
        success(response) {
          if (response && response.data) {
            const resultData = response.data;
            if (resultData.length !== 0) {
              // 去重
              for (let ind = 0, size = resultData.length; ind < size; ind++) {
                const newItem = resultData[ind];
                if (_this.idList.indexOf(newItem.docID) < 0) {
                  _this.newsList.push(newItem);
                  _this.idList.push(newItem.docID);
                }
              }

              // _this.newsList.push(...resultData);
              _this.newsList = Object.assign([], _this.newsList);
            } else {
              _this.tipText = '没有更多了哟';
            }
          }
          _this.isLoad = false;
        },
      });
    },
    agreeDataFormat(agreeData) {
      if (agreeData && agreeData <= 9999) {
        return agreeData;
      }
      if (agreeData && agreeData > 9999) {
        return `${Math.floor(agreeData / 1000) / 10}w`;
      }
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

  .newsList {
    position: relative;
    padding: px2rem(8) 0 px2rem(28) 0;
    box-sizing: border-box;
  }

  .newsList:first-child {
    margin-top: 0;
    border-top: none;
  }

  .news-item {
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #ececec;
    margin: 0 px2rem(24) px2rem(28);
    padding: 0 0 px2rem(28) 0;
  }

  .news-title {
    font-family: PingFangSC-Regular;
    font-size: px2rem(30);
    line-height: px2rem(48);
  }

  .item-imgbox,
  swan-swiper {
    position: relative;
    margin-top: px2rem(12);
    height: px2rem(395);
    background: #f0f0f0;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #d81e06 !important;
  }

  .item-imgbox .news-img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: cover;
  }

  .item-imgbox .video-runtime {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 0;
    padding: px2rem(6) px2rem(8);
    color: #fff;
    min-width: px2rem(60);
    text-align: center;
    line-height: 1.2;
    background: rgba(0, 0, 0, 0.4);
    font-size: px2rem(25);
    box-sizing: border-box;
    overflow: hidden;
  }

  .item-imgbox .video-player {
    position: absolute;
    z-index: 2;
    width: px2rem(80);
    height: px2rem(80);
    top: 50%;
    left: 50%;
    margin: -0.4rem 0 0 -0.4rem;
  }

  .news-info {
    font-family: PingFangSC-Light;
    height: px2rem(28);
    margin-top: px2rem(12);
    box-sizing: border-box;
  }

  .media-mark,
  .cmt-num {
    display: inline-block;
    height: px2rem(28);
    font-family: PingFangSC-Light;
    font-size: px2rem(24);
    color: #828282;
  }

  .moreRecommend,
  .loadRecommend {
    font-family: PingFangSC-Regular;
    font-size: px2rem(26);
    color: #405d7f;
    text-align: center;
    line-height: px2rem(35);
    height: px2rem(50);
    padding-bottom: px2rem(15);
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loadding-img {
    height: px2rem(35);
    width: px2rem(35);
    margin: 0 px2rem(8);
  }
}
</style>
