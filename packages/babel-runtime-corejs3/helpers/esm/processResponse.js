import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
function _processResponse(t, e, r) {
  return t.then(function (t) {
    var _context;
    if (t.ok) return t = t[e](), r ? t.then(r) : t;
    throw TypeError(_concatInstanceProperty(_context = "Fetch failed: ".concat(t.status, " ")).call(_context, t.statusText));
  });
}
export { _processResponse as default };