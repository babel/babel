var MyClass = function () {
  var _arguments = arguments,
      _class,
      _temp,
      _initialiseProps;

  var stuff = 'outer stuff!';
  return _temp = _class = function _class() {
    babelHelpers.classCallCheck(this, _class);

    _initialiseProps.call(this);

    var stuff = 'constructor stuff!';
  }, _initialiseProps = function () {
    var _this = this;

    Object.defineProperty(this, "myProp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        console.log(_arguments);
        console.log(stuff);
        console.log(_this);
      }
    });
  }, _temp;
}(42);
