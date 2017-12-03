var failIfThrows = function (done) {
  'use strict';

  return function (e) {
    done(e || new Error());
  };
};

var delayPromise = function (value, ms) {
  'use strict';

  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, ms);
  });
};

describe('Promise.race', function () {
  'use strict';

  it('should not be enumerable', function () {
    expect(Promise).ownPropertyDescriptor('race').to.have.property('enumerable', false);
  });

  it('should fulfill if all promises are settled and the ordinally-first is fulfilled', function (done) {
    var iterable = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];

    Promise.race(iterable).then(function (value) {
      assert.strictEqual(value, 1);
    }).then(done, failIfThrows(done));
  });

  it('should reject if all promises are settled and the ordinally-first is rejected', function (done) {
    var iterable = [Promise.reject(1), Promise.reject(2), Promise.resolve(3)];

    Promise.race(iterable).then(
      function () {
        assert(false, 'should never get here');
      },
      function (reason) {
        assert.strictEqual(reason, 1);
      }
    ).then(done, failIfThrows(done));
  });

  it('should settle in the same way as the first promise to settle', function (done) {
    // ensure that even if timeouts are delayed an all execute together,
    // p2 will settle first.
    var p2 = delayPromise(2, 200);
    var p1 = delayPromise(1, 1000);
    var p3 = delayPromise(3, 500);
    var iterable = [p1, p2, p3];

    Promise.race(iterable).then(function (value) {
      assert.strictEqual(value, 2);
    }).then(done, failIfThrows(done));
  });

  // see https://github.com/domenic/promises-unwrapping/issues/75
  it('should never settle when given an empty iterable', function (done) {
    var iterable = [];
    var settled = false;

    Promise.race(iterable).then(
      function () { settled = true; },
      function () { settled = true; }
    );

    setTimeout(function () {
      assert.strictEqual(settled, false);
      done();
    }, 300);
  });

  it('should reject with a TypeError if given a non-iterable', function (done) {
    var notIterable = {};

    Promise.race(notIterable).then(
      function () {
        assert(false, 'should never get here');
      },
      function (reason) {
        assert(reason instanceof TypeError);
      }
    ).then(done, failIfThrows(done));
  });
});
