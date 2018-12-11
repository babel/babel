function pushElement(e) {
  return function (c) {
    c.elements.push(e);
    return c;
  };
}

expect(() => {
  let A = babelHelpers.decorate([pushElement({
    kind: "initializer",
    placement: "static",

    initializer() {}

  })], function (_initialize) {
    "use strict";

    class A {
      constructor() {
        _initialize(this);
      }

    }

    return {
      F: A,
      d: []
    };
  });
}).toThrow(TypeError);
