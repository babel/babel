export default api => ({
  visitor: {
    FunctionExpression(path) {
      path.ensureFunctionName(true);
    },
  },
});
