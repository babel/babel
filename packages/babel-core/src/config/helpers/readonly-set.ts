export default class ReadonlySet<T> {
  #data: Set<T>;
  constructor(data: Set<T>) {
    this.#data = data;
  }

  get size(): number {
    return this.#data.size;
  }

  has(value: T): boolean {
    return this.#data.has(value);
  }

  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any,
  ): void {
    this.#data.forEach(e => callbackfn.call(thisArg, e, e, this));
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.#data[Symbol.iterator]();
  }
}
