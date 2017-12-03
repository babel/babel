function f(...args) { }
function f(a, ...args) { }
function f(a, ...args) { x => this; }
(a, ...args) => this.foo(args);
x(...args);
x(a, ...args);
x.y(a, ...args);
x(a, ...b, c);
[a, b, ...c, ...d, e];
[...a, b];
[a, ...b];
[...a, b, ...c];
[...a];
new x.y(a, ...args, b);
