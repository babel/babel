class A extends class B {} {}

babelHelpers.defineProperty(A, "x", class B {}.x);
