class Cl {
  test() {
    return _privateStaticMethod.call(Cl);
  }
}
async function _privateStaticMethod() {
  return 2;
}
return new Cl().test().then(val => {
  expect(val).toBe(2);
});
