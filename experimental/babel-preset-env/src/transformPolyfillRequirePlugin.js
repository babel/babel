// Should throw if no babel-polyfill import is found in all files
// or if more than one is found

// const builtIns = require('../data/builtIns.json');
const builtIns = {
  "typed/int8-array": {
    "chrome": 5,
    "opera": 12,
    "firefox": 4,
    "safari": 5,
    "node": 0.12,
    "ie": 10,
    "android": 4,
    "ios": 6
  }
};

const polyfillSource = "babel-polyfill";
let numPolyfillImports = 0;

export default function ({ types: t }) {
  function checkNumPolyfillImports() {
    numPolyfillImports++;
    if (numPolyfillImports > 1) {
      console.log("multiple babel-polyfill imports found");
      //throw new Error("multiple babel-polyfill imports found");
    }
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
        checkNumPolyfillImports();

        // change
        // path.node.source.value = "changed";
      }
    },
    Program(path, state) {
      path.get("body").forEach((bodyPath) => {
        if (isRequire(bodyPath, polyfillSource)) {
          checkNumPolyfillImports();

          // change
          // bodyPath.node.expression.arguments[0].value = "changed";
        }
      });
    }
  };

  return {
    name: "ast-transform", // not required
    visitor: isPolyfillImport
  };
}
