module.exports = function(api, options) {
  api.cache.using(() => process.env.INVALIDATE_PRESET1);

  return {
    plugins: [
      [require('./plugin3.js'), options],
    ],
  };
};
