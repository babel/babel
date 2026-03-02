module.exports = function (api) {
  const { types: t } = api;

  const targets = api.targets();

  return {
    visitor: {
      Program(path) {
        const output = t.stringLiteral(`plugin: ${JSON.stringify(targets)}`);
        path.pushContainer("body", output);
      },
    },
  };
};
