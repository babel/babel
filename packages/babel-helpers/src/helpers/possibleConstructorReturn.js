/* @minVersion 7.0.0-beta.0 */

import assertThisInitialized from "assertThisInitialized";

export default function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined",
    );
  }

  return assertThisInitialized(self);
}
