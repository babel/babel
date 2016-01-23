import Parser from "../../parser";
import { parse } from "../../../";

let pp = Parser.prototype;

const PARSER_OPTIONS = {
  locations: true,
  ranges: true
};

pp.cssxExpressionRegister = function (expressions) {
  if (expressions && expressions.length > 0) {
    this.state._cssxExpressions = expressions;
  }
};
pp.cssExpressionSet = function (node) {
  let length, codeStr, exprNode;

  if (this.state._cssxExpressions && this.state._cssxExpressions.length > 0) {
    node.expressions = this.state._cssxExpressions
      .map(expr => {
        length = expr.end - expr.start;
        codeStr = this.state.input.substr(expr.start, length).substr(1, length-2);
        if (codeStr === '') return false;
        try {
          exprNode = parse(codeStr, PARSER_OPTIONS);
        } catch(err) {
          this.raise(expr.start, err.toString().split('(')[0]);
        }
        return {
          start: expr.start,
          end: expr.end,
          inSelector: {
            start: expr.inner.start,
            end: expr.inner.end
          },
          body: exprNode.program.body
        }
      })
      .filter(expr => expr !== false);
  }
  this.state._cssxExpressions = false;
};
