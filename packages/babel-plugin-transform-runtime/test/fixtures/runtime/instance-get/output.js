var _includesInstanceProperty = require("@babel/runtime/core-js/instance/includes");

_includesInstanceProperty(foo);

_includesInstanceProperty(keys(bar));

_includesInstanceProperty(foo).apply(bar, [1, 2]);

foo.includes = 42;
