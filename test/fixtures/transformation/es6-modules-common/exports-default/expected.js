"use strict";

module.exports = foo;
module.exports = 42;
module.exports = {};
module.exports = [];
module.exports = foo;
module.exports = function () {};

module.exports = function () {};

function foo() {}
var Foo = undefined;
module.exports = Foo = function Foo() {};
