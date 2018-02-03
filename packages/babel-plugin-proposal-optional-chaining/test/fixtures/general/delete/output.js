"use strict";

var _obj$a, _obj$b;

const obj = {
  a: {
    b: 0
  }
};
let test = obj === null || obj === void 0 ? void 0 : (_obj$a = obj.a) === null || _obj$a === void 0 ? void 0 : delete _obj$a.b;
test = obj === null || obj === void 0 ? void 0 : delete obj.a.b;
test = obj === null || obj === void 0 ? void 0 : (_obj$b = obj.b) === null || _obj$b === void 0 ? void 0 : delete _obj$b.b;
obj === null || obj === void 0 ? void 0 : delete obj.a;
