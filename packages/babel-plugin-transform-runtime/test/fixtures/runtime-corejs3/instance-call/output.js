var _includesInstanceProperty = require("core-js-pure/stable/instance/includes.js");

var _context, _context2, _context3;

_includesInstanceProperty(foo).call(foo, 1, 2, 3, 4);

_includesInstanceProperty(_context = [1, 2, 3, 4]).call(_context, 1);

_includesInstanceProperty(_context2 = '1234').call(_context2, '1');

_includesInstanceProperty(_context3 = keys(bar)).call(_context3, 1, 2);
