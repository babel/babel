System.register("actual", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "actual";

  var _localExports = ['foo', 'bar', 'default'];

  return {
    setters: [
      function(m) {
        _export("foo", m.foo);

        _export("foo", m.foo);

        _export("bar", m.bar);

        _export("bar", m.foo);

        _export("default", m.foo);

        _export("default", m.foo);

        _export("bar", m.bar);

        for (var p in m) {
          if (_localExports.indexOf(i) == -1)
            _export(p, m[p]);
        }
      }
    ],
    execute: function () {}
  };
});
