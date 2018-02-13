export var MyClass = (() => {
  var MyClass = function MyClass() {
    babelHelpers.classCallCheck(this, MyClass);
  };

  Object.defineProperty(MyClass, "property", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: value
  });
  return MyClass;
})();

var MyClass2 = (() => {
  var MyClass2 = function MyClass2() {
    babelHelpers.classCallCheck(this, MyClass2);
  };

  Object.defineProperty(MyClass2, "property", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: value
  });
  return MyClass2;
})();

export { MyClass2 as default };
