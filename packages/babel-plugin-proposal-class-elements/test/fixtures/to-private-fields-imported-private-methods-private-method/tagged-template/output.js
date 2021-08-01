var _tag;

class Foo {
  #tag = _tag ||= function () {
    this.#tag``;
  };
}

new Foo();
