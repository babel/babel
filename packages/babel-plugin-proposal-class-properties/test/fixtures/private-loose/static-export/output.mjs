export class MyClass {}

var _property = babelHelpers.classPrivateFieldLooseKey("property");

Object.defineProperty(MyClass, _property, {
  writable: true,
  value: value
});
export default class MyClass2 {}

var _property2 = babelHelpers.classPrivateFieldLooseKey("property");

Object.defineProperty(MyClass2, _property2, {
  writable: true,
  value: value
});
