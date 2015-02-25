System.register([], function (_export) {
  var _classCallCheck, foo, foo2, foo3, foo4, foo5, foo6, foo8;

  _export("foo7", foo7);

  function foo7() {}
  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      foo = _export("foo", 1);
      foo2 = _export("foo2", function foo2() {});
      foo3 = _export("foo3", undefined);
      foo4 = _export("foo4", 2);
      foo5 = _export("foo5", undefined);
      foo6 = _export("foo6", 3);
      foo8 = _export("foo8", function foo8() {
        _classCallCheck(this, foo8);
      });

      _export("foo3", foo3 = 5);
    }
  };
});