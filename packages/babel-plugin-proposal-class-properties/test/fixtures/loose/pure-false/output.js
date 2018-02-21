import ImportedClass from "./ImportedClass";
import throttle from "lodash/throttle";

var fn = () => "fn";

class MyClass1 {
  constructor() {
    this.method = () => {};
  }

}

var MyClass2 =
/*#__PURE__*/
(() => {
  class MyClass2 {}

  MyClass2.method = () => {};

  return MyClass2;
})();

class MyClass3 extends GlobalClass {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.method = () => {}, _temp;
  }

}

class MyClass4 extends ImportedClass {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.method = () => {}, _temp2;
  }

}

class MyClass5 extends fn() {
  constructor(...args) {
    var _temp3;

    return _temp3 = super(...args), this.method = () => {}, _temp3;
  }

}

class MyClass6 {
  constructor() {
    this[2 + 2] = () => {};
  }

}

var _fn = fn();

class MyClass7 {
  constructor() {
    this[_fn] = () => {};
  }

}

var MyClass8 = (() => {
  var _fn2 = fn();

  class MyClass8 {}

  MyClass8[_fn2] = () => {};

  return MyClass8;
})();

class MyClass9 {
  constructor() {
    this.onScroll = throttle(() => {}, 200);
  }

}

var MyClass10 = (() => {
  class MyClass10 {}

  MyClass10.onScroll = throttle(() => {}, 200);
  return MyClass10;
})();

class MyClass11 {
  constructor() {
    this.prop = 2 + 2;
  }

}

var MyClass12 =
/*#__PURE__*/
(() => {
  class MyClass12 {}

  MyClass12.prop = 2 + 2;
  return MyClass12;
})();
