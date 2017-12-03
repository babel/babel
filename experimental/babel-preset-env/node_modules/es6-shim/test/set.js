// Big thanks to V8 folks for test ideas.
// v8/test/mjsunit/harmony/collections.js

var Assertion = expect().constructor;
Assertion.addMethod('theSameSet', function (otherArray) {
  var array = this._obj;

  expect(Array.isArray(array)).to.equal(true);
  expect(Array.isArray(otherArray)).to.equal(true);

  var diff = array.filter(function (value) {
    return otherArray.every(function (otherValue) {
      var areBothNaN = typeof value === 'number' && typeof otherValue === 'number' && value !== value && otherValue !== otherValue;
      return !areBothNaN && value !== otherValue;
    });
  });

  this.assert(
    diff.length === 0,
    'expected #{this} to be equal to #{exp} (as sets, i.e. no order)',
    array,
    otherArray
  );
});

var $iterator$ = typeof Symbol === 'function' ? Symbol.iterator : void 0;
if (!$iterator$ && typeof Set === 'function') {
  $iterator$ = typeof Set['@@iterator'] === 'function' ? '@@iterator' : '_es6-shim iterator_';
}

Assertion.addMethod('iterations', function (expected) {
  var iterator = this._obj[$iterator$]();

  expect(Array.isArray(expected)).to.equal(true);
  var expectedValues = expected.slice();

  var result;
  do {
    result = iterator.next();
    expect(result.value).to.eql(expectedValues.shift());
  } while (!result.done);
});

