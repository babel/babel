import defineType from "./index";

defineType("Noop", {
  visitor: []
});

defineType("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression"]
});
