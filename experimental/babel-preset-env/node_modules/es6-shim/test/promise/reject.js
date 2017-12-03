var failIfThrows = function (done) {
  'use strict';

  return function (e) {
    done(e || new Error());
  };
};

describe('Promise.reject', function () {
  'use strict';

  it('should not be enumerable', function () {
    expect(Promise).ownPropertyDescriptor('reject').to.have.property('enumerable', false);
  });

  it('should return a rejected promise', function (done) {
    var value = {};
    Promise.reject(value).then(failIfThrows(done), function (result) {
      expect(result).to.equal(value);
      done();
    });
  });

  it('throws when receiver is a primitive', function () {
    var promise = Promise.reject();
    expect(function () { Promise.reject.call(undefined, promise); }).to['throw']();
    expect(function () { Promise.reject.call(null, promise); }).to['throw']();
    expect(function () { Promise.reject.call('', promise); }).to['throw']();
    expect(function () { Promise.reject.call(42, promise); }).to['throw']();
    expect(function () { Promise.reject.call(false, promise); }).to['throw']();
    expect(function () { Promise.reject.call(true, promise); }).to['throw']();
    promise.then(null, function () {}); // silence unhandled rejection errors in Chrome
  });
});
