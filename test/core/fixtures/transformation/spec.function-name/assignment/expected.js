"use strict";

var i = (function (_i) {
  var _iWrapper = function i() {
    return _i.apply(this, arguments);
  };

  _iWrapper.toString = function () {
    return _i.toString();
  };

  return _iWrapper;
})(function () {
  i = 5;
});

var j = function j() {
  var _ = 5;
  j = _.j;
};
