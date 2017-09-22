var _property, _property2;

export var MyClass = function MyClass() {
  babelHelpers.classCallCheck(this, MyClass);
};
_property = babelHelpers.classPrivateFieldKey("property");
Object.defineProperty(MyClass, _property, {
  writable: true,
  value: value
});

var MyClass2 = function MyClass2() {
  babelHelpers.classCallCheck(this, MyClass2);
};

_property2 = babelHelpers.classPrivateFieldKey("property");
Object.defineProperty(MyClass2, _property2, {
  writable: true,
  value: value
});
export { MyClass2 as default };
