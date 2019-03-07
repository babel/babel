// @flow
import defineType, { assertNodeType, assertOneOf } from "./utils";
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
