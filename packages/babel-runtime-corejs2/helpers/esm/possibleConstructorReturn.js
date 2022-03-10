import _typeof from "@babel/runtime-corejs2/helpers/typeof";
import assertThisInitialized from "./assertThisInitialized.js";
export default function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}