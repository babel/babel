"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

var foo = _interopRequireWildcard(require("./moduleWithGetter"));

exports.foo = foo;

function _getRequireWildcardCache(obj) { if (typeof global === 'undefined' || typeof WeakMap !== 'function') { return null; } if (!global._REQUIRE_WILD_CACHE) { global._REQUIRE_WILD_CACHE = new WeakMap(); } return global._REQUIRE_WILD_CACHE; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(obj); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; cache && cache.set(obj, newObj); return newObj; }
