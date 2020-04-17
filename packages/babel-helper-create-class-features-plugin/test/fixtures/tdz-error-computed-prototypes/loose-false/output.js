function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Foo {
  ['HELLO']() {
    console.log('>>>>', Foo);
  }

}

_defineProperty(Foo, "nickname", 'Tom');
