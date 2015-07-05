import { Parser, defaultOptions, tokTypes as tt } from "acorn";

defaultOptions.features = {};

const pp = Parser.prototype;

var _parseComprehension = pp.parseComprehension;
pp.parseComprehension = function () {
  if (this.options.features["es7.comprehensions"]) {
    return _parseComprehension.apply(this, arguments);
  } else {
    this.unexpected();
  }
};
