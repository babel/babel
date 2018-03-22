var a = '';
var b = ['b', ...a];
var c = [...b, ...b];
var d;
var e = [0, ...(d = '12'), 3];
var f = [... new String('abc')];

// ----------------------------------------------------------------------------

expect(b).toEqual(['b']);;
expect(c).toEqual(['b', 'b']);;
expect(e).toEqual([0, '1', '2', 3]);;
expect(f).toEqual(['a', 'b', 'c']);;
