"use strict";

var _classSuperConstructorCall = function (instance, Constructor) { if (Object.getPrototypeOf(Constructor) !== null) { Object.getPrototypeOf(Constructor).apply(instance, arguments); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function (Foo) {
  function Test() {
    _classCallCheck(this, Test);

    _classSuperConstructorCall(this, Test);
  }

  _inherits(Test, Foo);

  return Test;
})(Foo);