import AsyncGenerator from "./AsyncGenerator.js";
function _wrapAsyncGenerator(r) {
  return function () {
    return new AsyncGenerator(r.apply(this, arguments));
  };
}
export { _wrapAsyncGenerator as default };