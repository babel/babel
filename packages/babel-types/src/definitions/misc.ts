import {
  defineAliasedType,
  assertNodeType,
  assertOneOf,
  assertValueType,
} from "./utils.ts";
import { PLACEHOLDERS } from "./placeholders.ts";
import { patternLikeCommon } from "./core.ts";

const defineType = defineAliasedType("Miscellaneous");

if (!process.env.BABEL_8_BREAKING) {
  defineType("Noop", {
    visitor: [],
  });
}

defineType("Placeholder", {
  visitor: [],
  builder: ["expectedNode", "name"],
  // aliases: [], defined in placeholders.js
  fields: {
    name: {
      validate: assertNodeType("Identifier"),
    },
    expectedNode: {
      validate: assertOneOf(...PLACEHOLDERS),
    },
    ...patternLikeCommon(),
  },
});

defineType("V8IntrinsicIdentifier", {
  builder: ["name"],
  fields: {
    name: {
      validate: assertValueType("string"),
    },
  },
});
