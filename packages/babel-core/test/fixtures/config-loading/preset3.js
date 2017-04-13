module.exports = function(api, options) {
  api.cache.using(() => process.env.INVALIDATE_PRESET3);

  return {
    plugins: [
      [require('./plugin5.js'), options],
    ],
  };
};
