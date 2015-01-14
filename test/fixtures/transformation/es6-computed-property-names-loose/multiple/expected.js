"use strict";

var obj = (function () {
  var _obj = {};

  _obj["x" + foo] = "heh";
  _obj["y" + bar] = "noo";
  return _obj;
})();