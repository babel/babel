import defineType from "./index";

defineType("AwaitExpression", {
  builder: ["argument", "all"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});

defineType("BindExpression", {
  visitor: ["object", "callee"]
});

defineType("ComprehensionBlock", {
  visitor: ["left", "right"]
});

defineType("ComprehensionExpression", {
  visitor: ["filter", "blocks", "body"],
  aliases: ["Expression", "Scopable"]
});

defineType("Decorator", {
  visitor: ["expression"]
});

defineType("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"]
});

defineType("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});
