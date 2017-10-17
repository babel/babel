//@flow
import { logEntryPolyfills } from "./debug";

type Plugin = {
  visitor: Object,
  pre: Function,
  post: Function,
  name: string,
};

type RequireType = "require" | "import";

function isPolyfillSource(value: string): boolean {
  return value === "@babel/polyfill";
}

export default function({ types: t }: { types: Object }): Plugin {
  function createImportDeclaration(polyfill: string): Object {
    const declar = t.importDeclaration([], t.stringLiteral(polyfill));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill: string): Object {
    return t.expressionStatement(
      t.callExpression(t.identifier("require"), [t.stringLiteral(polyfill)]),
    );
  }

  function isRequire(path: Object): boolean {
    return (
      t.isExpressionStatement(path.node) &&
      t.isCallExpression(path.node.expression) &&
      t.isIdentifier(path.node.expression.callee) &&
      path.node.expression.callee.name === "require" &&
      path.node.expression.arguments.length === 1 &&
      t.isStringLiteral(path.node.expression.arguments[0]) &&
      isPolyfillSource(path.node.expression.arguments[0].value)
    );
  }

  function createImport(
    polyfill: string,
    requireType: RequireType,
    core: ?boolean,
  ): Object {
    if (core) {
      polyfill = `@babel/polyfill/lib/core-js/modules/${polyfill}`;
    }

    if (requireType === "import") {
      return createImportDeclaration(polyfill);
    }
    return createRequireStatement(polyfill);
  }

  function createImports(
    polyfills: Array<string>,
    requireType: RequireType,
    regenerator: boolean,
  ): Array<Object> {
    const items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;
    const imports = [];

    items.forEach(p => imports.push(createImport(p, requireType, true)));

    if (regenerator) {
      imports.push(
        createImport(
          "@babel/polyfill/lib/regenerator-runtime/runtime",
          requireType,
        ),
      );
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
        if (isRequire(bodyPath)) {
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
