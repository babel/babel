"use strict";

exports.__esModule = true;
exports.test2 = exports.test = void 0;

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo2 = babelHelpers.interopRequireDefault(require("foo2"));

var foo2 = _interopRequireWildcard(require("foo3"));

var _foo4 = require("foo4");

var _foo5 = require("foo5");

function _getRequireWildcardCache(i) { if (typeof WeakMap !== "function") return null; var cache = [new WeakMap(), new WeakMap()]; _getRequireWildcardCache = function (i) { return cache[i]; }; return cache[i]; }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(+!!nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "default") { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var test;
exports.test = test;
var test2 = 5;
exports.test2 = test2;
_foo4.bar;
_foo5.foo;
_foo2.default;
