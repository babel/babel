var foo = {};

[foo.foo, foo.bar] = [1, 2];
;

expect(foo).toEqual({ foo: 1, bar: 2 });
