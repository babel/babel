class StrictModeTest {
  test() {
    var implicitThisInsideClassBody = (function() {
      return this;
    })();
    assert.strictEqual(
      implicitThisInsideClassBody,
      undefined,
      'implicit `this` inside class body is undefined'
    );
  }
}

new StrictModeTest().test();

var implicitThisOutsideClass = (function() {
  return this;
})();
assert.notStrictEqual(
  implicitThisOutsideClass,
  undefined,
  'implicit `this` outside class body is not undefined'
);
