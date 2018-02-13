import ImportedClass from "./ImportedClass";
import throttle from "lodash/throttle";

var fn = () => "fn";

class MyClass1 {
  constructor() {
    Object.defineProperty(this, "method", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    });
  }

}

var MyClass2 =
/*#__PURE__*/
(() => {
  class MyClass2 {}

  Object.defineProperty(MyClass2, "method", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: () => {}
  });
  return MyClass2;
})();

class MyClass3 extends GlobalClass {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), Object.defineProperty(this, "method", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    }), _temp;
  }

}

class MyClass4 extends ImportedClass {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), Object.defineProperty(this, "method", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    }), _temp2;
  }

}

class MyClass5 extends fn() {
  constructor(...args) {
    var _temp3;

    return _temp3 = super(...args), Object.defineProperty(this, "method", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    }), _temp3;
  }

}

class MyClass6 {
  constructor() {
    Object.defineProperty(this, 2 + 2, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    });
  }

}

var _fn = fn();

class MyClass7 {
  constructor() {
    Object.defineProperty(this, _fn, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {}
    });
  }

}

var MyClass8 =
/*#__PURE__*/
(() => {
  var _fn2 = fn();

  class MyClass8 {}

  Object.defineProperty(MyClass8, _fn2, {
    configurable: true,
    enumerable: true,
    writable: true,
    value: () => {}
  });
  return MyClass8;
})();

class MyClass9 {
  constructor() {
    Object.defineProperty(this, "onScroll", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: throttle(() => {}, 200)
    });
  }

}

var MyClass10 =
/*#__PURE__*/
(() => {
  class MyClass10 {}

  Object.defineProperty(MyClass10, "onScroll", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: throttle(() => {}, 200)
  });
  return MyClass10;
})();

class MyClass11 {
  constructor() {
    Object.defineProperty(this, "prop", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 2 + 2
    });
  }

}

var MyClass12 =
/*#__PURE__*/
(() => {
  class MyClass12 {}

  Object.defineProperty(MyClass12, "prop", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 2 + 2
  });
  return MyClass12;
})();
