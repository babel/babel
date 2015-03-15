System.register([], function (_export) {
  var _classCallCheck, foo, foo2, foo3, foo4, foo5, foo6, foo8;

  _export("foo7", foo7);

  function foo7() {}

  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      foo = 1;

      _export("foo", foo);

      foo2 = function foo2() {};

      _export("foo2", foo2);

      _export("foo3", foo3);

      foo4 = 2;

      _export("foo4", foo4);

      foo5 = undefined;

      _export("foo5", foo5);

      foo6 = 3;

      _export("foo6", foo6);

      foo8 = function foo8() {
        _classCallCheck(this, foo8);
      };

      _export("foo8", foo8);

      _export("foo3", foo3 = 5);
    }
  };
});
