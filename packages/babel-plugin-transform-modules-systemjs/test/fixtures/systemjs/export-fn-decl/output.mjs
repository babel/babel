System.register([], function (_export, _context) {
  "use strict";

  var testProp;

  function testFunc() {
    return 'test function';
  }
  _export("testFunc", testFunc);

  return {
    setters: [],
    execute: function () {
      _export("testProp", testProp = 'test property');
    }
  };
});