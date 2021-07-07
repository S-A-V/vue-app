const path = require('path');
const fs = require('fs');

const config = require('./config');

function resolveRootPath(...args) {
  return path.resolve(__dirname, '../', ...args);
}

function resolveProjectPath(...args) {
  return path.resolve(__dirname, '../', ...args);
}

function resolveModulePath(...args) {
  return path.resolve(__dirname, '../modules', config.MODULE, ...args);
}

function resolveDistPath(...args) {
  return path.resolve(__dirname, '../dist', ...args);
}

function resolveOutputPath(...args) {
  return path.join(config.BUILD_ID, ...args);
}

function resolveCachePath(...args) {
  return path.resolve(__dirname, '../dist/.cache', config.MODULE, ...args);
}

function resolveTemplateFile() {
  const templates = ['index.html', 'index.ejs'];
  for (const tpl of templates) {
    if (fs.existsSync(resolveModulePath(tpl))) {
      return resolveModulePath(tpl);
    }
  }
  return resolveProjectPath('src/index.html');
}

function resolveNodeModules() {
  return [
    resolveModulePath('node_modules'),
    resolveProjectPath('node_modules'),
  ];
}

function resolveModuleWebpackConfig(file) {
  let webpackConfig = '';
  if (fs.existsSync(resolveModulePath(file))) {
    webpackConfig = resolveModulePath(file);
  }
  // eslint-disable-next-line import/no-dynamic-require
  return webpackConfig ? require(webpackConfig) : null;
}

function setBashTitle(title) {
  return process.stdout.write(`\u001b]0;${title}\u0007`);
}

module.exports = {
  resolveRootPath,
  resolveProjectPath,
  resolveModulePath,
  resolveDistPath,
  resolveOutputPath,
  resolveCachePath,
  resolveTemplateFile,
  resolveNodeModules,
  resolveModuleWebpackConfig,
  setBashTitle,
};
