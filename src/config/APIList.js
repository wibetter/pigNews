// 获取数据API的根地址
const _protocal = window.location.protocol;

/**
 * 特别备注：以下接口是从新浪新浪H5页抓取的相关数据接口，主要用于填充页面的模型数据，仅供学习使用，请勿用于商业用途
 */
const APIList = {
  lastestVideos: `${_protocal}//interface.sina.cn/sports/video_latest.d.json`, // 最新视频集锦
  videosData: `${_protocal}//interface.sina.cn/video/column_data.d.html`, // 视频集锦数据接口
  photosData: `${_protocal}//photo.sina.cn/aj/v2/channel`, // 高清图集
  newsData: `${_protocal}//interface.sina.cn/wap_api/col_data.d.html`, // 滚动资讯
  recommend: `${_protocal}//cre.dp.sina.cn/_dataApi_api1/api/v3/get`, // 相关推荐:cre.dp.sina.cn
  comment: `${_protocal}//interface.sina.cn/wap_api/article_getall.d.json`, // 热门评论
  support: `${_protocal}//comment5.news.sina.com.cn/cmnt/vote`, // 点赞
};

export default APIList;
