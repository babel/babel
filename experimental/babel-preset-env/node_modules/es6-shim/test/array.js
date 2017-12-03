var runArrayTests = function (it) {
  'use strict';

  var Sym = typeof Symbol === 'undefined' ? {} : Symbol;
  var isSymbol = function (sym) {
    return typeof Sym === 'function' && typeof sym === 'symbol';
  };
  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : it.skip;
  var ifSymbolIteratorIt = isSymbol(Sym.iterator) ? it : it.skip;
  var ifSymbolIteratorAndArrayValuesIt = isSymbol(Sym.iterator) && Array.prototype.values ? it : it.skip;
  var ifSymbolUnscopablesIt = isSymbol(Sym.unscopables) ? it : it.skip;
  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;
  var ifSupportsDescriptorsIt = Object.getOwnPropertyDescriptor ? it : it.skip;

  var isNegativeZero = function (x) {
    return (1 / x) < 0;
  };

  describe('Array', function () {
    var list = [5, 10, 15, 20];

    ifShimIt('is on the exported object', function () {
      var exported = require('../');
      expect(exported.Array).to.equal(Array);
    });

    describe('@@iterator', function () {
      ifSymbolIteratorIt('uses Symbol.iterator if available', function () {
        var b = {};
        var c = {};
        var a = [b, c];
        var iteratorFn = a[Sym.iterator];
        var iterator = iteratorFn.call(a);
        expect(iterator.next()).to.eql({ done: false, value: b });
        expect(iterator.next()).to.eql({ done: false, value: c });
        expect(iterator.next()).to.eql({ done: true, value: undefined });
      });

      ifSymbolIteratorAndArrayValuesIt('has the right default iteration function', function () {
        // fixed in Webkit https://bugs.webkit.org/show_bug.cgi?id=143838
        expect(Array.prototype).to.have.property(Sym.iterator, Array.prototype.values);
      });
    });

    describe('.from()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array, 'from')) {
        return it('exists', function () {
          expect(Array).to.have.property('from');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.from).to.have.property('name', 'from');
      });

      it('has the right arity', function () {
        expect(Array.from).to.have.property('length', 1);
      });

      it('is not enumerable', function () {
        expect(Array).ownPropertyDescriptor('from').to.have.property('enumerable', false);
      });

      it('works with primitives', function () {
        expect(Array.from(false)).to.eql([]);
        expect(Array.from(true)).to.eql([]);
        expect(Array.from(-Infinity)).to.eql([]);
        expect(Array.from(-0)).to.eql([]);
        expect(Array.from(0)).to.eql([]);
        expect(Array.from(1)).to.eql([]);
        expect(Array.from(Infinity)).to.eql([]);
      });

      it('should create correct array from iterable', function () {
        (function () {
          expect(Array.from(arguments)).to.eql([0, 1, 2]);
        }(0, 1, 2));

        expect(Array.from([null, undefined, 0.1248, -0, 0])).to.eql(
          [null, undefined, 0.1248, -0, 0]
        );

        if (Array.prototype.values) {
          expect(Array.from([null, undefined, 0.1248, -0, 0].values())).to.eql(
            [null, undefined, 0.1248, -0, 0]
          );
        }
      });

      it('works with arraylike objects', function () {
        expect(Array.from({ length: 1 })).to.eql([undefined]);
        expect(Array.from({ 0: 'a', 1: 'b', length: 2 })).to.eql(['a', 'b']);
      });

      it('swallows negative lengths', function () {
        expect(Array.from({ length: -1 })).to.have.property('length', 0);
        expect(Array.from({ length: -Infinity })).to.have.property('length', 0);
        expect(Array.from({ length: -0 })).to.have.property('length', 0);
        expect(Array.from({ length: -42 })).to.have.property('length', 0);
      });

      it('works with strings', function () {
        expect(Array.from('')).to.eql([]);
        expect(Array.from('abc')).to.eql('abc'.split(''));
      });

      it('should handle empty iterables correctly', function () {
        (function () {
          expect(Array.from(arguments)).to.eql([]);
        }());
        expect(Array.from([])).to.eql([]);
        expect(Array.from({})).to.eql([]);
        expect(Array.from({ a: 1 })).to.eql([]);
      });

      it('should work with other constructors', function () {
        var Foo = function FooBar(length, args) {
          this.args = args;
          this.length = length;
        };
        var args = ['a', 'b', 'c'];
        var expected = new Foo(args.length);
        args.forEach(function (arg, index) {
          expected[index] = arg;
        });
        expect(Array.from.call(Foo, args)).to.be.an.instanceOf(Foo);
        expect(Array.from.call(Foo, args)).to.eql(expected);
      });

      describe('map functions', function () {
        it('supports a map function', function () {
          var original = [1, 2, 3];
          var mapper = function (item) {
            return item * 2;
          };
          var mapped = Array.from(original, mapper);
          expect(mapped).to.eql([2, 4, 6]);
        });

        it('passes both (and only) the item and the current index to the map function', function () {
          var original = [1, 2, 3];
          var expectedItems = [1, 2, 3];
          var expectedIndices = [0, 1, 2];

          var actualItems = [];
          var actualIndices = [];
          var mapper = function (item, index) {
            actualItems.push(item);
            actualIndices.push(index);
            expect(arguments).to.have.property('length', 2);
            return item;
          };

          var mapped = Array.from(original, mapper);
          expect(mapped).to.eql(expectedItems);
          expect(actualItems).to.eql(expectedItems);
          expect(actualIndices).to.eql(expectedIndices);
        });

        it('passes both the item and the current index to the map function with a "this" value', function () {
          var original = [1, 2, 3];
          var expectedItems = [1, 2, 3];
          var expectedIndices = [0, 1, 2];
          var expectedContext = {};

          var actualItems = [];
          var actualIndices = [];
          var mapper = function (item, index) {
            actualItems.push(item);
            actualIndices.push(index);
            expect(arguments).to.have.property('length', 2);
            expect(this).to.eql(expectedContext);
            return item;
          };

          var mapped = Array.from(original, mapper, expectedContext);
          expect(mapped).to.eql(expectedItems);
          expect(actualItems).to.eql(expectedItems);
          expect(actualIndices).to.eql(expectedIndices);
        });

        it('accepts an object thisArg', function () {
          var context = {};
          Array.from([1, 2, 3], function () {
            expect(this).to.equal(context);
          }, context);
        });

        it('accepts a primitive thisArg', function () {
          Array.from([1, 2, 3], function () {
            expect(this.valueOf()).to.equal(42);
            expect(Object.prototype.toString.call(this)).to.equal('[object Number]');
          }, 42);
        });

        it('accepts a falsy thisArg', function () {
          Array.from([1, 2, 3], function () {
            expect(this.valueOf()).to.equal(false);
            expect(Object.prototype.toString.call(this)).to.equal('[object Boolean]');
          }, false);
        });
      });

      it('does not throw when provided an undefined second arg', function () {
        expect(Array.from([], undefined)).to.eql([]);
      });

      it('throws when provided a nonfunction second arg', function () {
        expect(function () { Array.from([], null); }).to['throw'](TypeError);
        expect(function () { Array.from([], false); }).to['throw'](TypeError);
        expect(function () { Array.from([], true); }).to['throw'](TypeError);
        expect(function () { Array.from([], /a/g); }).to['throw'](TypeError);
        expect(function () { Array.from([], {}); }).to['throw'](TypeError);
        expect(function () { Array.from([], []); }).to['throw'](TypeError);
        expect(function () { Array.from([], ''); }).to['throw'](TypeError);
        expect(function () { Array.from([], 3); }).to['throw'](TypeError);
      });

      it('supports a this arg', function () {
        var original = [1, 2, 3];
        var context = {};
        var mapper = function (item) {
          expect(this).to.equal(context);
          return item * 2;
        };
        var mapped = Array.from(original, mapper, context);
        expect(mapped).to.eql([2, 4, 6]);
      });

      it('throws when provided null or undefined', function () {
        expect(function () { Array.from(); }).to['throw'](TypeError);
        expect(function () { Array.from(undefined); }).to['throw'](TypeError);
        expect(function () { Array.from(null); }).to['throw'](TypeError);
      });

      it('removes holes', function () {
        /*jshint elision: true */
        /* jscs:disable disallowSpaceBeforeComma */
        /* jscs:disable requireSpaceAfterComma */
        /* eslint-disable no-sparse-arrays */
        var input = [0, , 2];
        var result = Array.from([0, , 2]);
        /* eslint-enable no-sparse-arrays */
        /* jscs:enable requireSpaceAfterComma */
        /* jscs:enable disallowSpaceBeforeComma */
        /*jshint elision: false */
        expect(1 in input).to.equal(false);
        expect(1 in result).to.equal(true);
        expect(result).to.eql([0, undefined, 2]);
      });

      it('works with this flaky example', function () {
        expect(Array.from([1, NaN, false])).to.eql([1, NaN, false]);
      });

      ifSupportsDescriptorsIt('works when Object.prototype has a throwing setter', function () {
        // TODO: breaks in Chrome 17, IE 9, Safari 5.1-6
        var key = 10;
        /* eslint no-extend-native: 0 */
        Object.defineProperty(Object.prototype, key, {
          configurable: true,
          get: function () {},
          set: function (v) { throw new EvalError('boom'); }
        });
        expect(function () {
          var arr = [];
          arr[key] = 42;
        }).to['throw'](EvalError); // assert thrower

        expect(function () { Array.from({ length: key + 1 }); }).not.to['throw']();

        delete Object.prototype[key];
        expect(key in Object.prototype).to.equal(false); // assert cleanup
      });
    });

    describe('.of()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array, 'of')) {
        return it('exists', function () {
          expect(Array).to.have.property('of');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.of).to.have.property('name', 'of');
      });

      it('has the right arity', function () {
        expect(Array.of).to.have.property('length', 0);
      });

      it('is not enumerable', function () {
        expect(Array).ownPropertyDescriptor('of').to.have.property('enumerable', false);
      });

      it('should create correct array from arguments', function () {
        expect(Array.of(1, null, undefined)).to.eql([1, null, undefined]);
      });

      it('should work with other constructors', function () {
        var Foo = function FooBar(length) {
          this.args = Array.prototype.slice.call(arguments, 1);
          this.length = length;
        };
        var args = ['a', 'b', 'c'];
        var expected = new Foo(args.length);
        args.forEach(function (arg, index) {
          expected[index] = arg;
        });
        expect(Array.of.apply(Foo, args)).to.be.an.instanceOf(Foo);
        expect(Array.of.apply(Foo, args)).to.eql(expected);
      });

      describe('without Array.from', function () {
        var originalFrom = Array.from;
        beforeEach(function () {
          Array.from = 42;
        });

        afterEach(function () {
          Array.from = originalFrom;
        });

        it('still works', function () {
          expect(Array.of(1, 2, 3)).to.eql([1, 2, 3]);
        });
      });
    });

    describe('#copyWithin()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'copyWithin')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('copyWithin');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.copyWithin).to.have.property('name', 'copyWithin');
      });

      it('has the right arity', function () {
        expect(Array.prototype.copyWithin).to.have.property('length', 2);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('copyWithin').to.have.property('enumerable', false);
      });

      it('modifies the object in-place', function () {
        var arr = [1, 2, 3, 4, 5];
        expect(arr.copyWithin(0, 3)).to.eql([4, 5, 3, 4, 5]);
        expect(arr).to.eql([4, 5, 3, 4, 5]);
      });

      it('works with 2 args', function () {
        expect([1, 2, 3, 4, 5].copyWithin(0, 3)).to.eql([4, 5, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(1, 3)).to.eql([1, 4, 5, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(1, 2)).to.eql([1, 3, 4, 5, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(2, 2)).to.eql([1, 2, 3, 4, 5]);
      });

      it('works with 3 args', function () {
        expect([1, 2, 3, 4, 5].copyWithin(0, 3, 4)).to.eql([4, 2, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(1, 3, 4)).to.eql([1, 4, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(1, 2, 4)).to.eql([1, 3, 4, 4, 5]);
      });

      it('works with negative args', function () {
        expect([1, 2, 3, 4, 5].copyWithin(0, -2)).to.eql([4, 5, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(0, -2, -1)).to.eql([4, 2, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(-4, -3, -2)).to.eql([1, 3, 3, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(-4, -3, -1)).to.eql([1, 3, 4, 4, 5]);
        expect([1, 2, 3, 4, 5].copyWithin(-4, -3)).to.eql([1, 3, 4, 5, 5]);
      });

      it('works with arraylike objects', function () {
        var args = (function () { return arguments; }(1, 2, 3));
        expect(Array.isArray(args)).to.equal(false);
        var argsClass = Object.prototype.toString.call(args);
        expect(Array.prototype.slice.call(args)).to.eql([1, 2, 3]);
        Array.prototype.copyWithin.call(args, -2, 0);
        expect(Array.prototype.slice.call(args)).to.eql([1, 1, 2]);
        expect(Object.prototype.toString.call(args)).to.equal(argsClass);
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.copyWithin).to.equal(true);
      });

      it('should delete the target key if the source key is not present', function () {
        /* jshint elision: true */
        /* jscs:disable disallowSpaceBeforeComma */
        /* jscs:disable requireSpaceAfterComma */
        /* eslint-disable no-sparse-arrays */
        expect([, 1, 2].copyWithin(1, 0)).to.eql([, , 1]);
        /* jshint elision: false */
        /* jscs:enable requireSpaceAfterComma */
        /* jscs:enable disallowSpaceBeforeComma */
        /* eslint-enable no-sparse-arrays */
      });

      it('should check inherited properties as well', function () {
        var Parent = function Parent() {};
        Parent.prototype[0] = 'foo';
        var sparse = new Parent();
        sparse[1] = 1;
        sparse[2] = 2;
        sparse.length = 3;
        var result = Array.prototype.copyWithin.call(sparse, 1, 0);
        expect(result).to.have.property('0');
        expect(result).not.to.have.ownProperty('0');
        expect(result).to.have.ownProperty('1');
        expect(result).to.eql({ 0: 'foo', 1: 'foo', 2: 1, length: 3 });
      });
    });

    describe('#find()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'find')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('find');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.find).to.have.property('name', 'find');
      });

      it('should have the right arity', function () {
        expect(Array.prototype.find).to.have.property('length', 1);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('find').to.have.property('enumerable', false);
      });

      it('should find item by predicate', function () {
        var result = list.find(function (item) { return item === 15; });
        expect(result).to.equal(15);
      });

      it('should return undefined when nothing matched', function () {
        var result = list.find(function (item) { return item === 'a'; });
        expect(result).to.equal(undefined);
      });

      it('should throw TypeError when function was not passed', function () {
        expect(function () { list.find(); }).to['throw'](TypeError);
      });

      it('should receive all three parameters', function () {
        var foundIndex = list.find(function (value, index, arr) {
          expect(list).to.have.property(index, value);
          expect(list).to.eql(arr);
          return false;
        });
        expect(foundIndex).to.equal(undefined);
      });

      it('should work with the context argument', function () {
        var context = {};
        [1].find(function () { expect(this).to.equal(context); }, context);
      });

      it('should work with an array-like object', function () {
        var obj = { 0: 1, 1: 2, 2: 3, length: 3 };
        var found = Array.prototype.find.call(obj, function (item) { return item === 2; });
        expect(found).to.equal(2);
      });

      it('should work with an array-like object with negative length', function () {
        var obj = { 0: 1, 1: 2, 2: 3, length: -3 };
        var found = Array.prototype.find.call(obj, function () {
          throw new Error('should not reach here');
        });
        expect(found).to.equal(undefined);
      });

      it('should work with a sparse array', function () {
        /*jshint elision: true */
        /* jscs:disable disallowSpaceBeforeComma */
        /* jscs:disable requireSpaceAfterComma */
        /* eslint-disable no-sparse-arrays */
        var obj = [1, , undefined];
        /* eslint-enable no-sparse-arrays */
        /* jscs:enable requireSpaceAfterComma */
        /* jscs:enable disallowSpaceBeforeComma */
        /*jshint elision: false */
        expect(1 in obj).to.equal(false);
        var seen = [];
        var found = obj.find(function (item, idx) {
          seen.push([idx, item]);
          return false;
        });
        expect(found).to.equal(undefined);
        expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
      });

      it('should work with a sparse array-like object', function () {
        var obj = { 0: 1, 2: undefined, length: 3.2 };
        var seen = [];
        var found = Array.prototype.find.call(obj, function (item, idx) {
          seen.push([idx, item]);
          return false;
        });
        expect(found).to.equal(undefined);
        expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.find).to.equal(true);
      });
    });

    describe('#findIndex()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'findIndex')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('findIndex');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.findIndex).to.have.property('name', 'findIndex');
      });

      it('should have the right arity', function () {
        expect(Array.prototype.findIndex).to.have.property('length', 1);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('findIndex').to.have.property('enumerable', false);
      });

      it('should find item key by predicate', function () {
        var result = list.findIndex(function (item) { return item === 15; });
        expect(result).to.equal(2);
      });

      it('should return -1 when nothing matched', function () {
        var result = list.findIndex(function (item) { return item === 'a'; });
        expect(result).to.equal(-1);
      });

      it('should throw TypeError when function was not passed', function () {
        expect(function () { list.findIndex(); }).to['throw'](TypeError);
      });

      it('should receive all three parameters', function () {
        var foundIndex = list.findIndex(function (value, index, arr) {
          expect(list[index]).to.equal(value);
          expect(list).to.eql(arr);
          return false;
        });
        expect(foundIndex).to.equal(-1);
      });

      it('should work with the context argument', function () {
        var context = {};
        [1].findIndex(function () { expect(this).to.equal(context); }, context);
      });

      it('should work with an array-like object', function () {
        var obj = { 0: 1, 1: 2, 2: 3, length: 3 };
        var foundIndex = Array.prototype.findIndex.call(obj, function (item) { return item === 2; });
        expect(foundIndex).to.equal(1);
      });

      it('should work with an array-like object with negative length', function () {
        var obj = { 0: 1, 1: 2, 2: 3, length: -3 };
        var foundIndex = Array.prototype.findIndex.call(obj, function () {
          throw new Error('should not reach here');
        });
        expect(foundIndex).to.equal(-1);
      });

      it('should work with a sparse array', function () {
        /*jshint elision: true */
        /* jscs:disable disallowSpaceBeforeComma */
        /* jscs:disable requireSpaceAfterComma */
        /* eslint-disable no-sparse-arrays */
        var obj = [1, , undefined];
        /* eslint-enable no-sparse-arrays */
        /* jscs:enable requireSpaceAfterComma */
        /* jscs:enable disallowSpaceBeforeComma */
        /*jshint elision: false */
        expect(1 in obj).to.equal(false);
        var seen = [];
        var foundIndex = obj.findIndex(function (item, idx) {
          seen.push([idx, item]);
          return item === undefined && idx === 2;
        });
        expect(foundIndex).to.equal(2);
        expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
      });

      it('should work with a sparse array-like object', function () {
        var obj = { 0: 1, 2: undefined, length: 3.2 };
        var seen = [];
        var foundIndex = Array.prototype.findIndex.call(obj, function (item, idx) {
          seen.push([idx, item]);
          return false;
        });
        expect(foundIndex).to.equal(-1);
        expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.findIndex).to.equal(true);
      });
    });

    describe('ArrayIterator', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'keys')) {
        return it('can be tested', function () {
          expect(Array.prototype).to.have.property('keys');
        });
      }

      var arrayIterator;
      beforeEach(function () {
        arrayIterator = [1, 2, 3].keys();
      });

      describe('#next()', function () {
        it('should work when applied to an ArrayIterator', function () {
          expect(arrayIterator.next.apply(arrayIterator)).to.eql({ value: 0, done: false });
          expect(arrayIterator.next.apply(arrayIterator)).to.eql({ value: 1, done: false });
          expect(arrayIterator.next.apply(arrayIterator)).to.eql({ value: 2, done: false });
          expect(arrayIterator.next.apply(arrayIterator)).to.eql({ value: undefined, done: true });
        });

        it('throws when not applied to an ArrayIterator', function () {
          expect(function () { arrayIterator.next.apply({}); }).to['throw'](TypeError);
        });
      });
    });

    describe('#keys()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'keys')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('keys');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.keys).to.have.property('name', 'keys');
      });

      it('should have the right arity ', function () {
        expect(Array.prototype.keys.length).to.equal(0);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('keys').to.have.property('enumerable', false);
      });

      describe('basic keys iteration', function () {
        var mylist = [5, 10, 15, 20];
        var keys;
        beforeEach(function () {
          if (!keys) {
            keys = mylist.keys();
          }
        });

        it('should return 0 on first object', function () {
          expect(keys.next()).to.eql({ value: 0, done: false });
        });

        it('should return 1 on second object', function () {
          expect(keys.next()).to.eql({ value: 1, done: false });
        });

        it('should return 2 on third object', function () {
          expect(keys.next()).to.eql({ value: 2, done: false });
        });

        it('should return 3 on fourth object', function () {
          expect(keys.next()).to.eql({ value: 3, done: false });
        });

        it('should set done on completing iteration', function () {
          expect(keys.next()).to.eql({ value: undefined, done: true });
        });

        it('once done it should stay done', function () {
          mylist.push(4);
          expect(keys.next()).to.eql({ value: undefined, done: true });
        });
      });

      it('should not skip sparse keys', function () {
        var sparse = [1];
        sparse[2] = 3;
        var keys = sparse.keys();
        expect(keys.next()).to.eql({ value: 0, done: false });
        expect(keys.next()).to.eql({ value: 1, done: false });
        expect(keys.next()).to.eql({ value: 2, done: false });
        expect(keys.next()).to.eql({ value: undefined, done: true });
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.keys).to.equal(true);
      });
    });

    describe('#values()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'values')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('values');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.values).to.have.property('name', 'values');
      });

      it('has the right arity', function () {
        expect(Array.prototype.values).to.have.property('length', 0);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('values').to.have.property('enumerable', false);
      });

      describe('basic list iteration', function () {
        var mylist = [5, 10, 15, 20];
        var values;
        beforeEach(function () {
          if (!values) {
            values = mylist.values();
          }
        });

        it('should return 5 on first object', function () {
          expect(values.next()).to.eql({ value: 5, done: false });
        });

        it('should return 10 on second object', function () {
          expect(values.next()).to.eql({ value: 10, done: false });
        });

        it('should return 15 on third object', function () {
          expect(values.next()).to.eql({ value: 15, done: false });
        });

        it('should return 20 on fourth object', function () {
          expect(values.next()).to.eql({ value: 20, done: false });
        });

        it('should set done on completing iteration', function () {
          expect(values.next()).to.eql({ value: undefined, done: true });
        });

        it('once done it should stay done', function () {
          mylist.push(4);
          expect(values.next()).to.eql({ value: undefined, done: true });
        });
      });

      it('should not skip sparse values', function () {
        var sparse = [1];
        sparse[2] = 3;
        var values = sparse.values();
        expect(values.next()).to.eql({ value: 1, done: false });
        expect(values.next()).to.eql({ value: undefined, done: false });
        expect(values.next()).to.eql({ value: 3, done: false });
        expect(values.next()).to.eql({ value: undefined, done: true });
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.values).to.equal(true);
      });
    });

    describe('#entries()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'entries')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('entries');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.entries).to.have.property('name', 'entries');
      });

      it('has the right arity', function () {
        expect(Array.prototype.entries).to.have.property('length', 0);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('entries').to.have.property('enumerable', false);
      });

      describe('basic list iteration', function () {
        var mylist = [5, 10, 15, 20];
        var entries;
        beforeEach(function () {
          if (!entries) {
            entries = mylist.entries();
          }
        });

        it('should return [0, 5] on first object', function () {
          var val = entries.next();
          expect(val).to.eql({ value: [0, 5], done: false });
        });

        it('should return [1, 10] on second object', function () {
          var val = entries.next();
          expect(val).to.eql({ value: [1, 10], done: false });
        });

        it('should return [2, 15] on third object', function () {
          var val = entries.next();
          expect(val).to.eql({ value: [2, 15], done: false });
        });

        it('should return [3, 20] on fourth object', function () {
          var val = entries.next();
          expect(val).to.eql({ value: [3, 20], done: false });
        });

        it('should set done on completing iteration', function () {
          var val = entries.next();
          expect(val).to.eql({ value: undefined, done: true });
        });

        it('once done it should stay done', function () {
          mylist.push(4);
          var val = entries.next();
          expect(val).to.eql({ value: undefined, done: true });
        });
      });

      it('should not skip sparse entries', function () {
        var sparse = [1];
        sparse[2] = 3;
        var entries = sparse.entries();
        expect(entries.next()).to.eql({ value: [0, 1], done: false });
        expect(entries.next()).to.eql({ value: [1, undefined], done: false });
        expect(entries.next()).to.eql({ value: [2, 3], done: false });
        expect(entries.next()).to.eql({ value: undefined, done: true });
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.entries).to.equal(true);
      });
    });

    describe('#fill()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'fill')) {
        return it('exists', function () {
          expect(Array.prototype).to.have.property('fill');
        });
      }

      ifFunctionsHaveNamesIt('has the correct name', function () {
        expect(Array.prototype.fill).to.have.property('name', 'fill');
      });

      it('has the right arity', function () {
        expect(Array.prototype.fill).to.have.property('length', 1);
      });

      it('is not enumerable', function () {
        expect(Array.prototype).ownPropertyDescriptor('fill').to.have.property('enumerable', false);
      });

      it('works with just a value', function () {
        var original = [1, 2, 3, 4, 5, 6];
        var filled = [-1, -1, -1, -1, -1, -1];

        expect(original.fill(-1)).to.eql(filled);
      });

      it('accepts a positive start index', function () {
        var original = [1, 2, 3, 4, 5, 6];
        var filled = [1, 2, 3, -1, -1, -1];

        expect(original.fill(-1, 3)).to.eql(filled);
      });

      it('accepts a negative start index', function () {
        var original = [1, 2, 3, 4, 5, 6];
        var filled = [1, 2, 3, -1, -1, -1];

        expect(original.fill(-1, -3)).to.eql(filled);
      });

      it('accepts a negative end index', function () {
        var original = [1, 2, 3];
        var filled = [4, 2, 3];

        expect(original.fill(4, -3, -2)).to.eql(filled);
      });

      it('accepts a large start index', function () {
        var original = [1, 2, 3, 4, 5, 6];
        var filled = [1, 2, 3, 4, 5, 6];

        expect(original.fill(-1, 9)).to.eql(filled);
      });

      ifSymbolUnscopablesIt('should be unscopable if Symbols exist', function () {
        var unscopables = Array.prototype[Sym.unscopables];
        expect(!!unscopables).to.equal(true);
        expect(unscopables.fill).to.equal(true);
      });
    });

    // this length converts to "1", preventing a crazy crash in older FF
    var negativeLength = { 0: 1, length: -Math.pow(2, 32) + 1 };
    var throwRangeError = function (v, i) {
      if (i === negativeLength.length >>> 0) {
        return v;
      }
      // note: in nonconforming browsers, this will be called
      // -1 >>> 0 times, which is 4294967295, so the throw matters.
      throw new RangeError('should not reach here: length of -1 should clamp to length of 0');
    };
    var throwRangeErrorReduce = function throwRangeErrorReduce(acc, v, i) {
      return throwRangeErrorReduce(v, i);
    };

    describe('#forEach()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        expect(function () {
          Array.prototype.forEach.call(negativeLength, throwRangeError);
        }).not.to['throw']();
      });
    });

    describe('#map()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var mapped;
        expect(function () {
          mapped = Array.prototype.map.call(negativeLength, throwRangeError);
        }).not.to['throw']();
        expect(mapped).to.eql([]);
      });
    });

    describe('#filter()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var filtered;
        expect(function () {
          filtered = Array.prototype.filter.call(negativeLength, throwRangeError);
        }).not.to['throw']();
        expect(filtered).to.eql([]);
      });
    });

    describe('#some()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var result;
        expect(function () {
          result = Array.prototype.some.call(negativeLength, throwRangeError);
        }).not.to['throw']();
        expect(result).to.equal([].some(Object));
      });
    });

    describe('#every()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var result;
        expect(function () {
          result = Array.prototype.every.call(negativeLength, throwRangeError);
        }).not.to['throw']();
        expect(result).to.equal([].every(Object));
      });
    });

    describe('#reduce()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var accumulator = {};
        var reduced;
        expect(function () {
          reduced = Array.prototype.reduce.call(negativeLength, throwRangeErrorReduce, accumulator);
        }).not.to['throw']();
        expect(reduced).to.equal(accumulator);
      });
    });

    describe('#reduceRight()', function () {
      it('uses ToLength to clamp negative values to zero', function () {
        var negativeOneToUint32minusOne = (-1 >>> 0) - 1;
        var obj = { length: -1 };
        obj[negativeOneToUint32minusOne] = true;
        var accumulator = {};
        var reduced;
        expect(function () {
          reduced = Array.prototype.reduceRight.call(obj, throwRangeErrorReduce, accumulator);
        }).not.to['throw']();
        expect(reduced).to.equal(accumulator);
      });
    });

    describe('#indexOf()', function () {
      it('converts second argument from -0 to +0', function () {
        expect(isNegativeZero([true].indexOf(true, -0))).to.equal(false);
      });
    });
  });
};

describe('clean Object.prototype', function () {
  'use strict';

  runArrayTests.call(this, it);
});

describe('polluted Object.prototype', function () {
  'use strict';

  var shimmedIt = function () {
    /* eslint-disable no-extend-native */
    Object.prototype[1] = 42;
    /* eslint-enable no-extend-native */
    it.apply(this, arguments);
    delete Object.prototype[1];
  };
  shimmedIt.skip = it.skip;
  return runArrayTests.call(this, shimmedIt);
});
