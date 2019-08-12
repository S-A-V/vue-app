const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');
const utils = require('./utils');

// const moduleWebpackConfig = utils.resolveModuleWebpackConfig('build/webpack.release.js');
// if (moduleWebpackConfig) {
//   module.exports = moduleWebpackConfig;
//   return;
// }

const webpackConfig = {
  output: {
    path: utils.resolveDistPath('modules', config.MODULE),
    filename: utils.resolveOutputPath('scripts/[name].[chunkhash].js'),
    chunkFilename: utils.resolveOutputPath('scripts/[name].[chunkhash].js'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
      chunks: 'all',
      minChunks: 1,
      maxSize: 5000000,
      minSize: 1000000,
      name: false,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: 20,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      filename: utils.resolveOutputPath('../index.html'),
      template: utils.resolveTemplateFile(),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      templateParameters: {
        OUTPUT_PATH: `/${config.BUILD_ID}`,
        MODULE_PATH: '',
        APP_NAME: config.processEnv.APP_NAME,
      },
    }),
    new CopyPlugin([
      {
        from: utils.resolveModulePath('favicon.ico'),
        to: utils.resolveOutputPath('../favicon.ico'),
      },
    ]),
  ],
};

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, webpackConfig);
