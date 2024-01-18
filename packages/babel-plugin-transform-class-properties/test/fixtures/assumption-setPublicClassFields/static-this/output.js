var _A;
class A {}
_A = A;
A.self = _A;
A.getA = () => _A;
