export class MyClass {}
Object.defineProperty(MyClass, "_property", {
  value: value,
  enumerable: false,
  configurable: false,
  writable: true
});
export default class MyClass2 {}
Object.defineProperty(MyClass2, "_property2", {
  value: value,
  enumerable: false,
  configurable: false,
  writable: true
});
