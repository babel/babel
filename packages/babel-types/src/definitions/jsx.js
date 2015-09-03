import define, { assertValueType } from "./index";

define("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"]
});

define("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"]
});

define("JSXElement", {
  aliases: ["JSX", "Immutable", "Expression"]
  visitor: ["openingElement", "children", "closingElement"],
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

define("JSXText", {
  aliases: ["JSX"],
  builder: ["value"],
  fields: {
    value: { validate: assertValueType("string") }
  }
});
