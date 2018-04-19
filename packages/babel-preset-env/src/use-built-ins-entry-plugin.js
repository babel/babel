// @flow
import { logEntryPolyfills } from "./debug";
import { createImport, isPolyfillSource, isRequire } from "./utils";

type Plugin = {
  visitor: Object,
  pre: Function,
  post: Function,
  name: string,
};

export default function({ types: t }: { types: Object }): Plugin {
  function replaceWithPolyfillImports(
    path: Object,
    polyfills: Array<string> | Set<string>,
    regenerator: boolean,
  ): void {
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
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,
    pre() {
      this.numPolyfillImports = 0;
      this.importPolyfillIncluded = false;
    },
    post() {
      const { debug, onDebug, polyfills } = this.opts;

      if (debug) {
        logEntryPolyfills(
          this.importPolyfillIncluded,
          polyfills,
          this.file.opts.filename,
          onDebug,
        );
      }
    },
  };
}
