class A {}

A.prop = 1;

class B extends A {}

B.prop = 2;
B.propA = A.prop;

B.getPropA = () => A.prop;
