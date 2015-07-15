import define from "./index";

define("Noop", {
  visitor: []
});

define("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression"]
});
