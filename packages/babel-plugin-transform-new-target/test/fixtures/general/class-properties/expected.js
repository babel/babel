class Foo {
  constructor() {
    var _newtarget = this instanceof Foo ? this.constructor : void 0;

    this.test = function _target() {
      this instanceof _target ? this.constructor : void 0;
    };

    this.test2 = function () {
      _newtarget;
    };
  }

}
