module.exports = function pluginA({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const label = this.isAsync ? "async" : "sync";

        path.pushContainer("body", t.stringLiteral(label));
      },
    },
  };
};
