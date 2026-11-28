// A parenthesized target is not an IdentifierReference: the anonymous
// functions assigned to it are not named.
let a, C, f, g;
[(a) = function () {}, (C) = class {}] = [];
({ x: (f) = () => {}, y: g = () => {} } = {});
expect(a.name).toBe("");
expect(C.name).toBe("");
expect(f.name).toBe("");
expect(g.name).toBe("g");

[(a) = function () {}] = [void 0];
expect(a.name).toBe("");
