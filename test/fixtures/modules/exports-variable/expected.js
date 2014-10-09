var foo = 1;
exports.foo = foo;

var foo = function () {};
exports.foo = foo;

var bar;
exports.bar = bar;

let foo = 2;
exports.foo = foo;

let bar;
exports.bar = bar;

const foo = 3;
exports.foo = foo;

function foo () {}
exports.foo = foo;

class foo {}
exports.foo = foo;
