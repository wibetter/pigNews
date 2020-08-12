'use strict';
require('./check-versions')();
const config = require('../config');

/**
 * 如果 Node 的环境无法判断当前是 dev / product 环境
 * 使用 config.dev.env.NODE_ENV 作为当前的环境
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env.NODE_ENV;
}

// 此时process.env.NODE_ENV = ‘development’;

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const { createProxyMiddleware } = require('http-proxy-middleware');

const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
const port = process.env.PORT || config.dev.port;

// automatically open browser, if not set will be false
//是否自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
const proxyTable = config.dev.proxyTable;

// 使用 express 启动一个服务
const app = express();
const compiler = webpack(webpackConfig); // 启动 webpack 进行编译

// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
});
// force page reload when html-webpack-plugin src changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(context, createProxyMiddleware(options));
});

// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// serve pure public assets
// 拼接 public 文件夹的静态资源路径
const staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory,
);

app.use(staticPath, express.static(path.resolve(__dirname, '../public')));

let _resolve;
let _reject;
const readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve;
  _reject = reject;
});

let server;
const portfinder = require('portfinder');
portfinder.basePort = port;

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err);
    }
    process.env.PORT = port;
    const uri = 'http://' + config.dev.hostname + ':' + port;
    console.log('> Listening at ' + uri + '\n');
    // 如果是开发环境，自动打开浏览器并跳到项目首页
    if (autoOpenBrowser && process.env.NODE_ENV === 'development') {
      opn(uri);
    }
    server = app.listen(port);
    _resolve();
  });
});

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
