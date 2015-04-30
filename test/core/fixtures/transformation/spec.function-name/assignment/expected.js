"use strict";

var _i = function i() {
  _i = 5;
};

var j = (function (_j) {
  function j() {
    return _j.apply(this, arguments);
  }

  j.toString = function () {
    return _j.toString();
  };

  return j;
})(function () {
  var _ = 5;
  j = _.j;

  ;
});
