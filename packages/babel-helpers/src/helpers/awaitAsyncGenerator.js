/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "OverloadYield";

export default function _awaitAsyncGenerator(value) {
  return new OverloadYield(value, /* kind: await */ 0);
}
