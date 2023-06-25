"use strict";

0 && (module.exports = { traverse: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = ["traverse"];
_export("traverse", function () {
  return _traverse.default;
});
__exportStar(require("./traverse/x"));
_interop = 1;
__exportStar(require("./traverse/traverse"));
var _traverse = _lastRequired;
var _lastRequired, _interop;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function __exportStar(mod) {
  return _reexports(exports, _lastRequired = _interop == 1 ? _interopRequireWildcard(mod) : mod, _exportNames);
}
function _reexports(exports, mod, exportNames) {
  for (const k in mod) {
    if (k === "default" || k === "__esModule" || exportNames.indexOf(k) >= 0) continue;
    k in exports && exports[k] === mod[k] || Object.defineProperty(exports, k, {
      get: function () {
        return mod[k];
      },
      enumerable: true
    });
  }
}
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
