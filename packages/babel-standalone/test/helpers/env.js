export function setup() {
  // chalk, which we bundle in @babel/standalone, relies on `window.navigator`
  // for the browser build:
  // https://github.com/chalk/chalk/blob/f399cd0ff69841e88cca89d43a49f1cc9ba2efd5/source/vendor/supports-color/browser.js#L4
  // We only bundle Chalk 5 in local dev and in Babel 8, so we avoid this
  // "polyfill" when releasing Babel 7 to make sure that we do not accidentally
  // bundle Chalk 5.

  if (!process.env.IS_PUBLISH || process.env.BABEL_8_BREAKING) {
    globalThis.navigator = {};
  }
}

export function teardown() {
  if (!process.env.IS_PUBLISH || process.env.BABEL_8_BREAKING) {
    delete globalThis.navigator;
  }
}
