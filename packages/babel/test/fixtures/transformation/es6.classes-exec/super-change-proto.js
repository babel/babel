var log = '';

class Base {
  p() { log += '[Base]'; }
}

class OtherBase {
  p() { log += '[OtherBase]'; }
}

class Derived extends Base {
  p() {
    log += '[Derived]';
    super.p();
    Derived.prototype.__proto__ = OtherBase.prototype;
    super.p();
  }
}

new Derived().p();
assert.equal(log, '[Derived][Base][OtherBase]');
