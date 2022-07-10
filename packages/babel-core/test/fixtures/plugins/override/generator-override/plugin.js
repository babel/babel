module.exports = function (api) {
  return {
    generatorOverride(ast, generatorOpts, code, generate) {
      const result = generate(ast, generatorOpts, code);
      result.code = result.code.replace("1", "0");
      return result;
    },
  };
};
