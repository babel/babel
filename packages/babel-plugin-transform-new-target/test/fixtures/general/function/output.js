function Foo() {
  this instanceof Foo ? this.constructor : void 0;
}

Foo.prototype.test = function _target() {
  this instanceof _target ? this.constructor : void 0;
};

var Bar = function _target2() {
  this instanceof _target2 ? this.constructor : void 0;
};
