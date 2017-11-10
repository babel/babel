// @flow
import { logEntryPolyfills } from "./debug";
import {
  createImport,
  isPolyfillSource,
  isRequire,
  type RequireType,
} from "./utils";

type Plugin = {
  visitor: Object,
  pre: Function,
  post: Function,
  name: string,
};

export default function({ types: t }: { types: Object }): Plugin {
  function createImports(
    polyfills: Array<string>,
    requireType: RequireType,
    regenerator: boolean,
  ): Array<Object> {
    const items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;
    const imports = [];

    items.forEach(p => imports.push(createImport(t, p, requireType)));

    if (regenerator) {
      imports.push(createImport(t, "regenerator-runtime", requireType));
    }

    return imports;
  }

  const isPolyfillImport = {
    ImportDeclaration(path, state) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        this.importPolyfillIncluded = true;
        path.replaceWithMultiple(
          createImports(state.opts.polyfills, "import", state.opts.regenerator),
        );
      }
    },
    Program(path, state) {
      path.get("body").forEach(bodyPath => {
        if (isRequire(t, bodyPath)) {
          bodyPath.replaceWithMultiple(
            createImports(
              state.opts.polyfills,
              "require",
              state.opts.regenerator,
            ),
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
