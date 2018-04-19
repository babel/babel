var _foo = "yes",
    foob = "no";
export { _foo as foo, foob };

function _whatever() {}

export { _whatever as whatever };

function _wowzers() {}

export { _wowzers as default };
var bar = {
  foo: function foo() {
    _foo;
  },
  whatever: function whatever() {
    _whatever;
  },
  wowzers: function wowzers() {
    _wowzers;
  }
};
