const fs = require('fs');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');
const utils = require('./utils');

function getModuleAlias() {
  const modulesMap = {};
  // 读取 modules 目录下的所有模块
  fs.readdirSync(utils.resolveProjectPath('modules')).forEach((item) => {
    modulesMap[`@${item}`] = utils.resolveProjectPath('modules', item);
  });
  return modulesMap;
}

const commonConfig = {
  mode: config.NODE_ENV,
  context: utils.resolveProjectPath(),
  entry: utils.resolveModulePath('main.js'),
  resolve: {
    symlinks: !config.isProduction,
    modules: utils.resolveNodeModules(),
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@frontend': utils.resolveProjectPath('src'),
      '@': utils.resolveModulePath(),
      ...getModuleAlias(),
      vue$: utils.resolveProjectPath('node_modules/vue/dist/vue.esm.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                utils.resolveProjectPath('src/styles/*.scss'),
                utils.resolveModulePath('styles/*.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.resolveOutputPath('images/[name].[hash:6].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.resolveOutputPath('fonts/[name].[hash:6].[ext]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.processEnv),
    }),
    new VueLoaderPlugin(),
  ],
};

// const copyPaths = [];
// if (fs.existsSync(utils.resolveModulePath('libs'))) {
//   copyPaths.push({
//     from: utils.resolveModulePath('libs'),
//     to: utils.resolveOutputPath('libs'),
//   });
// }
// if (fs.existsSync(utils.resolveModulePath('assets'))) {
//   copyPaths.push({
//     from: utils.resolveModulePath('assets'),
//     to: utils.resolveOutputPath('../assets'),
//   });
// }

// if (copyPaths.length) {
//   commonConfig.plugins.push(new CopyWebpackPlugin(copyPaths));
// }

// if (config.ENABLE_BUNDLE_ANALYZER_REPORT) {
//   commonConfig.plugins.push(new BundleAnalyzerPlugin());
// }

module.exports = commonConfig;
