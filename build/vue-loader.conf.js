'use strict';
const utils = require('./utils/loaderUtils');
const config = require('../config/index');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction // 生产环境sourceMap是true
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    environment: isProduction ? 'prod' : 'dev', // 生产环境下：将相关的样式内容提取出来合并到一个文件中
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
};
