/* @minVersion 7.0.0-beta.0 */
/* @onlyBabel7 */
import toPropertyKey from "./toPropertyKey.ts";

export default function _defineEnumerableProperties<T>(
  obj: T,
  descs: PropertyDescriptor[],
) {
  // eslint-disable-next-line -- both guard-for-in and iterables are proposital
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  // Symbols are not enumerated over by for-in loops. If native
  // Symbols are available, fetch all of the descs object's own
  // symbol properties and define them on our target object too.
  if (Object.getOwnPropertySymbols) {
    var objectSymbols: Array<Symbol> = Object.getOwnPropertySymbols(descs);
    for (let i = 0; i < objectSymbols.length; i++) {
      const sym = objectSymbols[i];
      // @ts-expect-error Fixme: document symbol properties
      desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, toPropertyKey(sym), desc);
    }
  }
  return obj;
}
