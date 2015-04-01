"use strict";

var i = (function (_i) {
  function i() {
    return _i.apply(this, arguments);
  }

  i.toString = function () {
    return i.toString();
  };

  return i;
})(function () {
  i = 5;
});

var j = function j() {
  var _ = 5;
  j = _.j;
};