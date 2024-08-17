/* @minVersion 7.0.0-beta.0 */

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function _initializerWarningHelper(
  descriptor: PropertyDescriptor,
  context: DecoratorContext,
): never {
  throw new Error(
    "Decorating class property failed. Please ensure that " +
      "transform-class-properties is enabled and runs after the decorators transform.",
  );
}
