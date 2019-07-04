"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

var foo = _interopRequireWildcard(require("./moduleWithGetter"));

exports.foo = foo;
var REQUIRE_WILD_CACHE = typeof WeakMap === 'function' ? new WeakMap() : undefined;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (REQUIRE_WILD_CACHE && REQUIRE_WILD_CACHE.has(obj)) { return REQUIRE_WILD_CACHE.get(obj); } var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; REQUIRE_WILD_CACHE && REQUIRE_WILD_CACHE.set(obj, newObj); return newObj; }
