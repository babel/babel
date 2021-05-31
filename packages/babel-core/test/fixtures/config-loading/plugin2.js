module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN2);

  return {
    name: "plugin2",
  };
};
