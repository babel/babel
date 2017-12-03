/* global it, describe, expect, assert, Promise */

var failIfThrows = function (done) {
  'use strict';

  return function (e) {
    done(e || new Error());
  };
};

describe('Promise.all', function () {
  'use strict';

  it('should not be enumerable', function () {
    expect(Promise).ownPropertyDescriptor('all').to.have.property('enumerable', false);
  });

  it('fulfills if passed an empty array', function (done) {
    var iterable = [];

    Promise.all(iterable).then(function (value) {
      assert(Array.isArray(value));
      assert.deepEqual(value, []);
    }).then(done, failIfThrows(done));
  });

  it('fulfills if passed an empty array-like', function (done) {
    var f = function () {
      Promise.all(arguments).then(function (value) {
        assert(Array.isArray(value));
        assert.deepEqual(value, []);
      }).then(done, failIfThrows(done));
    };
    f();
  });

  it('fulfills if passed an array of mixed fulfilled promises and values', function (done) {
    var iterable = [0, Promise.resolve(1), 2, Promise.resolve(3)];

    Promise.all(iterable).then(function (value) {
      assert(Array.isArray(value));
      assert.deepEqual(value, [0, 1, 2, 3]);
    }).then(done, failIfThrows(done));
  });

  it('rejects if any passed promise is rejected', function (done) {
    var foreverPending = new Promise(function () { });
    var error = new Error('Rejected');
    var rejected = Promise.reject(error);

    var iterable = [foreverPending, rejected];

    Promise.all(iterable).then(
      function () {
        assert(false, 'should never get here');
      },
      function (reason) {
        assert.strictEqual(reason, error);
      }
    ).then(done, failIfThrows(done));
  });

  it('resolves foreign thenables', function (done) {
    var normal = Promise.resolve(1);
    var foreign = { then: function (f) { f(2); } };

    var iterable = [normal, foreign];

    Promise.all(iterable).then(function (value) {
      assert.deepEqual(value, [1, 2]);
    }).then(done, failIfThrows(done));
  });

  it('fulfills when passed an sparse array, giving `undefined` for the omitted values', function (done) {
    /* jshint elision: true */
    /* jscs:disable disallowSpaceBeforeComma */
    /* jscs:disable requireSpaceAfterComma */
    /* eslint-disable no-sparse-arrays */
    var iterable = [Promise.resolve(0), , , Promise.resolve(1)];
    /* eslint-enable no-sparse-arrays */
    /* jscs:enable requireSpaceAfterComma */
    /* jscs:enable disallowSpaceBeforeComma */
    /* jshint elision: false */

    Promise.all(iterable).then(function (value) {
      assert.deepEqual(value, [0, undefined, undefined, 1]);
    }).then(done, failIfThrows(done));
  });

  it('does not modify the input array', function (done) {
    var input = [0, 1];
    var iterable = input;

    Promise.all(iterable).then(function (value) {
      assert.notStrictEqual(input, value);
    }).then(done, failIfThrows(done));
  });

  it('should reject with a TypeError if given a non-iterable', function (done) {
    var notIterable = {};

    Promise.all(notIterable).then(
      function () {
        assert(false, 'should never get here');
      },
      function (reason) {
        assert(reason instanceof TypeError);
      }
    ).then(done, failIfThrows(done));
  });

  // test cases from
  // https://github.com/domenic/promises-unwrapping/issues/89#issuecomment-33110203
  var tamper = function (p) {
    p.then = function (fulfill, reject) {
      fulfill('tampered');
      return Promise.prototype.then.call(this, fulfill, reject);
    };
    return p;
  };

  it('should be robust against tampering (1)', function (done) {
    var g = [tamper(Promise.resolve(0))];
    // Prevent countdownHolder.[[Countdown]] from ever reaching zero
    Promise.all(g).then(
      function () { done(); },
      failIfThrows(done)
    );
  });

  it('should be robust against tampering (2)', function (done) {
    // Promise from Promise.all resolved before arguments
    var fulfillCalled = false;

    var g = [
      Promise.resolve(0),
      tamper(Promise.resolve(1)),
      Promise.resolve(2).then(function () {
        assert(!fulfillCalled, 'should be resolved before all()');
      }).then(function () {
        assert(!fulfillCalled, 'should be resolved before all()');
      })['catch'](failIfThrows(done))
    ];
    Promise.all(g).then(function () {
      assert(!fulfillCalled, 'should be resolved last');
      fulfillCalled = true;
    }).then(done, failIfThrows(done));
  });

  it('should be robust against tampering (3)', function (done) {
    var g = [
      Promise.resolve(0),
      tamper(Promise.resolve(1)),
      Promise.reject(2)
    ];
    // Promise from Promise.all resolved despite rejected promise in arguments
    Promise.all(g).then(function () {
      throw new Error('should not reach here!');
    }, function (e) {
      assert.strictEqual(e, 2);
    }).then(done, failIfThrows(done));
  });

  it('should be robust against tampering (4)', function (done) {
    var hijack = true;
    var actualArguments = [];
    var P = function (resolver) {
      var self;
      if (hijack) {
        hijack = false;
        self = new Promise(function (resolve, reject) {
          return resolver(function (values) {
            // record arguments & # of times resolve function is called
            actualArguments.push(values.slice());
            return resolve(values);
          }, reject);
        });
      } else {
        self = new Promise(resolver);
      }
      Object.setPrototypeOf(self, P.prototype);
      return self;
    };
    if (!Object.setPrototypeOf) { return done(); } // skip test if on IE < 11
    Object.setPrototypeOf(P, Promise);
    P.prototype = Object.create(Promise.prototype, {
      constructor: { value: P }
    });
    P.resolve = function (p) { return p; };

    var g = [
      Promise.resolve(0),
      tamper(Promise.resolve(1)),
      Promise.resolve(2)
    ];

    // Promise.all calls resolver twice
    P.all(g)['catch'](failIfThrows(done));
    Promise.resolve().then(function () {
      assert.deepEqual(actualArguments, [[0, 'tampered', 2]]);
    }).then(done, failIfThrows(done));
  });
});
