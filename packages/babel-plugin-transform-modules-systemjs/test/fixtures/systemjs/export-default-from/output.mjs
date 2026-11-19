System.register(["foo", "bar", "baz"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      _export("v", _foo.default);
    }, function (_bar) {
      _export({
        w: _bar.default,
        ns: _bar
      });
    }, function (_baz) {
      _export({
        x: _baz.default,
        y: _baz.y
      });
    }],
    execute: function () {}
  };
});
