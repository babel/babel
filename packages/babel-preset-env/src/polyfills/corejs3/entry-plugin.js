import corejs3Polyfills from "core-js-compat/data";
import { filterItems } from "../../env-filter";
import { logEntryPolyfills } from "../../debug";
import {
  createImport,
  isCoreJSSource,
  isCoreJSRequire,
  isBabelPolyfillSource,
  isBabelPolyfillRequire,
} from "../../utils";
import getModulesListForTargetVersion from "./get-modules-list-for-target-version";

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

export default function(
  { types: t },
  { corejs, include, exclude, polyfillTargets, debug },
) {
  const polyfills = Array.from(
    filterItems(corejs3Polyfills, include, exclude, polyfillTargets),
  );

  const available = getModulesListForTargetVersion(corejs);

  const isPolyfillImport = {
    ImportDeclaration(path) {
      if (path.node.specifiers.length === 0) {
        const module = path.node.source.value;
        if (isBabelPolyfillSource(module)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const filter = isCoreJSSource(module);
          if (filter) {
            this.importPolyfillIncluded = true;
            this.polyfillsList.push(...polyfills.filter(it => filter.has(it)));
            path.remove();
          }
        }
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isBabelPolyfillRequire(t, bodyPath)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const filter = isCoreJSRequire(t, bodyPath);
          if (filter) {
            this.importPolyfillIncluded = true;
            this.polyfillsList.push(...polyfills.filter(it => filter.has(it)));
            bodyPath.remove();
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
      this.polyfillsList = [];
    },
    post({ path }) {
      for (const module of Array.from(new Set(this.polyfillsList)).reverse()) {
        if (available.has(module)) createImport(path, module);
      }

      if (debug) {
        logEntryPolyfills(
          "core-js",
          this.importPolyfillIncluded,
          new Set(this.polyfillsList),
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
  };
}
