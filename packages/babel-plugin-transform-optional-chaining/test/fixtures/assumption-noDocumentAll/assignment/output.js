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
const a = obj == null ? void 0 : obj.a;
const b = obj == null ? void 0 : (_obj$a = obj.a) == null ? void 0 : _obj$a.b;
const bad = obj == null ? void 0 : (_obj$b = obj.b) == null ? void 0 : _obj$b.b;
let val;
val = obj == null ? void 0 : (_obj$a2 = obj.a) == null ? void 0 : _obj$a2.b;
