var _B;
class A {}
A.prop = 1;
class B extends A {}
_B = B;
B.prop = 2;
B.propA = babelHelpers.superPropGet(_B, "prop", _B);
B.getPropA = () => babelHelpers.superPropGet(_B, "prop", _B);
