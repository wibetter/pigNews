// 获取页面根地址
const Config = window.PAGEDATA.Config || {};
const routeBasePath = Config.routeBasePath;
// 路由清单
const pageRouterList = {
  baseRoute: routeBasePath,
  news: '/news', // 滚动资讯
  photos: '/photos', // 图集新闻
  videos: '/videos', // 视频资讯
};
export default pageRouterList;
