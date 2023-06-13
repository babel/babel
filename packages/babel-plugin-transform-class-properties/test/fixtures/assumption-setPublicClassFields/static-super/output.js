var _class2;
class A {}
A.prop = 1;
class B extends A {}
_class2 = B;
B.prop = 2;
B.propA = babelHelpers.get(babelHelpers.getPrototypeOf(_class2), "prop", _class2);
B.getPropA = () => babelHelpers.get(babelHelpers.getPrototypeOf(_class2), "prop", _class2);
