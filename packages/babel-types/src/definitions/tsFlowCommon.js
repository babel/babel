// @flow

import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./index";

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
        assertEach(assertNodeType("TSType", "FlowType")),
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
