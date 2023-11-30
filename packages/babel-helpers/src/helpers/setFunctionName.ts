/* @minVersion 7.23.5 */

// https://tc39.es/ecma262/#sec-setfunctionname
export default function setFunctionName(
  fn: Function,
  name: symbol | string,
  prefix?: string,
) {
  if (typeof name === "symbol") {
    name = name.description;
    name = name ? "[" + (name as string) + "]" : "";
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
