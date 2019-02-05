import { logEntryPolyfills } from "../../debug";
import { createImport, isPolyfillSource, isRequire } from "../../utils";
import getModulesListForTargetCoreJSVersion from "./get-modules-list-for-target-core-js-version";

export default function({ types: t }, { corejs }) {
  const available = getModulesListForTargetCoreJSVersion(corejs);

  function replaceWithPolyfillImports(path, polyfills, regenerator) {
    if (regenerator) {
      createImport(path, "regenerator-runtime");
    }

    const items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;

    for (const module of Array.from(items).reverse()) {
      if (available.has(module)) createImport(path, module);
    }

    path.remove();
  }

  const isPolyfillImport = {
    ImportDeclaration(path, state) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        this.importPolyfillIncluded = true;

        replaceWithPolyfillImports(
          path,
          state.opts.polyfills,
          state.opts.regenerator,
        );
      }
    },
    Program(path, state) {
      path.get("body").forEach(bodyPath => {
        if (isRequire(t, bodyPath)) {
          replaceWithPolyfillImports(
            bodyPath,
            state.opts.polyfills,
            state.opts.regenerator,
          );
        }
      });
    },
  };

  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,
    pre() {
      this.numPolyfillImports = 0;
      this.importPolyfillIncluded = false;
    },
    post() {
      const { debug, polyfillTargets, allBuiltInsList, polyfills } = this.opts;

      if (debug) {
        logEntryPolyfills(
          this.importPolyfillIncluded,
          polyfills,
          this.file.opts.filename,
          polyfillTargets,
          allBuiltInsList,
        );
      }
    },
  };
}
