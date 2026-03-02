import _Promise from "core-js-pure/features/promise/index.js";
import regenerator from "./regenerator.js";
import regeneratorAsyncIterator from "./regeneratorAsyncIterator.js";
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || _Promise);
}
export { _regeneratorAsyncGen as default };