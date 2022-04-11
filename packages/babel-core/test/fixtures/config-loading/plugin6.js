module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_PLUGIN6);

  return {
    name: "plugin6",
  };
};
