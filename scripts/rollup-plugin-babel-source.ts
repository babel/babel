import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

/**
 * Rollup plugin to load Babel source files directly from the monorepo.
 * It resolves Babel packages to their `src` directory.
 * It also resolves `@babel/runtime/regenerator` to the correct path.
 * @returns {import("rollup").Plugin} - The Rollup plugin.
 */
export default function (): import("rollup").Plugin {
  return {
    name: "babel-source",
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

      const matches = /^@babel\/(?<pkg>[^/]+)(?:\/lib\/(?<internal>.*))?$/.exec(
        importee
      );
      if (!matches) return null;
      // @ts-expect-error pkg and internal are the names of capturing groups
      const { pkg, internal } = matches.groups;

      // resolve babel package names to their src index file
      const packageFolder = path.join(monorepoRoot, "packages", `babel-${pkg}`);

      let packageJsonSource;
      try {
        packageJsonSource = fs.readFileSync(
          path.join(packageFolder, "package.json"),
          "utf8"
        );
      } catch (_) {
        // Some Babel packages aren't in this repository
        return null;
      }

      const packageJson = JSON.parse(packageJsonSource);

      const filename = internal
        ? `src/${internal}`
        : typeof packageJson.browser === "string"
          ? packageJson.browser
          : packageJson.main;

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
