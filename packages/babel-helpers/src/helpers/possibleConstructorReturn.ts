/* @minVersion 7.0.0-beta.0 */

import assertThisInitialized from "./assertThisInitialized.ts";

export default function _possibleConstructorReturn(
  self: object | undefined,
  value: unknown,
) {
  if (value && (typeof value === "object" || typeof value === "function")) {
    return value;
  } else if (value !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined",
    );
  }

  return assertThisInitialized(self);
}
