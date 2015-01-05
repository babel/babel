function tag(strings) {
  var values = [].slice.call(arguments, 1);
  assert.equal(strings[0], 'a');
  assert.equal(strings[1], 'b');
  assert.equal(values[0], 42);
  return 'whatever';
}
assert.equal(tag `a${ 42 }b`, 'whatever');

function tagInterpolateFirst(strings) {
  var values = [].slice.call(arguments, 1);
  assert.equal(strings[0], '');
  assert.equal(strings[1], 'b');
  assert.equal(values[0], 42);
  return 'whatever';
}
assert.equal(tagInterpolateFirst `${ 42 }b`, 'whatever');

function tagInterpolateLast(strings) {
  var values = [].slice.call(arguments, 1);
  assert.equal(strings[0], 'a');
  assert.equal(strings[1], '');
  assert.equal(values[0], 42);
  return 'whatever';
}
assert.equal(tagInterpolateLast `a${ 42 }`, 'whatever');
