"use strict";

var _a, _b, _foo, _x, _y, _bar, _d, _obj$baz, _obj;
const q = (_foo = foo, _a = a, _b = [...b], function foo(_argPlaceholder) {
  return _foo(_a, ..._b, _argPlaceholder);
});
const w = (_bar = bar, _x = x, _y = [...y], function bar(_argPlaceholder2, _argPlaceholder3) {
  return _bar(1, _x, _argPlaceholder2, ..._y, _argPlaceholder3, 2);
});
const z = (_obj = obj, _obj$baz = _obj.baz, _d = [...d], function baz(_argPlaceholder4) {
  return _obj$baz.call(_obj, _argPlaceholder4, ..._d);
});
