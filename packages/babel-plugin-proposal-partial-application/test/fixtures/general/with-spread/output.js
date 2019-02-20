"use strict";

var _param, _param2, _foo, _param3, _param4, _bar, _param5, _obj$baz, _obj;

const q = (_foo = foo, _param = a, _param2 = [...b], function foo(_argPlaceholder) {
  return _foo(_param, ..._param2, _argPlaceholder);
});
const w = (_bar = bar, _param3 = x, _param4 = [...y], function bar(_argPlaceholder2, _argPlaceholder3) {
  return _bar(1, _param3, _argPlaceholder2, ..._param4, _argPlaceholder3, 2);
});
const z = (_obj = obj, _obj$baz = _obj.baz, _param5 = [...d], function baz(_argPlaceholder4) {
  return _obj$baz.call(_obj, _argPlaceholder4, ..._param5);
});
