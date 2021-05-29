var _tag = /*#__PURE__*/new WeakSet();

class Foo {
  constructor() {
    _tag.add(this);
  }

}

function _tag2() {
  return this;
}

new Foo();
