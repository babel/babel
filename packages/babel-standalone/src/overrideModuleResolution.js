/**
 * babel-loader causes problems as it's not part of the monorepo. It pulls in
 * an older version of babel-core (the version referenced by the root
 * package.json), rather than the version of babel-core that's in the repo. The
 * only way to solve this without moving babel-loader into the monorepo is to
 * override Node's module resolution algorithm to specify a custom resolver for
 * babel-core to *force* it to use our version.
 *
 * Here be dragons.
 */

const Module = require("module");

module.exports = function overrideModuleResolution() {
  const originalLoader = Module._load.bind(Module);

  Module._load = function babelStandaloneLoader(request, parent, isMain) {
    // Redirect babel-core to version in the repo.
    if (request === "babel-core") {
      request = __dirname + "/../../babel-core";
    }
    return originalLoader(request, parent, isMain);
  };
};
