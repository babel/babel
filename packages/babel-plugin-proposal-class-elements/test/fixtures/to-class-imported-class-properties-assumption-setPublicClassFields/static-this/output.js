class A {}

babelHelpers.defineProperty(A, "self", A);
babelHelpers.defineProperty(A, "getA", () => A);
