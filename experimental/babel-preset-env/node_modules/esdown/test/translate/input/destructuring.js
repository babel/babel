[a, b] = foo;
[a] = foo;
([a] = foo);
[a,,b] = foo;
[a,...b] = foo;
[, a] = foo;

({ a, b: c } = foo);
({ a: [b, c] } = foo);
({ "a": a, 0: b } = foo);

({ [x]: y = 1 } = foo);

var {} = foo;
var { x: {} } = foo;

var [a, b] = foo,
    { c, c: d } = foo;

function f([a, b] = c) {}
function f({a, b: c} = d) {}

([a, b]) => {};
([a, b], ...args) => foo;

try { x() }
catch ([m]) {}
