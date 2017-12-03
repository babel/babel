exports.name = 'Non-standard';
exports.target_file = 'non-standard/index.html';
exports.skeleton_file = 'non-standard/skeleton.html';

exports.tests = [
{
  name: 'decompilation',
  subtests: [
    {
      name: 'uneval, existence',
      spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/uneval',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/uneval',
      exec: function () {/*
        return typeof uneval == 'function';
      */},
      res: {
        firefox2: true,
        rhino1_7: true,
        duktape2_0: false,
      }
    },
    {
      name: 'built-in "toSource" methods',
      spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toSource',
      mdn: 'https://developer.mozilla.org/en-US/search?q=tosource',
      exec: function () {/*
        return 'toSource' in Object.prototype
            && Number   .prototype.hasOwnProperty('toSource')
            && Boolean  .prototype.hasOwnProperty('toSource')
            && String   .prototype.hasOwnProperty('toSource')
            && Function .prototype.hasOwnProperty('toSource')
            && Array    .prototype.hasOwnProperty('toSource')
            && RegExp   .prototype.hasOwnProperty('toSource')
            && Date     .prototype.hasOwnProperty('toSource')
            && Error    .prototype.hasOwnProperty('toSource');
      */},
      res: {
        firefox2: true,
        besen: true,
        rhino1_7: true,
        duktape2_0: false,
      },
    },
    {
      name: '"toSource" method as hook for uneval',
      exec: function () {/*
        return uneval({ toSource: function() { return "pwnd!" } }) === "pwnd!";
      */} ,
      res: {
        firefox2: true,
        rhino1_7: null,
        duktape2_0: false,
      },
    },
    {
      name: 'eval(uneval(value)) is functionally equivalent to value',
      exec: function () {/*

        function isEquivalent(x, y) {

            if (x == null || y == null)
                return x === y;

            if (typeof x !== typeof y)
                return false;

            switch (typeof x) {
            case 'number':
                return x === y && 1/x === 1/y || isNaN(x) && isNaN(y)
            case 'boolean':
            case 'string':
            case 'symbol':
                return x === y;
            }

            if ({}.toString.call(x) !== {}.toString.call(y))
                return false;

            switch ({}.toString.call(x)) {

            case '[object Boolean]':
            case '[object Number]':
            case '[object String]':
            case '[object Date]':
                return x.valueOf() === y.valueOf();

            case '[object Function]':
            case '[object RegExp]':
            case '[object Error]':
                return x.toString() === y.toString();

            case '[object Array]':
                if (x.length !== y.length)
                    return false;
                for (var i = 0; i < x.length; i++) {
                    if (!isEquivalent(x[i], y[i]))
                        return false;
                }
                return true;

            default:
                for (var i in x) {
                    if ({}.hasOwnProperty.call(x, i)) {
                        if (!{}.hasOwnProperty.call(y, i) || !isEquivalent(x[i], y[i]))
                            return false;
                    }
                }
                for (var i in y) {
                    if ({}.hasOwnProperty.call(y, i) && !{}.hasOwnProperty.call(x, i))
                        return false;
                }
                return true;

            }

        }


        var sample = [
            undefined,
            null,
            false,
            1,
            NaN,
            -0,
            "foo",
            typeof Symbol !== "undefined" && Symbol.iterator,
            typeof Symbol !== "undefined" && Symbol.for && Symbol.for('bingo'),
            Object(true),
            Object(3),
            Object("x"),
            function x(y) { return 42 + y; },
            new Date(1234567890123),
            new Error("message"),
            new EvalError("WTF"),
            /rx/gim,
            [ 3, undefined, "%&@", null, function() {} ],
            { foo: "x", bar: [ 42, new Date ] }
        ];

        for (var k in sample) {
            if (!isEquivalent(sample[k], eval(uneval(sample[k])))) {
                return false;
            }
        }

        return true;
      */} ,
      res: {
        firefox2: true,
        besen: null,
        rhino1_7: null,
        duktape2_0: false,
      },
    },
  ]
},
{
  name: 'optional "scope" argument of "eval"',
  spec: null,
  exec: function () {/*
    var x = 1;
    return eval("x", { x: 2 }) === 2;
  */},
  res: {
    firefox2: true,
    firefox3: false,
    firefox3_5: true,
    firefox4: false,
    rhino1_7: null,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'function "caller" property',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/caller',
  exec: function () {
    return 'caller' in function(){};
  },
  res: {
    ie7: true,
    firefox2: true,
    safari3_1: true,
    chrome7: true,
    opera7_5: false,
    opera10_10: false,
    opera10_50: true,
    konq4_4: true,
    besen: false,
    rhino1_7: false,
    phantom: true,
    android4_0: true,
    duktape2_0: false,
  }
},
{
  name: 'function "arity" property',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/arity',
  exec: function () {
    return (function () {}).arity === 0 &&
      (function (x) { return x; }).arity === 1 &&
      (function (x, y) { return y; }).arity === 2;
  },
  res: {
    ie7: false,
    firefox2: true,
    firefox7: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'function "arguments" property',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments',
  exec: function () {
    function f(a, b) {
      return f.arguments && a === 1 && f.arguments[0] === 1 && b === 'boo' && f.arguments[1] === 'boo';
    }
    return f(1, 'boo');
  },
  res: {
    ie7: true,
    firefox2: true,
    safari3_1: true,
    chrome7: true,
    opera7_5: true,
    opera10_10: true,
    konq4_4: true,
    besen: false,
    rhino1_7: true,
    phantom: true,
    android4_0: true,
    duktape2_0: false,
  }
},
{
  name: 'Function.prototype.isGenerator',
  spec: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/isGenerator',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/isGenerator',
  exec: function () {
    return typeof Function.prototype.isGenerator == 'function';
  },
  res: {
    ie7: false,
    firefox2: false,
    firefox5: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'class extends null',
  spec: 'https://github.com/tc39/ecma262/issues/543',
  exec: function() {/*
     class C extends null {}
     return new C instanceof C;
     */},
  res: {
    safari10_1: true,
    safaritp: false,
    webkit: false,
    opera7_5: false,
    duktape2_0: false,
  },
},
{
  name: '__count__',
  spec: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/prototype',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/count',
  exec: function () {
    return typeof ({}).__count__ === 'number' &&
      ({ x: 1, y: 2 }).__count__ === 2;
    },
  res: {
    ie7: false,
    firefox2: true,
    firefox4: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: '__parent__',
  spec: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/Parent',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Parent',
  exec: function () {
    return typeof ({}).__parent__ !== 'undefined';
  },
  res: {
    ie7: false,
    firefox2: true,
    firefox4: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: '__noSuchMethod__',
  spec: 'https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/noSuchMethod',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/noSuchMethod',
  exec: function () {
    var o = { }, executed = false;
    o.__noSuchMethod__ = function () { executed = true; };
    try {
      o.__i_dont_exist();
    } catch (e) { }
    return executed;
  },
  res: {
    ie7: false,
    firefox2: true,
    firefox44: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Array generics',
  exec: function () {
    return typeof Array.slice === 'function' && Array.slice('abc').length === 3;
  },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'String generics',
  exec: function () {
    return typeof String.slice === 'function' && String.slice(123, 1) === "23";
  },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'Array comprehensions (JS 1.8 style)',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Predefined_Core_Objects#Array_comprehensions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions#Differences_to_the_older_JS1.7JS1.8_comprehensions',
  exec: function () {/*
    var obj = { 2: true, "foo": true, 4: true };
    var a = [i * 2 for (i in obj) if (i !== "foo")];
    return a instanceof Array && a[0] === 4 && a[1] === 8;
  */},
  res: {
    ie7: false,
    firefox2: true,
    firefox44: true,
    firefox46: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Array comprehensions (ES draft style)',
  significance: 'medium',
  spec: 'http://wiki.ecmascript.org/doku.php?id=harmony:array_comprehensions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions',
  exec: function () {/*
    return [for (a of [1, 2, 3]) a * a] + '' === '1,4,9';
  */},
  res: {
    firefox2: false,
    firefox30: true,
    opera7_5: false,
    duktape2_0: false,
  }
},
{
  name: 'Expression closures',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Expression_closures',
  exec: function () {/*
    return (function(x)x)(1) === 1;
  */},
  res: {
    ie7: false,
    firefox2: false,
    firefox3: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: true,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'ECMAScript for XML (E4X)',
  spec: 'https://developer.mozilla.org/en-US/docs/Archive/Web/E4X',
  mdn: 'https://developer.mozilla.org/en-US/docs/Archive/Web/E4X',
  exec: function () {/*
    return typeof <foo/> === "xml";
  */},
  res: {
    ie7: false,
    firefox2: true,
    firefox17: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: '"for each..in" loops',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for_each...in',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for_each...in',
  exec: function () {/*
    var str = '';
    for each (var item in {a: "foo", b: "bar", c: "baz"}) {
      str += item;
    }
    return str === "foobarbaz";
  */},
  res: {
    ie7: false,
    firefox2: true,
    firefox20: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Sharp variables',
  spec: 'https://developer.mozilla.org/en/Sharp_variables_in_JavaScript',
  mdn: 'https://developer.mozilla.org/en-US/docs/Archive/Web/Sharp_variables_in_JavaScript',
  exec: function () {/*
    var arr = #1=[1, #1#, 3];
    return arr[1] === arr;
  */},
  res: {
    ie7: false,
    firefox2: true,
    firefox12: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_50: false,
    konq4_4: null,
    konq4_9: false,
    besen: null,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'Iterator',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator',
  exec: function () {
    /* global Iterator */
    try {
      // jshint newcap:false
      var it = Iterator({ foo: 1, bar: 2 });
      // jshint newcap:true
      var keys = "";
      var values = 0;
      for (var pair in it) {
        keys   += pair[0];
        values += pair[1];
      }
      return keys === "foobar" && values === 3;
    }
    catch(e) {
      return false;
    }
  },
  res: {
    ie7: false,
    firefox2: true,
    firefox57: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: '__iterator__',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators',
  exec: function () {
    try {
      var x = 5;
      var iter = {
        next: function() {
          /* global StopIteration */
          if (x > 0) return { foo: --x };
          else throw StopIteration;
        }
      };
      var total = 0;
      // jshint iterator: true
      for (var item in { __iterator__: function() { return iter; }}) {
        total += item.foo;
      }
      // jshint iterator: false
      return total === 10;
    }
    catch(e) {
      return false;
    }
  },
  res: {
    ie7: false,
    firefox2: true,
    firefox57: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Generators (JS 1.8)',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators',
  exec:[{
      type: 'application/javascript;version=1.8',
      script: function () {
        global.test((function () {
          try {
            var g = eval('(function() { var a = yield "foo"; yield a + "baz";})')();
            var passed = g.next() === "foo";
            return passed && (g.send("bar") === "barbaz");
          }
          catch(e) {
            return false;
          }
        }()));
        global.__script_executed["generators"] = true;
      }
  },{
      script: function () {
        if (!global.__script_executed["generators"]) {
          global.test((function () {
            try {
              var g = eval('(function() { var a = yield "foo"; yield a + "baz";})')();
              var passed = g.next() === "foo";
              return passed && (g.send("bar") === "barbaz");
            }
            catch(e) {
              return false;
            }
          }()));
        }
      }
  }],
  res: {
    ie7: false,
    firefox2: false,
    firefox3: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  },
},
{
  name: 'Generator comprehensions (JS 1.8 style)',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generator_expressions',
  exec: function () {/*
    var obj = { 2: true, "foo": true, 4: true };
    var g = (i * 2 for (i in obj) if (i !== "foo"));
    return g.next() === 4 && g.next() === 8;
  */},
  res: {
    ie7: false,
    firefox2: false,
    firefox3: true,
    firefox46: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Generator comprehensions (ES draft style)',
  significance: 'medium',
  spec: 'http://wiki.ecmascript.org/doku.php?id=harmony:array_comprehensions',
  exec: function () {/*
    var iterator = (for (a of [1,2]) a + 4);
    var item = iterator.next();
    var passed = item.value === 5 && item.done === false;
    item = iterator.next();
    passed    &= item.value === 6 && item.done === false;
    item = iterator.next();
    passed    &= item.value === undefined && item.done === true;
    return passed;
  */},
  res: {
    firefox2: false,
    firefox30: true,
    opera7_5: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'RegExp "x" flag',
  exec: function () {
    try {
      var re = new RegExp('^ ( \\d+ ) \
                         ( \\w+ ) \
                         ( foo  )', 'x');
      return re.exec('23xfoo')[0] === '23xfoo';
    } catch (e) {
      return false;
    }
  },
  res: {
    ie7: false,
    firefox2: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10: true,
    opera10_10: true,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'RegExp "lastMatch"',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch',
  exec: function () {
    var re = /\w/;
    re.exec('x');
    return RegExp.lastMatch === 'x';
  },
  res: {
    ie7: true,
    firefox2: true,
    safari3_1: true,
    chrome7: true,
    opera7_5: false,
    opera10_10: false,
    opera10_50: true,
    konq4_4: true,
    besen: false,
    rhino1_7: true,
    phantom: true,
    android4_0: true,
    duktape2_0: false,
  }
},
{
  name: 'RegExp.$1-$9',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n',
  exec: function () {
    for (var i = 1; i < 10; i++) {
      if (!(('$' + i) in RegExp)) return false;
    }
    return true;
  },
  res: {
    ie7: true,
    firefox2: true,
    safari3_1: true,
    chrome7: true,
    opera7_5: true,
    opera10_10: true,
    konq4_4: true,
    besen: false,
    rhino1_7: true,
    phantom: true,
    android4_0: true,
    duktape2_0: false,
  }
},
{
  name: 'Callable RegExp',
  exec: function () {/*
    return /\\w/("x")[0] === "x";
  */},
  res: {
    ie7: false,
    firefox2: false,
    safari3_1: false,
    chrome7: true,
    opera7_5: false,
    opera10_10: true,
    chrome11: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'RegExp named groups',
  exec: function () {/*
    return /(?P<name>a)(?P=name)/.test("aa") &&
           !/(?P<name>a)(?P=name)/.test("")
  */},
  res: {
    ie7: false,
    firefox2: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10: true,
    opera10_50: true,
    konq4_4: null,
    konq4_9: true,
    besen: null,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'String.prototype.quote',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/quote',
  exec: function () { return typeof String.prototype.quote === 'function' },
  res: {
    ie7: false,
    firefox2: true,
    firefox37: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: null,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'String.prototype.replace flags',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Firefox-specific_notes',
  exec: function () { return 'foofoo'.replace('foo', 'bar', 'g') === 'barbar' },
  res: {
    firefox2: true,
    firefox49: false,
    opera7_5: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'Date.prototype.toLocaleFormat',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleFormat',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleFormat',
  exec: function () { return typeof Date.prototype.toLocaleFormat === 'function' },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
},
{
  name: 'Date.parse produces NaN for invalid dates',
  exec: function () {
    var brokenOnFirefox = !isNaN(Date.parse('2012-04-04T24:00:00.500Z'));
    var brokenOnIE10 = !isNaN(Date.parse('2012-12-31T24:01:00.000Z'));
    var brokenOnChrome = !isNaN(Date.parse('2011-02-29T12:00:00.000Z'));
    return !brokenOnFirefox && !brokenOnIE10 && !brokenOnChrome;
  },
  res: {
    firefox2: true,
    firefox3_6: false,
    firefox49: true,
    safari3_1: true,
    opera7_5: false,
    opera10_10: true,
    konq4_3: true,
    besen: true,
    rhino1_7: true,
    ejs: true,
    android4_0: true,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'Object.prototype.watch',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch',
  exec: function () { return typeof Object.prototype.watch == 'function' },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera10_10: false,
    opera7_5: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Object.prototype.unwatch',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/unwatch',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/unwatch',
  exec: function () { return typeof Object.prototype.unwatch == 'function' },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'Object.prototype.eval',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/eval',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/eval',
  exec: function () { return typeof Object.prototype.eval == 'function' },
  res: {
    ie7: false,
    firefox2: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: true,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
},
{
  name: 'Object.observe',
  spec: 'https://arv.github.io/ecmascript-object-observe/',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe',
  exec: function () {/*
    return typeof Object.observe == 'function';
  */},
  res: {
    firefox2: false,
    chrome36: true,
    chrome49: false,
    opera7_5: false,
    node0_10: true,
    android5_0: true,
    duktape2_0: false,
  },
  separator: 'after'
},
{
  name: 'error "stack"',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack',
  exec: function () {
    try {
      throw new Error();
    } catch (err) {
      return 'stack' in err;
    }
  },
  res: {
    ie7: false,
    ie11: true,
    firefox2: true,
    safari3_1: false,
    safari7_1: true,
    chrome7: true,
    opera7_5: false,
    opera10_10: false,
    opera10_50: true,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    android4_0: true,
    duktape2_0: true,
  }
},
{
  name: 'error "lineNumber"',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber',
  exec: function () {
    return 'lineNumber' in new Error();
  },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: true,
  }
},
{
  name: 'error "columnNumber"',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber',
  exec: function () {
    return 'columnNumber' in new Error();
  },
  res: {
    ie7: false,
    firefox2: false,
    firefox17: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  }
},
{
  name: 'error "fileName"',
  spec: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName',
  exec: function () {
    return 'fileName' in new Error();
  },
  res: {
    ie7: false,
    firefox2: true,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: true,
    phantom: false,
    duktape2_0: true,
  }
},
{
  name: 'error "description"',
  spec: 'http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx',
  exec: function () {
    return 'description' in new Error();
  },
  res: {
    ie7: true,
    firefox2: false,
    safari3_1: false,
    chrome7: false,
    opera7_5: false,
    opera10_10: false,
    konq4_4: false,
    besen: false,
    rhino1_7: false,
    phantom: false,
    duktape2_0: false,
  },
  separator: 'after'
}
];
