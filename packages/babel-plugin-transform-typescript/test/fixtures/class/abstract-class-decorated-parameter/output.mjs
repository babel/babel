var _class, _descriptor;
import { observable } from 'mobx';
let Foo = (_class = class Foo {
  constructor() {
    babelHelpers.initializerDefineProperty(this, "id", _descriptor, this);
  }
}, _descriptor = babelHelpers.applyDecoratedDescriptor(_class.prototype, "id", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _class);
