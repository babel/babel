import callAsync from "./callAsync.js";
export default function _asyncToGenerator(fn) {
  return function () {
    return callAsync(fn, this, arguments);
  };
}