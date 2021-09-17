// Temporary workaround for https://github.com/facebook/jest/issues/9771
// Source: https://github.com/facebook/jest/issues/9771#issuecomment-841624042

const enhancedResolve = require("enhanced-resolve");

const EXTENSIONS = [".js", ".json", ".node", ".ts"];

const resolvers = new Map();
function getResolver(conditionNames) {
  const key = conditionNames.join(":::");

  let resolver = resolvers.get(key);
  if (!resolver) {
    resolver = enhancedResolve.create.sync({
      conditionNames,
      extensions: EXTENSIONS,
    });
    resolvers.set(key, resolver);
  }

  return resolver;
}

module.exports = function (request, options) {
  const resolver = getResolver(options.conditions || ["default"]);
  return resolver(options.basedir, request);
};
