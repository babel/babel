module.exports = function (api) {
  const targets = api.targets();

  return {
    plugins: [plugin],
  };

  function plugin({ types: t }) {
    return {
      visitor: {
        Program(path) {
          const output = t.stringLiteral(`preset: ${JSON.stringify(targets)}`);
          path.pushContainer("body", output);
        },
      },
    };
  }
};
