var a;
var b;
var c;
var d;
var x;
var y;

({ x, ...y, a, ...b, c });

({ ...Object.prototype });

({ ...{ foo: 'bar' } });

({ ...{ foo: 'bar' }, ...{ bar: 'baz' } });

({ ...{ get foo () { return 'foo' } } });
