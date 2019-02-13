import corejs3Polyfills from "core-js-compat/data";
import getModulesListForTargetVersion from "./get-modules-list-for-target-version";
import filterItems from "../../filter-items";
import {
  intersection,
  createImport,
  isCoreJSSource,
  isCoreJSRequire,
  isBabelPolyfillSource,
  isBabelPolyfillRequire,
} from "../../utils";
import { logEntryPolyfills } from "../../debug";

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

export default function(
  { types: t },
  { corejs, include, exclude, polyfillTargets, debug },
) {
  const polyfills = filterItems(
    corejs3Polyfills,
    include,
    exclude,
    polyfillTargets,
  );

  const available = getModulesListForTargetVersion(corejs);

  const isPolyfillImport = {
    ImportDeclaration(path) {
      if (path.node.specifiers.length === 0) {
        const module = path.node.source.value;
        if (isBabelPolyfillSource(module)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSSource(module);
          if (modules) {
            this.replaceBySeparateModulesImport(path, modules);
          }
        }
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isBabelPolyfillRequire(t, bodyPath)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSRequire(t, bodyPath);
          if (modules) {
            this.replaceBySeparateModulesImport(bodyPath, modules);
          }
        }
      });
    },
  };

  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,
    pre() {
      this.importPolyfillIncluded = false;
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function(path, modules) {
        this.importPolyfillIncluded = true;

        for (const module of modules) {
          this.polyfillsSet.add(module);
        }

        path.remove();
      };
    },
    post({ path }) {
      const filtered = intersection(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        createImport(path, module);
      }

      if (debug) {
        logEntryPolyfills(
          "core-js",
          this.importPolyfillIncluded,
          filtered,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
  };
}
