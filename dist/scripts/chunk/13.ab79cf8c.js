(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{19:function(t,s,i){var e=i(22);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,i(4).default)("b4e6fbd8",e,!1,{sourceMap:!1})},20:function(t,s,i){var e=i(27);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,i(4).default)("56f593b9",e,!1,{sourceMap:!1})},21:function(t,s,i){"use strict";i(19)},22:function(t,s,i){},23:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"footer-box ipx-fixed-bottom"},[i("div",{staticClass:"item",on:{click:t.jumpNews}},["news"==t.pageKey?i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/news-active.png"}}):i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/news.png"}}),t._v(" "),i("span",{class:{"item-active":"news"==t.pageKey}},[t._v("滚动资讯")])]),t._v(" "),i("div",{staticClass:"item",on:{click:t.jumpPhotos}},["photos"==t.pageKey?i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/photo-active.png"}}):i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/photo.png"}}),t._v(" "),i("span",{class:{"item-active":"photos"==t.pageKey}},[t._v("高清图集")])]),t._v(" "),i("div",{staticClass:"item",on:{click:t.jumpVideos}},["videos"==t.pageKey?i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/video-active.png"}}):i("img",{staticClass:"page-mark",attrs:{src:"/pigNews/dist//img/tabBar/video.png"}}),t._v(" "),i("span",{class:{"item-active":"videos"==t.pageKey}},[t._v("视频集锦")])])])};e._withStripped=!0;var a={name:"footerBox",props:["pageKey"],methods:{jumpNews:function(){this.gotoNews(this)},jumpPhotos:function(){this.gotoPhotos(this)},jumpVideos:function(){this.gotoVideos(this)}}},o=(i(21),i(1)),n=Object(o.a)(a,e,[],!1,null,null,null);n.options.__file="src/components/index/footerView.vue";s.a=n.exports},24:function(t,s,i){"use strict";function e(t){var s,i=t.container||window,e=window.$||window.jQuery,a=t.target,o=t.triggerDistance||0,n=t.callBack||e.noop,c=t.time||300;i=e(i),a=e(a),o=o||0;var r="_f35d0b75_5a21_0781_405a_b189f1f946c3";var l=function(){i.off("scroll."+r)};return{stop:l,start:function(){l(),i.on("scroll."+r,(function(){clearTimeout(s),s=setTimeout((function(){var t;(t=i.scrollTop())<=0||i.height()+t-(a.height()+a.offset().top)+o>0&&e.isFunction(n)&&n()}),c)}))}}}i.d(s,"a",(function(){return e}))},25:function(t,s,i){"use strict";var e=window.location.protocol,a={lastestVideos:e+"//interface.sina.cn/sports/video_latest.d.json",videosData:e+"//interface.sina.cn/video/column_data.d.html",photosData:e+"//photo.sina.cn/aj/v2/channel",newsData:e+"//interface.sina.cn/wap_api/col_data.d.html",recommend:e+"//cre.dp.sina.cn/_dataApi_api1/api/v3/get",comment:e+"//interface.sina.cn/wap_api/article_getall.d.json",support:e+"//comment5.news.sina.com.cn/cmnt/vote"};s.a=a},26:function(t,s,i){"use strict";i(20)},27:function(t,s,i){},28:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"photos-page clearfix"},[i("div",{staticClass:"newsList",attrs:{id:"newsBox"}},[t._l(t.newsList,(function(s){return[i("div",{key:s.uuid,staticClass:"news-item"},[i("div",{staticClass:"news-title"},[t._v(t._s(s.title))]),t._v(" "),i("div",{staticClass:"item-imgbox"},[i("div",{staticClass:"news-img",style:{backgroundImage:"url("+s.thumb+")"}}),t._v(" "),s.img_count>0?i("div",{staticClass:"img-count"},[t._v("\n            "+t._s(s.img_count)+"\n          ")]):t._e()]),t._v(" "),i("div",{staticClass:"news-info"},[i("div",{staticClass:"left media-mark"},[t._v(t._s("小猪新闻"))]),t._v(" "),s.comment_count_show&&0!=s.comment_count_show?i("div",{staticClass:"cmt-num right"},[t._v("\n            "+t._s(t.agreeDataFormat(s.comment_count_show))+"评\n          ")]):t._e()])])]})),t._v(" "),t.isLoad?i("div",{staticClass:"loadRecommend"},[i("img",{staticClass:"loadding-img",attrs:{src:"/pigNews/dist//img/loadding.gif"}}),t._v("正在加载中\n    ")]):i("div",{staticClass:"moreRecommend",on:{click:t.onClickBottom}},[t._v("\n      "+t._s(t.tipText)+"\n    ")])],2),t._v(" "),i("FooterView",{attrs:{pageKey:"photos"}})],1)};e._withStripped=!0;var a=i(2),o=i.n(a),n=i(23),c=i(24),r={props:{dataApi:{type:String},params:{type:Object}},data:function(){return{newsList:[],idList:[],tipText:"上划或点击查看更多",isLoad:!1,isAlive:!0,scrollHelper:{},isFirstVisit:!0,page:1,page_size:10}},components:{FooterView:n.a},created:function(){this.getNews()},mounted:function(){this.isFirstVisit=!1,this.scrollHelper=Object(c.a)({container:window,target:"#newsBox",triggerDistance:100,callBack:this.getMoreNews,time:30}),this.scrollHelper.start()},activated:function(){this.isAlive=!0,this.scrollHelper.start()},deactivated:function(){this.isAlive=!1,this.scrollHelper.stop()},methods:{onReachBottom:function(){this.getMoreNews()},onClickBottom:function(){this.getMoreNews()},getMoreNews:function(){this.isAlive&&(this.page+=1,this.getNews())},getNews:function(){if(!this.isLoad){this.isLoad=!0;var t=(new Date).getTime(),s=this;(window.$||window.jQuery).ajax({url:s.dataApi,data:o()({num:s.page_size,page:s.page},s.params),timeout:1e4,dataType:"jsonp",cache:!0,jsonpCallback:"callbackFunction_"+t,success:function(t){if(t){var i=t;if(0!==i.length){for(var e=0,a=i.length;e<a;e++){var o=i[e];s.idList.indexOf(o.uuid)<0&&(s.newsList.push(o),s.idList.push(o.uuid))}s.newsList=Object.assign([],s.newsList)}else s.tipText="没有更多了哟"}s.isLoad=!1}})}},agreeDataFormat:function(t){return t&&t<=9999?t:t&&t>9999?Math.floor(t/1e3)/10+"w":void 0}}},l=(i(26),i(1)),p=Object(l.a)(r,e,[],!1,null,null,null);p.options.__file="src/pages/common/photos.vue";s.a=p.exports},48:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this.$createElement;return(this._self._c||t)("CommonPhotos",{attrs:{params:this.params,dataApi:this.dataApi}})};e._withStripped=!0;var a=i(28),o=i(25),n={data:function(){return{dataApi:o.a.photosData,params:{ch:"2",cid:"jx"}}},components:{CommonPhotos:a.a},mounted:function(){this.$store.commit("currentPhotoPage","jx")}},c=i(1),r=Object(c.a)(n,e,[],!1,null,null,null);r.options.__file="src/pages/photo/jx.vue";s.default=r.exports}}]);