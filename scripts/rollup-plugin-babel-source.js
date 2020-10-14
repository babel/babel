const path = require("path");
const fs = require("fs");
const dirname = path.join(__dirname, "..");

const BABEL_SRC_REGEXP =
  path.sep === "/"
    ? /packages\/(babel-[^/]+)\/src\//
    : /packages\\(babel-[^\\]+)\\src\\/;

module.exports = function () {
  return {
    name: "babel-source",
    load(id) {
      const matches = id.match(BABEL_SRC_REGEXP);
      if (matches) {
        // check if browser field exists for this file and replace
        const packageFolder = path.join(dirname, "packages", matches[1]);
        const packageJson = require(path.join(packageFolder, "package.json"));

        if (
          packageJson["browser"] &&
          typeof packageJson["browser"] === "object"
        ) {
          for (const nodeFile in packageJson["browser"]) {
            const browserFile = packageJson["browser"][nodeFile].replace(
              /^(\.\/)?lib\//,
              "src/"
            );
            const nodeFileSrc = path.normalize(
              nodeFile.replace(/^(\.\/)?lib\//, "src/")
            );
            if (id.endsWith(nodeFileSrc)) {
              if (browserFile === false) {
                return "";
              }
              return fs.readFileSync(
                path.join(packageFolder, path.normalize(browserFile)),
                "UTF-8"
              );
            }
          }
        }
      }
      return null;
    },
    resolveId(importee) {
      if (importee === "@babel/runtime/regenerator") {
        return path.join(
          dirname,
          "packages",
          "babel-runtime",
          "regenerator",
          "index.js"
        );
      }

      const matches = importee.match(/^@babel\/([^/]+)$/);
      if (!matches) return null;

      // resolve babel package names to their src index file
      const packageFolder = path.join(
        dirname,
        "packages",
        `babel-${matches[1]}`
      );

      let packageJsonSource;
      try {
        packageJsonSource = fs.readFileSync(
          path.join(packageFolder, "package.json")
        );
      } catch (e) {
        // Some Babel packages aren't in this repository
        return null;
      }

      const packageJson = JSON.parse(packageJsonSource);

      const filename =
        typeof packageJson["browser"] === "string"
          ? packageJson["browser"]
          : packageJson["main"];

      return path.normalize(
        path.join(
          packageFolder,
          // replace lib with src in the package.json entry
          filename.replace(/^(\.\/)?lib\//, "src/")
        )
      );
    },
  };
};
