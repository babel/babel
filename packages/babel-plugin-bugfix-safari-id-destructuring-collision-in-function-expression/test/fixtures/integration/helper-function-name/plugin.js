const nameFunction = require("@babel/helper-function-name").default;

module.exports = api => ({
  visitor: {
    FunctionExpression(path) {
      const replacement = nameFunction(path);
      if (replacement) path.replaceWith(replacement);
    },
  },
});
