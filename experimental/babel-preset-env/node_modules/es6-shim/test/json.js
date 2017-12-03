describe('JSON', function () {
  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
  var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
  var ifSymbolsIt = hasSymbols ? it : xit;
  var ifSymbolsDescribe = hasSymbols ? describe : xit;

  describe('.stringify()', function () {
    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(JSON.stringify.name).to.equal('stringify');
    });

    ifSymbolsIt('serializes a Symbol to undefined', function () {
      expect(JSON.stringify(Symbol())).to.equal(undefined);
    });

    ifSymbolsIt('serializes a Symbol object to {}', function () {
      expect(function stringifyObjectSymbol() { JSON.stringify(Object(Symbol())); }).not.to['throw']();
      expect(JSON.stringify(Object(Symbol()))).to.equal('{}');
    });

    ifSymbolsIt('serializes Symbols in an Array to null', function () {
      expect(JSON.stringify([Symbol('foo')])).to.equal('[null]');
    });

    ifSymbolsIt('serializes Symbol objects in an Array to {}', function () {
      expect(function stringifyObjectSymbolInArray() { JSON.stringify([Object(Symbol('foo'))]); }).not.to['throw']();
      expect(JSON.stringify([Object(Symbol('foo'))])).to.equal('[{}]');
    });

    ifSymbolsDescribe('skips symbol properties and values in an object', function () {
      var enumSym = Symbol('enumerable');
      var nonenum = Symbol('non-enumerable');
      var createObject = function () {
        var obj = { a: 1 };
        obj[enumSym] = true;
        obj.sym = enumSym;
        Object.defineProperty(obj, nonenum, { enumerable: false, value: true });
        expect(Object.getOwnPropertySymbols(obj)).to.eql([enumSym, nonenum]);
        return obj;
      };

      it('works with no replacer', function () {
        var obj = createObject();
        expect(JSON.stringify(obj)).to.equal('{"a":1}');
        expect(JSON.stringify(obj, null, '|')).to.equal('{\n|"a": 1\n}');
      });

      it('works with a replacer function', function () {
        var tuples = [];
        var replacer = function (key, value) {
          tuples.push([this, key, value]);
          return value;
        };
        var obj = createObject();
        expect(JSON.stringify(obj, replacer, '|')).to.equal('{\n|"a": 1\n}'); // populate `tuples` array
        expect(tuples).to.eql([
          [{ '': obj }, '', obj],
          [obj, 'a', 1],
          [obj, 'sym', enumSym]
        ]);
      });

      it('works with a replacer array', function () {
        var obj = createObject();
        obj.foo = 'bar';
        obj[Symbol.prototype.toString.call(enumSym)] = 'tricksy';
        expect(JSON.stringify(obj, ['a', enumSym])).to.equal('{"a":1}');
        expect(JSON.stringify(obj, ['a', enumSym], '|')).to.equal('{\n|"a": 1\n}');
      });

      it('ignores a non-array non-callable replacer object', function () {
        expect(JSON.stringify('z', { test: null })).to.equal('"z"');
      });
    });
  });
});
