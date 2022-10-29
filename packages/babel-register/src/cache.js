// File moved to ./worker/cache.js
// TODO: Remove this backward-compat "proxy file" in Babel 8
if (process.env.BABEL_8_BREAKING) {
  module.exports = require("./worker/cache");
} else if (global.TEST_USE_NEW_CACHE ?? !process.env.BABEL_CACHE_PATH) {
  module.exports = require("./worker/cache");
} else {
  module.exports = require("./worker/cache-legacy");
}
