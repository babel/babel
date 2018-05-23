var s = 'abc 💩 def';

var expected = ['a', 'b', 'c', ' ', '💩', ' ', 'd', 'e', 'f'];
var actual = [];
for (var x of s) {
  actual.push(x);
}
expect(expected).toEqual(actual);

var newS = new String('abc');
var res = [];
for (var x of newS) {
  res.push(x);
}
expect(res).toEqual(['a', 'b', 'c']);
