/* @minVersion 7.0.0-beta.0 */

export default function _typeof(
  obj: unknown,
):
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function" {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    // @ts-expect-error -- deliberate re-defining typeof
    _typeof = function (obj: unknown) {
      return typeof obj;
    };
  } else {
    // @ts-expect-error -- deliberate re-defining typeof
    _typeof = function (obj: unknown) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }

  return _typeof(obj);
}
