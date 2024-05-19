/* @minVersion 7.0.0-beta.0 */

export default function _assertThisInitialized<T>(self: T | undefined): T {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}
