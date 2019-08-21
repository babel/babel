// @flow
import defineType, {
  assertNodeType,
  assertOneOf,
  assertValueType,
} from "./utils";
import { PLACEHOLDERS } from "./placeholders";

defineType("Noop", {
  visitor: [],
});

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
