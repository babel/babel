var acorn = require("acorn")

acorn.plugins["es7.trailingCommas"] = function (instance) {
  instance.extend("parseExprList", function (inner) {
    return function (close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
      return inner.call(this, close, true, allowEmpty, refShorthandDefaultPos);
    };
  });

  instance.extend("parseBindingList", function (inner) {
    return function (close, allowEmpty) {
      return inner.call(this, close, allowEmpty, true);
    };
  });
};
