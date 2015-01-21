"use strict";

var obj = (function () {
  var _obj = {};

  _obj["x" + foo] = "heh";
  _obj["y" + bar] = "noo";
  _obj.foo = "foo";
  _obj.bar = "bar";
  return _obj;
})();