import Vue from 'vue';
import Router from 'vue-router';
import pageRouterList from './config';

Vue.use(Router);
const PhotosPage = () => import('$pages/photos');
const VideosPage = () => import('$pages/videos');
const NewsPage = () => import('$pages/news');
// 各类视频集锦
const NewVideos = () => import('$pages/video/New');
const NBAVideos = () => import('$pages/video/NBA');
const FootballVideos = () => import('$pages/video/Football');
// 各类高清视频
const jxPhotos = () => import('$pages/photo/jx');
const NBAPhotos = () => import('$pages/photo/NBA');
const CBAPhotos = () => import('$pages/photo/CBA');
const ChinaFootballPhotos = () => import('$pages/photo/chinaFootball');
const GlobalFootballPhotos = () => import('$pages/photo/globalFootball');
const othersportPhotos = () => import('$pages/photo/othersport');
const premiershipPhotos = () => import('$pages/photo/premiership');
const serieaPhotos = () => import('$pages/photo/seriea');
const laligaPhotos = () => import('$pages/photo/laliga');
const chLeaguePhotos = () => import('$pages/photo/chLeague');
const tennisPhotos = () => import('$pages/photo/tennis');
const golfPhotos = () => import('$pages/photo/golf');
const schoolbasketPhotos = () => import('$pages/photo/schoolbasket');
const f1Photos = () => import('$pages/photo/f1');
const chessPhotos = () => import('$pages/photo/chess');
const Page3v3Photos = () => import('$pages/photo/3v3');
const euro2016Photos = () => import('$pages/photo/euro2016');
const horsemanshipPhotos = () => import('$pages/photo/horsemanship');

export default new Router({
  mode: 'hash', // hash/history
  base: pageRouterList.baseRoute,
  routes: [
    {
      path: '',
      name: 'Default',
      component: NewsPage,
    },
    {
      path: pageRouterList.news,
      name: 'news',
      component: NewsPage,
    },
    {
      path: pageRouterList.photos,
      name: 'photos',
      component: PhotosPage,
      children: [
        {
          path: '',
          name: 'jx-photos',
          component: jxPhotos,
        },
        {
          path: 'NBA',
          name: 'NBA-photos',
          component: NBAPhotos,
        },
        {
          path: 'CBA',
          name: 'CBA-photos',
          component: CBAPhotos,
        },
        {
          path: 'chinaFootball',
          name: 'chinaFootball-photos',
          component: ChinaFootballPhotos,
        },
        {
          path: 'globalFootball',
          name: 'globalFootball-photos',
          component: GlobalFootballPhotos,
        },
        {
          path: 'othersport',
          name: 'othersport-photos',
          component: othersportPhotos,
        },
        {
          path: 'premiership',
          name: 'premiership-photos',
          component: premiershipPhotos,
        },

        {
          path: 'seriea',
          name: 'seriea-photos',
          component: serieaPhotos,
        },
        {
          path: 'laliga',
          name: 'laliga-photos',
          component: laligaPhotos,
        },
        {
          path: 'chLeague',
          name: 'chLeague-photos',
          component: chLeaguePhotos,
        },
        {
          path: 'tennis',
          name: 'tennis-photos',
          component: tennisPhotos,
        },
        {
          path: 'golf',
          name: 'golf-photos',
          component: golfPhotos,
        },
        {
          path: 'schoolbasket',
          name: 'schoolbasket-photos',
          component: schoolbasketPhotos,
        },
        {
          path: 'f1',
          name: 'f1-photos',
          component: f1Photos,
        },
        {
          path: 'chess',
          name: 'chess-photos',
          component: chessPhotos,
        },
        {
          path: '3v3',
          name: '_3v3-photos',
          component: Page3v3Photos,
        },
        {
          path: 'euro2016',
          name: 'euro2016-photos',
          component: euro2016Photos,
        },
        {
          path: 'horsemanship',
          name: 'horsemanship-photos',
          component: horsemanshipPhotos,
        },
      ],
    },
    {
      path: pageRouterList.videos,
      name: 'videos',
      component: VideosPage,
      children: [
        {
          path: '',
          name: 'new-videos',
          component: NewVideos,
        },
        {
          path: 'NBA',
          name: 'NBA-videos',
          component: NBAVideos,
        },
        {
          path: 'football',
          name: 'football-videos',
          component: FootballVideos,
        },
      ],
    },
    {
      // 其他入口
      path: '/*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    // tab页切换的时候滚动到页面头部
    return { x: 0, y: 0 };
  },
});
