({ x, ...y, a, ...b, c });

({ ...Object.prototype });

({ ...{ foo: 'bar' } });

({ ...{ get foo () { return 'foo' } } });

({ ...{ foo: 'bar' }, get foo () { return 'foo' } });
