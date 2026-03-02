module.exports = function plugin({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("success"));
      },
    },
  };
};
