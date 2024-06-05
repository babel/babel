/* @minVersion 7.0.0-beta.0 */

interface DescriptorWithInitializer extends PropertyDescriptor {
  initializer?: () => any;
}

export default function _applyDecoratedDescriptor<T>(
  target: T,
  property: PropertyKey,
  decorators: ((
    t: T,
    p: PropertyKey,
    desc: DescriptorWithInitializer,
  ) => any)[],
  descriptor: DescriptorWithInitializer,
  context: DecoratorContext,
) {
  var desc: DescriptorWithInitializer | null = {};
  Object.keys(descriptor).forEach(function (key) {
    // @ts-ignore(Babel 7 vs Babel 8) we are sure it's not null
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators
    .slice()
    .reverse()
    .reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}
