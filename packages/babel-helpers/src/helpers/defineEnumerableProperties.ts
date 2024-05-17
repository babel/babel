/* @minVersion 7.0.0-beta.0 */
/* @onlyBabel7 */
import toPropertyKey from "./toPropertyKey.ts";

type Descs = {
  [key: string]: {
    configurable: boolean;
    enumerable: boolean;
    writable: boolean;
  };
};

export default function _defineEnumerableProperties<T>(obj: T, descs: Descs) {
  // eslint-disable-next-line guard-for-in
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
    for (const sym of objectSymbols) {
      // @ts-expect-error Fixme: document symbol properties
      desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, toPropertyKey(sym), desc);
    }
  }
  return obj;
}
