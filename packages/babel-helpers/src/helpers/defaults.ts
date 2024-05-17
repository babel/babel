/* @minVersion 7.0.0-beta.0 */

export default function _defaults<T extends object, S extends object>(
  obj: T,
  defaults: S,
): NonNullable<T & S> {
  for (
    var keys: string[] = Object.getOwnPropertyNames(defaults), i = 0;
    i < keys.length;
    i++
  ) {
    var key: string = keys[i],
      value: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(
        defaults,
        key,
      );
    if (value && value.configurable && obj[key as keyof T] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }
  return obj as NonNullable<T & S>;
}
