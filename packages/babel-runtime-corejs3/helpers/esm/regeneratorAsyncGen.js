import _Promise from "core-js-pure/features/promise/index.js";
import regenerator from "./regenerator.js";
import regeneratorAsyncIterator from "./regeneratorAsyncIterator.js";
function _regeneratorAsyncGen(o, t, n, a, m) {
  return new regeneratorAsyncIterator(regenerator().w(o, t, n, a), m || _Promise);
}
export { _regeneratorAsyncGen as default };