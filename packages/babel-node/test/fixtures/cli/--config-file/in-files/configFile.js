module.exports = function (api) {
  api.cache.forever();

  console.log("Config was loaded, so --config-file was used.");

  return {};
};
