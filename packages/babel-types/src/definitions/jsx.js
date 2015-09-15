import define, { assertNodeType, assertValueType, chain, assertEach } from "./index";

define("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: assertNodeType("JSXIdentifier", "JSXMemberExpression")
    },
    value: {
      optional: true,
      validate: assertNodeType("JSXElement", "StringLiteral", "JSXExpressionContainer")
    }
  }
});

define("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: assertNodeType("JSXIdentifier", "JSXMemberExpression")
    }
  }
});

define("JSXElement", {
  builder: ["openingElement", "closingElement", "children", "selfClosing"],
  visitor: ["openingElement", "children", "closingElement"],
  aliases: ["JSX", "Immutable", "Expression"],
  fields: {
    openingElement: {
      validate: assertNodeType("JSXOpeningElement")
    },
    closingElement: {
      optional: true,
      validate: assertNodeType("JSXClosingElement")
    },
    children: {
      // todo
    }
  }
});

define("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

define("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"],
  fields: {
    expression: {
      validate: assertNodeType("Expression")
    }
  }
});

define("JSXIdentifier", {
  builder: ["name"],
  aliases: ["JSX", "Expression"]
});

define("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"],
  fields: {
    object: {
      validate: assertNodeType("JSXIdentifier")
    },
    property: {
      validate: assertNodeType("JSXIdentifier")
    }
  }
});

define("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"],
  fields: {
    namespace: {
      validate: assertNodeType("JSXIdentifier")
    },
    name: {
      validate: assertNodeType("JSXIdentifier")
    }
  }
});

define("JSXOpeningElement", {
  builder: ["name", "attributes", "selfClosing"],
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: assertNodeType("JSXIdentifier", "JSXMemberExpression")
    },
    selfClosing: {
      default: false,
      validate: assertValueType("boolean")
    },
    attributes: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("JSXAttribute", "JSXSpreadAttribute")))
    }
  }
});

define("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"],
  fields: {
    argument: {
      validate: assertNodeType("Expression")
    }
  }
});

define("JSXText", {
  aliases: ["JSX"],
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string")
    }
  }
});
