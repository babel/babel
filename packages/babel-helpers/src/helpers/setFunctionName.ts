/* @minVersion 7.23.5 */

// https://tc39.es/ecma262/#sec-setfunctionname
export default function setFunctionName(
  fn: Function,
  name: symbol | string,
  prefix?: string,
) {
  if (typeof name === "symbol") {
    var description = name.description;
    name = description ? "[" + description + "]" : "";
  }
  name += "";
  if (prefix) {
    name = prefix + " " + name;
  }
  // In some older browsers .name was non-configurable, here we catch any
  // errors thrown by defineProperty.
  try {
    return Object.defineProperty(fn, "name", {
      configurable: true,
      value: name,
    });
  } catch (_) {
    return fn;
  }
}
