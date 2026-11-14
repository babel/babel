const { fn = (((function () {}))), arrow = ((() => 1)), C = ((class { static seen = this.name; })) } = source;
let assigned;
({ fn: assigned = ((function () {})) } = source);
const { name, seen } = ((class { static seen = this.name; }));
for (var {} = source, [loop = ((function () {}))] = [void 0]; false;) {}
use(fn, arrow, C, assigned, name, seen, loop);
