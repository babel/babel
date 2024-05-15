import AsyncGenerator from "./AsyncGenerator.js";
export default function _wrapAsyncGenerator(r) {
  return function () {
    return new AsyncGenerator(r.apply(this, arguments));
  };
}