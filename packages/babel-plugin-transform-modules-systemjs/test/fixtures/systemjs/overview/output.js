System.register(["foo", "foo-bar", "./directory/foo-bar"], function (_export, _context) {
  "use strict";

  var foo, foo2, bar, bar2, test2;
  return {
    setters: [function (_foo) {
      foo = _foo.default;
      foo2 = _foo;
      bar = _foo.bar;
      bar2 = _foo.foo;
    }, function (_fooBar) {}, function (_directoryFooBar) {}],
    execute: function () {
      _export("test", test);

      _export("test2", test2 = 5);

      _export("test2", test2);

      _export("default", test);
    }
  };
});
