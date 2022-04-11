class C {
  y = this.#x;
  #x;
}

expect(() => {
  new C();
}).toThrow();
