// https://github.com/babel/babel/issues/18352
const { f = function () {}, g = () => {}, C = class {}, h = function named() {} } = {};
expect(f.name).toBe("f");
expect(g.name).toBe("g");
expect(C.name).toBe("C");
expect(h.name).toBe("named");

let m, n;
[m = () => {}, { n = function () {} }] = [undefined, {}];
expect(m.name).toBe("m");
expect(n.name).toBe("n");

// a class with an own static "name" keeps it
const { D = class { static name = "custom"; } } = {};
expect(D.name).toBe("custom");
