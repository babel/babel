var failIfThrows = function (done) {
  'use strict';

  return function (e) {
    done(e || new Error());
  };
};

describe('Promise', function () {
  'use strict';

  specify('sanity check: a fulfilled promise calls its fulfillment handler', function (done) {
    Promise.resolve(5).then(function (value) {
      assert.strictEqual(value, 5);
    }).then(done, failIfThrows(done));
  });

  specify('directly resolving the promise with itself', function (done) {
    var resolvePromise;
    var promise = new Promise(function (resolve) { resolvePromise = resolve; });

    resolvePromise(promise);

    promise.then(
      function () {
        assert(false, 'Should not be fulfilled');
      },
      function (err) {
        assert(err instanceof TypeError);
      }
    ).then(done, failIfThrows(done));
  });

  specify('Stealing a resolver and using it to trigger possible reentrancy bug (#83)', function () {
    var stolenResolver;
    var StealingPromiseConstructor = function StealingPromiseConstructor(resolver) {
      stolenResolver = resolver;
      resolver(function () { }, function () { });
    };

    var iterable = {};
    var atAtIterator = '@@iterator'; // on firefox, at least.
    iterable[atAtIterator] = function () {
      stolenResolver(null, null);
      throw new Error(0);
    };

    assert.doesNotThrow(function () {
      Promise.all.call(StealingPromiseConstructor, iterable);
    });
  });

  specify('resolve with a thenable calls it once', function () {
    var resolve;
    var p = new Promise(function (r) { resolve = r; });
    var count = 0;
    resolve({
      then: function () {
        count += 1;
        throw new RangeError('reject the promise');
      }
    });
    var a = p.then(function () {})['catch'](function (err) {
      assert.equal(count, 1);
      assert.ok(err instanceof RangeError);
    });
    var b = p.then(function () {})['catch'](function (err) {
      assert.equal(count, 1);
      assert.ok(err instanceof RangeError);
    });
    return Promise.all([a, b]);
  });

  specify('resolve with a thenable that throws on .then, rejects the promise synchronously', function () {
    var resolve;
    var p = new Promise(function (r) { resolve = r; });
    var count = 0;
    var thenable = Object.defineProperty({}, 'then', {
      get: function () {
        count += 1;
        throw new RangeError('no then for you');
      }
    });
    resolve(thenable);
    assert.equal(count, 1);
    var a = p.then(function () {})['catch'](function (err) {
      assert.equal(count, 1);
      assert.ok(err instanceof RangeError);
    });
    var b = p.then(function () {})['catch'](function (err) {
      assert.equal(count, 1);
      assert.ok(err instanceof RangeError);
    });
    return Promise.all([a, b]);
  });
});
