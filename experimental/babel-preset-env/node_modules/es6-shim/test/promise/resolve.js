var failIfThrows = function (done) {
  'use strict';

  return function (e) {
    done(e || new Error());
  };
};

describe('Promise.resolve', function () {
  'use strict';

  it('should not be enumerable', function () {
    expect(Promise).ownPropertyDescriptor('resolve').to.have.property('enumerable', false);
  });

  it('should return a resolved promise', function (done) {
    var value = {};
    Promise.resolve(value).then(function (result) {
      expect(result).to.equal(value);
      done();
    }, failIfThrows(done));
  });

  it('throws when receiver is a primitive', function () {
    var promise = Promise.resolve();
    expect(function () { Promise.resolve.call(undefined, promise); }).to['throw']();
    expect(function () { Promise.resolve.call(null, promise); }).to['throw']();
    expect(function () { Promise.resolve.call('', promise); }).to['throw']();
    expect(function () { Promise.resolve.call(42, promise); }).to['throw']();
    expect(function () { Promise.resolve.call(false, promise); }).to['throw']();
    expect(function () { Promise.resolve.call(true, promise); }).to['throw']();
  });
});
