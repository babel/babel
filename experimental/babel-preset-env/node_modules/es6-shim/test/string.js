var runStringTests = function (it) {
  'use strict';

  var functionsHaveNames = (function foo() {}).name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : it.skip;
  var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;
  var hasSymbols = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' && typeof Symbol.iterator === 'symbol';
  var ifSymbolsDescribe = hasSymbols ? describe : describe.skip;

  describe('String', function () {
    var hasStrictMode = (function () { return this === null; }.call(null));
    var testObjectCoercible = function (methodName) {
      var fn = String.prototype[methodName];
      if (!hasStrictMode) { return; } // skip these tests on IE <= 10
      expect(function () { return fn.call(undefined); }).to['throw'](TypeError);
      expect(function () { return fn.call(null); }).to['throw'](TypeError);
      expect(function () { return fn.apply(undefined); }).to['throw'](TypeError);
      expect(function () { return fn.apply(null); }).to['throw'](TypeError);
    };

    ifShimIt('is on the exported object', function () {
      var exported = require('../');
      expect(exported.String).to.equal(String);
    });

    describe('#repeat()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'repeat')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('repeat');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.repeat).to.have.property('name', 'repeat');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('repeat').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        expect(String.prototype.repeat).to.have.property('length', 1);
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('repeat');
      });

      it('should throw a RangeError when negative or infinite', function () {
        expect(function negativeOne() { return 'test'.repeat(-1); }).to['throw'](RangeError);
        expect(function infinite() { return 'test'.repeat(Infinity); }).to['throw'](RangeError);
      });

      it('should coerce to an integer', function () {
        expect('test'.repeat(null)).to.eql('');
        expect('test'.repeat(false)).to.eql('');
        expect('test'.repeat('')).to.eql('');
        expect('test'.repeat(NaN)).to.eql('');
        expect('test'.repeat({})).to.eql('');
        expect('test'.repeat([])).to.eql('');
        expect('test'.repeat({
          valueOf: function () { return 2; }
        })).to.eql('testtest');
      });
      it('should work', function () {
        expect('test'.repeat(3)).to.eql('testtesttest');
      });
      it('should work on integers', function () {
        expect(String.prototype.repeat.call(2, 3)).to.eql('222');
      });
      it('should work on booleans', function () {
        expect(String.prototype.repeat.call(true, 3)).to.eql('truetruetrue');
      });
      it('should work on dates', function () {
        var d = new Date();
        expect(String.prototype.repeat.call(d, 3)).to.eql([d, d, d].join(''));
      });
    });

    describe('#startsWith()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'startsWith')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('startsWith');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.startsWith).to.have.property('name', 'startsWith');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('startsWith').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        // WebKit nightly had this bug, fixed in https://bugs.webkit.org/show_bug.cgi?id=143659
        expect(String.prototype.startsWith).to.have.property('length', 1);
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('startsWith');
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('startsWith');
      });

      it('should be truthy on correct results', function () {
        expect('test'.startsWith('te')).to.equal(true);
        expect('test'.startsWith('st')).to.equal(false);
        expect(''.startsWith('/')).to.equal(false);
        expect('#'.startsWith('/')).to.equal(false);
        expect('##'.startsWith('///')).to.equal(false);

        expect('abc'.startsWith('abc')).to.equal(true);
        expect('abcd'.startsWith('abc')).to.equal(true);
        expect('abc'.startsWith('a')).to.equal(true);
        expect('abc'.startsWith('abcd')).to.equal(false);
        expect('abc'.startsWith('bcde')).to.equal(false);
        expect('abc'.startsWith('b')).to.equal(false);
        expect('abc'.startsWith('abc', 0)).to.equal(true);
        expect('abc'.startsWith('bc', 0)).to.equal(false);
        expect('abc'.startsWith('bc', 1)).to.equal(true);
        expect('abc'.startsWith('c', 1)).to.equal(false);
        expect('abc'.startsWith('abc', 1)).to.equal(false);
        expect('abc'.startsWith('c', 2)).to.equal(true);
        expect('abc'.startsWith('d', 2)).to.equal(false);
        expect('abc'.startsWith('dcd', 2)).to.equal(false);
        expect('abc'.startsWith('a', NaN)).to.equal(true);
        expect('abc'.startsWith('b', NaN)).to.equal(false);
        expect('abc'.startsWith('ab', -43)).to.equal(true);
        expect('abc'.startsWith('ab', -Infinity)).to.equal(true);
        expect('abc'.startsWith('bc', -42)).to.equal(false);
        expect('abc'.startsWith('bc', -Infinity)).to.equal(false);
        if (hasStrictMode) {
          expect(function () {
            return ''.startsWith.call(null, 'nu');
          }).to['throw'](TypeError);
          expect(function () {
            return ''.startsWith.call(undefined, 'un');
          }).to['throw'](TypeError);
        }
        var myobj = {
          toString: function () { return 'abc'; },
          startsWith: String.prototype.startsWith
        };
        expect(myobj.startsWith('abc')).to.equal(true);
        expect(myobj.startsWith('bc')).to.equal(false);

        var gotStr = false;
        var gotPos = false;

        myobj = {
          toString: function () {
            expect(gotPos).to.equal(false);
            gotStr = true;
            return 'xyz';
          },
          startsWith: String.prototype.startsWith
        };
        var idx = {
          valueOf: function () {
            expect(gotStr).to.equal(true);
            gotPos = true;
            return 42;
          }
        };
        myobj.startsWith('elephant', idx);
        expect(gotPos).to.equal(true);
      });

      it('should handle large positions', function () {
        expect('abc'.startsWith('a', 42)).to.equal(false);
        expect('abc'.startsWith('a', Infinity)).to.equal(false);
      });

      it('should coerce to a string', function () {
        expect('abcd'.startsWith({ toString: function () { return 'ab'; } })).to.equal(true);
        expect('abcd'.startsWith({ toString: function () { return 'foo'; } })).to.equal(false);
      });

      it('should not allow a regex', function () {
        expect(function () { return 'abcd'.startsWith(/abc/); }).to['throw'](TypeError);
        expect(function () { return 'abcd'.startsWith(new RegExp('abc')); }).to['throw'](TypeError);
      });

      ifSymbolsDescribe('Symbol.match', function () {
        if (!hasSymbols || !Symbol.match) {
          return it('exists', function () {
            expect(Symbol).to.have.property('match');
          });
        }

        it('allows a regex with Symbol.match set to a falsy value', function () {
          var re = /a/g;
          re[Symbol.match] = false;
          expect(function () { return 'abcd'.startsWith(re); }).not.to['throw']();
          expect('abcd'.startsWith(re)).to.equal('abcd'.startsWith(String(re)));
        });
      });
    });

    describe('#endsWith()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'endsWith')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('endsWith');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.endsWith).to.have.property('name', 'endsWith');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('endsWith').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        // WebKit nightly had this bug, fixed in https://bugs.webkit.org/show_bug.cgi?id=143659
        expect(String.prototype.endsWith).to.have.property('length', 1);
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('endsWith');
      });

      it('should be truthy on correct results', function () {
        expect('test'.endsWith('st')).to.equal(true);
        expect('test'.endsWith('te')).to.equal(false);
        expect(''.endsWith('/')).to.equal(false);
        expect('#'.endsWith('/')).to.equal(false);
        expect('##'.endsWith('///')).to.equal(false);

        expect('abc'.endsWith('abc')).to.equal(true);
        expect('abcd'.endsWith('bcd')).to.equal(true);
        expect('abc'.endsWith('c')).to.equal(true);
        expect('abc'.endsWith('abcd')).to.equal(false);
        expect('abc'.endsWith('bbc')).to.equal(false);
        expect('abc'.endsWith('b')).to.equal(false);
        expect('abc'.endsWith('abc', 3)).to.equal(true);
        expect('abc'.endsWith('bc', 3)).to.equal(true);
        expect('abc'.endsWith('a', 3)).to.equal(false);
        expect('abc'.endsWith('bc', 3)).to.equal(true);
        expect('abc'.endsWith('a', 1)).to.equal(true);
        expect('abc'.endsWith('abc', 1)).to.equal(false);
        expect('abc'.endsWith('b', 2)).to.equal(true);
        expect('abc'.endsWith('d', 2)).to.equal(false);
        expect('abc'.endsWith('dcd', 2)).to.equal(false);
        expect('abc'.endsWith('bc', undefined)).to.equal(true);
        expect('abc'.endsWith('bc', NaN)).to.equal(false);
        if (hasStrictMode) {
          expect(function () {
            return ''.endsWith.call(null, 'ull');
          }).to['throw'](TypeError);
          expect(function () {
            return ''.endsWith.call(undefined, 'ned');
          }).to['throw'](TypeError);
        }

        var myobj = {
          toString: function () { return 'abc'; },
          endsWith: String.prototype.endsWith
        };
        expect(myobj.endsWith('abc')).to.equal(true);
        expect(myobj.endsWith('ab')).to.equal(false);
        var gotStr = false;
        var gotPos = false;

        myobj = {
          toString: function () {
            expect(gotPos).to.equal(false);
            gotStr = true;
            return 'xyz';
          },
          endsWith: String.prototype.endsWith
        };
        var idx = {
          valueOf: function () {
            expect(gotStr).to.equal(true);
            gotPos = true;
            return 42;
          }
        };
        myobj.endsWith('elephant', idx);
        expect(gotPos).to.equal(true);
      });

      it('should coerce to a string', function () {
        expect('abcd'.endsWith({ toString: function () { return 'cd'; } })).to.equal(true);
        expect('abcd'.endsWith({ toString: function () { return 'foo'; } })).to.equal(false);
      });

      it('should not allow a regex', function () {
        expect(function () { return 'abcd'.endsWith(/abc/); }).to['throw'](TypeError);
        expect(function () { return 'abcd'.endsWith(new RegExp('abc')); }).to['throw'](TypeError);
      });

      it('should handle negative and zero endPositions properly', function () {
        expect('abcd'.endsWith('bcd', 0)).to.equal(false);
        expect('abcd'.endsWith('bcd', -2)).to.equal(false);
        expect('abcd'.endsWith('b', -2)).to.equal(false);
        expect('abcd'.endsWith('ab', -2)).to.equal(false);
        expect('abc'.endsWith('bc', -43)).to.equal(false);
        expect('abc'.endsWith('bc', -Infinity)).to.equal(false);
      });

      it('should handle large endPositions properly', function () {
        expect('abc'.endsWith('a', 42)).to.equal(false);
        expect('abc'.endsWith('bc', Infinity)).to.equal(true);
        expect('abc'.endsWith('a', Infinity)).to.equal(false);
      });

      ifSymbolsDescribe('Symbol.match', function () {
        if (!hasSymbols || !Symbol.match) {
          return it('exists', function () {
            expect(Symbol).to.have.property('match');
          });
        }

        it('allows a regex with Symbol.match set to a falsy value', function () {
          var re = /a/g;
          re[Symbol.match] = false;
          expect(function () { return 'abcd'.startsWith(re); }).not.to['throw']();
          expect('abcd'.endsWith(re)).to.equal('abcd'.endsWith(String(re)));
        });
      });
    });

    describe('#includes()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'includes')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('includes');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.includes).to.have.property('name', 'includes');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('includes').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        // WebKit nightly had this bug, fixed in https://bugs.webkit.org/show_bug.cgi?id=143659
        expect(String.prototype.includes).to.have.property('length', 1);
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('includes');
      });

      it('throws a TypeError when given a regex', function () {
        expect(function () { 'foo'.includes(/a/g); }).to['throw'](TypeError);
      });

      it('should be truthy on correct results', function () {
        expect('test'.includes('es')).to.equal(true);
        expect('abc'.includes('a')).to.equal(true);
        expect('abc'.includes('b')).to.equal(true);
        expect('abc'.includes('abc')).to.equal(true);
        expect('abc'.includes('bc')).to.equal(true);
        expect('abc'.includes('d')).to.equal(false);
        expect('abc'.includes('abcd')).to.equal(false);
        expect('abc'.includes('ac')).to.equal(false);
        expect('abc'.includes('abc', 0)).to.equal(true);
        expect('abc'.includes('bc', 0)).to.equal(true);
        expect('abc'.includes('de', 0)).to.equal(false);
        expect('abc'.includes('bc', 1)).to.equal(true);
        expect('abc'.includes('c', 1)).to.equal(true);
        expect('abc'.includes('a', 1)).to.equal(false);
        expect('abc'.includes('abc', 1)).to.equal(false);
        expect('abc'.includes('c', 2)).to.equal(true);
        expect('abc'.includes('d', 2)).to.equal(false);
        expect('abc'.includes('dcd', 2)).to.equal(false);
        expect('abc'.includes('ab', NaN)).to.equal(true);
        expect('abc'.includes('cd', NaN)).to.equal(false);

        var myobj = {
          toString: function () { return 'abc'; },
          includes: String.prototype.includes
        };

        expect(myobj.includes('abc')).to.equal(true);
        expect(myobj.includes('cd')).to.equal(false);

        var gotStr = false;
        var gotPos = false;

        myobj = {
          toString: function () {
            expect(gotPos).to.equal(false);
            gotStr = true;
            return 'xyz';
          },

          includes: String.prototype.includes
        };

        var idx = {
          valueOf: function () {
            expect(gotStr).to.equal(true);
            gotPos = true;
            return 42;
          }
        };

        myobj.includes('elephant', idx);
        expect(gotPos).to.equal(true);
      });

      it('should handle large positions', function () {
        expect('abc'.includes('a', 42)).to.equal(false);
        expect('abc'.includes('a', Infinity)).to.equal(false);
      });

      it('should handle negative positions', function () {
        expect('abc'.includes('ab', -43)).to.equal(true);
        expect('abc'.includes('cd', -42)).to.equal(false);
        expect('abc'.includes('ab', -Infinity)).to.equal(true);
        expect('abc'.includes('cd', -Infinity)).to.equal(false);
      });

      it('should be falsy on incorrect results', function () {
        expect('test'.includes('1290')).to.equal(false);
      });

      ifSymbolsDescribe('Symbol.match', function () {
        if (!hasSymbols || !Symbol.match) {
          return it('exists', function () {
            expect(Symbol).to.have.property('match');
          });
        }

        it('allows a regex with Symbol.match set to a falsy value', function () {
          var re = /a/g;
          re[Symbol.match] = false;
          expect(function () { return 'abcd'.includes(re); }).not.to['throw']();
          expect('abcd'.includes(re)).to.equal('abcd'.includes(String(re)));
        });
      });
    });

    describe('.fromCodePoint()', function () {
      if (!Object.prototype.hasOwnProperty.call(String, 'fromCodePoint')) {
        return it('exists', function () {
          expect(String).to.have.property('fromCodePoint');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.fromCodePoint).to.have.property('name', 'fromCodePoint');
      });

      it('is not enumerable', function () {
        expect(String).ownPropertyDescriptor('fromCodePoint').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        expect(String.fromCodePoint).to.have.property('length', 1);
      });

      it('throws a RangeError', function () {
        var invalidValues = [
          'abc',
          {},
          -1,
          0x10FFFF + 1
        ];
        invalidValues.forEach(function (value) {
          expect(function () { return String.fromCodePoint(value); }).to['throw'](RangeError);
        });
      });

      it('returns the empty string with no args', function () {
        expect(String.fromCodePoint()).to.equal('');
      });

      it('works', function () {
        var codePoints = [];
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789…?!';
        for (var i = 0; i < chars.length; ++i) {
          codePoints.push(chars.charCodeAt(i));
          expect(String.fromCodePoint(chars.charCodeAt(i))).to.equal(chars[i]);
        }
        expect(String.fromCodePoint.apply(String, codePoints)).to.equal(chars);
      });

      it('works with unicode', function () {
        expect(String.fromCodePoint(0x2500)).to.equal('\u2500');
        expect(String.fromCodePoint(0x010000)).to.equal('\ud800\udc00');
        expect(String.fromCodePoint(0x10FFFF)).to.equal('\udbff\udfff');
      });
    });

    describe('#codePointAt()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'codePointAt')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('codePointAt');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.codePointAt).to.have.property('name', 'codePointAt');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('codePointAt').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        expect(String.prototype.codePointAt).to.have.property('length', 1);
      });

      it('should throw a TypeError when called on null or undefined', function () {
        testObjectCoercible('codePointAt');
      });

      it('should work', function () {
        var str = 'abc';
        expect(str.codePointAt(0)).to.equal(97);
        expect(str.codePointAt(1)).to.equal(98);
        expect(str.codePointAt(2)).to.equal(99);
      });

      it('should work with unicode', function () {
        expect('\u2500'.codePointAt(0)).to.equal(0x2500);
        expect('\ud800\udc00'.codePointAt(0)).to.equal(0x10000);
        expect('\udbff\udfff'.codePointAt(0)).to.equal(0x10ffff);
        expect('\ud800\udc00\udbff\udfff'.codePointAt(0)).to.equal(0x10000);
        expect('\ud800\udc00\udbff\udfff'.codePointAt(1)).to.equal(0xdc00);
        expect('\ud800\udc00\udbff\udfff'.codePointAt(2)).to.equal(0x10ffff);
        expect('\ud800\udc00\udbff\udfff'.codePointAt(3)).to.equal(0xdfff);
      });

      it('should return undefined when pos is negative or too large', function () {
        var str = 'abc';
        expect(str.codePointAt(-1)).to.equal(undefined);
        expect(str.codePointAt(str.length)).to.equal(undefined);
      });
    });

    describe('#[Symbol.iterator]()', function () {
      if (!Object.prototype.hasOwnProperty.call(Array, 'from')) {
        return it('requires Array.from to test', function () {
          expect(Array).to.have.property('from');
        });
      }

      it('should work with plain strings', function () {
        var str = 'abc';
        expect(Array.from(str)).to.eql(['a', 'b', 'c']);
      });

      it('should work with surrogate characters', function () {
        var str = '\u2500\ud800\udc00\udbff\udfff\ud800';
        expect(Array.from(str)).to.eql(
          ['\u2500', '\ud800\udc00', '\udbff\udfff', '\ud800']
        );
      });
    });

    describe('.raw()', function () {
      if (!Object.prototype.hasOwnProperty.call(String, 'raw')) {
        return it('exists', function () {
          expect(String).to.have.property('raw');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.raw).to.have.property('name', 'raw');
      });

      it('is not enumerable', function () {
        expect(String).ownPropertyDescriptor('raw').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        expect(String.raw).to.have.property('length', 1);
      });

      it('works with callSite.raw: Array', function () {
        var callSite = {};

        var str = 'The total is 10 ($11 with tax)';
        callSite.raw = ['The total is ', ' ($', ' with tax)'];
        expect(String.raw(callSite, 10, 11)).to.eql(str);

        // eslint-disable-next-line no-template-curly-in-string
        str = 'The total is {total} (${total * 1.01} with tax)';
        callSite.raw = ['The total is ', ' ($', ' with tax)'];
        expect(String.raw(callSite, '{total}', '{total * 1.01}')).to.eql(str);
      });

      it('works with callSite.raw: array-like object', function () {
        var callSite = {};

        var str = 'The total is 10 ($11 with tax)';
        callSite.raw = { 0: 'The total is ', 1: ' ($', 2: ' with tax)', length: 3 };
        expect(String.raw(callSite, 10, 11)).to.eql(str);

        // eslint-disable-next-line no-template-curly-in-string
        str = 'The total is {total} (${total * 1.01} with tax)';
        callSite.raw = { 0: 'The total is ', 1: ' ($', 2: ' with tax)', length: 3 };
        expect(String.raw(callSite, '{total}', '{total * 1.01}')).to.eql(str);
      });

      it('works with callSite.raw: empty Objects', function () {
        var callSite = { raw: {} };
        expect(String.raw(callSite, '{total}', '{total * 1.01}')).to.eql('');
        expect(String.raw(callSite)).to.equal('');
      });

      it('ReturnIfAbrupt - Less Substitutions', function () {
        var callSite = {
          raw: { 0: 'The total is ', 1: ' ($', 2: ' with tax)', length: 3 }
        };
        var str = 'The total is 10 ($ with tax)';
        expect(String.raw(callSite, 10)).to.equal(str);
      });
    });

    describe('#trim()', function () {
      if (!Object.prototype.hasOwnProperty.call(String.prototype, 'trim')) {
        return it('exists', function () {
          expect(String.prototype).to.have.property('trim');
        });
      }

      ifFunctionsHaveNamesIt('has the right name', function () {
        expect(String.prototype.trim).to.have.property('name', 'trim');
      });

      it('is not enumerable', function () {
        expect(String.prototype).ownPropertyDescriptor('trim').to.have.property('enumerable', false);
      });

      it('has the right arity', function () {
        expect(String.prototype.trim).to.have.property('length', 0);
      });

      it('should trim the correct characters', function () {
        var whitespace = [
          '\u0009',
          '\u000b',
          '\u000c',
          '\u0020',
          '\u00a0',
          '\u1680',
          '\u2000',
          '\u2001',
          '\u2002',
          '\u2003',
          '\u2004',
          '\u2005',
          '\u2006',
          '\u2007',
          '\u2008',
          '\u2009',
          '\u200A',
          '\u202f',
          '\u205f',
          '\u3000'
        ].join('');

        var lineTerminators = [
          '\u000a',
          '\u000d',
          '\u2028',
          '\u2029'
        ].join('');

        var trimmed = (whitespace + lineTerminators).trim();
        expect(trimmed).to.have.property('length', 0);
        expect(trimmed).to.equal('');
      });

      it('should not trim U+0085', function () {
        var trimmed = '\u0085'.trim();
        expect(trimmed).to.have.property('length', 1);
        expect(trimmed).to.equal('\u0085');
      });

      it('should trim on both sides', function () {
        var trimmed = ' a '.trim();
        expect(trimmed).to.have.property('length', 1);
        expect(trimmed).to.equal('a');
      });
    });

    describe('#search()', function () {
      it('works with strings', function () {
        expect('abc'.search('a')).to.equal(0);
        expect('abc'.search('b')).to.equal(1);
        expect('abc'.search('c')).to.equal(2);
        expect('abc'.search('d')).to.equal(-1);
      });

      it('works with regexes', function () {
        expect('abc'.search(/a/)).to.equal(0);
        expect('abc'.search(/b/)).to.equal(1);
        expect('abc'.search(/c/)).to.equal(2);
        expect('abc'.search(/d/)).to.equal(-1);
      });

      ifSymbolsDescribe('Symbol.search', function () {
        it('is a symbol', function () {
          expect(typeof Symbol.search).to.equal('symbol');
        });

        if (!hasSymbols || typeof Symbol.search !== 'symbol') {
          return;
        }

        it('is nonconfigurable', function () {
          expect(Symbol).ownPropertyDescriptor('search').to.have.property('configurable', false);
        });

        it('is nonenumerable', function () {
          expect(Symbol).ownPropertyDescriptor('search').to.have.property('enumerable', false);
        });

        it('is nonwritable', function () {
          expect(Symbol).ownPropertyDescriptor('search').to.have.property('writable', false);
        });

        it('is respected', function () {
          var str = Object('a');
          var obj = {};
          obj[Symbol.search] = function (string) { return string === str && this === obj; };
          expect(str.search(obj)).to.equal(true);
        });
      });
    });

    describe('#replace()', function () {
      it('works', function () {
        expect('abcabc'.replace('c', 'd')).to.equal('abdabc');
        expect('abcabc'.replace(/c/, 'd')).to.equal('abdabc');
        expect('abcabc'.replace(/c/g, 'd')).to.equal('abdabd');
        expect('abcabc'.replace(/C/ig, 'd')).to.equal('abdabd');
      });

      ifSymbolsDescribe('Symbol.replace', function () {
        it('is a symbol', function () {
          expect(typeof Symbol.replace).to.equal('symbol');
        });

        if (!hasSymbols || typeof Symbol.replace !== 'symbol') {
          return;
        }

        it('is nonconfigurable', function () {
          expect(Symbol).ownPropertyDescriptor('replace').to.have.property('configurable', false);
        });

        it('is nonenumerable', function () {
          expect(Symbol).ownPropertyDescriptor('replace').to.have.property('enumerable', false);
        });

        it('is nonwritable', function () {
          expect(Symbol).ownPropertyDescriptor('replace').to.have.property('writable', false);
        });

        it('respects Symbol.replace', function () {
          var str = Object('a');
          var replaceVal = Object('replaceValue');
          var obj = {};
          obj[Symbol.replace] = function (string, replaceValue) {
            return string === str && replaceValue === replaceVal && this === obj;
          };
          expect(str.replace(obj, replaceVal)).to.equal(true);
        });
      });
    });

    describe('#split()', function () {
      it('works', function () {
        expect('abcabc'.split('b')).to.eql(['a', 'ca', 'c']);
        expect('abcabc'.split('b', 2)).to.eql(['a', 'ca']);
        expect('abcabc'.split(/b.?/)).to.eql(['a', 'a', '']);
        expect('abcabc'.split(/b.?/, 2)).to.eql(['a', 'a']);
        expect('abcabc'.split(/b/)).to.eql(['a', 'ca', 'c']);
        expect('abcabc'.split(/b/, 2)).to.eql(['a', 'ca']);
        expect('abcabc'.split(/b/g)).to.eql(['a', 'ca', 'c']);
        expect('abcabc'.split(/b/g, 2)).to.eql(['a', 'ca']);
        expect('abcabc'.split(/B/i)).to.eql(['a', 'ca', 'c']);
        expect('abcabc'.split(/B/i, 2)).to.eql(['a', 'ca']);
        expect('abcabc'.split(/B/gi)).to.eql(['a', 'ca', 'c']);
        expect('abcabc'.split(/B/gi, 2)).to.eql(['a', 'ca']);
      });

      ifSymbolsDescribe('Symbol.split', function () {
        it('is a symbol', function () {
          expect(typeof Symbol.split).to.equal('symbol');
        });

        if (!hasSymbols || typeof Symbol.split !== 'symbol') {
          return;
        }

        it('is nonconfigurable', function () {
          expect(Symbol).ownPropertyDescriptor('split').to.have.property('configurable', false);
        });

        it('is nonenumerable', function () {
          expect(Symbol).ownPropertyDescriptor('split').to.have.property('enumerable', false);
        });

        it('is nonwritable', function () {
          expect(Symbol).ownPropertyDescriptor('split').to.have.property('writable', false);
        });

        it('respects Symbol.split', function () {
          var str = Object('a');
          var limitVal = Object(42);
          var obj = {};
          obj[Symbol.split] = function (string, limit) { return string === str && limit === limitVal && this === obj; };
          expect(str.split(obj, limitVal)).to.equal(true);
        });
      });
    });

    describe('#match()', function () {
      it('works with a string', function () {
        var str = 'abca';
        var match = str.match('a');
        expect(match.index).to.equal(0);
        expect(match.input).to.equal(str);
        expect(Array.prototype.slice.call(match)).to.eql(['a']);
      });

      it('works with a regex', function () {
        var str = 'abca';
        var match = str.match(/a/);
        expect(match.index).to.equal(0);
        expect(match.input).to.equal(str);
        expect(Array.prototype.slice.call(match)).to.eql(['a']);
      });

      ifSymbolsDescribe('Symbol.match', function () {
        it('is a symbol', function () {
          expect(typeof Symbol.match).to.equal('symbol');
        });

        if (!hasSymbols || typeof Symbol.match !== 'symbol') {
          return;
        }

        it('is nonconfigurable', function () {
          expect(Symbol).ownPropertyDescriptor('match').to.have.property('configurable', false);
        });

        it('is nonenumerable', function () {
          expect(Symbol).ownPropertyDescriptor('match').to.have.property('enumerable', false);
        });

        it('is nonwritable', function () {
          expect(Symbol).ownPropertyDescriptor('match').to.have.property('writable', false);
        });

        it('respects Symbol.match', function () {
          var str = Object('a');
          var obj = {};
          obj[Symbol.match] = function (string) { return string === str && this === obj; };
          expect(str.match(obj)).to.equal(true);
        });
      });
    });
  });

  describe('Annex B', function () {
    it('has #anchor', function () {
      expect('foo'.anchor('bar"baz"')).to.equal('<a name="bar&quot;baz&quot;">foo</a>');
    });
    it('has #big', function () {
      expect('foo'.big()).to.equal('<big>foo</big>');
    });
    it('has #blink', function () {
      expect('foo'.blink()).to.equal('<blink>foo</blink>');
    });
    it('has #bold', function () {
      expect('foo'.bold()).to.equal('<b>foo</b>');
    });
    it('has #fixed', function () {
      expect('foo'.fixed()).to.equal('<tt>foo</tt>');
    });
    it('has #fontcolor', function () {
      expect('foo'.fontcolor('blue"red"green')).to.equal('<font color="blue&quot;red&quot;green">foo</font>');
    });
    it('has #fontsize', function () {
      expect('foo'.fontsize('10"large"small')).to.equal('<font size="10&quot;large&quot;small">foo</font>');
    });
    it('has #italics', function () {
      expect('foo'.italics()).to.equal('<i>foo</i>');
    });
    it('has #link', function () {
      expect('foo'.link('url"http://"')).to.equal('<a href="url&quot;http://&quot;">foo</a>');
    });
    it('has #small', function () {
      expect('foo'.small()).to.equal('<small>foo</small>');
    });
    it('has #strike', function () {
      expect('foo'.strike()).to.equal('<strike>foo</strike>');
    });
    it('has #sub', function () {
      expect('foo'.sub()).to.equal('<sub>foo</sub>');
    });
    it('has #sup', function () {
      expect('foo'.sup()).to.equal('<sup>foo</sup>');
    });
  });
};

describe('clean Object.prototype', function () {
  return runStringTests.call(this, it);
});

describe('polluted Object.prototype', function () {
  var shimmedIt = function () {
    /* eslint-disable no-extend-native */
    Object.prototype[1] = 42;
    /* eslint-enable no-extend-native */
    it.apply(this, arguments);
    delete Object.prototype[1];
  };
  shimmedIt.skip = it.skip;
  return runStringTests.call(this, shimmedIt);
});
