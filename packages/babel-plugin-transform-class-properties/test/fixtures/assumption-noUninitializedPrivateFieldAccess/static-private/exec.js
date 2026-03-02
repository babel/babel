class A {
  static #x = 0;

  static dynamicCheck() {
    expect(this.#x).toBe(0);
    expect(this.#x = 1).toBe(1);
    expect(this.#x).toBe(1);
    [this.#x] = [2];
    expect(this.#x).toBe(2);
  }

  static noCheck() {
    expect(A.#x).toBe(2);
    expect(A.#x = 3).toBe(3);
    [A.#x] = [4];
    expect(A.#x).toBe(4);
  }
}

A.dynamicCheck();
A.noCheck();


