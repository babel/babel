// Options: --exponentiation

(function() {
  expect(2 ** 3).toBe(8);
  expect(3 * (2 ** 3)).toBe(24);
  var x = 2;
  expect(2 ** ++x).toBe(8);
  expect(2 ** -1 * 2).toBe(1);

  var calls = 0;
  var q = {q: 3};
  var o = {
    get p() {
      calls++;
      return q;
    }
  };

  o.p.q **= 2;
  expect(calls).toBe(1);
  expect(o.p.q).toBe(9);

  expect(2 ** (3 ** 2)).toBe(512);
  expect(2 ** (3 ** 2)).toBe(512);

  var y = 4;
  var z = y **= 2;
  expect(z).toBe(16);

  function f(x) {
    expect(arguments).toHaveLength(1);
    return x;
  }
  var a = 2;
  var b = [a **= 2];
  expect(a).toBe(4);
  expect(b).toHaveLength(1);
  expect(b[0]).toBe(4);

  expect(f(a **= 3)).toBe(64);
  expect(a).toBe(64);
})();
