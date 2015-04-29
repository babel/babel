"use strict";

var i = (function (_i) {
  function i() {
    return _i.apply(this, arguments);
  }

  i.toString = function () {
    return _i.toString();
  };

  return i;
})(function () {
  i = 5;
});

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
