import AsyncGenerator from "./AsyncGenerator.js";
export default function _newAsyncGenerator(fn, self, args) {
  return new AsyncGenerator(fn.apply(self, args));
}