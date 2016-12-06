const polyfillSource = "babel-polyfill";

export default function ({ types: t }) {
  function createImportDeclaration(polyfill) {
    let declar = t.importDeclaration([], t.stringLiteral(`core-js/modules/${polyfill}`));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill) {
    return t.expressionStatement(
      t.callExpression(
        t.identifier("require"),
        [
          t.stringLiteral(`core-js/modules/${polyfill}`)
        ]
      )
    );
  }

  function isRequire(path, source) {
    return t.isExpressionStatement(path.node) &&
      t.isCallExpression(path.node.expression) &&
      t.isIdentifier(path.node.expression.callee) &&
      path.node.expression.callee.name === "require" &&
      path.node.expression.arguments.length === 1 &&
      t.isStringLiteral(path.node.expression.arguments[0]) &&
      path.node.expression.arguments[0].value === source;
  }

  const isPolyfillImport = {
    ImportDeclaration(path, state) {
      if (path.node.specifiers.length === 0 &&
          path.node.source.value === polyfillSource) {
        this.numPolyfillImports++;
        if (this.numPolyfillImports > 1) {
          path.remove();
          return;
        }

        let imports = state.opts.polyfills
        .filter((el, i, arr) => arr.indexOf(el) === i)
        .map((p) => createImportDeclaration(p));
        path.replaceWithMultiple(imports);
      }
    },
    Program(path, state) {
      if (!state.opts.polyfills) {
        throw path.buildCodeFrameError(`
There was an issue in "babel-preset-env" such that
the "polyfills" option was not correctly passed
to the "transform-polyfill-require" plugin
`);
      }
      path.get("body").forEach((bodyPath) => {
        if (isRequire(bodyPath, polyfillSource)) {
          this.numPolyfillImports++;
          if (this.numPolyfillImports > 1) {
            path.remove();
            return;
          }

          let requires = state.opts.polyfills
          .filter((el, i, arr) => arr.indexOf(el) === i)
          .map((p) => createRequireStatement(p));
          bodyPath.replaceWithMultiple(requires);
        }
      });
    }
  };

  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,
    pre() {
      this.numPolyfillImports = 0;
    }
  };
}
