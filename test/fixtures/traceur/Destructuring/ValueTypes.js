(function() {
  var {toFixed} = 42;
  assert.equal(Number.prototype.toFixed, toFixed);

  var {toString, toLocaleString} = 42;
  assert.equal(Number.prototype.toString, toString);
  assert.equal(Number.prototype.toLocaleString, toLocaleString);

  var [x] = 'string';
  assert.equal('s', x);

  var [x, y] = 'string';
  assert.equal('s', x);
  assert.equal('t', y);

  var [x, ...xs] = 'string';
  assert.equal('s', x);
  assert.deepEqual(['t', 'r', 'i', 'n', 'g'], xs);

  var {toFixed: {length}} = 42;
  assert.equal(1, length);

  var {x: {toString}} = {x: true};
  assert.equal(Boolean.prototype.toString, toString);

  var [[x]] = ['string'];
  assert.equal('s', x);

  // Same with assignment expression

  ({toFixed} = 42);
  assert.equal(Number.prototype.toFixed, toFixed);

  ({toString, toLocaleString} = 42);
  assert.equal(Number.prototype.toString, toString);
  assert.equal(Number.prototype.toLocaleString, toLocaleString);

  [x] = 'string';
  assert.equal('s', x);

  [x, y] = 'string';
  assert.equal('s', x);
  assert.equal('t', y);

  [x, ...xs] = 'string';
  assert.equal('s', x);
  assert.deepEqual(['t', 'r', 'i', 'n', 'g'], xs);

  ({toFixed: {length}} = 42);
  assert.equal(1, length);

  ({x: {toString}} = {x: true});
  assert.equal(Boolean.prototype.toString, toString);

  [[x]] = ['string'];
  assert.equal('s', x);

})();
