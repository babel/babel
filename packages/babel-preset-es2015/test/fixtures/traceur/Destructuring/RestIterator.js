(function() {
  var i;

  function* f() {
    for (i = 0; i < 8; i++) {
      yield i;
    }
  }
  var x, x2, xs;
  [, x, , x2, , ...xs] = f();
  expect(x).toBe(1);
  expect(x2).toBe(3);
  expect(xs).toEqual([5, 6, 7]);

  [] = f();
  expect(i).toBe(8);  // Since we never call next().

  x = -1;
  [x] = f();
  expect(x).toBe(0);
  expect(i).toBe(0);  // Since we called next once.
})();

// Same but with VariableDeclarations instead of AssignmenExpressions.
(function() {
  var i;

  function* f() {
    for (i = 0; i < 8; i++) {
      yield i;
    }
  }

  var [, x, , x2, , ...xs] = f();
  expect(x).toBe(1);
  expect(x2).toBe(3);
  expect(xs).toEqual([5, 6, 7]);

  var [] = f();
  expect(i).toBe(8);  // Since we never call next().

  var [y] = f();
  expect(y).toBe(0);
  expect(i).toBe(0);  // Since we called next once.
})();
