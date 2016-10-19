System.register([], function (_export, _context) {
  "use strict";

  let Foo;
  function createInstance() {
    return new Foo();
  }

  _export("createInstance", createInstance);

  return {
    setters: [],
    execute: function () {
      Foo = class Foo {
        constructor() {
          this.foo = "foo";
        }
      };
    }
  };
});
