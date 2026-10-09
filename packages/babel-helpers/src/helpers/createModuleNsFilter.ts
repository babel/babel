/* @minVersion 8.1.0 */

type Namespace = Record<string, unknown>;

export default function _createModuleNsFilter(sortedNames: string[]) {
  return (ns: Namespace) => {
    var getter = (name: string) => () => ns[name];

    var filtered = Object.create(null);
    for (var i = 0; i < sortedNames.length; i++) {
      var name = sortedNames[i];
      if (!(name in ns)) {
        throw new ReferenceError(
          "The requested module does not provide an export named '" +
            name +
            "'",
        );
      }
      // duplicated names are ignored
      if (!(name in filtered)) {
        Object.defineProperty(filtered, name, {
          enumerable: true,
          get: getter(name),
        });
      }
    }
    Object.defineProperty(filtered, Symbol.toStringTag, { value: "Module" });
    return Object.freeze(filtered);
  };
}
