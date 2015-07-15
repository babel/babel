import define from "./index";

define("AwaitExpression", {
  builder: ["argument", "all"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});

define("BindExpression", {
  visitor: ["object", "callee"]
});

define("ComprehensionBlock", {
  visitor: ["left", "right"]
});

define("ComprehensionExpression", {
  visitor: ["filter", "blocks", "body"],
  aliases: ["Expression", "Scopable"]
});

define("Decorator", {
  visitor: ["expression"]
});

define("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"]
});

define("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});
