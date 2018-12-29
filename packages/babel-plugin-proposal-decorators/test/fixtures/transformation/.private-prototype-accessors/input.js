@deco
class A {
  get #get() {}

  set #set(_) {}

  get #getset() {}
  set #getset(_) {}

  test() {
    this.#get;
    this.#set = 2;
    this.#getset;
    this.#getset = 2;
  }
}
