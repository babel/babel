var _privateStaticMethod = Symbol("privateStaticMethod");
class Cl {
  publicMethod(checked) {
    return checked[_privateStaticMethod]();
  }
}
function _privateStaticMethod2() {}
Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
