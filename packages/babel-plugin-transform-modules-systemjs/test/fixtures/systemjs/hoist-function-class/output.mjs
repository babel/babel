System.register([], function (_export, _context) {
  "use strict";

  var HoistedClass, HoistedClassExport, HoistedClassDefaultExport;
  function hoisted() {
    return HoistedClass, HoistedClassExport, HoistedClassDefaultExport;
  }
  _export({
    hoisted: hoisted,
    HoistedClassExport: void 0,
    default: void 0
  });
  return {
    setters: [],
    execute: function () {
      HoistedClass = class HoistedClass {};
      _export("HoistedClassExport", HoistedClassExport = class HoistedClassExport {});
      _export("default", HoistedClassDefaultExport = class HoistedClassDefaultExport {});
    }
  };
});
