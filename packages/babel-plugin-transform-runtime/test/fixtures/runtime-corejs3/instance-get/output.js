var _includesInstanceProperty = require("core-js-pure/stable/instance/includes.js");

_includesInstanceProperty(foo);

_includesInstanceProperty(keys(bar));

_includesInstanceProperty(foo).apply(bar, [1, 2]);

foo.includes = 42;
delete _includesInstanceProperty(foo);
