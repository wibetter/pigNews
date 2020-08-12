'use strict';
require('./check-versions')();

//内置模块
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');

//引入生产环境配置信息
let webpackConfig = require('./webpack.prod.conf');

/**
 * 如果 Node 的环境无法判断当前是 dev / product 环境
 * 使用 config.dev.env.NODE_ENV 作为当前的环境
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.build.env.NODE_ENV; // 将运行环境设置为生产环境
}

const spinner = ora('building for production...');
spinner.start();

rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  (err) => {
    if (err) throw err;
    webpack(webpackConfig, function(err, stats) {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n\n',
      );

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
      }

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(
        chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
            "  Opening index.html over file:// won't work.\n",
        ),
      );
    });
  },
);
