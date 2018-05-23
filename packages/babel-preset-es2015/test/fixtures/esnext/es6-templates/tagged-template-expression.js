function tag(strings) {
  var values = [].slice.call(arguments, 1);
  expect(strings[0]).toBe('a');
  expect(strings[1]).toBe('b');
  expect(values[0]).toBe(42);
  return 'whatever';
}
expect(tag `a${ 42 }b`).toBe('whatever');

function tagInterpolateFirst(strings) {
  var values = [].slice.call(arguments, 1);
  expect(strings[0]).toBe('');
  expect(strings[1]).toBe('b');
  expect(values[0]).toBe(42);
  return 'whatever';
}
expect(tagInterpolateFirst `${ 42 }b`).toBe('whatever');

function tagInterpolateLast(strings) {
  var values = [].slice.call(arguments, 1);
  expect(strings[0]).toBe('a');
  expect(strings[1]).toBe('');
  expect(values[0]).toBe(42);
  return 'whatever';
}
expect(tagInterpolateLast `a${ 42 }`).toBe('whatever');
