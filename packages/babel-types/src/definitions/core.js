import * as t from "../index";
import define, { assertValueType, assertNodeType, assertEach, chain, assertOneOf } from "./index";

define("ArrayExpression", {
  fields: {
    elements: {
      validate: assertValueType("array")
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});

define("AssignmentExpression", {
  fields: {
    elements: {
      operator: {
        validate: assertValueType("string")
      },
      left: {
        validate: assertNodeType("LVal")
      },
      right: {
        validate: assertNodeType("Expression")
      }
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

define("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: assertValueType("string")
    },
    left: {
      validate: assertNodeType("Expression")
    },
    right: {
      validate: assertNodeType("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

define("Directive", {
  fields: {
    value: {
      validate: assertValueType("string")
    }
  }
});

define("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Directive"))),
      default: []
    },
    body: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

define("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: assertNodeType("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("CallExpression", {
  visitor: ["callee", "arguments"],
  fields: {
    callee: {
      validate: assertNodeType("Expression")
    },
    arguments: {
      validate: assertValueType("array")
    }
  },
  aliases: ["Expression"]
});

define("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: assertNodeType("Identifier")
    },
    body: {
      validate: assertNodeType("BlockStatement")
    }
  },
  aliases: ["Scopable"]
});

define("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: assertNodeType("Expression")
    },
    consequent: {
      validate: assertNodeType("Expression")
    },
    alternate: {
      validate: assertNodeType("Expression")
    }
  },
  aliases: ["Expression"]
});

define("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: assertNodeType("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("DebuggerStatement", {
  aliases: ["Statement"]
});

define("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: assertNodeType("Expression")
    },
    body: {
      validate: assertNodeType("BlockStatement")
    }
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

define("EmptyStatement", {
  aliases: ["Statement"]
});

define("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression")
    }
  },
  aliases: ["Statement"]
});

define("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: assertNodeType("Program")
    }
  }
});

define("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: assertNodeType("VariableDeclaration", "LVal")
    },
    right: {
      validate: assertNodeType("Expression")
    },
    body: {
      validate: assertNodeType("Statement")
    }
  }
});

define("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: assertNodeType("VariableDeclaration", "Expression")
    },
    test: {
      validate: assertNodeType("Expression")
    },
    update: {
      validate: assertNodeType("Expression")
    },
    body: {
      validate: assertNodeType("Statement")
    }
  }
});

define("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: {
    id: {
      validate: assertNodeType("Identifier")
    },
    params: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("LVal")))
    },
    body: {
      validate: assertNodeType("BlockStatement")
    },
    generator: {
      default: false,
      validate: assertValueType("boolean")
    },
    async: {
      default: false,
      validate: assertValueType("boolean")
    }
  },
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pure", "Declaration"]
});

define("FunctionExpression", {
  builder: ["id", "params", "body", "generator", "async"],
  fields: {
    id: {
      validate: assertNodeType("Identifier"),
      optional: true
    },
    params: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("LVal")))
    },
    body: {
      validate: assertNodeType("BlockStatement")
    },
    generator: {
      default: false,
      validate: assertValueType("boolean")
    },
    async: {
      default: false,
      validate: assertValueType("boolean")
    }
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

define("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression", "LVal"],
  fields: {
    name: {
      validate(node, key, val) {
        if (!t.isValidIdentifier(val)) {
          // todo
        }
      }
    }
  }
});

define("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement"],
  fields: {
    test: {
      validate: assertNodeType("Expression")
    },
    consequent: {
      optional: true,
      validate: assertNodeType("Statement")
    },
    alternate: {
      optional: true,
      validate: assertNodeType("Statement")
    }
  }
});

define("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: assertNodeType("Identifier")
    },
    body: {
      validate: assertNodeType("Statement")
    }
  }
});

define("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string")
    }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("NumberLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("number")
    }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("NullLiteral", {
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("boolean")
    }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("RegexLiteral", {
  builder: ["pattern", "flags"],
  aliases: ["Expression", "Literal"],
  fields: {
    pattern: {
      validate: assertValueType("string")
    },
    flags: {
      validate: assertValueType("string"),
      default: ""
    }
  }
});

define("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      // todo
    },
    left: {
      validate: assertNodeType("Expression")
    },
    right: {
      validate: assertNodeType("Expression")
    }
  }
});

define("MemberExpression", {
  builder: ["object", "property", "computed"],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: {
    object: {
      validate: assertNodeType("Expression")
    },
    property: {
      validate(node, key, val) {
        var expectedType = node.computed ? "Expression" : "Identifier";
        assertNodeType(expectedType)(node, key, val);
      }
    },
    computed: {
      default: false
    }
  }
});

define("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: assertNodeType("Expression")
    },
    arguments: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Expression")))
    }
  }
});

define("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Property", "SpreadProperty")))
    }
  }
});

define("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives"],
  fields: {
    directives: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Directive"))),
      default: []
    },
    body: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

define("Property", {
  builder: ["kind", "key", "value", "computed", "method", "shorthand"],
  fields: {
    kind: {
      validate: chain(assertValueType("string"), assertOneOf("init", "get", "set")),
      default: "init"
    },
    computed: {
      validate: assertValueType("boolean"),
      default: false
    },
    key: {
      validate(node, key, val) {
        var expectedTypes = node.computed ? "Expression" : ["Identifier", "Literal"];
        assertNodeType(...expectedTypes)(node, key, val);
      }
    },
    value: {
      validate(node, key, val) {
        var expectedType = "Expression";
        if (node.kind === "get" || node.kind === "set" || node.method) {
          expectedType = "FunctionExpression";
        }
        assertNodeType(expectedType)(node, key, val);
      }
    },
    method: {
      validate: assertValueType("boolean"),
      default: false
    },
    shorthand: {
      validate: assertValueType("boolean"),
      default: false
    },
    decorators: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("Decorator")))
    }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable"]
});

define("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  fields: {
    argument: {
      validate: assertNodeType("LVal")
    }
  }
});

define("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: assertNodeType("Expression")
    }
  }
});

define("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: { validate: assertValueType("array") }
  },
  aliases: ["Expression"]
});

define("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    // todo
  }
});

define("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    // todo
  }
});

define("ThisExpression", {
  aliases: ["Expression"]
});

define("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: assertNodeType("Expression")
    }
  }
});

// todo: at least handler or finalizer should be set to be valid
define("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    body: {
      validate: assertNodeType("BlockStatement")
    },
    handler: {
      optional: true,
      handler: assertNodeType("BlockStatement")
    },
    finalizer: {
      optional: true,
      validate: assertNodeType("BlockStatement")
    }
  }
});

define("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false
    },
    argument: {
      validate: assertNodeType("Expression")
    },
    operator: {
      // todo
    }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

define("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false
    },
    argument: {
      validate: assertNodeType("Expression")
    },
    operator: {
      // todo
    }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

define("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    kind: {
      validate: chain(assertValueType("string"), assertOneOf("var", "let", "const"))
    },
    declarations: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("VariableDeclarator")))
    }
  }
});

define("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: assertNodeType("LVal")
    },
    init: {
      optional: true,
      validate: assertNodeType("Expression")
    }
  }
});

define("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: assertNodeType("Expression")
    },
    body: {
      validate: assertNodeType("BlockStatement", "Statement")
    }
  }
});

define("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      object: assertNodeType("Expression")
    },
    body: {
      validate: assertNodeType("BlockStatement")
    }
  }
});
