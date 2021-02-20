define(["exports", "foo", "foo-bar", "./directory/foo-bar"], function (_exports, foo2, _fooBar, _fooBar2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.test2 = _exports.test = void 0;
  foo2 = _interopRequireWildcard(foo2);

  function _getRequireWildcardCache(i) { if (typeof WeakMap !== "function") return null; var cache = [new WeakMap(), new WeakMap()]; _getRequireWildcardCache = function (i) { return cache[i]; }; return cache[i]; }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(+!!nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "default") { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var test;
  _exports.test = test;
  var test2 = 5;
  _exports.test2 = test2;
  var _default = test;
  _exports.default = _default;
  foo2.default;
  foo2;
  foo2.bar;
  foo2.foo;
});
