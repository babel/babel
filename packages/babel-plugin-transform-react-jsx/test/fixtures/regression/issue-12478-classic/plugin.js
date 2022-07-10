module.exports = ({ types: t }) => ({
  visitor: {
    NumericLiteral(path) {
      path.replaceWith(
        t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier("p"), []),
          t.jsxClosingElement(t.jsxIdentifier("p")),
          []
        )
      );
    }
  }
});
