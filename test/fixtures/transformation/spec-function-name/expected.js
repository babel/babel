"use strict";

var _selfGlobal = typeof global === "undefined" ? self : global;
var obj = {
  f: function f() {
    (function f() {
      console.log(f);
    })();
  },

  g: (function () {
    function _getOuter() {
      return g;
    }

    return function g() {
      console.log(_getOuter());
    };
  })(),

  h: function h() {
    console.log(_selfGlobal.h);
  },

  m: function m() {
    doSmth();
  }
};

var f = (function () {
  function _getOuter() {
    return f;
  }

  return function f() {
    console.log(_getOuter(), g);
  };
})();

var g = function g() {
  doSmth();
};
