class A {
  #field;

  set #setter(value) {}

  method() {
    this.#field = 42;
    this.#setter = 43;


    inExpr(this.#field = 5);
  }
}
