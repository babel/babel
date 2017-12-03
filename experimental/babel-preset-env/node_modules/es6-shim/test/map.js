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

Assertion.addMethod('entries', function (expected) {
  var collection = this._obj;

  expect(Array.isArray(expected)).to.equal(true);
  var expectedEntries = expected.slice();

  var iterator = collection.entries();
  var result;
  do {
    result = iterator.next();
    expect(result.value).to.be.eql(expectedEntries.shift());
  } while (!result.done);
});

describe('Map', function () {
  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;

  var range = function range(from, to) {
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

  var testMapping = function (map, key, value) {
    expect(map.has(key)).to.equal(false);
    expect(map.get(key)).to.equal(undefined);
    expect(map.set(key, value)).to.equal(map);
    expect(map.get(key)).to.equal(value);
    expect(map.has(key)).to.equal(true);
  };

  if (typeof Map === 'undefined') {
    return it('exists', function () {
      expect(typeof Map).to.equal('function');
    });
  }

  var map;
  beforeEach(function () {
    map = new Map();
  });

  afterEach(function () {
    map = null;
  });

  ifShimIt('is on the exported object', function () {
    var exported = require('../');
    expect(exported.Map).to.equal(Map);
  });

  it('should exist in global namespace', function () {
    expect(typeof Map).to.equal('function');
  });

  it('should have the right arity', function () {
    expect(Map).to.have.property('length', 0);
  });

  it('should has valid getter and setter calls', function () {
    ['get', 'set', 'has', 'delete'].forEach(function (method) {
      expect(function () {
        map[method]({});
      }).to.not['throw']();
    });
  });

  it('should accept an iterable as argument', function () {
    testMapping(map, 'a', 'b');
    testMapping(map, 'c', 'd');
    var map2;
    expect(function () { map2 = new Map(map); }).not.to['throw'](Error);
    expect(map2).to.be.an.instanceOf(Map);
    expect(map2.has('a')).to.equal(true);
    expect(map2.has('c')).to.equal(true);
    expect(map2).to.have.entries([['a', 'b'], ['c', 'd']]);
  });

  it('should throw with iterables that return primitives', function () {
    expect(function () { return new Map('123'); }).to['throw'](TypeError);
    expect(function () { return new Map([1, 2, 3]); }).to['throw'](TypeError);
    expect(function () { return new Map(['1', '2', '3']); }).to['throw'](TypeError);
    expect(function () { return new Map([true]); }).to['throw'](TypeError);
  });

  it('should not be callable without "new"', function () {
    expect(Map).to['throw'](TypeError);
  });

  it('should be subclassable', function () {
    if (!Object.setPrototypeOf) { return; } // skip test if on IE < 11
    var MyMap = function MyMap() {
      var testMap = new Map([['a', 'b']]);
      Object.setPrototypeOf(testMap, MyMap.prototype);
      return testMap;
    };
    Object.setPrototypeOf(MyMap, Map);
    MyMap.prototype = Object.create(Map.prototype, {
      constructor: { value: MyMap }
    });

    var myMap = new MyMap();
    testMapping(myMap, 'c', 'd');
    expect(myMap).to.have.entries([['a', 'b'], ['c', 'd']]);
  });

  it('uses SameValueZero even on a Map of size > 4', function () {
    // Chrome 38-42, node 0.11/0.12, iojs 1/2 have a bug when the Map has a size > 4
    var firstFour = [[1, 0], [2, 0], [3, 0], [4, 0]];
    var fourMap = new Map(firstFour);
    expect(fourMap.size).to.equal(4);
    expect(fourMap.has(-0)).to.equal(false);
    expect(fourMap.has(0)).to.equal(false);

    fourMap.set(-0, fourMap);

    expect(fourMap.has(0)).to.equal(true);
    expect(fourMap.has(-0)).to.equal(true);
  });

  it('treats positive and negative zero the same', function () {
    var value1 = {};
    var value2 = {};
    testMapping(map, +0, value1);
    expect(map.has(-0)).to.equal(true);
    expect(map.get(-0)).to.equal(value1);
    expect(map.set(-0, value2)).to.equal(map);
    expect(map.get(-0)).to.equal(value2);
    expect(map.get(+0)).to.equal(value2);
  });

  it('should map values correctly', function () {
    // Run this test twice, one with the "fast" implementation (which only
    // allows string and numeric keys) and once with the "slow" impl.
    [true, false].forEach(function (slowkeys) {
      map = new Map();

      range(1, 20).forEach(function (number) {
        if (slowkeys) { testMapping(map, number, {}); }
        testMapping(map, number / 100, {});
        testMapping(map, 'key-' + number, {});
        testMapping(map, String(number), {});
        if (slowkeys) { testMapping(map, Object(String(number)), {}); }
      });

      var testkeys = [Infinity, -Infinity, NaN];
      if (slowkeys) {
        testkeys.push(true, false, null, undefined);
      }
      testkeys.forEach(function (key) {
        testMapping(map, key, {});
        testMapping(map, String(key), {});
      });
      testMapping(map, '', {});

      // verify that properties of Object don't peek through.
      [
        'hasOwnProperty',
        'constructor',
        'toString',
        'isPrototypeOf',
        '__proto__',
        '__parent__',
        '__count__'
      ].forEach(function (key) {
        testMapping(map, key, {});
      });
    });
  });

  it('should map empty values correctly', function () {
    testMapping(map, {}, true);
    testMapping(map, null, true);
    testMapping(map, undefined, true);
    testMapping(map, '', true);
    testMapping(map, NaN, true);
    testMapping(map, 0, true);
  });

  it('should has correct querying behavior', function () {
    var key = {};
    testMapping(map, key, 'to-be-present');
    expect(map.has(key)).to.equal(true);
    expect(map.has({})).to.equal(false);
    expect(map.set(key, void 0)).to.equal(map);
    expect(map.get(key)).to.equal(undefined);
    expect(map.has(key)).to.equal(true);
    expect(map.has({})).to.equal(false);
  });

  it('should allow NaN values as keys', function () {
    expect(map.has(NaN)).to.equal(false);
    expect(map.has(NaN + 1)).to.equal(false);
    expect(map.has(23)).to.equal(false);
    expect(map.set(NaN, 'value')).to.equal(map);
    expect(map.has(NaN)).to.equal(true);
    expect(map.has(NaN + 1)).to.equal(true);
    expect(map.has(23)).to.equal(false);
  });

  it('should not have [[Enumerable]] props', function () {
    expectNotEnumerable(Map);
    expectNotEnumerable(Map.prototype);
    expectNotEnumerable(new Map());
  });

  it('should not have an own constructor', function () {
    var m = new Map();
    expect(m).not.to.haveOwnPropertyDescriptor('constructor');
    expect(m.constructor).to.equal(Map);
  });

  it('should allow common ecmascript idioms', function () {
    expect(map).to.be.an.instanceOf(Map);
    expect(typeof Map.prototype.get).to.equal('function');
    expect(typeof Map.prototype.set).to.equal('function');
    expect(typeof Map.prototype.has).to.equal('function');
    expect(typeof Map.prototype['delete']).to.equal('function');
  });

  it('should have a unique constructor', function () {
    expect(Map.prototype).to.not.equal(Object.prototype);
  });

  describe('#clear()', function () {
    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Map.prototype.clear).to.have.property('name', 'clear');
    });

    it('is not enumerable', function () {
      expect(Map.prototype).ownPropertyDescriptor('clear').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Map.prototype.clear).to.have.property('length', 0);
    });

    it('should have #clear method', function () {
      expect(map.set(1, 2)).to.equal(map);
      expect(map.set(5, 2)).to.equal(map);
      expect(map.size).to.equal(2);
      expect(map.has(5)).to.equal(true);
      map.clear();
      expect(map.size).to.equal(0);
      expect(map.has(5)).to.equal(false);
    });
  });

  describe('#keys()', function () {
    if (!Object.prototype.hasOwnProperty.call(Map.prototype, 'keys')) {
      return it('exists', function () {
        expect(Map.prototype).to.have.property('keys');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Map.prototype.keys).to.have.property('name', 'keys');
    });

    it('is not enumerable', function () {
      expect(Map.prototype).ownPropertyDescriptor('keys').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Map.prototype.keys).to.have.property('length', 0);
    });
  });

  describe('#values()', function () {
    if (!Object.prototype.hasOwnProperty.call(Map.prototype, 'values')) {
      return it('exists', function () {
        expect(Map.prototype).to.have.property('values');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Map.prototype.values).to.have.property('name', 'values');
    });

    it('is not enumerable', function () {
      expect(Map.prototype).ownPropertyDescriptor('values').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Map.prototype.values).to.have.property('length', 0);
    });
  });

  describe('#entries()', function () {
    if (!Object.prototype.hasOwnProperty.call(Map.prototype, 'entries')) {
      return it('exists', function () {
        expect(Map.prototype).to.have.property('entries');
      });
    }

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Map.prototype.entries).to.have.property('name', 'entries');
    });

    it('is not enumerable', function () {
      expect(Map.prototype).ownPropertyDescriptor('entries').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Map.prototype.entries).to.have.property('length', 0);
    });

    it('throws when called on a non-Map', function () {
      var expectedMessage = /^(Method )?Map.prototype.entries called on incompatible receiver |^entries method called on incompatible |^Cannot create a Map entry iterator for a non-Map object.|^Map\.prototype\.entries: 'this' is not a Map object$|^std_Map_iterator method called on incompatible \w+$/;
      var nonMaps = [true, false, 'abc', NaN, new Set([1, 2]), { a: true }, [1], Object('abc'), Object(NaN)];
      nonMaps.forEach(function (nonMap) {
        expect(function () { return Map.prototype.entries.call(nonMap); }).to['throw'](TypeError, expectedMessage);
      });
    });
  });

  describe('#size', function () {
    it('throws TypeError when accessed directly', function () {
      // see https://github.com/paulmillr/es6-shim/issues/176
      expect(function () { return Map.prototype.size; }).to['throw'](TypeError);
      expect(function () { return Map.prototype.size; }).to['throw'](TypeError);
    });

    it('is an accessor function on the prototype', function () {
      expect(Map.prototype).ownPropertyDescriptor('size').to.have.property('get');
      expect(typeof Object.getOwnPropertyDescriptor(Map.prototype, 'size').get).to.equal('function');
      expect(new Map()).not.to.haveOwnPropertyDescriptor('size');
    });
  });

  it('should return false when deleting a nonexistent key', function () {
    expect(map.has('a')).to.equal(false);
    expect(map['delete']('a')).to.equal(false);
  });

  it('should have keys, values and size props', function () {
    expect(map.set('a', 1)).to.equal(map);
    expect(map.set('b', 2)).to.equal(map);
    expect(map.set('c', 3)).to.equal(map);
    expect(typeof map.keys).to.equal('function');
    expect(typeof map.values).to.equal('function');
    expect(map.size).to.equal(3);
    expect(map['delete']('a')).to.equal(true);
    expect(map.size).to.equal(2);
  });

  it('should have an iterator that works with Array.from', function () {
    expect(Array).to.have.property('from');

    expect(map.set('a', 1)).to.equal(map);
    expect(map.set('b', NaN)).to.equal(map);
    expect(map.set('c', false)).to.equal(map);
    expect(Array.from(map)).to.eql([['a', 1], ['b', NaN], ['c', false]]);
    expect(Array.from(map.keys())).to.eql(['a', 'b', 'c']);
    expect(Array.from(map.values())).to.eql([1, NaN, false]);
    expect(map).to.have.entries(Array.from(map.entries()));
  });

  ifSymbolIteratorIt('has the right default iteration function', function () {
    // fixed in Webkit https://bugs.webkit.org/show_bug.cgi?id=143838
    expect(Map.prototype).to.have.property(Sym.iterator, Map.prototype.entries);
  });

  describe('#forEach', function () {
    var mapToIterate;

    beforeEach(function () {
      mapToIterate = new Map();
      expect(mapToIterate.set('a', 1)).to.equal(mapToIterate);
      expect(mapToIterate.set('b', 2)).to.equal(mapToIterate);
      expect(mapToIterate.set('c', 3)).to.equal(mapToIterate);
    });

    afterEach(function () {
      mapToIterate = null;
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Map.prototype.forEach).to.have.property('name', 'forEach');
    });

    it('is not enumerable', function () {
      expect(Map.prototype).ownPropertyDescriptor('forEach').to.have.property('enumerable', false);
    });

    it('has the right arity', function () {
      expect(Map.prototype.forEach).to.have.property('length', 1);
    });

    it('should be iterable via forEach', function () {
      var expectedMap = {
        a: 1,
        b: 2,
        c: 3
      };
      var foundMap = {};
      mapToIterate.forEach(function (value, key, entireMap) {
        expect(entireMap).to.equal(mapToIterate);
        foundMap[key] = value;
      });
      expect(foundMap).to.eql(expectedMap);
    });

    it('should iterate over empty keys', function () {
      var mapWithEmptyKeys = new Map();
      var expectedKeys = [{}, null, undefined, '', NaN, 0];
      expectedKeys.forEach(function (key) {
        expect(mapWithEmptyKeys.set(key, true)).to.equal(mapWithEmptyKeys);
      });
      var foundKeys = [];
      mapWithEmptyKeys.forEach(function (value, key, entireMap) {
        expect(entireMap.get(key)).to.equal(value);
        foundKeys.push(key);
      });
      expect(foundKeys).to.be.theSameSet(expectedKeys);
    });

    it('should support the thisArg', function () {
      var context = function () {};
      mapToIterate.forEach(function () {
        expect(this).to.equal(context);
      }, context);
    });

    it('should have a length of 1', function () {
      expect(Map.prototype.forEach.length).to.equal(1);
    });

    it('should not revisit modified keys', function () {
      var hasModifiedA = false;
      mapToIterate.forEach(function (value, key) {
        if (!hasModifiedA && key === 'a') {
          expect(mapToIterate.set('a', 4)).to.equal(mapToIterate);
          hasModifiedA = true;
        } else {
          expect(key).not.to.equal('a');
        }
      });
    });

    it('returns the map from #set() for chaining', function () {
      expect(mapToIterate.set({}, {})).to.equal(mapToIterate);
      expect(mapToIterate.set(42, {})).to.equal(mapToIterate);
      expect(mapToIterate.set(0, {})).to.equal(mapToIterate);
      expect(mapToIterate.set(NaN, {})).to.equal(mapToIterate);
      expect(mapToIterate.set(-0, {})).to.equal(mapToIterate);
    });

    it('visits keys added in the iterator', function () {
      var hasAdded = false;
      var hasFoundD = false;
      mapToIterate.forEach(function (value, key) {
        if (!hasAdded) {
          mapToIterate.set('d', 5);
          hasAdded = true;
        } else if (key === 'd') {
          hasFoundD = true;
        }
      });
      expect(hasFoundD).to.equal(true);
    });

    it('visits keys added in the iterator when there is a deletion', function () {
      var hasSeenFour = false;
      var mapToMutate = new Map();
      mapToMutate.set('0', 42);
      mapToMutate.forEach(function (value, key) {
        if (key === '0') {
          expect(mapToMutate['delete']('0')).to.equal(true);
          mapToMutate.set('4', 'a value');
        } else if (key === '4') {
          hasSeenFour = true;
        }
      });
      expect(hasSeenFour).to.equal(true);
    });

    it('does not visit keys deleted before a visit', function () {
      var hasVisitedC = false;
      var hasDeletedC = false;
      mapToIterate.forEach(function (value, key) {
        if (key === 'c') {
          hasVisitedC = true;
        }
        if (!hasVisitedC && !hasDeletedC) {
          hasDeletedC = mapToIterate['delete']('c');
          expect(hasDeletedC).to.equal(true);
        }
      });
      expect(hasVisitedC).to.equal(false);
    });

    it('should work after deletion of the current key', function () {
      var expectedMap = {
        a: 1,
        b: 2,
        c: 3
      };
      var foundMap = {};
      mapToIterate.forEach(function (value, key) {
        foundMap[key] = value;
        expect(mapToIterate['delete'](key)).to.equal(true);
      });
      expect(foundMap).to.eql(expectedMap);
    });

    it('should convert key -0 to +0', function () {
      var zeroMap = new Map();
      var result = [];
      zeroMap.set(-0, 'a');
      zeroMap.forEach(function (value, key) {
        result.push(String(1 / key) + ' ' + value);
      });
      zeroMap.set(1, 'b');
      zeroMap.set(0, 'c'); // shouldn't cause reordering
      zeroMap.forEach(function (value, key) {
        result.push(String(1 / key) + ' ' + value);
      });
      expect(result.join(', ')).to.equal(
        'Infinity a, Infinity c, 1 b'
      );
    });
  });

  it('should preserve insertion order', function () {
    var convertToPairs = function (item) { return [item, true]; };
    var arr1 = ['d', 'a', 'b'];
    var arr2 = [3, 2, 'z', 'a', 1];
    var arr3 = [3, 2, 'z', {}, 'a', 1];

    [arr1, arr2, arr3].forEach(function (array) {
      var entries = array.map(convertToPairs);
      expect(new Map(entries)).to.have.entries(entries);
    });
  });

  it('map iteration', function () {
    var map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    map.set('d', 4);

    var keys = [];
    var iterator = map.keys();
    keys.push(iterator.next().value);
    expect(map['delete']('a')).to.equal(true);
    expect(map['delete']('b')).to.equal(true);
    expect(map['delete']('c')).to.equal(true);
    map.set('e');
    keys.push(iterator.next().value);
    keys.push(iterator.next().value);

    expect(iterator.next().done).to.equal(true);
    map.set('f');
    expect(iterator.next().done).to.equal(true);
    expect(keys).to.eql(['a', 'd', 'e']);
  });
});
