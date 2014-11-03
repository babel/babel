var b = require("../builders");

module.exports = function (ast) {
  var body = ast.program.body;
  var first = body[0];

  var noStrict = !first || first.type !== "ExpressionStatement" || first.expression.type !== "Literal" || first.expression.value !== "use strict";

  if (noStrict) {
    body.unshift(b.expressionStatement(b.literal("use strict")));
  }
};
