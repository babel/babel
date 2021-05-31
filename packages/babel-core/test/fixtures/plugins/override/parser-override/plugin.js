module.exports = function (api) {
  return {
    parserOverride(code, opts, parse) {
      const ast = parse(code, opts);
      ast.program.body[0].expression.value = 0;
      return ast;
    },
  };
};
