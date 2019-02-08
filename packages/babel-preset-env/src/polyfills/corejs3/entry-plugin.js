import { logEntryPolyfills } from "../../debug";
import { createImport, isCoreJSSource, isCoreJSRequire } from "../../utils";
import getModulesListForTargetCoreJSVersion from "./get-modules-list-for-target-core-js-version";

export default function({ types: t }, { corejs, polyfills }) {
  const available = getModulesListForTargetCoreJSVersion(corejs);

  const isPolyfillImport = {
    ImportDeclaration(path) {
      if (path.node.specifiers.length === 0) {
        const filter = isCoreJSSource(path.node.source.value);
        if (filter) {
          this.importPolyfillIncluded = true;
          this.polyfillsList.push(
            ...Array.from(polyfills).filter(it => filter.test(it)),
          );
          path.remove();
        }
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        const filter = isCoreJSRequire(t, bodyPath);
        if (filter) {
          this.importPolyfillIncluded = true;
          this.polyfillsList.push(
            ...Array.from(polyfills).filter(it => filter.test(it)),
          );
          bodyPath.remove();
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
      this.polyfillsList = [];
    },
    post({ path }) {
      const { debug, polyfillTargets, allBuiltInsList } = this.opts;

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
          allBuiltInsList,
        );
      }
    },
  };
}
