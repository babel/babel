// @flow

import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./index";
import { classMethodOrPropertyCommon } from "./es2015";

defineType("TypeAnnotation", {
  aliases: ["Flow"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: {
      validate: assertNodeType("TSType", "Flow"),
    },
  },
});

defineType("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"],
  fields: {
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("TSType", "Flow")),
      ),
    },
  },
});

defineType("TypeParameterDeclaration", {
  aliases: ["Flow"],
  visitor: ["params"],
  fields: {
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("TypeParameter")),
      ),
    },
  },
});

defineType("TypeParameter", {
  aliases: ["Flow"],
  visitor: ["bound", "constraint", "default"],
  fields: {
    name: {
      validate: assertValueType("string"),
    },
    bound: {
      validate: assertNodeType("TypeAnnotation"),
      optional: true,
    },
    constraint: {
      validate: assertNodeType("TSType"),
      optional: true,
    },
    default: {
      validate: assertNodeType("TSType", "Flow"),
      optional: true,
    },
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
      validate: assertNodeType("TypeAnnotation", "Noop"),
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
    // todo: Has optional "variance" property for flow plugin
  },
});
