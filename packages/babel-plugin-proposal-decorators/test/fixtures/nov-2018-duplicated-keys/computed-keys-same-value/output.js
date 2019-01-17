let Foo = babelHelpers.decorateBase([_ => desc = _], function (_initialize) {
  "use strict";

  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: [{
      kind: "method",
      key: getKeyI(),
      value: function () {
        return 1;
      }
    }, {
      kind: "method",
      key: getKeyJ(),
      value: function () {
        return 2;
      }
    }]
  };
}, void 0, [babelHelpers.decoratorsNov2018]);
