import define, { assertNodeType, assertValueType } from "./index";

define("AwaitExpression", {
  builder: ["argument", "all"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    all: {
      validate: assertValueType("boolean"),
      default: false
    },
    argument: {
      validate: assertNodeType("Expression"),
    }
  }
});

define("BindExpression", {
  visitor: ["object", "callee"],
  fields: {
    // todo
  }
});

define("ComprehensionBlock", {
  visitor: ["left", "right"],
  fields: {
    // todo
  }
});

define("ComprehensionExpression", {
  visitor: ["filter", "blocks", "body"],
  aliases: ["Expression", "Scopable"],
  fields: {
    // todo
  }
});

define("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression")
    }
  }
});

define("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: assertNodeType("BlockStatement")
    }
  }
});

define("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("RestProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: assertNodeType("LVal")
    }
  }
});

define("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: assertNodeType("Expression")
    }
  }
});
