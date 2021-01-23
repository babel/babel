var _privateStaticMethod = babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");

class Cl {
  test() {
    return babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticMethod)[_privateStaticMethod]();
  }

}

var _privateStaticMethod2 = async function _privateStaticMethod2() {
  return 2;
};

Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
return new Cl().test().then(val => {
  expect(val).toBe(2);
});
