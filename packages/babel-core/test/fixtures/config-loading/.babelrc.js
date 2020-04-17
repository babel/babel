module.exports = function(api) {
  api.cache.using(() => process.env.INVALIDATE_BABELRC);

  return {
    plugins: [
      "./plugin1",
      "./plugin2",
    ],
    presets: [
      "./preset1",
      "./preset2",
    ],
  }
};
