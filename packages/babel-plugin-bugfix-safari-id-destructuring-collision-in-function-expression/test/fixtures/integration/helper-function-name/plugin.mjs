import _nameFunction from "@babel/helper-function-name";
const nameFunction = _nameFunction.default || _nameFunction;

export default api => ({
  visitor: {
    FunctionExpression(path) {
      const replacement = nameFunction(path);
      if (replacement) path.replaceWith(replacement);
    },
  },
});
