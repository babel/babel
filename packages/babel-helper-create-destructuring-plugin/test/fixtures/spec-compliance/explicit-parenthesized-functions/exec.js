const { fn = (((function () {}))), arrow = ((() => 1)), C = ((class { static seen = this.name; })) } = {};
expect([fn.name, arrow.name, C.name, C.seen]).toEqual(["fn", "arrow", "C", "C"]);
let assigned;
({ fn: assigned = ((function () {})) } = {});
expect(assigned.name).toBe("assigned");
const { name, seen } = ((class { static seen = this.name; }));
expect([name, seen]).toEqual(["", ""]);
for (var {} = Object(1), [loop = ((function () {}))] = [void 0]; false;) {}
expect(loop.name).toBe("loop");
