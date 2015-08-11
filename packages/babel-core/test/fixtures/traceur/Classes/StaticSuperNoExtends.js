var x = 42;

Function.prototype.testFunction = function() {
  return [this, 42, this.call];
};

Object.defineProperty(Function.prototype, 'testGetter', {
  get: function() {
    return [this, x, this.call];
  },
  configurable: true
});


Object.defineProperty(Function.prototype, 'testSetter', {
  set: function(value) {
    x = [this, value, this.call];
  },
  configurable: true
});


class NoExtends {
  static method() {
    return super.testFunction();
  }

  static get getter() {
    return super.testGetter;
  }

  static set setter(value) {
    super.testSetter = value;
  }
}

var call = Function.prototype.call;
assertArrayEquals([NoExtends, 42, call], NoExtends.method());

assertArrayEquals([NoExtends, 42, call], NoExtends.getter);

NoExtends.setter = 1;
assertArrayEquals([NoExtends, 1, call], x);

delete Function.prototype.testFunction;
delete Function.prototype.testGetter;
delete Function.prototype.testSetter;