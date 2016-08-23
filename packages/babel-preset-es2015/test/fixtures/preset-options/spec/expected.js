"use strict";

"1" + String(a);

(function () {
  babelHelpers.newArrowCheck(undefined, undefined);
}).bind(undefined);

function a() {
  var _this = this;

  (function () {
    babelHelpers.newArrowCheck(this, _this);
  }).bind(this);
}
