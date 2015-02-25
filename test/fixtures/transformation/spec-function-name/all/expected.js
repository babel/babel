"use strict";

var obj = {
  // localy declared variable
  f: function f() {
    (function f() {
      console.log(f);
    })();
  },

  // self reference
  h: (function (_h) {
    var _hWrapper = function h() {
      return _h.apply(this, arguments);
    };

    _hWrapper.toString = function () {
      return _h.toString();
    };

    return _hWrapper;
  })(function () {
    console.log(h);
  }),

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
var f = (function (_f) {
  var _fWrapper = function f() {
    return _f.apply(this, arguments);
  };

  _fWrapper.toString = function () {
    return _f.toString();
  };

  return _fWrapper;
})(function () {
  console.log(f, g);
});

// no reference
var g = function g() {
  doSmth();
};

// param with the same name as id
var h = function h(h) {};

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
