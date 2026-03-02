module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.pushContainer(
            "body",
            t.jsxElement(
              t.jsxOpeningElement(t.jsxIdentifier("div"), [], false),
              t.jsxClosingElement(t.jsxIdentifier("div")),
              []
            )
          );
        }
      }
    }
  };
};
