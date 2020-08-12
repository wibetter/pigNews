'use strict';
const path = require('path');
const utils = require('./utils/loaderUtils');
const config = require('../config/index');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  /*
   entry的路径及其依赖的模块的路径默认相对于context的路径来描述，
   其中context默认为执行启动webpack时的所在当前工作目录
   */
  entry: {
    index: './src/index.js',
  },
  /*
   内置变量列表：
   id: chunk的唯一标识，从0开始；
   name: chunk的名称；
   hash: chunk的唯一标识的Hash值；
   chunkhash: chunk内容的Hash值；
   其中hash和chunkhash的长度是可以指定的，[hash:8]代表取8位的Hash值，默认是20位。
   */
  output: {
    path: config.build.assetsRoot, // 输出文件的存放在本地的目录
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production' // 引用地址：配置发布到线上资源的URL前缀
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  /**
   * 当webpack试图去加载模块的时候，它默认是查找以 .js 结尾的文件的
   */
  resolve: {
    // webpack的resolve配置
    extensions: ['.js', '.jsx', '.vue', 'json'], // 用于配置在尝试过程中用到的后缀列表
    alias: {
      $components: resolve('src/components'),
      $pages: resolve('src/pages'),
      $plugins: resolve('src/plugins'),
      $utils: resolve('src/utils'),
      $assets: resolve('src/assets'),
      $public: resolve('public'),
      $router: resolve('src/router'),
      $store: resolve('src/store'),
      $data: resolve('src/data'),
      $config: resolve('src/config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('public')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig, //配置vue-loader相关的loader插件
          },
        ],
        // 对应的options:
        // {
        //   loaders: [],
        //   transformToRequire: {
        //     video: 'src',
        //     source: 'src',
        //     img: 'src',
        //     image: 'xlink:href'
        //   }
        // }
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        include: [resolve('src'), resolve('test')],
      },
      {
        // 图片资源
        /*
          url-loader 功能类似于 file-loader，在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
         */
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        // 视频音频资源
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        // 字体资源
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(js|vue|css|html)$/,
        loader: 'params-replace-loader',
        include: [resolve('src'), resolve('test')],
        exclude: [resolve('src/mock/data')], // 排除不需要进行校验的文件夹
        options: config.envParams,
      },
    ],
  },
	plugins: [
		// 请确保引入这个插件来施展魔法
		new VueLoaderPlugin()
	]
};
