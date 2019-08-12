const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const config = require('./config');
const utils = require('./utils');

utils.setBashTitle(`Webpack: ${config.MODULE}`);

// const moduleWebpackConfig = utils.resolveModuleWebpackConfig('build/webpack.local.js');

// if (moduleWebpackConfig) {
//   module.exports = moduleWebpackConfig;
//   return;
// }

const webpackConfig = {
  devtool: 'source-map',
  output: {
    path: utils.resolveProjectPath(),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    host: config.LOCAL_HOST,
    port: config.LOCAL_PORT,
    contentBase: utils.resolveProjectPath(),
    historyApiFallback: true,
    clientLogLevel: 'silent',
  },
  optimization: {
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.resolveTemplateFile(),
      inject: true,
      templateParameters: {
        OUTPUT_PATH: `/modules/${config.MODULE}`,
        MODULE_PATH: `/modules/${config.MODULE}`,
        APP_NAME: config.processEnv.APP_NAME,
      },
    }),
    new WebpackBuildNotifierPlugin({
      title: `Webpack: ${config.MODULE}`,
      suppressSuccess: true,
    }),
  ],
};

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, webpackConfig);
