'use strict';
require('eventsource-polyfill');
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

// 实现热更新
hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
