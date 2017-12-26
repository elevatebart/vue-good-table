const wallabyWebpack = require('wallaby-webpack')
const webpackConfig = require('./build/webpack.test.conf')

module.exports = function (wallaby) {
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.js = ''
  webpackConfig.resolve.alias = {'@': require('path').join(wallaby.projectCacheDir, 'src'), 'vue$': 'vue/dist/vue.esm.js'}
  webpackConfig.externals = {vue: 'Vue'}
  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'node_modules/vue/dist/vue.js', instrument: false},
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false},
      {pattern: 'src/**/*.*', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({}),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    },

    tests: [
      {pattern: 'test/unit/**/*.spec.js', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    testFramework: 'mocha',

    setup: function () {
      /* global chai */
      // eslint-disable-next-line
      Vue.config.errorHandler = function (err) {
        throw err
      }
      window.chai = chai
      window.expect = chai.expect
      window.assert = chai.assert
      window.should = undefined
      window.should = chai.should()
      window.__moduleBundler.loadTests()
    }
  }
}
