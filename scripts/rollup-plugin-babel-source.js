const path = require("path");
const fs = require("fs");
const dirname = path.join(__dirname, "..");

module.exports = function() {
  return {
    name: "babel-source",
    load(id) {
      const matches = id.match(/packages\/(babel-[^/]+)\/src\//);
      if (matches) {
        // check if browser field exists for this file and replace
        const packageFolder = path.join(dirname, "packages", matches[1]);
        const packageJson = require(path.join(packageFolder, "package.json"));

        if (
          packageJson["browser"] &&
          typeof packageJson["browser"] === "object"
        ) {
          for (let nodeFile in packageJson["browser"]) {
            const browserFile = packageJson["browser"][nodeFile].replace(
              /^(\.\/)?lib\//,
              "src/"
            );
            nodeFile = nodeFile.replace(/^(\.\/)?lib\//, "src/");
            if (id.endsWith(nodeFile)) {
              if (browserFile === false) {
                return "";
              }
              return fs.readFileSync(
                path.join(packageFolder, browserFile),
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
      if (matches) {
        const packageFolderName = `babel-${matches[1]}`;

        // resolve babel package names to their src index file
        const packageFolder = path.join(dirname, "packages", packageFolderName);
        const packageJson = require(path.join(packageFolder, "package.json"));

        const filename =
          typeof packageJson["browser"] === "string"
            ? packageJson["browser"]
            : packageJson["main"];

        return path.join(
          packageFolder,
          // replace lib with src in the pkg.json entry
          filename.replace(/^(\.\/)?lib\//, "src/")
        );
      }

      return null;
    },
  };
};
