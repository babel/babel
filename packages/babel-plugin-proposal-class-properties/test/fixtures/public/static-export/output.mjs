export var MyClass = function MyClass() {
  babelHelpers.classCallCheck(this, MyClass);
};
babelHelpers.defineProperty(MyClass, "property", value);

var MyClass2 = function MyClass2() {
  babelHelpers.classCallCheck(this, MyClass2);
};

babelHelpers.defineProperty(MyClass2, "property", value);
export { MyClass2 as default };
