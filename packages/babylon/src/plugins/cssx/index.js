import { TokenType, types as tt } from "../../tokenizer/types";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";

let pp = Parser.prototype;

// We expect that state is tt.name
pp.cssxParseElement = function(state) {
  let node = this.startNodeAt(state.start, state.startLoc);
  let children = [];

  node.selector = state.value;
  children.push(this.parseBlock());

  return this.finishNode(node, "CSSXElement");
};

export default function CSSX(instance) {
  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      const fallback = () => inner.call(this, declaration, topLevel);

      if (this.match(tt.name)) {
        let nameTokenState = this.state.clone();
        this.next();
        if (this.match(tt.braceL)) {
          return this.cssxParseElement(nameTokenState);
        } else {
          this.state = oldState;
          return fallback();
        }
      }

      return fallback();
    }
  });
};

