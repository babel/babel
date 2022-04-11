module.exports = function(api, options) {
  api.cache.using(() => process.env.INVALIDATE_PRESET2);

  return {
    plugins: [
      [require('./plugin4.js'), options],
    ],
  };
};
