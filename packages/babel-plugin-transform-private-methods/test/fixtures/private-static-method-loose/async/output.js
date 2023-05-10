class Cl {
  test() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
}
async function _privateStaticMethod() {
  return 2;
}
return new Cl().test().then(val => {
  expect(val).toBe(2);
});
