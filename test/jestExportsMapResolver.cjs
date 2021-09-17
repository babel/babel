// Temporary workaround for https://github.com/facebook/jest/issues/9771
// Source: https://github.com/facebook/jest/issues/9771#issuecomment-841624042

const enhancedResolve = require("enhanced-resolve");

const EXTENSIONS = [".js", ".json", ".node", ".ts"];

function mapGetOr(map, key, init) {
  if (!map.has(key)) {
    map.set(key, init());
  }
  return map.get(key);
}

const resolversCache = new Map();
function getResolver(conditionNames) {
  const cacheKeySeparator = ":::";
  const cacheKey = conditionNames.join(cacheKeySeparator);

  return mapGetOr(resolversCache, cacheKey, () =>
    enhancedResolve.create.sync({
      conditionNames,
      extensions: EXTENSIONS,
    })
  );
}

module.exports = function (request, options) {
  const resolver = getResolver(options.conditions || ["default"]);
  return resolver(options.basedir, request);
};
