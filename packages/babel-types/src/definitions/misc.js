import define, { assertNodeType } from "./index";

define("Noop", {
  visitor: []
});

define("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression"],
  fields: {
    expression: {
      validate: assertNodeType("expression")
    }
  }
});
