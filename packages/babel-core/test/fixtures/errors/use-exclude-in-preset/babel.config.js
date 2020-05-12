module.exports = function myConfig(api) {
  api.cache.never();
  return { presets: ["./my-preset.js"] };
};
