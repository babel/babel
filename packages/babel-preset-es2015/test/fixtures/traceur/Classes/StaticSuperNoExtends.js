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
expect(NoExtends.method()).toEqual([NoExtends, 42, call]);

expect(NoExtends.getter).toEqual([NoExtends, 42, call]);

NoExtends.setter = 1;
expect(x).toEqual([NoExtends, 1, call]);

delete Function.prototype.testFunction;
delete Function.prototype.testGetter;
delete Function.prototype.testSetter;
