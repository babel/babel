define(["require"], function (_require) {
  function _createRequireWildcardCache(obj) { if (typeof global._REQUIRE_WILD_CACHE === 'undefined') { global._REQUIRE_WILD_CACHE = typeof WeakMap === 'function' ? new WeakMap() : null; } var cache = global._REQUIRE_WILD_CACHE; return { has: function has() { return cache ? cache.has(obj) : false; }, set: function set(newObj) { cache && cache.set(obj, newObj); }, get: function get() { return cache ? cache.get(obj) : null; } }; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _createRequireWildcardCache(obj); if (cache.has()) { return cache.get(); } var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; cache.set(newObj); return newObj; }

  new Promise(function (_resolve, _reject) {
    return _require(["foo"], function (imported) {
      return _resolve(_interopRequireWildcard(imported));
    }, _reject);
  });
});
