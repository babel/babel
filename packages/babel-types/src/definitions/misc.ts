import {
  defineAliasedType,
  assertNodeType,
  assertOneOf,
  assertValueType,
} from "./utils";
import { PLACEHOLDERS } from "./placeholders";

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
