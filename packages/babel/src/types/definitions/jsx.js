import define from "./index";

define("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"]
});

define("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"]
});

define("JSXElement", {
  visitor: ["openingElement", "closingElement", "children"],
  aliases: ["JSX", "Immutable", "Expression"]
});

define("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

define("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"]
});

define("JSXIdentifier", {
  aliases: ["JSX", "Expression"]
});

define("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"]
});

define("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"]
});

define("JSXOpeningElement", {
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"]
});

define("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"]
});
