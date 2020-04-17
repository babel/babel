"use strict";

var _obj$a, _obj$b, _obj$a2;

const obj = {
  a: {
    b: {
      c: {
        d: 2
      }
    }
  }
};
const a = obj === null || obj === void 0 ? void 0 : obj.a;
const b = obj === null || obj === void 0 ? void 0 : (_obj$a = obj.a) === null || _obj$a === void 0 ? void 0 : _obj$a.b;
const bad = obj === null || obj === void 0 ? void 0 : (_obj$b = obj.b) === null || _obj$b === void 0 ? void 0 : _obj$b.b;
let val;
val = obj === null || obj === void 0 ? void 0 : (_obj$a2 = obj.a) === null || _obj$a2 === void 0 ? void 0 : _obj$a2.b;
