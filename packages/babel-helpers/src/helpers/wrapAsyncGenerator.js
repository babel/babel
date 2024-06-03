/* @minVersion 7.0.0-beta.0 */

import AsyncGenerator from "AsyncGenerator";

export default function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}
