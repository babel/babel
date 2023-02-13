/**
 * A Map that stores object keys weakly.
 */
export default class OptimisticallyWeakMap<K, V> extends WeakMap<
  K & object,
  V
> {
  #strongMap = new Map();

  has(key: K) {
    return typeof key === "object" ? super.has(key) : this.#strongMap.has(key);
  }

  get(key: K) {
    return typeof key === "object" ? super.get(key) : this.#strongMap.get(key);
  }

  set(key: K, value: V) {
    typeof key === "object"
      ? super.set(key, value)
      : this.#strongMap.set(key, value);
    return this;
  }

  delete(key: K) {
    return typeof key === "object"
      ? super.delete(key)
      : this.#strongMap.delete(key);
  }
}
