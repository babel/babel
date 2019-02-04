var _includesInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/includes");

_includesInstanceProperty(foo);

_includesInstanceProperty(keys(bar));

_includesInstanceProperty(foo).apply(bar, [1, 2]);

foo.includes = 42;
