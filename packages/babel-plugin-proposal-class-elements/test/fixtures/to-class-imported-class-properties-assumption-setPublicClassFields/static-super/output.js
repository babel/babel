class A {}

babelHelpers.defineProperty(A, "prop", 1);

class B extends A {}

babelHelpers.defineProperty(B, "prop", 2);
babelHelpers.defineProperty(B, "propA", babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B));
babelHelpers.defineProperty(B, "getPropA", () => babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B));
