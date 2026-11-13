var a = [1, 2];
[...a, a.push(3)];

var b = [1, 2];
[...b, b.pop()];

var c = [1, 2];
fn(...c, c.push(3));

var d = [1, 2];
new Foo(...d, d.push(3));

var e = [1, 2];
[...e, ...iter];

var f = [1, 2];
var g = [10, 20];
[...f, f.push(3), ...g];

var h = [1, 2];
[h.push(0), ...h];

var p = [1, 2];
[...p, 3];
