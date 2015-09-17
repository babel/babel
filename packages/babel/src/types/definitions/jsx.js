import defineType from "./index";

defineType("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"]
});

defineType("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"]
});

defineType("JSXElement", {
  visitor: ["openingElement", "closingElement", "children"],
  aliases: ["JSX", "Immutable", "Expression"]
});

defineType("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

defineType("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"]
});

defineType("JSXIdentifier", {
  aliases: ["JSX", "Expression"]
});

defineType("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"]
});

defineType("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"]
});

defineType("JSXOpeningElement", {
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"]
});

defineType("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"]
});
