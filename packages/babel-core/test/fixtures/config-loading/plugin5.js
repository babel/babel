module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN5);

  return {
    name: "plugin5",
  };
};
