
var f1 = implements => implements;
var f2 = implements => { return implements; };
var f3 = (implements) => { return implements; };
expect(1).toBe(f1(1));
expect(2).toBe(f2(2));
expect(3).toBe(f1(3));

var g = ({static}) => static;
expect(4).toBe(g({static: 4}));

var h1 = ([protected]) => protected;
var h2 = ([...protected]) => protected[0];
expect(5).toBe(h1([5]));
expect(6).toBe(h2([6]));
