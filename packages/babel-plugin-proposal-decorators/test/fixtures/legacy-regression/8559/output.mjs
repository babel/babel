import { autobind } from 'core-decorators';
export default function wrap() {
  return function () {
    var _class;
    let Foo = (_class = class Foo {
      method() {}
    }, babelHelpers.applyDecoratedDescriptor(_class.prototype, "method", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, "method"), _class.prototype), _class);
    return Foo;
  };
}
