"use strict";

var _obj$a, _obj$b, _obj$b2;

const obj = {
  a: {
    b: 0
  }
};
let test = +(obj === null || obj === void 0 ? void 0 : (_obj$a = obj.a) === null || _obj$a === void 0 ? void 0 : _obj$a.b);
test = +(obj === null || obj === void 0 ? void 0 : obj.a.b);
test = +(obj === null || obj === void 0 ? void 0 : (_obj$b = obj.b) === null || _obj$b === void 0 ? void 0 : _obj$b.b);
test = +(obj === null || obj === void 0 ? void 0 : (_obj$b2 = obj.b) === null || _obj$b2 === void 0 ? void 0 : _obj$b2.b);
