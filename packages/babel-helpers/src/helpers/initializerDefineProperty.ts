/* @minVersion 7.0.0-beta.0 */

interface DescriptorWithInitializer extends PropertyDescriptor {
  initializer?: () => any;
}

export default function _initializerDefineProperty<T>(
  target: T,
  property: PropertyKey,
  descriptor: DescriptorWithInitializer | undefined,
  context: DecoratorContext,
): void {
  if (!descriptor) return;

  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer
      ? descriptor.initializer.call(context)
      : void 0,
  });
}
