"use strict";

var _a, _param, _foo, _x, _param2, _bar, _param3, _obj$baz, _obj;

const q = (_foo = foo, _a = a, _param = [...b], function foo(_argPlaceholder) {
  return _foo(_a, ..._param, _argPlaceholder);
});
const w = (_bar = bar, _x = x, _param2 = [...y], function bar(_argPlaceholder2, _argPlaceholder3) {
  return _bar(1, _x, _argPlaceholder2, ..._param2, _argPlaceholder3, 2);
});
const z = (_obj = obj, _obj$baz = _obj.baz, _param3 = [...d], function baz(_argPlaceholder4) {
  return _obj$baz.call(_obj, _argPlaceholder4, ..._param3);
});
