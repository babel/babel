class A {}
A.prop = 1;
class B extends A {}
B.prop = 2;
B.propA = babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B);
B.getPropA = () => babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B);
