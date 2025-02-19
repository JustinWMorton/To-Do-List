const { addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config) {
  config = addWebpackAlias({
    '@core': path.resolve(__dirname, 'src/core'),
    '@ui': path.resolve(__dirname, 'src/shared/ui'),
    '@pages': path.resolve(__dirname, 'src/features/home-page/pages'),
    '@contexts': path.resolve(__dirname, 'src/core/contexts')
  })(config);
  return config;
};
