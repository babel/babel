import defineType, { assertNodeType, assertValueType } from "./utils.ts";

// https://github.com/tc39/proposal-partial-application
defineType("ArgumentPlaceholder", {});

// https://github.com/tc39/proposal-bind-operator
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

// https://github.com/tc39/proposal-decorators
defineType("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});

// https://github.com/tc39/proposal-do-expressions
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

// https://github.com/tc39/proposal-export-default-from
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
defineType("TopicReference", {
  aliases: ["Expression"],
});

// https://github.com/tc39/proposal-discard-binding
defineType("VoidPattern", {
  aliases: ["Pattern", "PatternLike", "FunctionParameter"],
});
