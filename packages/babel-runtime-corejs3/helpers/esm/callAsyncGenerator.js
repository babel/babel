import AsyncGenerator from "./AsyncGenerator.js";
export default function _callAsyncGenerator(fn, self, args) {
  return new AsyncGenerator(fn.apply(self, args));
}