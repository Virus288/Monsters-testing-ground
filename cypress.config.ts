import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: false,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: require('./.erb/configs/webpack.config.base'),
    },
  },
  e2e: {
    setupNodeEvents() {},
    baseUrl: 'http://localhost:1212/',
  },
});
