import corejs2Polyfills from "../../../data/corejs2-built-ins.json";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import filterItems from "../../filter-items";
import { createImport, isPolyfillSource, isPolyfillRequire } from "../../utils";
import { logEntryPolyfills } from "../../debug";

export default function(
  { types: t },
  { include, exclude, polyfillTargets, regenerator, debug },
) {
  const polyfills = filterItems(
    corejs2Polyfills,
    include,
    exclude,
    polyfillTargets,
    getPlatformSpecificDefaultFor(polyfillTargets),
  );

  const isPolyfillImport = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        this.replaceBySeparateModulesImport(path);
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillRequire(t, bodyPath)) {
          this.replaceBySeparateModulesImport(bodyPath);
        }
      });
    },
  };

  return {
    name: "corejs2-entry",
    visitor: isPolyfillImport,
    pre() {
      this.importPolyfillIncluded = false;

      this.replaceBySeparateModulesImport = function(path) {
        this.importPolyfillIncluded = true;

        if (regenerator) {
          createImport(path, "regenerator-runtime");
        }

        const modules = Array.from(polyfills).reverse();

        for (const module of modules) {
          createImport(path, module);
        }

        path.remove();
      };
    },
    post() {
      if (debug) {
        logEntryPolyfills(
          "@babel/polyfill",
          this.importPolyfillIncluded,
          polyfills,
          this.file.opts.filename,
          polyfillTargets,
          corejs2Polyfills,
        );
      }
    },
  };
}
