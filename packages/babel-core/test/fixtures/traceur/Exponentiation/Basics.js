// Options: --exponentiation

(function() {
  assert.equal(8, 2 ** 3);
  assert.equal(24, 3 * 2 ** 3);
  var x = 2;
  assert.equal(8, 2 ** ++x);
  assert.equal(1, 2 ** -1 * 2);

  var calls = 0;
  var q = {q: 3};
  var o = {
    get p() {
      calls++;
      return q;
    }
  };

  o.p.q **= 2;
  assert.equal(1, calls);
  assert.equal(9, o.p.q);

  assert.equal(512, 2 ** (3 ** 2));
  assert.equal(512, 2 ** 3 ** 2);

  var y = 4;
  var z = y **= 2;
  assert.equal(16, z);

  function f(x) {
    assert.equal(1, arguments.length);
    return x;
  }
  var a = 2;
  var b = [a **= 2];
  assert.equal(4, a);
  assert.equal(1, b.length);
  assert.equal(4, b[0]);

  assert.equal(64, f(a **= 3));
  assert.equal(64, a);
})();
