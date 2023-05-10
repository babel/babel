"use strict";

var _obj$a, _obj$b;
const obj = {
  a: {
    b: 0
  }
};
let test = obj === null || obj === void 0 ? true : (_obj$a = obj.a) === null || _obj$a === void 0 ? true : delete _obj$a.b;
test = obj === null || obj === void 0 ? true : delete obj.a.b;
test = obj === null || obj === void 0 ? true : (_obj$b = obj.b) === null || _obj$b === void 0 ? true : delete _obj$b.b;
obj === null || obj === void 0 ? true : delete obj.a;
