import defineType, { assertNodeType, assertValueType, validateArrayOfType } from "./utils.ts";

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

// https://github.com/tc39/proposal-structs
defineType("StructDeclaration", {
  visitor: ["id", "superClass", "body"],
  aliases: ["Scopable", "Statement", "Declaration"],
  fields: {
    id: {
      validate: assertNodeType("Identifier"),
      // The id may be omitted if this is the child of an
      // ExportDefaultDeclaration.
      optional: true,
    },
    body: {
      validate: assertNodeType("StructBody"),
    },
    superClass: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("StructBody", {
  visitor: ["body"],
  fields: {
    body: validateArrayOfType(
      "ClassMethod",
      "ClassPrivateMethod",
      "ClassProperty",
      "ClassPrivateProperty",
      "StaticBlock",
    ),
  },
});
