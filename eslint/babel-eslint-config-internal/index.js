module.exports = {
  parser: "babel-eslint",
  extends: "eslint:recommended",
  plugins: ["flowtype"],
  rules: {
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    camelcase: "off",
    "comma-dangle": "off",
    "comma-spacing": "error",
    "consistent-return": "off",
    curly: "off",
    indent: ["error", 2, {
      SwitchCase: 1,
      outerIIFEBody: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      CallExpression: {
        parameters: 1,
      }
    }],
    "linebreak-style": ["error", "unix"],
    "key-spacing": "off",
    "keyword-spacing": "error",
    "max-len": ["error", 110, 2],
    "new-cap": "off",
    "new-parens": "off",
    "no-case-declarations": "off",
    "no-cond-assign": "off",
    "no-confusing-arrow": "error",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-empty": "off",
    "no-fallthrough": "off",
    "no-inner-declarations": "off",
    "no-multi-spaces": "off",
    "no-labels": "off",
    "no-loop-func": "off",
    "no-process-exit": "off",
    "no-return-assign": "off",
    "no-shadow": "off",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": "off",
    "no-unreachable": "off",
    "no-use-before-define": "off",
    "no-var": "error",
    "prefer-const": "error",
    quotes: ["error", "double"],
    "space-before-blocks": ["error", "always"],
    "space-infix-ops": "error",
    semi: ["error", "always"],
    strict: "off",
    "flowtype/define-flow-type": "warn",
    "flowtype/use-flow-type": "warn",
  },
  globals: {
    // Flow
    Iterator: true,
    $Keys: true
  },
  env: {
    node: true,
    es6: true,
    browser: true
  }
};
