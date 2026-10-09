class obj {
  static #add = (x, y) => x + y;
  static test() {
    const addOne = obj.#add(1, ?);
  }
}

obj.test();
