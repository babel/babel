let _bar, _name;
_bar = bar;
_name = name;
class A {
  constructor() {
    this.name = 8;
    this.length = 9;
  }
}
babelHelpers.defineProperty(A, "name", 1);
babelHelpers.defineProperty(A, "length", 2);
A.foo = 3;
A[_bar] = 4;
babelHelpers.defineProperty(A, "name", 5);
A[_name] = 6;
babelHelpers.defineProperty(A, "name", 7);
