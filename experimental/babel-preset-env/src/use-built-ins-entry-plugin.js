function isPolyfillSource(value) {
  return value === "babel-polyfill";
}

export default function({ types: t }) {
  function createImportDeclaration(polyfill) {
    const declar = t.importDeclaration([], t.stringLiteral(polyfill));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill) {
    return t.expressionStatement(
      t.callExpression(t.identifier("require"), [t.stringLiteral(polyfill)]),
    );
  }

  function isRequire(path) {
    return t.isExpressionStatement(path.node) &&
      t.isCallExpression(path.node.expression) &&
      t.isIdentifier(path.node.expression.callee) &&
      path.node.expression.callee.name === "require" &&
      path.node.expression.arguments.length === 1 &&
      t.isStringLiteral(path.node.expression.arguments[0]) &&
      isPolyfillSource(path.node.expression.arguments[0].value);
  }

  function createImport(polyfill, requireType, core) {
    if (core) {
      polyfill = `babel-polyfill/lib/core-js/modules/${polyfill}`;
    }

    if (requireType === "import") {
      return createImportDeclaration(polyfill);
    } else {
      return createRequireStatement(polyfill);
    }
  }

  function createImports(polyfills, requireType, regenerator) {
    const imports = polyfills
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .map(polyfill => createImport(polyfill, requireType, true));

    return [
      ...imports,
      regenerator &&
        createImport(
          "babel-polyfill/lib/regenerator-runtime/runtime",
          requireType,
        ),
    ].filter(Boolean);
  }

  const isPolyfillImport = {
    ImportDeclaration(path, state) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
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
    },
    post() {
      const { debug, onDebug, polyfills } = this.opts;

      if (debug) {
        if (!polyfills.length) {
          console.log("Based on your targets, none were added.");
          return;
        }

        console.log("Replaced `babel-polyfill` with the following polyfills:");
        polyfills.forEach(polyfill => onDebug(polyfill));
      }
    },
  };
}
