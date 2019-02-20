import corejs3Polyfills from "core-js-compat/data";
import corejsEntries from "core-js-compat/entries";
import getModulesListForTargetVersion from "core-js-compat/get-modules-list-for-target-version";
import filterItems from "../../filter-items";
import {
  has,
  intersection,
  createImport,
  getImportSource,
  getRequireSource,
} from "../../utils";
import { logEntryPolyfills } from "../../debug";

function isBabelPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "babel-polyfill";
}

function isCoreJSSource(source) {
  return has(corejsEntries, source) && corejsEntries[source];
}

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

export default function(
  _,
  { corejs, include, exclude, polyfillTargets, debug },
) {
  const polyfills = filterItems(
    corejs3Polyfills,
    include,
    exclude,
    polyfillTargets,
  );

  const available = new Set(getModulesListForTargetVersion(corejs.version));

  const isPolyfillImport = {
    ImportDeclaration(path) {
      const source = getImportSource(path);
      if (!source) return;
      if (isBabelPolyfillSource(source)) {
        console.warn(BABEL_POLYFILL_DEPRECATION);
      } else {
        const modules = isCoreJSSource(source);
        if (modules) {
          this.replaceBySeparateModulesImport(path, modules);
        }
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        const source = getRequireSource(bodyPath);
        if (!source) return;
        if (isBabelPolyfillSource(source)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSSource(source);
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
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function(path, modules) {
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
          this.polyfillsSet.size,
          filtered,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
  };
}
