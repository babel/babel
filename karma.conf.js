module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['browserify', 'mocha'],

    files: [
      'test/browser.js'
    ],

    exclude: [],

    preprocessors: {
      'test/browser.js': ['browserify']
    },

    browserify: {
      debug: true
    },

    client: {
      mocha: {
        reporter: 'dot',
        ui: 'tdd'
      }
    },

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_WARN,

    autoWatch: false,

    browsers: ['Firefox'],

    singleRun: true
  })
}
