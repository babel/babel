/* This file is for testing implementation regressions of Promises. */

describe('Promise', function () {
  if (typeof Promise === 'undefined') {
    return it('exists', function () {
      expect(typeof Promise).to.be('function');
    });
  }

  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;

  ifShimIt('is on the exported object', function () {
    var exported = require('../');
    expect(exported.Promise).to.equal(Promise);
  });

  it('ignores non-function .then arguments', function () {
    expect(function () {
      Promise.reject(42).then(null, 5).then(null, function () {});
    }).not.to['throw']();
  });

  describe('extra methods (bad Chrome!)', function () {
    it('does not have accept', function () {
      expect(Promise).not.to.have.property('accept');
    });

    it('does not have defer', function () {
      expect(Promise).not.to.have.property('defer');
    });

    it('does not have chain', function () {
      expect(Promise.prototype).not.to.have.property('chain');
    });
  });

  it('requires an object context', function () {
    // this fails in Safari 7.1 - 9
    expect(function promiseDotCallThree() {
      Promise.call(3, function () {});
    }).to['throw']();
  });
});
