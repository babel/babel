/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "./OverloadYield.ts";

export default function _awaitAsyncGenerator<T>(value: T) {
  return new OverloadYield<T>(value, /* kind: await */ 0);
}
