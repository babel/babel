import define, { assertNodeType, assertValueType, chain, assertEach, assertOneOf } from "./index";

define("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern", "LVal"],
  fields: {
    left: {
      validate: assertNodeType("Identifier")
    },
    right: {
      validate: assertNodeType("Expression")
    }
  }
});

define("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    elements: {
      validate: chain(assertValueType("array"), assertEach(assertValueType("Expression")))
    }
  }
});

define("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pure"],
  fields: {
    params: {
      validate: chain(assertValueType("array"), assertEach(assertNodeType("LVal")))
    },
    body: {
      validate: assertNodeType("BlockStatement", "Expression")
    },
    async: {
      validate: assertValueType("boolean"),
      default: false
    }
  }
});

define("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: chain(assertValueType("array"), assertEach(assertValueType("MethodDefinition", "ClassProperty")))
    }
  }
});

define("ClassDeclaration", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration"],
  fields: {
    id: {
      validate: assertNodeType("Identifier")
    },
    body: {
      validate: assertNodeType("ClassBody")
    },
    superClass: {
      optional: true,
      validate: assertNodeType("Expression")
    },
    decorators: {
      validate: chain(assertValueType("array"), assertEach(assertValueType("Decorator")))
    }
  }
});

define("ClassExpression", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"],
  fields: {
    id: {
      optional: true,
      validate: assertNodeType("Identifier")
    },
    body: {
      validate: assertNodeType("ClassBody")
    },
    superClass: {
      optional: true,
      validate: assertNodeType("Expression")
    },
    decorators: {
      validate: chain(assertValueType("array"), assertEach(assertValueType("Decorator")))
    }
  }
});

define("ExportAllDeclaration", {
  visitor: ["source", "exported"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    // todo
  }
});

define("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    // todo
  }
});

define("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    // todo
  }
});

define("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier")
    },
    imported: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("ForOfStatement", {
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

define("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"],
  fields: {
    specifiers: {
      // todo
    },
    source: {
      validate: assertNodeType("StringLiteral")
    }
  }
});

define("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier")
    },
    imported: {
      validate: assertNodeType("Identifier")
    }
  }
});

define("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    // todo: limit to new.target
    meta: {
      validate: assertValueType("string")
    },
    property: {
      validate: assertValueType("string")
    }
  }
});

define("MethodDefinition", {
  builder: ["key", "value", "kind", "computed", "static"],
  visitor: ["key", "value", "decorators"],
  fields: {
    kind: {
      validate: chain(assertValueType("string"), assertOneOf("get", "set", "method", "constructor")),
      default: "method"
    },
    computed: {
      default: false,
      validate: assertValueType("boolean")
    },
    static: {
      default: false,
      validate: assertValueType("boolean")
    }
  }
});

define("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    properties: {
      validate: chain(assertValueType("array"), assertEach(assertValueType("RestProperty", "Property")))
    }
  }
});

define("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: assertNodeType("Expression")
    }
  }
});

define("Super", {
  aliases: ["Expression"]
});

define("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: assertNodeType("Expression")
    },
    quasi: {
      validate: assertNodeType("TemplateLiteral")
    }
  }
});

define("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {
      // todo: flatten `raw` into main node
    },
    tail: {
      validate: assertValueType("boolean"),
      default: false
    }
  }
});

define("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    // todo
  }
});

define("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: assertValueType("boolean"),
      default: false
    },
    argument: {
      optional: true,
      validate: assertNodeType("Expression"),
    }
  }
});
