// @flow
import defineType, { assertNodeType } from "./index";

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
