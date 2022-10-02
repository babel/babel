function Foo() {
  function Foo() {
    var _Foo = this instanceof Foo ? this.constructor : void 0;
  }
  Foo.prototype.test = function _target() {
    var Foo = this instanceof _target ? this.constructor : void 0;
  };
}
var Bar = function _target2() {
  var Bar = this instanceof _target2 ? this.constructor : void 0;
};
