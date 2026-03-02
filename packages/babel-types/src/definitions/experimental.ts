import {
  classMethodOrPropertyUnionShapeCommon,
  classMethodOrPropertyCommon,
} from "./core.ts";
import type * as t from "../index.ts";
import defineType, {
  arrayOfType,
  assertNodeType,
  assertValueType,
  chain,
  type ValidatorImpl,
} from "./utils.ts";

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
defineType("ClassAccessorProperty", {
  visitor: ["decorators", "key", "typeAnnotation", "value"],
  builder: [
    "key",
    "value",
    "typeAnnotation",
    "decorators",
    "computed",
    "static",
  ],
  aliases: ["Property", "Accessor"],
  ...classMethodOrPropertyUnionShapeCommon(true),
  fields: {
    ...classMethodOrPropertyCommon(),
    key: {
      validate: chain(
        (function () {
          const normal = assertNodeType(
            "Identifier",
            "StringLiteral",
            "NumericLiteral",
            "BigIntLiteral",
            "PrivateName",
          );
          const computed = assertNodeType("Expression");

          return function (
            node: t.ClassAccessorProperty,
            key: string,
            val: any,
          ) {
            const validator = node.computed ? computed : normal;
            validator(node, key, val);
          } satisfies ValidatorImpl;
        })(),
        assertNodeType(
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
          "BigIntLiteral",
          "Expression",
          "PrivateName",
        ),
      ),
    },
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    definite: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    typeAnnotation: {
      validate: assertNodeType("TypeAnnotation", "TSTypeAnnotation"),

      optional: true,
    },
    decorators: {
      validate: arrayOfType("Decorator"),
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
    variance: {
      validate: assertNodeType("Variance"),
      optional: true,
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
