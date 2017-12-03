/* global it, describe, assert, Promise */

describe('Support user subclassing of Promise', function () {
  'use strict';

  it('should work if you do it right', function (done) {
    // This is the "correct" es6-compatible way.
    // (Thanks, @domenic and @zloirock!)
    var MyPromise = function (executor) {
      var self = new Promise(executor);
      Object.setPrototypeOf(self, MyPromise.prototype);
      self.mine = 'yeah';
      return self;
    };
    if (!Object.setPrototypeOf) { return done(); } // skip test if on IE < 11
    Object.setPrototypeOf(MyPromise, Promise);
    MyPromise.prototype = Object.create(Promise.prototype, {
      constructor: { value: MyPromise }
    });

    // let's try it!
    var p1 = MyPromise.resolve(5);
    assert.strictEqual(p1.mine, 'yeah');
    p1 = p1.then(function (x) {
      assert.strictEqual(x, 5);
    });
    assert.strictEqual(p1.mine, 'yeah');

    var p2 = new MyPromise(function (r) { r(6); });
    assert.strictEqual(p2.mine, 'yeah');
    p2 = p2.then(function (x) {
      assert.strictEqual(x, 6);
    });
    assert.strictEqual(p2.mine, 'yeah');

    var p3 = MyPromise.all([p1, p2]);
    assert.strictEqual(p3.mine, 'yeah');
    p3.then(function () { done(); }, done);
  });

  it("should throw if you don't inherit at all", function () {
    var MyPromise = function () {};
    assert['throws'](function () {
      Promise.all.call(MyPromise, []);
    }, TypeError);
  });
});
