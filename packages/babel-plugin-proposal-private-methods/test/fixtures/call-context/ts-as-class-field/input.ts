class A {
  #x;
  
  fn() {
    (this.#x as any)();
  }
}
