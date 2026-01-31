class obj {
  static #add = (x, y) => x + y;
  static test() {
    const addOne = obj.#add(1, ?);

    expect(addOne(5)).toEqual(6);
    expect(addOne.length).toEqual(1);
    expect(addOne.name).toEqual("_add");
  }
}

obj.test();
