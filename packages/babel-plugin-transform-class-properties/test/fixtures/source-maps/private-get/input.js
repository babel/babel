class A {
  #field;

  get #getter() {}

  #method() {}

  method() {
    this.#field;
    this.#getter;
    this.#method;

    inExpr(this.#field);
  }
}
