// @flow
import defineType, { assertNodeType } from "./utils";

defineType("Noop", {
  visitor: [],
});

defineType("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});
