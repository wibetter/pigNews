<!--
 * @Description: 滚动资讯
 * @Author: wibetter
 -->
<template>
  <div class="news-page clearfix" id="newsPageWrapper">
    <div class="newsList" id="newsBox">
      <template v-for="(item) in newsList">
        <div class="news-item" :key="item._id">
          <div class="item-con">
            <div class="news-title">{{ item.title }}</div>
            <div class="news-info">
              <div class="left media-mark">{{ item.source || '小猪新闻' }}</div>
              <div
                v-if="item.comment && item.comment != 0"
                class="cmt-num right"
              >
                {{ agreeDataFormat(item.comment) }}评
              </div>
            </div>
          </div>
          <div class="item-imgbox">
            <div
              v-if="
                item.allPics &&
                item.allPics.pics &&
                item.allPics.pics[0] &&
                item.allPics.pics[0].imgurl
              "
              class="news-img"
              :style="{
                backgroundImage: 'url(' + item.allPics.pics[0].imgurl + ')',
              }"
            ></div>
          </div>
        </div>
      </template>
      <div class="loadRecommend" v-if="isLoad">
        <img class="loadding-img" src="#assetsPublicPath#/img/loadding.gif" />
        正在加载中
      </div>
      <div class="moreRecommend" v-else @click="onClickBottom">
        {{ tipText }}
      </div>
    </div>
    <FooterView :pageKey="'news'" />
  </div>
</template>
<script>
import FooterView from '$components/index/footerView';
import scrollToBottom from '$utils/scrollToBottom';

/* 引进项目配置文件 */
import APIList from '$config/APIList';

export default {
  data() {
    return {
      newsList: [],
      idList: [],
      tipText: '上划或点击查看更多',
      isLoad: false,
      isFirstVisit: true,
      isAlive: true,
      scrollHelper: {},
      page: 1,
      page_size: 10,
      params: {
        col: '40750',
        level: '',
        act: 'more',
      },
    };
  },
  components: {
    FooterView,
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
      // eslint-disable-next-line
      const $ = window.$ || window.jQuery;
      $.ajax({
        url: APIList.newsData,
        data: {
          show_num: _this.page_size,
          page: _this.page,
          jsoncallback: `callbackFunction_${currentTime}`,
          ...this.params,
        },
        timeout: 10e3,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: `callbackFunction_${currentTime}`,
        success(response) {
          if (
            response &&
            response.result &&
            response.result.data &&
            response.result.data.list
          ) {
            const resultData = response.result.data.list;
            if (resultData.length !== 0) {
              // 去重
              for (let ind = 0, size = resultData.length; ind < size; ind++) {
                const newItem = resultData[ind];
                if (_this.idList.indexOf(newItem._id) < 0) {
                  _this.newsList.push(newItem);
                  _this.idList.push(newItem._id);
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
.news-page {
  position: relative;
  background-color: #fff;
  padding-bottom: px2rem(85);
  min-height: 100vh;
  box-sizing: border-box;

  .newsList {
    position: relative;
    padding: px2rem(28) 0;
    box-sizing: border-box;
  }

  .news-item {
    position: relative;
    margin: 0 px2rem(24) px2rem(28);
    padding: 0 0 px2rem(28) 0;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #ececec;
  }

  .item-con {
    flex: 1 1 px2rem(436);
    padding-right: px2rem(20);
  }

  .news-title {
    font-family: PingFangSC-Regular;
    max-height: px2rem(96);
    font-size: px2rem(30);
    line-height: px2rem(48);
    height: px2rem(96);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .news-info {
    font-family: PingFangSC-Light;
    height: px2rem(28);
    margin-top: px2rem(30);
    box-sizing: border-box;
  }

  .call-app-mark {
    display: inline-block;
    margin-right: px2rem(8);
    height: px2rem(28);
    padding: px2rem(3) px2rem(8);
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: px2rem(20);
    color: #405d7f;
    border: 1px solid #405d7f;
    border-radius: px2rem(4);
    box-sizing: border-box;
  }
  .media-mark {
    display: inline-block;
    height: px2rem(28);
    font-family: PingFangSC-Light;
    font-size: px2rem(24);
    color: #828282;
  }

  .cmt-num,
  .picture-mark,
  .video-mark {
    display: inline-block;
    height: px2rem(28);
    font-family: PingFangSC-Light;
    font-size: px2rem(20);
    padding: px2rem(4) px2rem(8);
    text-align: center;
    box-sizing: border-box;
  }

  .cmt-num {
    height: px2rem(28);
    width: px2rem(90);
    margin-left: px2rem(7);
    color: #828282;
    background: url(#assetsPublicPath#/img/cmt-bk.svg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .picture-mark,
  .video-mark {
    height: px2rem(28);
    width: px2rem(64);
    margin-left: px2rem(7);
    color: #fff;
    background: url(#assetsPublicPath#/img/img-sort-bk.svg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-imgbox {
    flex: 0 0 px2rem(230);
    height: px2rem(154);
    text-align: center;
    overflow: hidden;
  }

  .item-imgbox .news-img {
    width: 100%;
    height: 100%;
    background-size: cover;
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
