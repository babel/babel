var b = require("recast").types.builders;

module.exports = function (ast, file) {
  var body = ast.program.body;
  var first = body[0];

  var noStrict = !first || first.type !== "ExpressionStatement" || first.expression.type !== "Literal" || first.expression.value !== "use strict";

  if (noStrict) {
    if (file.opts._noStrict) return;
    body.unshift(b.expressionStatement(b.literal("use strict")));
  } else {
    if (file.opts._noStrict) body.shift();
  }
};
