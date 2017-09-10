import defineType, {
  assertEach,
  assertOneOf,
  assertNodeType,
  assertValueType,
  chain,
} from "./index";

defineType("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: {
    // todo
  },
});

defineType("ClassPrivateMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "static", "generator", "async"],
  visitor: ["key", "params", "body"],
  fields: {
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("LVal")),
      ),
    },
    generator: {
      default: false,
      validate: assertValueType("boolean"),
    },
    async: {
      validate: assertValueType("boolean"),
      default: false,
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
    static: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    key: {
      validate: assertNodeType("PrivateName"),
    },
    kind: {
      validate: assertOneOf("get", "set", "method"),
    },
  },
});

defineType("ClassPrivateProperty", {
  visitor: ["key", "value"],
  builder: ["key", "value"],
  aliases: ["Property", "Private"],
  fields: {
    key: {
      validate: assertNodeType("PrivateName"),
    },
    value: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("Import", {
  aliases: ["Expression"],
});

defineType("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("PrivateName", {
  visitor: ["name"],
  aliases: ["Private"],
  fields: {
    name: {
      validate: assertNodeType("Identifier"),
    },
  },
});
