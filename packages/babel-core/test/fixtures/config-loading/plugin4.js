module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN4);

  return {
    name: "plugin4",
  };
};
