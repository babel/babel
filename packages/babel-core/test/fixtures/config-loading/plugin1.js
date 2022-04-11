module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN1);

  return {
    name: "plugin1",
  };
};
