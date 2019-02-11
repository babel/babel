import corejs2Polyfills from "../../../data/corejs2-built-ins.json";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import { filterItems } from "../../env-filter";
import { logEntryPolyfills } from "../../debug";
import { createImport, isPolyfillSource, isPolyfillRequire } from "../../utils";

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

  function replaceWithPolyfillImports(path) {
    if (regenerator) {
      createImport(path, "regenerator-runtime");
    }

    const items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;

    for (const p of Array.from(items).reverse()) {
      createImport(path, p);
    }

    path.remove();
  }

  const isPolyfillImport = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        this.importPolyfillIncluded = true;

        replaceWithPolyfillImports(path);
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillRequire(t, bodyPath)) {
          this.importPolyfillIncluded = true;

          replaceWithPolyfillImports(bodyPath);
        }
      });
    },
  };

  return {
    name: "corejs2-entry",
    visitor: isPolyfillImport,
    pre() {
      this.numPolyfillImports = 0;
      this.importPolyfillIncluded = false;
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
