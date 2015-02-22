"use strict";

var obj = {
  // localy declared variable
  f: function f() {
    (function f() {
      console.log(f);
    })();
  },

  // self reference
  h: (function () {
    function _getOuter() {
      return h;
    }

    return function h() {
      console.log(_getOuter());
    };
  })(),

  // no reference
  m: function m() {
    doSmth();
  }
};

// locally declared variable
var f = function f() {
  var f = 2;
};

// self reference
var f = (function () {
  function _getOuter() {
    return f;
  }

  return function f() {
    console.log(_getOuter(), g);
  };
})();

// no reference
var g = function g() {
  doSmth();
};

// param with the same name as id
var h = (function (_h) {
  var _hWrapper = function h() {
    return _h.apply(this, arguments);
  };

  _hWrapper.toString = function () {
    return _h.toString();
  };

  return _hWrapper;
})(function (h) {});

// assignment to self
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

// assignment to self
var j = function j() {
  var _ref = 5;
  j = _ref.j;
};
