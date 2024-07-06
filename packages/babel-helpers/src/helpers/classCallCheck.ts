/* @minVersion 7.0.0-beta.0 */

export default function _classCallCheck<T extends object>(
  instance: unknown,
  Constructor: new (...args: any[]) => T,
): asserts instance is T {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
