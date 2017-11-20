import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./index";
import { classMethodOrPropertyCommon } from "./es2015";

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

defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed"],
  aliases: ["Property"],
  fields: {
    ...classMethodOrPropertyCommon,
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    typeAnnotation: {
      validate: assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
    readonly: {
      validate: assertValueType("boolean"),
      optional: true,
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

defineType("MatchExpression", {
  visitor: ["clauses"],
  aliases: ["Expression"],
  fields: {
    // todo
  },
});

defineType("MatchExpressionClause", {
  visitor: ["pattern", "body"],
  fields: {
    // todo
  },
});

defineType("ObjectMatchPattern", {
  visitor: ["children", "restIdentifier"],
  fields: {
    // todo
  },
});

defineType("ObjectPropertyMatchPattern", {
  visitor: ["key", "value"],
  fields: {
    // todo
  },
});

defineType("ArrayMatchPattern", {
  visitor: ["children", "restIdentifier"],
  fields: {
    // todo
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
