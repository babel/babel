"use strict";
const path = require("path");

const HELPER_MODULE = "@babel/helper-caching";
const CORE_MODULE = "@babel/core";

module.exports = {
  swapPackageWithKey,
  buildCacheKey,
};

function swapPackageWithKey(srcPath) {
  return srcPath.replace(/package.json$/, path.join("lib", "_cache-key.js"));
}

function buildCacheKey(pkgPath, pkgContent) {
  const json = JSON.parse(pkgContent);
  const name = json.name;
  const version = json.version;
  const scripts = json.scripts;
  const peerDependencies = json.peerDependencies || {};
  const dependencies = json.dependencies || {};

  const deps = Object.keys(dependencies).reduce((acc, name) => {
    if (name === "babylon" || /^@babel\//.test(name)) {
      acc.push(`require(${JSON.stringify(name)}).CACHE_KEY`);
    }

    return acc;
  }, []);

  let content;

  if (name === HELPER_MODULE) {
    if (deps.length !== 0) throw new Error("Unexpected babel dependencies.");

    // Keep things simple for Babylon and the helper itself since they doesn't
    // really have any Babel-specific deps at the moment, so the name and version is fine.
    content = `
      "use strict";
      module.exports = {
        inspect: function() {
          return {
            name: ${JSON.stringify(name)},
            version: ${JSON.stringify(version)}
          };
        },
        toString: function() {
          return ${JSON.stringify(`${name}@${version}`)};
        }
      };
    `;
  } else if (
    scripts &&
    scripts.version === "node ../../scripts/lerna-version.js"
  ) {
    let cachingModule;
    if (CORE_MODULE in peerDependencies) {
      cachingModule = `require("@babel/core").caching`;
    } else if (HELPER_MODULE in dependencies) {
      cachingModule = `require("@babel/helper-caching").default`;
    } else {
      throw new Error(
        `${pkgPath} uses _cache-key and must depend on @babel/core or @babel/helper-caching`
      );
    }

    content = `
      "use strict";
      var k = ${cachingModule};

      module.exports = k.obj({
        name: ${JSON.stringify(name)},
        version: ${JSON.stringify(version)},
        dependencies: k.obj([
          ${`${deps.join(",\n          ")}`}
        ])
      });
    `;
  } else {
    return null;
  }

  return {
    name: swapPackageWithKey(pkgPath),
    content:
      content.replace(/(^|\r?\n) {6}/g, "$1").replace(/^\s+|\s+$/g, "") + "\n",
  };
}