describe('Set', function () {
  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;

  var range = function (from, to) {
    var result = [];
    for (var value = from; value < to; value++) {
      result.push(value);
    }
    return result;
  };

  var prototypePropIsEnumerable = Object.prototype.propertyIsEnumerable.call(function () {}, 'prototype');
  var expectNotEnumerable = function (object) {
    if (prototypePropIsEnumerable && typeof object === 'function') {
      expect(Object.keys(object)).to.eql(['prototype']);
    } else {
      expect(Object.keys(object)).to.eql([]);
    }
  };

  var Sym = typeof Symbol === 'undefined' ? {} : Symbol;
  var isSymbol = function (sym) {
    return typeof Sym === 'function' && typeof sym === 'symbol';
  };
  var ifSymbolIteratorIt = isSymbol(Sym.iterator) ? it : xit;

  var testSet = function (set, key) {
    expect(set.has(key)).to.equal(false);
    expect(set['delete'](key)).to.equal(false);
    expect(set.add(key)).to.equal(set);
    expect(set.has(key)).to.equal(true);
    expect(set['delete'](key)).to.equal(true);
    expect(set.has(key)).to.equal(false);
    expect(set.add(key)).to.equal(set); // add it back
  };

  if (typeof Set === 'undefined') {
    return it('exists', function () {
      expect(typeof Set).to.equal('function');
    });
  }

  var set;
  beforeEach(function () {
    set = new Set();
  });

  afterEach(function () {
    set = null;
  });

  it('set iteration', function () {
    expect(set.add('a')).to.equal(set);
    expect(set.add('b')).to.equal(set);
    expect(set.add('c')).to.equal(set);
    expect(set.add('d')).to.equal(set);

    var keys = [];
    var iterator = set.keys();
    keys.push(iterator.next().value);
    expect(set['delete']('a')).to.equal(true);
    expect(set['delete']('b')).to.equal(true);
    expect(set['delete']('c')).to.equal(true);
    expect(set.add('e')).to.equal(set);
    keys.push(iterator.next().value);
    keys.push(iterator.next().value);

    expect(iterator.next().done).to.equal(true);
    expect(set.add('f')).to.equal(set);
    expect(iterator.next().done).to.equal(true);
    expect(keys).to.eql(['a', 'd', 'e']);
  });

  ifShimIt('is on the exported object', function () {
    var exported = require('../');
    expect(exported.Set).to.equal(Set);
  });

  it('should exist in global namespace', function () {
    expect(typeof Set).to.equal('function');
  });

  it('has the right arity', function () {
    expect(Set).to.have.property('length', 0);
  });

  it('returns the set from #add() for chaining', function () {
    expect(set.add({})).to.equal(set);
  });

  it('should return false when deleting an item not in the set', function () {
    expect(set.has('a')).to.equal(false);
    expect(set['delete']('a')).to.equal(false);
  });

  it('should accept an iterable as argument', function () {
    testSet(set, 'a');
    testSet(set, 'b');
    var set2 = new Set(set);
    expect(set2.has('a')).to.equal(true);
    expect(set2.has('b')).to.equal(true);
    expect(set2).to.have.iterations(['a', 'b']);
  });

  it('accepts an array as an argument', function () {
    var arr = ['a', 'b', 'c'];
    var setFromArray = new Set(arr);
    expect(setFromArray).to.have.iterations(['a', 'b', 'c']);
  });

  it('should not be callable without "new"', function () {
    expect(Set).to['throw'](TypeError);
  });

  it('should be subclassable', function () {
    if (!Object.setPrototypeOf) { return; } // skip test if on IE < 11
    var MySet = function MySet() {
      var actualSet = new Set(['a', 'b']);
      Object.setPrototypeOf(actualSet, MySet.prototype);
      return actualSet;
    };
    Object.setPrototypeOf(MySet, Set);
    MySet.prototype = Object.create(Set.prototype, {
      constructor: { value: MySet }
    });

    var mySet = new MySet();
    testSet(mySet, 'c');
    testSet(mySet, 'd');
    expect(mySet).to.have.iterations(['a', 'b', 'c', 'd']);
  });

  it('should has valid getter and setter calls', function () {
    ['add', 'has', 'delete'].forEach(function (method) {
      expect(function () {
        set[method]({});
      }).to.not['throw']();
    });
  });

  it('uses SameValueZero even on a Set of size > 4', function () {
    var firstFour = [1, 2, 3, 4];
    var fourSet = new Set(firstFour);
    expect(fourSet.size).to.equal(4);
    expect(fourSet.has(-0)).to.equal(false);
    expect(fourSet.has(0)).to.equal(false);

    fourSet.add(-0);

    expect(fourSet.size).to.equal(5);
    expect(fourSet.has(0)).to.equal(true);
    expect(fourSet.has(-0)).to.equal(true);
  });

  it('should work as expected', function () {
    // Run this test twice, one with the "fast" implementation (which only
    // allows string and numeric keys) and once with the "slow" impl.
    [true, false].forEach(function (slowkeys) {
      set = new Set();

      range(1, 20).forEach(function (number) {
        if (slowkeys) { testSet(set, {}); }
        testSet(set, number);
        testSet(set, number / 100);
        testSet(set, 'key-' + number);
        testSet(set, String(number));
        if (slowkeys) { testSet(set, Object(String(number))); }
      });

      var testkeys = [+0, Infinity, -Infinity, NaN];
      if (slowkeys) {
        testkeys.push(true, false, null, undefined);
      }
      testkeys.forEach(function (number) {
        testSet(set, number);
        testSet(set, String(number));
      });
      testSet(set, '');

      // -0 and +0 should be the same key (Set uses SameValueZero)
      expect(set.has(-0)).to.equal(true);
      expect(set['delete'](+0)).to.equal(true);
      testSet(set, -0);
      expect(set.has(+0)).to.equal(true);

      // verify that properties of Object don't peek through.
      [
        'hasOwnProperty',
        'constructor',
        'toString',
        'isPrototypeOf',
        '__proto__',
        '__parent__',
        '__count__'
      ].forEach(function (prop) { testSet(set, prop); });
    });
  });

  describe('#size', function () {
    it('returns the expected size', function () {
      expect(set.add(1)).to.equal(set);
      expect(set.add(5)).to.equal(set);
      expect(set.size).to.equal(2);
    });
  });

  describe('#clear()', function () {
    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.clear).to.have.property('name', 'clear');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('clear').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.clear).to.have.property('length', 0);
    });

    it('clears a Set with only primitives', function () {
      expect(set.add(1)).to.equal(set);
      expect(set.size).to.equal(1);
      expect(set.add(5)).to.equal(set);
      expect(set.size).to.equal(2);
      expect(set.has(5)).to.equal(true);
      set.clear();
      expect(set.size).to.equal(0);
      expect(set.has(5)).to.equal(false);
    });

    it('clears a Set with primitives and objects', function () {
      expect(set.add(1)).to.equal(set);
      expect(set.size).to.equal(1);
      var obj = {};
      expect(set.add(obj)).to.equal(set);
      expect(set.size).to.equal(2);
      expect(set.has(obj)).to.equal(true);
      set.clear();
      expect(set.size).to.equal(0);
      expect(set.has(obj)).to.equal(false);
    });
  });

  describe('#keys()', function () {
    if (!Object.prototype.hasOwnProperty.call(Set.prototype, 'keys')) {
      return it('exists', function () {
        expect(Set.prototype).to.have.property('keys');
      });
    }

    it('is the same object as #values()', function () {
      expect(Set.prototype.keys).to.equal(Set.prototype.values);
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.keys).to.have.property('name', 'values');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('keys').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.keys).to.have.property('length', 0);
    });
  });

  describe('#values()', function () {
    if (!Object.prototype.hasOwnProperty.call(Set.prototype, 'values')) {
      return it('exists', function () {
        expect(Set.prototype).to.have.property('values');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.values).to.have.property('name', 'values');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('values').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.values).to.have.property('length', 0);
    });

    it('throws when called on a non-Set', function () {
      var expectedMessage = /^(Method )?Set.prototype.values called on incompatible receiver |^values method called on incompatible |^Cannot create a Set value iterator for a non-Set object.$|^Set.prototype.values: 'this' is not a Set object$|^std_Set_iterator method called on incompatible \w+$/;
      var nonSets = [true, false, 'abc', NaN, new Map([[1, 2]]), { a: true }, [1], Object('abc'), Object(NaN)];
      nonSets.forEach(function (nonSet) {
        expect(function () { return Set.prototype.values.call(nonSet); }).to['throw'](TypeError, expectedMessage);
      });
    });
  });

  describe('#entries()', function () {
    if (!Object.prototype.hasOwnProperty.call(Set.prototype, 'entries')) {
      return it('exists', function () {
        expect(Set.prototype).to.have.property('entries');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.entries).to.have.property('name', 'entries');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('entries').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.entries).to.have.property('length', 0);
    });
  });

  describe('#has()', function () {
    if (!Object.prototype.hasOwnProperty.call(Set.prototype, 'has')) {
      return it('exists', function () {
        expect(Set.prototype).to.have.property('has');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.has).to.have.property('name', 'has');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('has').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.has).to.have.property('length', 1);
    });
  });

  it('should allow NaN values as keys', function () {
    expect(set.has(NaN)).to.equal(false);
    expect(set.has(NaN + 1)).to.equal(false);
    expect(set.has(23)).to.equal(false);
    expect(set.add(NaN)).to.equal(set);
    expect(set.has(NaN)).to.equal(true);
    expect(set.has(NaN + 1)).to.equal(true);
    expect(set.has(23)).to.equal(false);
  });

  it('should not have [[Enumerable]] props', function () {
    expectNotEnumerable(Set);
    expectNotEnumerable(Set.prototype);
    expectNotEnumerable(new Set());
  });

  it('should not have an own constructor', function () {
    var s = new Set();
    expect(s).not.to.haveOwnPropertyDescriptor('constructor');
    expect(s.constructor).to.equal(Set);
  });

  it('should allow common ecmascript idioms', function () {
    expect(set instanceof Set).to.equal(true);
    expect(typeof Set.prototype.add).to.equal('function');
    expect(typeof Set.prototype.has).to.equal('function');
    expect(typeof Set.prototype['delete']).to.equal('function');
  });

  it('should have a unique constructor', function () {
    expect(Set.prototype).to.not.equal(Object.prototype);
  });

  describe('has an iterator that works with Array.from', function () {
    if (!Object.prototype.hasOwnProperty.call(Array, 'from')) {
      return it('requires Array.from to exist', function () {
        expect(Array).to.have.property('from');
      });
    }

    var values = [1, NaN, false, true, null, undefined, 'a'];

    it('works with the full set', function () {
      expect(new Set(values)).to.have.iterations(values);
    });

    it('works with Set#keys()', function () {
      expect(new Set(values).keys()).to.have.iterations(values);
    });

    it('works with Set#values()', function () {
      expect(new Set(values).values()).to.have.iterations(values);
    });

    it('works with Set#entries()', function () {
      expect(new Set(values).entries()).to.have.iterations([
        [1, 1],
        [NaN, NaN],
        [false, false],
        [true, true],
        [null, null],
        [undefined, undefined],
        ['a', 'a']
      ]);
    });
  });

  ifSymbolIteratorIt('has the right default iteration function', function () {
    // fixed in Webkit https://bugs.webkit.org/show_bug.cgi?id=143838
    expect(Set.prototype).to.have.property(Sym.iterator, Set.prototype.values);
  });

  it('should preserve insertion order', function () {
    var arr1 = ['d', 'a', 'b'];
    var arr2 = [3, 2, 'z', 'a', 1];
    var arr3 = [3, 2, 'z', {}, 'a', 1];

    [arr1, arr2, arr3].forEach(function (array) {
      expect(new Set(array)).to.have.iterations(array);
    });
  });

  describe('#forEach', function () {
    var setToIterate;
    beforeEach(function () {
      setToIterate = new Set();
      expect(setToIterate.add('a')).to.equal(setToIterate);
      expect(setToIterate.add('b')).to.equal(setToIterate);
      expect(setToIterate.add('c')).to.equal(setToIterate);
    });

    afterEach(function () {
      setToIterate = null;
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Set.prototype.forEach).to.have.property('name', 'forEach');
    });

    it('is not enumerable', function () {
      expect(Set.prototype).ownPropertyDescriptor('forEach').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Set.prototype.forEach).to.have.property('length', 1);
    });

    it('should be iterable via forEach', function () {
      var expectedSet = ['a', 'b', 'c'];
      var foundSet = [];
      setToIterate.forEach(function (value, alsoValue, entireSet) {
        expect(entireSet).to.equal(setToIterate);
        expect(value).to.equal(alsoValue);
        foundSet.push(value);
      });
      expect(foundSet).to.eql(expectedSet);
    });

    it('should iterate over empty keys', function () {
      var setWithEmptyKeys = new Set();
      var expectedKeys = [{}, null, undefined, '', NaN, 0];
      expectedKeys.forEach(function (key) {
        expect(setWithEmptyKeys.add(key)).to.equal(setWithEmptyKeys);
      });
      var foundKeys = [];
      setWithEmptyKeys.forEach(function (value, key, entireSet) {
        expect([key]).to.be.theSameSet([value]); // handles NaN correctly
        expect(entireSet.has(key)).to.equal(true);
        foundKeys.push(key);
      });
      expect(foundKeys).to.be.theSameSet(expectedKeys);
    });

    it('should support the thisArg', function () {
      var context = function () {};
      setToIterate.forEach(function () {
        expect(this).to.equal(context);
      }, context);
    });

    it('should have a length of 1', function () {
      expect(Set.prototype.forEach.length).to.equal(1);
    });

    it('should not revisit modified keys', function () {
      var hasModifiedA = false;
      setToIterate.forEach(function (value, key) {
        if (!hasModifiedA && key === 'a') {
          expect(setToIterate.add('a')).to.equal(setToIterate);
          hasModifiedA = true;
        } else {
          expect(key).not.to.equal('a');
        }
      });
    });

    it('visits keys added in the iterator', function () {
      var hasAdded = false;
      var hasFoundD = false;
      setToIterate.forEach(function (value, key) {
        if (!hasAdded) {
          expect(setToIterate.add('d')).to.equal(setToIterate);
          hasAdded = true;
        } else if (key === 'd') {
          hasFoundD = true;
        }
      });
      expect(hasFoundD).to.equal(true);
    });

    it('visits keys added in the iterator when there is a deletion (slow path)', function () {
      var hasSeenFour = false;
      var setToMutate = new Set();
      expect(setToMutate.add({})).to.equal(setToMutate); // force use of the slow O(N) implementation
      expect(setToMutate.add('0')).to.equal(setToMutate);
      setToMutate.forEach(function (value, key) {
        if (key === '0') {
          expect(setToMutate['delete']('0')).to.equal(true);
          expect(setToMutate.add('4')).to.equal(setToMutate);
        } else if (key === '4') {
          hasSeenFour = true;
        }
      });
      expect(hasSeenFour).to.equal(true);
    });

    it('visits keys added in the iterator when there is a deletion (fast path)', function () {
      var hasSeenFour = false;
      var setToMutate = new Set();
      expect(setToMutate.add('0')).to.equal(setToMutate);
      setToMutate.forEach(function (value, key) {
        if (key === '0') {
          expect(setToMutate['delete']('0')).to.equal(true);
          expect(setToMutate.add('4')).to.equal(setToMutate);
        } else if (key === '4') {
          hasSeenFour = true;
        }
      });
      expect(hasSeenFour).to.equal(true);
    });

    it('does not visit keys deleted before a visit', function () {
      var hasVisitedC = false;
      var hasDeletedC = false;
      setToIterate.forEach(function (value, key) {
        if (key === 'c') {
          hasVisitedC = true;
        }
        if (!hasVisitedC && !hasDeletedC) {
          hasDeletedC = setToIterate['delete']('c');
          expect(hasDeletedC).to.equal(true);
        }
      });
      expect(hasVisitedC).to.equal(false);
    });

    it('should work after deletion of the current key', function () {
      var expectedSet = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
      var foundSet = {};
      setToIterate.forEach(function (value, key) {
        foundSet[key] = value;
        expect(setToIterate['delete'](key)).to.equal(true);
      });
      expect(foundSet).to.eql(expectedSet);
    });

    it('should convert key -0 to +0', function () {
      var zeroSet = new Set();
      var result = [];
      expect(zeroSet.add(-0)).to.equal(zeroSet);
      zeroSet.forEach(function (key) {
        result.push(String(1 / key));
      });
      expect(zeroSet.add(1)).to.equal(zeroSet);
      expect(zeroSet.add(0)).to.equal(zeroSet); // shouldn't cause reordering
      zeroSet.forEach(function (key) {
        result.push(String(1 / key));
      });
      expect(result.join(', ')).to.equal(
        'Infinity, Infinity, 1'
      );
    });
  });

  it('Set.prototype.size should throw TypeError', function () {
    // see https://github.com/paulmillr/es6-shim/issues/176
    expect(function () { return Set.prototype.size; }).to['throw'](TypeError);
    expect(function () { return Set.prototype.size; }).to['throw'](TypeError);
  });

  it.skip('should throw proper errors when user invokes methods with wrong types of receiver', function () {
  });
});
