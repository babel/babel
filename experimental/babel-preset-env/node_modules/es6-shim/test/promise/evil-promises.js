describe('Evil promises should not be able to break invariants', function () {
  'use strict';

  specify('resolving to a promise that calls onFulfilled twice', function (done) {
    // note that we have to create a trivial subclass, as otherwise the
    // Promise.resolve(evilPromise) is just the identity function.
    // (And in fact, most native Promise implementations use a private
    // [[PromiseConstructor]] field in `Promise.resolve` which can't be
    // easily patched in an ES5 engine, so instead of
    // `Promise.resolve(evilPromise)` we'll use
    // `new Promise(function(r){r(evilPromise);})` below.)
    var EvilPromise = function (executor) {
      var self = new Promise(executor);
      Object.setPrototypeOf(self, EvilPromise.prototype);
      return self;
    };
    if (!Object.setPrototypeOf) { return done(); } // skip test if on IE < 11
    Object.setPrototypeOf(EvilPromise, Promise);
    EvilPromise.prototype = Object.create(Promise.prototype, {
      constructor: { value: EvilPromise }
    });

    var evilPromise = EvilPromise.resolve();
    evilPromise.then = function (f) {
      f(1);
      f(2);
    };

    var calledAlready = false;
    new Promise(function (r) { r(evilPromise); }).then(function (value) {
      assert.strictEqual(calledAlready, false);
      calledAlready = true;
      assert.strictEqual(value, 1);
    }).then(done, done);
  });
});
