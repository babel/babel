class A {
  get #foo() {}
  set #foo(x) {}

  get #bar() {}
  set #bar(x) {}

  #baz;

  test() {
    class B {
      #foo;

      get #baz() {}
      set #baz(x) {}

      [this.#foo]() {
        this.#foo = 1;
        this.#bar = 2;
      }
      [this.#bar]() {
        this.#foo = 3;
        this.#bar = 4;
      }
      [this.#baz]() {
        this.#foo = 3;
        this.#bar = 4;
      }
    }
  }
}
