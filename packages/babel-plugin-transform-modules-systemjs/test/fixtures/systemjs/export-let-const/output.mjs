System.register([], function (_export, _context) {
  "use strict";

  var l_foo, c_foo, l_bar, c_bar;
  return {
    setters: [],
    execute: function () {
      _export("l_foo", l_foo = 1);
      _export("c_foo", c_foo = 2);
      {
        let l_foo, l_bar;
        const c_foo = 3;
        const c_bar = 4;
      }
      _export("l_bar", l_bar = 4);
      _export("c_bar", c_bar = 6);
    }
  };
});
