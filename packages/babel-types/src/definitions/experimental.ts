import defineType, {
  arrayOfType,
  assertNodeType,
  assertValueType,
  validateArrayOfType,
  type ValidatorOneOfNodeTypes,
} from "./utils.ts";

defineType("ArgumentPlaceholder", {});

defineType("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: {
    object: {
      validate: assertNodeType("Expression"),
    },
    callee: {
      validate: assertNodeType("Expression"),
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

// https://github.com/tc39/proposal-discard-binding
defineType("VoidPattern", {
  aliases: ["Pattern", "PatternLike", "FunctionParameter"],
});
