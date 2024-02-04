/* @minVersion 7.0.0-beta.0 */

// @ts-expect-error helper
import setPrototypeOf from "setPrototypeOf";
import isNativeReflectConstruct from "./isNativeReflectConstruct.ts";

export default function _construct(
  Parent: Function,
  args: any[],
  Class: Function,
): any {
  if (isNativeReflectConstruct()) {
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return Reflect.construct.apply(null, arguments as any);
  }
  // NOTE: If Parent !== Class, the correct __proto__ is set *after*
  //       calling the constructor.
  var a: any[] = [null];
  a.push.apply(a, args);
  var instance = new (Parent.bind.apply(Parent, a))();
  if (Class) setPrototypeOf(instance, Class.prototype);
  return instance;
}
