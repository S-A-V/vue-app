const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const NODE_ENV_PRODUCTION = 'production';

// 默认配置
const {
  NODE_ENV = 'development',
  BUILD_ID = 'local',
  ENV = 'staging',
  MODULE,
  LOCAL_HOST = '127.0.0.1',
  LOCAL_PORT = 8000,
} = process.env;

function getEnvParams() {
  const processEnv = {};

  const defaultEnv = {
    ENV,
    MODULE,
  };

  Object.keys(defaultEnv).forEach((key) => {
    processEnv[key] = defaultEnv[key];
  });

  // 读取 modules.yml 中定义的模块，获取应用配置
  yaml.load(
    fs.readFileSync(
      path.resolve(__dirname, '../modules.yml'),
      'utf8',
    ),
  )
    .modules
    .forEach((module) => {
      if (module.name === processEnv.MODULE) {
        const { name } = module.frontend;
        processEnv.APP_NAME = name.zh === name.en ? name.zh : `${name.zh} | ${name.en}`;
      }
    });

  return processEnv;
}

module.exports = {
  NODE_ENV,
  BUILD_ID,
  ENV,
  MODULE,
  LOCAL_HOST,
  LOCAL_PORT,
  isProduction: NODE_ENV === NODE_ENV_PRODUCTION,
  processEnv: getEnvParams(),
};
