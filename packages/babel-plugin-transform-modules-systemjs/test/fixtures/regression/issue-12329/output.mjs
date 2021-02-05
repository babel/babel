System.register([], function (_export, _context) {
  "use strict";

  var Light, Vec3;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("Light", void 0);

  return {
    setters: [],
    execute: function () {
      _export("Light", Light = class Light {
        constructor() {
          _defineProperty(this, "_color", Vec3);
        }

      });
    }
  };
});
