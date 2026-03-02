"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrap;
var _coreDecorators = require("core-decorators");
function wrap() {
  return function () {
    var _class;
    let Foo = (_class = class Foo {
      method() {}
    }, babelHelpers.applyDecoratedDescriptor(_class.prototype, "method", [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, "method"), _class.prototype), _class);
    return Foo;
  };
}
