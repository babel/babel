import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const BABEL_SRC_REGEXP =
  path.sep === "/"
    ? /packages\/(babel-[^/]+)\/src\//
    : /packages\\(babel-[^\\]+)\\src\\/;

export default function () {
  return {
    name: "babel-source",
    load(id) {
      const matches = id.match(BABEL_SRC_REGEXP);
      if (matches) {
        // check if browser field exists for this file and replace
        const packageFolder = path.join(monorepoRoot, "packages", matches[1]);
        const packageJson = require(path.join(packageFolder, "package.json"));

        if (
          packageJson["browser"] &&
          typeof packageJson["browser"] === "object"
        ) {
          for (const nodeFile in packageJson["browser"]) {
            const browserFileAsJs = packageJson["browser"][nodeFile].replace(
              /^(\.\/)?lib\//,
              "src/"
            );

            const browserFileAsTs = browserFileAsJs.replace(/.js$/, ".ts");
            const browserFile = fs.existsSync(browserFileAsTs)
              ? browserFileAsTs
              : browserFileAsJs;

            const nodeFileSrcAsJs = path.normalize(
              nodeFile.replace(/^(\.\/)?lib\//, "src/")
            );
            const nodeFileSrcAsTs = nodeFileSrcAsJs.replace(/.js$/, ".ts");
            const nodeFileSrc = fs.existsSync(nodeFileSrcAsTs)
              ? nodeFileSrcAsTs
              : nodeFileSrcAsJs;

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
          monorepoRoot,
          "packages",
          "babel-runtime",
          "regenerator",
          "index.js"
        );
      }

      const matches = importee.match(
        /^@babel\/(?<pkg>[^/]+)(?:\/lib\/(?<internal>.*?))?$/
      );
      if (!matches) return null;
      const { pkg, internal } = matches.groups;

      // resolve babel package names to their src index file
      const packageFolder = path.join(monorepoRoot, "packages", `babel-${pkg}`);

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

      const filename = internal
        ? `src/${internal}`
        : typeof packageJson["browser"] === "string"
        ? packageJson["browser"]
        : packageJson["main"];

      let asJS = path.normalize(
        path.join(
          packageFolder,
          // replace lib with src in the package.json entry
          filename.replace(/^(\.\/)?lib\//, "src/")
        )
      );
      if (!/\.[a-z]+$/.test(asJS)) asJS += ".js";
      const asTS = asJS.replace(/\.js$/, ".ts");

      return fs.existsSync(asTS) ? asTS : asJS;
    },
  };
}
