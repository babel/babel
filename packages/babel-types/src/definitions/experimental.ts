import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./utils";
import {
  classMethodOrPropertyCommon,
  classMethodOrDeclareMethodCommon,
  functionTypeAnnotationCommon,
} from "./core";

defineType("ArgumentPlaceholder", {});

defineType("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: !process.env.BABEL_TYPES_8_BREAKING
    ? {
        object: {
          validate: Object.assign(() => {}, {
            oneOfNodeTypes: ["Expression"],
          }),
        },
        callee: {
          validate: Object.assign(() => {}, {
            oneOfNodeTypes: ["Expression"],
          }),
        },
      }
    : {
        object: {
          validate: assertNodeType("Expression"),
        },
        callee: {
          validate: assertNodeType("Expression"),
        },
      },
});

defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: [
    "key",
    "value",
    "typeAnnotation",
    "decorators",
    "computed",
    "static",
  ],
  aliases: ["Property"],
  fields: {
    ...classMethodOrPropertyCommon,
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    definite: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    typeAnnotation: {
      validate: process.env.BABEL_8_BREAKING
        ? assertNodeType("TypeAnnotation", "TSTypeAnnotation")
        : assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
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
    declare: {
      validate: assertValueType("boolean"),
      optional: true,
    },
  },
});

defineType("PipelineTopicExpression", {
  builder: ["expression"],
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("PipelineBareFunction", {
  builder: ["callee"],
  visitor: ["callee"],
  fields: {
    callee: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("PipelinePrimaryTopicReference", {
  aliases: ["Expression"],
});

defineType("ClassPrivateProperty", {
  visitor: ["key", "value", "decorators"],
  builder: ["key", "value", "decorators", "static"],
  aliases: ["Property", "Private"],
  fields: {
    key: {
      validate: assertNodeType("PrivateName"),
    },
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    typeAnnotation: {
      validate: process.env.BABEL_8_BREAKING
        ? assertNodeType("TypeAnnotation", "TSTypeAnnotation")
        : assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
  },
});

defineType("ClassPrivateMethod", {
  builder: ["kind", "key", "params", "body", "static"],
  visitor: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  aliases: [
    "Function",
    "Scopable",
    "BlockParent",
    "FunctionParent",
    "Method",
    "Private",
  ],
  fields: {
    ...classMethodOrDeclareMethodCommon,
    ...functionTypeAnnotationCommon,
    key: {
      validate: assertNodeType("PrivateName"),
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("ImportAttribute", {
  visitor: ["key", "value"],
  fields: {
    key: {
      validate: assertNodeType("Identifier", "StringLiteral"),
    },
    value: {
      validate: assertNodeType("StringLiteral"),
    },
  },
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
  builder: ["body", "async"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: assertNodeType("BlockStatement"),
    },
    async: {
      validate: assertValueType("boolean"),
      default: false,
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

defineType("PrivateName", {
  visitor: ["id"],
  aliases: ["Private"],
  fields: {
    id: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("RecordExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("ObjectProperty", "SpreadElement")),
      ),
    },
  },
});

defineType("TupleExpression", {
  fields: {
    elements: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Expression", "SpreadElement")),
      ),
      default: [],
    },
  },
  visitor: ["elements"],
  aliases: ["Expression"],
});

defineType("DecimalLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string"),
    },
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"],
});

// https://github.com/tc39/proposal-class-static-block
defineType("StaticBlock", {
  visitor: ["body"],
  fields: {
    body: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Statement")),
      ),
    },
  },
  aliases: ["Scopable", "BlockParent"],
});

// https://github.com/tc39/proposal-js-module-blocks
defineType("ModuleExpression", {
  visitor: ["body"],
  fields: {
    body: {
      validate: assertNodeType("Program"),
    },
  },
  aliases: ["Expression"],
});
