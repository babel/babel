(function() {
  var {toFixed} = 42;
  expect(Number.prototype.toFixed).toBe(toFixed);

  var {toString, toLocaleString} = 42;
  expect(Number.prototype.toString).toBe(toString);
  expect(Number.prototype.toLocaleString).toBe(toLocaleString);

  var [x] = 'string';
  expect(x).toBe('s');

  var [x, y] = 'string';
  expect(x).toBe('s');
  expect(y).toBe('t');

  var [x, ...xs] = 'string';
  expect(x).toBe('s');
  expect(['t', 'r', 'i', 'n', 'g']).toEqual(xs);

  var {toFixed: {length}} = 42;
  expect(length).toBe(1);

  var {x: {toString}} = {x: true};
  expect(Boolean.prototype.toString).toBe(toString);

  var [[x]] = ['string'];
  expect(x).toBe('s');

  // Same with assignment expression

  (((((((((((({toFixed} = 42))))))))))));
  expect(Number.prototype.toFixed).toBe(toFixed);

  (((((((((((({toString, toLocaleString} = 42))))))))))));
  expect(Number.prototype.toString).toBe(toString);
  expect(Number.prototype.toLocaleString).toBe(toLocaleString);

  [x] = 'string';
  expect(x).toBe('s');

  [x, y] = 'string';
  expect(x).toBe('s');
  expect(y).toBe('t');

  [x, ...xs] = 'string';
  expect(x).toBe('s');
  expect(xs).toEqual(['t', 'r', 'i', 'n', 'g']);

  (((((((((((({toFixed: {length}} = 42))))))))))));
  expect(length).toBe(1);

  (((((((((((({x: {toString}} = {x: true}))))))))))));
  expect(Boolean.prototype.toString).toBe(toString);

  [[x]] = ['string'];
  expect(x).toBe('s');

})();
