/* @minVersion 7.23.6 */

// https://tc39.es/ecma262/#sec-setfunctionname
export default function setFunctionName<T extends Function>(
  fn: T,
  name: symbol | string,
  prefix?: string,
): T {
  if (typeof name === "symbol") {
    name = name.description;
    name = name ? "[" + name + "]" : "";
  }
  // In some older browsers .name was non-configurable, here we catch any
  // errors thrown by defineProperty.
  try {
    Object.defineProperty(fn, "name", {
      configurable: true,
      value: prefix ? prefix + " " + name : name,
    });
  } catch (_) {}
  return fn;
}
