var a = [1, 2];
expect([...a, a.push(3)]).toEqual([1, 2, 3]);

var b = [1, 2];
expect([...b, b.pop()]).toEqual([1, 2, 2]);

var c = [1, 2];
expect(((...args) => args)(...c, c.push(3))).toEqual([1, 2, 3]);
