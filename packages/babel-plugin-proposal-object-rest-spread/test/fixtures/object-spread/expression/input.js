({ x, ...y, a, ...b, c });

({ ...Object.prototype });

({ ...{ foo: 'bar' } });

({ ...{ foo: 'bar' }, ...{ bar: 'baz' } });

({ ...{ get foo () { return 'foo' } } });
