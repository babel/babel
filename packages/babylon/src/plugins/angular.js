import { types as tt } from "../tokenizer/types";
import Parser from "../parser";

var pp = Parser.prototype;

pp.angularParseBindingList = function (close, allowEmpty, allowTrailingComma) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) first = false;
    else this.expect(tt.comma);
    if (allowEmpty && this.match(tt.comma)) {
      elts.push(null);
    } else if (allowTrailingComma && this.eat(close)) {
      break;
    } else if (this.match(tt.ellipsis)) {
      elts.push(this.parseAssignableListItemTypes(this.parseRest()));
      this.expect(close);
      break;
    } else {
      var decorators = [];
      while (this.match(tt.at)) {
        decorators.push(this.parseDecorator());
      }
      var left = this.parseMaybeDefault();
      if (decorators.length > 0) {
        left.decorators = decorators;
      }
      this.parseAssignableListItemTypes(left);
      elts.push(this.parseMaybeDefault(null, null, left));
    }
  }
  return elts;
};

export default function (instance) {

  instance.extend("parseBindingList", function () {
    return function (close, allowEmpty, allowTrailingComma) {
      return this.angularParseBindingList(close, allowEmpty, allowTrailingComma);
    };
  });

}
