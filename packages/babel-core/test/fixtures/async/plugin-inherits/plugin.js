module.exports = function plugin({ types: t }) {
  return {
    inherits: require("./plugin2"),
    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("success"));
      },
    },
  };
};
