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
})();
