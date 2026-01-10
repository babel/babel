module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.pushContainer(
            "body",
            t.JSXElement(
              t.JSXOpeningElement(t.jsxIdentifier("div"), [], false),
              t.JSXClosingElement(t.jsxIdentifier("div")),
              []
            )
          );
        }
      }
    }
  };
};
