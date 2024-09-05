import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./utils.ts";

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

if (!process.env.BABEL_TYPES_8_BREAKING) {
  defineType("DecimalLiteral", {
    builder: ["value"],
    fields: {
      value: {
        validate: assertValueType("string"),
      },
    },
    aliases: ["Expression", "Pureish", "Literal", "Immutable"],
  });
}

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

// https://github.com/tc39/proposal-pipeline-operator
// https://github.com/js-choi/proposal-hack-pipes
defineType("TopicReference", {
  aliases: ["Expression"],
});

// https://github.com/tc39/proposal-pipeline-operator
// https://github.com/js-choi/proposal-smart-pipes
defineType("PipelineTopicExpression", {
  builder: ["expression"],
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
  aliases: ["Expression"],
});

defineType("PipelineBareFunction", {
  builder: ["callee"],
  visitor: ["callee"],
  fields: {
    callee: {
      validate: assertNodeType("Expression"),
    },
  },
  aliases: ["Expression"],
});

defineType("PipelinePrimaryTopicReference", {
  aliases: ["Expression"],
});
