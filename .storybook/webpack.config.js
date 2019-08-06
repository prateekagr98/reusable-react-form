const path = require('path');

module.exports = async ({ config, mode }) => {

  config.resolve.alias = {
    "@decorators": path.resolve(__dirname, 'decorators/')
  }

  // Return the altered config
  return config;
};