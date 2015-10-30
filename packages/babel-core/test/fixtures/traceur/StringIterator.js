var s = 'abc 💩 def';

var expected = ['a', 'b', 'c', ' ', '💩', ' ', 'd', 'e', 'f'];
var actual = [];
for (var x of s) {
  actual.push(x);
}
assert.deepEqual(actual, expected);

var newS = new String('abc');
var res = [];
for (var x of newS) {
  res.push(x);
}
assert.deepEqual(res, ['a', 'b', 'c']);
