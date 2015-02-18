"use strict";

var _obj, _obj2, _obj$foo, _obj$foo2, _obj$foo3, _args, _args2, _args3;
var fn = (_obj = obj, _obj.method.bind(_obj));
var fn = (_obj2 = obj, _obj2.method.bind(_obj2, "foob"));
var fn = (_obj$foo = obj[foo], _obj$foo.method.bind(_obj$foo));
var fn = (_obj$foo2 = obj.foo, _obj$foo2.method.bind(_obj$foo2));
var fn = (_obj$foo3 = obj[foo()], _obj$foo3.method.bind(_obj$foo3));

["foo", "bar"].map((_args = [], function (_val) {
  return _val.toUpperCase();
}));
[1.1234, 23.53245, 3].map((_args2 = [2], function (_val2) {
  return _val2.toFixed(_args2[0]);
}));

var get = function get() {
  return 2;
};
[1.1234, 23.53245, 3].map((_args3 = [get()], function (_val3) {
  return _val3.toFixed(_args3[0]);
}));
