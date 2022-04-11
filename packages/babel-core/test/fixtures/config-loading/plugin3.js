module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN3);

  return {
    name: "plugin3",
  };
};
