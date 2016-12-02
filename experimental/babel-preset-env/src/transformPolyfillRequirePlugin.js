// Should throw if no babel-polyfill import is found in all files
// or if more than one is found

const polyfillSource = "babel-polyfill";
let numPolyfillImports = 0;

export default function ({ types: t }) {
  function checkNumPolyfillImports() {
    numPolyfillImports++;
    return numPolyfillImports > 1;
  }

  function addImport(polyfill) {
    let declar = t.importDeclaration([], t.stringLiteral(`core-js/modules/${polyfill}`));
    declar._blockHoist = 3;
    return declar;
  }

  function addRequire(polyfill) {
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
        if (checkNumPolyfillImports()) {
          path.remove();
          return;
        }

        let imports = state.opts.polyfills.map((p) => addImport(p));
        path.replaceWithMultiple(imports);
      }
    },
    Program(path, state) {
      if (!state.opts.polyfills) {
        throw path.buildCodeFrameError(`
"polyfills" option not correctly passed
to the transform-polyfill-require plugin
in babel-preset-env
`);
      }
      path.get("body").forEach((bodyPath) => {
        if (isRequire(bodyPath, polyfillSource)) {
          if (checkNumPolyfillImports()) {
            path.remove();
            return;
          }


          let requires = state.opts.polyfills.map((p) => addRequire(p));
          bodyPath.replaceWithMultiple(requires);
        }
      });
    }
  };

  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport
  };
}
