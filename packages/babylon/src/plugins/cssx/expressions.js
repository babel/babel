import Parser from "../../parser";

let pp = Parser.prototype;

pp.cssxExpressionRegister = function (expressions) {
  if (expressions && expressions.length > 0) {
    this.state._cssxExpressions = expressions;
  }
};
pp.cssxExpressionSet = function (node) {
  let length, codeStr;

  if (this.state._cssxExpressions && this.state._cssxExpressions.length > 0) {
    node.expressions = this.state._cssxExpressions
      .map((expr) => {
        length = expr.end - expr.start;
        codeStr = this.state.input.substr(expr.start, length).substr(1, length-2);
        if (codeStr === "") return false;
        return {
          start: expr.start,
          end: expr.end,
          contextLoc: {
            start: expr.inner.start,
            end: expr.inner.end
          }
        };
      })
      .filter(function(expr) {
        return expr !== false;
      });
  }
  this.state._cssxExpressions = false;
};
