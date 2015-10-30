var a = '';
var b = ['b', ...a];
var c = [...b, ...b];
var d;
var e = [0, ...d = '12', 3];
var f = [... new String('abc')];

// ----------------------------------------------------------------------------

assertArrayEquals(['b'], b);
assertArrayEquals(['b', 'b'], c);
assertArrayEquals([0, '1', '2', 3], e);
assertArrayEquals(['a', 'b', 'c'], f);
