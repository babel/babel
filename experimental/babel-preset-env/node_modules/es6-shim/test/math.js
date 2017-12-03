var Assertion = expect().constructor;
Assertion.prototype.almostEqual = function (obj, precision) {
  'use strict';

  var allowedDiff = precision || 1e-11;
  return this.within(obj - allowedDiff, obj + allowedDiff);
};

describe('Math', function () {
  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;

  var isPositiveZero = function (zero) {
    'use strict';

    return zero === 0 && 1 / zero === Infinity;
  };
  var isNegativeZero = function (zero) {
    'use strict';

    return zero === 0 && 1 / zero === -Infinity;
  };
  var numberIsNaN = Number.isNaN || function (value) {
    return value !== value;
  };
  var valueOfIsNaN = { valueOf: function () { return NaN; } };
  var valueOfIsInfinity = { valueOf: function () { return Infinity; } };
  var EPSILON = Number.EPSILON || 2.2204460492503130808472633361816e-16;

  ifShimIt('is on the exported object', function () {
    var exported = require('../');
    expect(exported.Math).to.equal(Math);
  });

  describe('.acosh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'acosh')) {
      return it('exists', function () {
        expect(Math).to.have.property('acosh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.acosh).to.have.property('name', 'acosh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('acosh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.acosh).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.acosh(NaN))).to.equal(true);
      expect(numberIsNaN(Math.acosh(0))).to.equal(true);
      expect(numberIsNaN(Math.acosh(0.9999999))).to.equal(true);
      expect(numberIsNaN(Math.acosh(-1e300))).to.equal(true);
      expect(Math.acosh(1e+99)).to.almostEqual(228.64907138697046);
      expect(isPositiveZero(Math.acosh(1))).to.equal(true);
      expect(Math.acosh(Infinity)).to.equal(Infinity);
      expect(Math.acosh(1234)).to.almostEqual(7.811163220849231);
      expect(Math.acosh(8.88)).to.almostEqual(2.8737631531629235);
      expect(Math.acosh(1e160)).to.almostEqual(369.10676205960726);
      expect(Math.acosh(Number.MAX_VALUE)).to.almostEqual(710.4758600739439);
    });
  });

  describe('.asinh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'asinh')) {
      return it('exists', function () {
        expect(Math).to.have.property('asinh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.asinh).to.have.property('name', 'asinh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('asinh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.asinh).to.have.property('length', 1);
    });

    it('should be correct for NaN', function () {
      expect(numberIsNaN(Math.asinh(NaN))).to.equal(true);
    });

    it('should be correct for zeroes', function () {
      expect(isPositiveZero(Math.asinh(+0))).to.equal(true);
      expect(isNegativeZero(Math.asinh(-0))).to.equal(true);
    });

    it('should be correct for Infinities', function () {
      expect(Math.asinh(Infinity)).to.equal(Infinity);
      expect(Math.asinh(-Infinity)).to.equal(-Infinity);
    });

    it('should be correct', function () {
      expect(Math.asinh(1234)).to.almostEqual(7.811163549201245);
      expect(Math.asinh(9.99)).to.almostEqual(2.997227420191335);
      expect(Math.asinh(1e150)).to.almostEqual(346.0809111296668);
      expect(Math.asinh(1e7)).to.almostEqual(16.811242831518268);
      expect(Math.asinh(-1e7)).to.almostEqual(-16.811242831518268);
    });
  });

  describe('.atanh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'atanh')) {
      return it('exists', function () {
        expect(Math).to.have.property('atanh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.atanh).to.have.property('name', 'atanh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('atanh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.atanh).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.atanh(NaN))).to.equal(true);
      expect(numberIsNaN(Math.atanh(-1.00000001))).to.equal(true);
      expect(numberIsNaN(Math.atanh(1.00000001))).to.equal(true);
      expect(numberIsNaN(Math.atanh(-1e300))).to.equal(true);
      expect(numberIsNaN(Math.atanh(1e300))).to.equal(true);
      expect(Math.atanh(-1)).to.equal(-Infinity);
      expect(Math.atanh(1)).to.equal(Infinity);
      expect(isPositiveZero(Math.atanh(+0))).to.equal(true);
      expect(isNegativeZero(Math.atanh(-0))).to.equal(true);
      expect(Math.atanh(0.5)).to.almostEqual(0.5493061443340549);
      expect(Math.atanh(-0.5)).to.almostEqual(-0.5493061443340549);
      expect(Math.atanh(-0.5)).to.almostEqual(-0.5493061443340549);
      expect(Math.atanh(0.444)).to.almostEqual(0.47720201260109457);
    });
  });

  describe('.cbrt()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'cbrt')) {
      return it('exists', function () {
        expect(Math).to.have.property('cbrt');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.cbrt).to.have.property('name', 'cbrt');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('cbrt').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.cbrt).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(isNaN(Math.cbrt(NaN))).to.equal(true);
      expect(isPositiveZero(Math.cbrt(+0))).to.equal(true);
      expect(isNegativeZero(Math.cbrt(-0))).to.equal(true);
      expect(Math.cbrt(Infinity)).to.equal(Infinity);
      expect(Math.cbrt(-Infinity)).to.equal(-Infinity);
      expect(Math.cbrt(-8)).to.almostEqual(-2);
      expect(Math.cbrt(8)).to.almostEqual(2);
      expect(Math.cbrt(-1000)).to.almostEqual(-10);
      expect(Math.cbrt(1000)).to.almostEqual(10);
      expect(Math.cbrt(-1e-300)).to.almostEqual(-1e-100);
      expect(Math.cbrt(1e-300)).to.almostEqual(1e-100);
      expect(Math.cbrt(-1e+300)).to.almostEqual(-1e+100);
      expect(Math.cbrt(1e+300)).to.almostEqual(1e+100);
    });
  });

  describe('.clz32()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'clz32')) {
      return it('exists', function () {
        expect(Math).to.have.property('clz32');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.clz32).to.have.property('name', 'clz32');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('clz32').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.clz32).to.have.property('length', 1);
    });

    it('should have proper uint32 conversion', function () {
      var integers = [5295, -5295, -9007199254740991, 9007199254740991, 0, -0];
      var nonNumbers = [undefined, true, null, {}, [], 'str'];
      var nonIntegers = [-9007199254741992, 9007199254741992, 5.9];

      integers.forEach(function (item) {
        expect(Math.clz32(item)).to.be.within(0, 32);
      });
      nonIntegers.forEach(function (item) {
        expect(Math.clz32(item)).to.be.within(0, 32);
      });
      nonNumbers.forEach(function (item) {
        expect(Math.clz32(item)).to.equal(item === true ? 31 : 32);
      });
      expect(Math.clz32(true)).to.equal(Math.clz32(1));
      expect(Math.clz32('')).to.equal(Math.clz32(0));
      expect(Math.clz32('10')).to.equal(Math.clz32(10));
      expect(Math.clz32(0.1)).to.equal(32);
      expect(Math.clz32(-1)).to.equal(0);
      expect(Math.clz32(1)).to.equal(31);
      expect(Math.clz32(0xFFFFFFFF)).to.equal(0);
      expect(Math.clz32(0x1FFFFFFFF)).to.equal(0);
      expect(Math.clz32(0x111111111)).to.equal(3);
      expect(Math.clz32(0x11111111)).to.equal(3);
    });

    it('returns 32 for numbers that coerce to 0', function () {
      var zeroishes = [
        0,
        -0,
        NaN,
        Infinity,
        -Infinity,
        0x100000000,
        undefined,
        null,
        false,
        '',
        'str',
        {},
        [],
        [1, 2]
      ];
      zeroishes.forEach(function (zeroish) {
        expect(Math.clz32(zeroish)).to.equal(32);
      });
    });
  });

  describe('.cosh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'cosh')) {
      return it('exists', function () {
        expect(Math).to.have.property('cosh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.cosh).to.have.property('name', 'cosh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('cosh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.cosh).to.have.property('length', 1);
    });

    it('should be correct for NaN', function () {
      expect(numberIsNaN(Math.cosh(NaN))).to.equal(true);
    });

    it('should be correct for Infinities', function () {
      expect(Math.cosh(Infinity)).to.equal(Infinity);
      expect(Math.cosh(-Infinity)).to.equal(Infinity);
    });

    it('should be correct for zeroes', function () {
      expect(Math.cosh(-0)).to.equal(1);
      expect(Math.cosh(+0)).to.equal(1);
    });

    it('should be correct', function () {
      // Overridden precision values here are for Chrome, as of v25.0.1364.172
      // Broadened slightly for Firefox 31
      expect(Math.cosh(12)).to.almostEqual(81377.39571257407, 9e-11);
      expect(Math.cosh(22)).to.almostEqual(1792456423.065795780980053377, 1e-5);
      expect(Math.cosh(-10)).to.almostEqual(11013.23292010332313972137);
      expect(Math.cosh(-23)).to.almostEqual(4872401723.1244513000, 1e-5);
      expect(Math.cosh(-2e-17)).to.equal(1);
    });
  });

  describe('.expm1()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'expm1')) {
      return it('exists', function () {
        expect(Math).to.have.property('expm1');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.expm1).to.have.property('name', 'expm1');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('expm1').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.expm1).to.have.property('length', 1);
    });

    it('should be correct for NaN', function () {
      expect(numberIsNaN(Math.expm1(NaN))).to.equal(true);
    });

    it('should be correct for zeroes', function () {
      expect(isPositiveZero(Math.expm1(+0))).to.equal(true);
      expect(isNegativeZero(Math.expm1(-0))).to.equal(true);
    });

    it('should be correct for Infinity', function () {
      expect(Math.expm1(Infinity)).to.equal(Infinity);
      expect(Math.expm1(-Infinity)).to.equal(-1);
    });

    it('should be correct for arbitrary numbers', function () {
      expect(Math.expm1(10)).to.almostEqual(22025.465794806716516957900645284244366353512618556781);
      expect(Math.expm1(-10)).to.almostEqual(-0.99995460007023751514846440848443944938976208191113);
      expect(Math.expm1(-2e-17)).to.almostEqual(-2e-17);
    });

    it('works with very negative numbers', function () {
      expect(Math.expm1(-38)).to.almostEqual(-1);
      expect(Math.expm1(-8675309)).to.almostEqual(-1);
      expect(Math.expm1(-4815162342)).to.almostEqual(-1);
    });
  });

  describe('.hypot()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'hypot')) {
      return it('exists', function () {
        expect(Math).to.have.property('hypot');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.hypot).to.have.property('name', 'hypot');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('hypot').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.hypot).to.have.property('length', 2);
    });

    it('should be correct', function () {
      expect(Math.hypot(Infinity)).to.equal(Infinity);
      expect(Math.hypot(-Infinity)).to.equal(Infinity);
      expect(Math.hypot(Infinity, NaN)).to.equal(Infinity);
      expect(Math.hypot(NaN, Infinity)).to.equal(Infinity);
      expect(Math.hypot(-Infinity, 'Hello')).to.equal(Infinity);
      expect(Math.hypot(1, 2, Infinity)).to.equal(Infinity);
      expect(numberIsNaN(Math.hypot(NaN, 1))).to.equal(true);
      expect(isPositiveZero(Math.hypot())).to.equal(true);
      expect(isPositiveZero(Math.hypot(0, 0, 0))).to.equal(true);
      expect(isPositiveZero(Math.hypot(0, -0, 0))).to.equal(true);
      expect(isPositiveZero(Math.hypot(-0, -0, -0))).to.equal(true);
      expect(Math.hypot(66, 66)).to.almostEqual(93.33809511662427);
      expect(Math.hypot(0.1, 100)).to.almostEqual(100.0000499999875);
    });

    it('should coerce to a number', function () {
      expect(Math.hypot('Infinity', 0)).to.equal(Infinity);
      expect(Math.hypot('3', '3', '3', '3')).to.equal(6);
    });

    it('should take more than 3 arguments', function () {
      expect(Math.hypot(66, 66, 66)).to.almostEqual(114.3153532995459);
      expect(Math.hypot(66, 66, 66, 66)).to.equal(132);
    });

    it('should have the right length', function () {
      expect(Math.hypot.length).to.equal(2);
    });

    it('works for very large or small numbers', function () {
      expect(Math.hypot(1e+300, 1e+300)).to.almostEqual(1.4142135623730952e+300);
      expect(Math.hypot(1e-300, 1e-300)).to.almostEqual(1.4142135623730952e-300);
      expect(Math.hypot(1e+300, 1e+300, 2, 3)).to.almostEqual(1.4142135623730952e+300);
    });
  });

  describe('.log2()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'log2')) {
      return it('exists', function () {
        expect(Math).to.have.property('log2');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.log2).to.have.property('name', 'log2');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('log2').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.log2).to.have.property('length', 1);
    });

    it('is correct for small numbers', function () {
      expect(numberIsNaN(Math.log2(-1e-50))).to.equal(true);
    });

    it('is correct for edge cases', function () {
      expect(numberIsNaN(Math.log2(NaN))).to.equal(true);
      expect(Math.log2(+0)).to.equal(-Infinity);
      expect(Math.log2(-0)).to.equal(-Infinity);
      expect(isPositiveZero(Math.log2(1))).to.equal(true);
      expect(Math.log2(Infinity)).to.equal(Infinity);
    });

    it('should have the right precision', function () {
      expect(Math.log2(5)).to.almostEqual(2.321928094887362);
      expect(Math.log2(32)).to.almostEqual(5);
    });
  });

  describe('.log10', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'log10')) {
      return it('exists', function () {
        expect(Math).to.have.property('log10');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.log10).to.have.property('name', 'log10');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('log10').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.log10).to.have.property('length', 1);
    });

    it('should be correct for edge cases', function () {
      expect(numberIsNaN(Math.log10(NaN))).to.equal(true);
      expect(numberIsNaN(Math.log10(-1e-50))).to.equal(true);
      expect(Math.log10(+0)).to.equal(-Infinity);
      expect(Math.log10(-0)).to.equal(-Infinity);
      expect(isPositiveZero(Math.log10(1))).to.equal(true);
      expect(Math.log10(Infinity)).to.equal(Infinity);
    });

    it('should have the right precision', function () {
      expect(Math.log10(5)).to.almostEqual(0.698970004336018);
      expect(Math.log10(50)).to.almostEqual(1.6989700043360187);
    });
  });

  describe('.log1p', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'log1p')) {
      return it('exists', function () {
        expect(Math).to.have.property('log1p');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.log1p).to.have.property('name', 'log1p');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('log1p').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.log1p).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.log1p(NaN))).to.equal(true);
      expect(numberIsNaN(Math.log1p(-1.000000001))).to.equal(true);
      expect(Math.log1p(-1)).to.equal(-Infinity);
      expect(isPositiveZero(Math.log1p(+0))).to.equal(true);
      expect(isNegativeZero(Math.log1p(-0))).to.equal(true);
      expect(Math.log1p(Infinity)).to.equal(Infinity);

      expect(Math.log1p(5)).to.almostEqual(1.791759469228055);
      expect(Math.log1p(50)).to.almostEqual(3.9318256327243257);
      expect(Math.log1p(-1e-17)).to.equal(-1e-17);
      expect(Math.log1p(-2e-17)).to.equal(-2e-17);
    });
  });

  describe('.sign()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'sign')) {
      return it('exists', function () {
        expect(Math).to.have.property('sign');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.sign).to.have.property('name', 'sign');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('sign').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.sign).to.have.property('length', 1);
    });

    it('should be correct', function () {
      // we also verify that [[ToNumber]] is being called
      [Infinity, 1].forEach(function (value) {
        expect(Math.sign(value)).to.equal(1);
        expect(Math.sign(String(value))).to.equal(1);
      });
      expect(Math.sign(true)).to.equal(1);

      [-Infinity, -1].forEach(function (value) {
        expect(Math.sign(value)).to.equal(-1);
        expect(Math.sign(String(value))).to.equal(-1);
      });

      expect(isPositiveZero(Math.sign(+0))).to.equal(true);
      expect(isPositiveZero(Math.sign('0'))).to.equal(true);
      expect(isPositiveZero(Math.sign('+0'))).to.equal(true);
      expect(isPositiveZero(Math.sign(''))).to.equal(true);
      expect(isPositiveZero(Math.sign(' '))).to.equal(true);
      expect(isPositiveZero(Math.sign(null))).to.equal(true);
      expect(isPositiveZero(Math.sign(false))).to.equal(true);
      expect(isNegativeZero(Math.sign(-0))).to.equal(true);
      expect(isNegativeZero(Math.sign('-0'))).to.equal(true);
      expect(numberIsNaN(Math.sign(NaN))).to.equal(true);
      expect(numberIsNaN(Math.sign('NaN'))).to.equal(true);
      expect(numberIsNaN(Math.sign(undefined))).to.equal(true);
    });
  });

  describe('.sinh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'sinh')) {
      return it('exists', function () {
        expect(Math).to.have.property('sinh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.sinh).to.have.property('name', 'sinh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('sinh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.sinh).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.sinh(NaN))).to.equal(true);
      expect(isPositiveZero(Math.sinh(+0))).to.equal(true);
      expect(isNegativeZero(Math.sinh(-0))).to.equal(true);
      expect(Math.sinh(Infinity)).to.equal(Infinity);
      expect(Math.sinh(-Infinity)).to.equal(-Infinity);
      expect(Math.sinh(-5)).to.almostEqual(-74.20321057778875);
      expect(Math.sinh(2)).to.almostEqual(3.6268604078470186);
      expect(Math.sinh(-2e-17)).to.equal(-2e-17);
    });
  });

  describe('.tanh()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'tanh')) {
      return it('exists', function () {
        expect(Math).to.have.property('tanh');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.tanh).to.have.property('name', 'tanh');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('tanh').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.tanh).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.tanh(NaN))).to.equal(true);
      expect(isPositiveZero(Math.tanh(+0))).to.equal(true);
      expect(isNegativeZero(Math.tanh(-0))).to.equal(true);
      expect(Math.tanh(Infinity)).to.equal(1);
      expect(Math.tanh(-Infinity)).to.equal(-1);
      expect(Math.tanh(19)).to.almostEqual(1);
      expect(Math.tanh(-19)).to.almostEqual(-1);
      expect(Math.tanh(20)).to.equal(1); // JS loses precision for true value at this integer
      expect(Math.tanh(-20)).to.equal(-1); // JS loses precision for true value at this integer
      expect(Math.tanh(10)).to.almostEqual(0.9999999958776927);
      expect(Math.tanh(-2e-17)).to.equal(-2e-17);
    });
  });

  describe('.trunc()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'trunc')) {
      return it('exists', function () {
        expect(Math).to.have.property('trunc');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.trunc).to.have.property('name', 'trunc');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('trunc').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.trunc).to.have.property('length', 1);
    });

    it('should be correct', function () {
      expect(numberIsNaN(Math.trunc(NaN))).to.equal(true);
      expect(isNegativeZero(Math.trunc(-0))).to.equal(true);
      expect(isPositiveZero(Math.trunc(+0))).to.equal(true);
      expect(Math.trunc(Infinity)).to.equal(Infinity);
      expect(Math.trunc(-Infinity)).to.equal(-Infinity);
      expect(Math.trunc(1.01)).to.equal(1);
      expect(Math.trunc(1.99)).to.equal(1);
      expect(Math.trunc(-555.555)).to.equal(-555);
      expect(Math.trunc(-1.99)).to.equal(-1);
    });

    it('should coerce to a number immediately', function () {
      expect(Math.trunc(valueOfIsInfinity)).to.equal(Infinity);
      expect(numberIsNaN(Math.trunc(valueOfIsNaN))).to.equal(true);
    });
  });

  describe('.imul()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'imul')) {
      return it('exists', function () {
        expect(Math).to.have.property('imul');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.imul).to.have.property('name', 'imul');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('imul').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.imul).to.have.property('length', 2);
    });

    var str = 'str';
    var obj = {};
    var arr = [];

    it('should be correct for non-numbers', function () {
      expect(Math.imul(false, 7)).to.equal(0);
      expect(Math.imul(7, false)).to.equal(0);
      expect(Math.imul(false, false)).to.equal(0);
      expect(Math.imul(true, 7)).to.equal(7);
      expect(Math.imul(7, true)).to.equal(7);
      expect(Math.imul(true, true)).to.equal(1);
      expect(Math.imul(undefined, 7)).to.equal(0);
      expect(Math.imul(7, undefined)).to.equal(0);
      expect(Math.imul(undefined, undefined)).to.equal(0);
      expect(Math.imul(str, 7)).to.equal(0);
      expect(Math.imul(7, str)).to.equal(0);
      expect(Math.imul(obj, 7)).to.equal(0);
      expect(Math.imul(7, obj)).to.equal(0);
      expect(Math.imul(arr, 7)).to.equal(0);
      expect(Math.imul(7, arr)).to.equal(0);
    });

    it('should be correct for hex values', function () {
      expect(Math.imul(0xffffffff, 5)).to.equal(-5);
      expect(Math.imul(0xfffffffe, 5)).to.equal(-10);
    });

    it('should be correct', function () {
      expect(Math.imul(2, 4)).to.equal(8);
      expect(Math.imul(-1, 8)).to.equal(-8);
      expect(Math.imul(-2, -2)).to.equal(4);
      expect(Math.imul(-0, 7)).to.equal(0);
      expect(Math.imul(7, -0)).to.equal(0);
      expect(Math.imul(0.1, 7)).to.equal(0);
      expect(Math.imul(7, 0.1)).to.equal(0);
      expect(Math.imul(0.9, 7)).to.equal(0);
      expect(Math.imul(7, 0.9)).to.equal(0);
      expect(Math.imul(1.1, 7)).to.equal(7);
      expect(Math.imul(7, 1.1)).to.equal(7);
      expect(Math.imul(1.9, 7)).to.equal(7);
      expect(Math.imul(7, 1.9)).to.equal(7);
    });

    it('should be correct for objects with valueOf', function () {
      var x = {
        x: 0,
        valueOf: function () { this.x += 1; return this.x; }
      };
      expect(Math.imul(x, 1)).to.equal(1);
      expect(Math.imul(1, x)).to.equal(2);
      expect(Math.imul(x, 1)).to.equal(3);
      expect(Math.imul(1, x)).to.equal(4);
      expect(Math.imul(x, 1)).to.equal(5);
    });
  });

  describe('.round()', function () {
    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.round).to.have.property('name', 'round');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('round').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.round).to.have.property('length', 1);
    });

    it('works for edge cases', function () {
      expect(numberIsNaN(Math.round(NaN))).to.equal(true);
      expect(isPositiveZero(Math.round(0))).to.equal(true);
      expect(isNegativeZero(Math.round(-0))).to.equal(true);
      expect(Math.round(Infinity)).to.equal(Infinity);
      expect(Math.round(-Infinity)).to.equal(-Infinity);
    });

    it('returns 0 for (0,0.5)', function () {
      expect(Math.round(0.5)).not.to.equal(0);
      expect(Math.round(0.5 - (EPSILON / 4))).to.equal(0);
      expect(Math.round(0 + (EPSILON / 4))).to.equal(0);
    });

    it('returns -0 for (-0.5,0)', function () {
      expect(Math.round(-0.5)).to.equal(0);
      expect(Math.round(-0.5 - (EPSILON / 3.99))).not.to.equal(0);
      expect(isNegativeZero(Math.round(-0.5 + (EPSILON / 3.99)))).to.equal(true);
      expect(isNegativeZero(Math.round(0 - (EPSILON / 3.99)))).to.equal(true);
    });

    it('returns 1 / Number.EPSILON + 1 for 1 / Number.EPSILON + 1', function () {
      var inverseEpsilonPlus1 = (1 / EPSILON) + 1;
      expect(Math.round(inverseEpsilonPlus1)).to.equal(inverseEpsilonPlus1);
    });

    it('returns 2 / Number.EPSILON - 1 for 2 / Number.EPSILON - 1', function () {
      var twiceInverseEpsilonMinus1 = (2 / EPSILON) - 1;
      expect(Math.round(twiceInverseEpsilonMinus1)).to.equal(twiceInverseEpsilonMinus1);
    });
  });

  describe('.fround()', function () {
    if (!Object.prototype.hasOwnProperty.call(Math, 'fround')) {
      return it('exists', function () {
        expect(Math).to.have.property('fround');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Math.fround).to.have.property('name', 'fround');
    });

    it('is not enumerable', function () {
      expect(Math).ownPropertyDescriptor('fround').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Math.fround).to.have.property('length', 1);
    });

    // Mozilla's reference tests: https://bug900125.bugzilla.mozilla.org/attachment.cgi?id=793163
    it('returns NaN for undefined', function () {
      expect(numberIsNaN(Math.fround())).to.equal(true);
    });

    it('returns NaN for NaN', function () {
      expect(numberIsNaN(Math.fround(NaN))).to.equal(true);
    });

    it('works for zeroes and infinities', function () {
      expect(isPositiveZero(Math.fround(0))).to.equal(true);
      expect(isPositiveZero(Math.fround({ valueOf: function () { return 0; } }))).to.equal(true);
      expect(isNegativeZero(Math.fround(-0))).to.equal(true);
      expect(isNegativeZero(Math.fround({ valueOf: function () { return -0; } }))).to.equal(true);
      expect(Math.fround(Infinity)).to.equal(Infinity);
      expect(Math.fround({ valueOf: function () { return Infinity; } })).to.equal(Infinity);
      expect(Math.fround(-Infinity)).to.equal(-Infinity);
      expect(Math.fround({ valueOf: function () { return -Infinity; } })).to.equal(-Infinity);
    });

    it('returns infinity for large numbers', function () {
      expect(Math.fround(1.7976931348623157e+308)).to.equal(Infinity);
      expect(Math.fround(-1.7976931348623157e+308)).to.equal(-Infinity);
      expect(Math.fround(3.4028235677973366e+38)).to.equal(Infinity);
    });

    it('returns zero for really small numbers', function () {
      expect(Number.MIN_VALUE).to.equal(5e-324);

      expect(Math.fround(Number.MIN_VALUE)).to.equal(0);
      expect(Math.fround(-Number.MIN_VALUE)).to.equal(0);
    });

    it('rounds properly', function () {
      expect(Math.fround(3)).to.equal(3);
      expect(Math.fround(-3)).to.equal(-3);
    });

    it('rounds properly with the max float 32', function () {
      var maxFloat32 = 3.4028234663852886e+38;
      expect(Math.fround(maxFloat32)).to.equal(maxFloat32);
      expect(Math.fround(-maxFloat32)).to.equal(-maxFloat32);

      // round-nearest rounds down to maxFloat32
      expect(Math.fround(maxFloat32 + Math.pow(2, Math.pow(2, 8 - 1) - 1 - 23 - 2))).to.equal(maxFloat32);
    });

    it('rounds properly with the min float 32', function () {
      var minFloat32 = 1.401298464324817e-45;
      expect(Math.fround(minFloat32)).to.equal(minFloat32);
      expect(Math.fround(-minFloat32)).to.equal(-minFloat32);
      expect(Math.fround(minFloat32 / 2)).to.equal(0);
      expect(Math.fround(-minFloat32 / 2)).to.equal(0);
      expect(Math.fround((minFloat32 / 2) + Math.pow(2, -202))).to.equal(minFloat32);
      expect(Math.fround((-minFloat32 / 2) - Math.pow(2, -202))).to.equal(-minFloat32);
    });
  });
});
