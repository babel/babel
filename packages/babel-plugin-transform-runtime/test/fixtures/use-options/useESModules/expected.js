import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/es6/classCallCheck";
import _possibleConstructorReturn from "babel-runtime/helpers/es6/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/es6/inherits";

let Foo = function (_Bar) {
  _inherits(Foo, _Bar);

  function Foo() {
    _classCallCheck(this, Foo);

    return _possibleConstructorReturn(this, (Foo.__proto__ || _Object$getPrototypeOf(Foo)).apply(this, arguments));
  }

  return Foo;
}(Bar);
