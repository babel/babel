var util = require('./data-common');

var babel = util.babel;
var typescript = util.typescript;
var chrome = util.chrome;

exports.name = 'ES6';
exports.target_file = 'es6/index.html';
exports.skeleton_file = 'es6/skeleton.html';

exports.tests = [
{
  name: 'proper tail calls (tail call optimisation)',
  category: 'optimisation',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls',
  subtests: [
    {
      name: 'direct recursion',
      exec: function() {/*
        "use strict";
        return (function f(n){
          if (n <= 0) {
            return  "foo";
          }
          return f(n - 1);
        }(1e6)) === "foo";
      */},
      res: {
        tr: {
          val: "flagged",
          note_id: 'tr-tco',
          note_html: 'Requires the <code>properTailCalls</code> compile option.'
        },
        babel: false,
        typescript: typescript.fallthrough,
        firefox2: false,
        chrome51: chrome.harmony,
        chrome58: chrome.tco,
        chrome61: false,
        safari10: true,
        xs6: true,
        duktape2_0: true,
      },
    },
    {
      name: 'mutual recursion',
      exec: function() {/*
        "use strict";
        function f(n){
          if (n <= 0) {
            return  "foo";
          }
          return g(n - 1);
        }
        function g(n){
          if (n <= 0) {
            return  "bar";
          }
          return f(n - 1);
        }
        return f(1e6) === "foo" && f(1e6+1) === "bar";
      */},
      res: {
        tr: { val: "flagged", note_id: 'tr-tco' },
        typescript: typescript.fallthrough,
        firefox2: false,
        chrome51: chrome.harmony,
        chrome58: chrome.tco,
        chrome61: false,
        safari10: true,
        xs6: true,
        duktape2_0: true,
      },
    }
  ]
},
{
  name: 'arrow functions',
  category: 'functions',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
  subtests: [
    {
      name: '0 parameters',
      exec: function(){/*
        return (() => 5)() === 5;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome38: "flagged",
        chrome40: false,
        chrome45: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: '1 parameter, no brackets',
      exec: function(){/*
        var b = x => x + "foo";
        return (b("fee fie foe ") === "fee fie foe foo");
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome38: "flagged",
        chrome40: false,
        chrome45: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'multiple parameters',
      exec: function(){/*
        var c = (v, w, x, y, z) => "" + v + w + x + y + z;
        return (c(6, 5, 4, 3, 2) === "65432");
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome38: "flagged",
        chrome40: false,
        chrome45: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'lexical "this" binding',
      exec: function(){/*
        var d = { x : "bar", y : function() { return z => this.x + z; }}.y();
        var e = { x : "baz", y : d };
        return d("ley") === "barley" && e.y("ley") === "barley";
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome45: true,
        safari10: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: '"this" unchanged by call or apply',
      exec: function(){/*
        var d = { x : "foo", y : function() { return () => this.x; }};
        var e = { x : "bar" };
        return d.y().call(e) === "foo" && d.y().apply(e) === "foo";
      */},
      res: {
        tr: true,
        closure: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome45: true,
        safari10: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'can\'t be bound, can be curried',
      exec: function(){/*
        var d = { x : "bar", y : function() { return z => this.x + z; }};
        var e = { x : "baz" };
        return d.y().bind(e, "ley")() === "barley";
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome45: true,
        safari10: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'lexical "arguments" binding',
      exec: function(){/*
        var f = (function() { return z => arguments[0]; }(5));
        return f(6) === 5;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        firefox24: false,
        firefox43: true,
        chrome45: true,
        node4: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'no line break between params and <code>=></code>',
      exec: function(){/*
        return (() => {
          try { Function("x\n => 2")(); } catch(e) { return true; }
        })();
      */},
      res: {
        babel: true,
        closure: true,
        tr: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox39: true,
        safari10: true,
        chrome45: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct precedence',
      exec: function(){/*
        return (() => {
          try { Function("0 || () => 2")(); } catch(e) { return true; }
        })();
      */},
      res: {
        closure: true,
        tr: true,
        firefox2: false,
        firefox22: true,
        safari10: true,
        chrome47: true,
        node6: true,
        node6_5: true,
        edge13: true,
        xs6: false,
        duktape2_0: false,
      },
    },
    {
      name: 'no "prototype" property',
      exec: function(){/*
        var a = () => 5;
        return !a.hasOwnProperty("prototype");
      */},
      res: {
        firefox2: false,
        firefox22: true,
        chrome39: "flagged",
        chrome40: false,
        chrome45: true,
        edge13: true,
        safari10: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'lexical "super" binding in constructors',
      exec: function(){/*
        var received;

        class B {
          constructor (arg) {
            received = arg;
          }
        }
        class C extends B {
          constructor () {
            var callSuper = () => super('foo');
            callSuper();
          }
        }
        return new C instanceof C && received === 'foo'
      */},
      res: {
        tr: true,
        babel: false,
        closure: false,
        es6tr: true,
        jsx: true,
        typescript: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'lexical "super" binding in methods',
      exec: function(){/*
        class B {
          qux() {
            return "quux";
          }
        }
        class C extends B {
          baz() {
            return x => super.qux();
          }
        }
        var arrow = new C().baz();
        return arrow() === "quux";
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'lexical "new.target" binding',
      exec: function(){/*
        function C() {
          return x => new.target;
        }
        return new C()() === C && C()() === undefined;
      */},
      res: {
        firefox2: false,
        firefox41: true,
        chrome46: true,
        edge13: true,
        node5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
        duktape2_2: true,
      },
    },
  ],
},
{
  name: 'const',
  category: 'bindings',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
  subtests: [
    {
      name: 'basic support',
      exec: function() {/*
        const foo = 123;
        return (foo === 123);
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox3: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_4: true,
        duktape2_0: true,
      }
    },
    {
      name: 'is block-scoped',
      exec: function() {/*
        const bar = 123;
        { const bar = 456; }
        return bar === 123;
      */},
      res: {
        babel: true,
        typescript: true,
        es6tr: true,
        tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox36: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'cannot be in statements',
      exec: function() {/*
        const bar = 1;
        try {
          Function("if(true) const baz = 1;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: true,
        typescript: true,
        es6tr: true,
        tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox36: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'redefining a const is an error',
      exec: function() {/*
        const baz = 1;
        try {
          Function("const foo = 1; foo = 2;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox36: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'for loop statement scope',
      exec: function(){/*
       const baz = 1;
       for(const baz = 0; false;) {}
       return baz === 1;
       */},
      res: {
        tr: true,
        ejs: true,
        es6tr: true,
        babel: true,
        typescript: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox36: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for-in loop iteration scope',
      exec: function(){/*
        var scopes = [];
        for(const i in { a:1, b:1 }) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for-of loop iteration scope',
      exec: function(){/*
        var scopes = [];
        for(const i of ['a','b']) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'temporal dead zone',
      exec: function(){/*
        var passed = (function(){ try { qux; } catch(e) { return true; }}());
        function fn() { passed &= qux === 456; }
        const qux = 456;
        fn();
        return passed;
      */},
      res: {
        babel: "flagged",
        ie11: true,
        firefox2: false,
        firefox36: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'basic support (strict mode)',
      exec: function() {/*
        "use strict";
        const foo = 123;
        return (foo === 123);
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox3: true,
        chrome5: "flagged",
        chrome41: true,
        safari3_1: true,
        safari5_1: false,
        safari10: true,
        opera10_50: true,
        konq4_14: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      }
    },
    {
      name: 'is block-scoped (strict mode)',
      exec: function() {/*
        'use strict';
        const bar = 123;
        { const bar = 456; }
        return bar === 123;
      */},
      res: {
        babel: true,
        typescript: true,
        es6tr: true,
        tr: true,
        ejs: true,
        closure: true,
        chrome19 : "flagged",
        chrome41: true,
        ie11: true,
        firefox2: false,
        firefox36: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'cannot be in statements (strict mode)',
      exec: function() {/*
        'use strict';
        const bar = 1;
        try {
          Function("'use strict'; if(true) const baz = 1;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: true,
        typescript: true,
        es6tr: true,
        tr: true,
        ejs: true,
        closure: true,
        chrome19 : "flagged",
        chrome41: true,
        ie11: true,
        firefox2: false,
        firefox36: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'redefining a const (strict mode)',
      exec: function() {/*
        'use strict';
        const baz = 1;
        try {
          Function("'use strict'; const foo = 1; foo = 2;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox7: true,
        chrome21dev: "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'for loop statement scope (strict mode)',
      exec: function(){/*
        'use strict';
        const baz = 1;
        for(const baz = 0; false;) {}
        return baz === 1;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        typescript: true,
        es6tr: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox36: true,
        chrome19 : "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for-in loop iteration scope (strict mode)',
      exec: function(){/*
        'use strict';
        var scopes = [];
        for(const i in { a:1, b:1 }) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        chrome40: "flagged",
        chrome41: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for-of loop iteration scope (strict mode)',
      exec: function(){/*
        'use strict';
        var scopes = [];
        for(const i of ['a','b']) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        chrome40: "flagged",
        chrome41: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'temporal dead zone (strict mode)',
      exec: function(){/*
        'use strict';
        var passed = (function(){ try { qux; } catch(e) { return true; }}());
        function fn() { passed &= qux === 456; }
        const qux = 456;
        fn();
        return passed;
      */},
      res: {
        babel: "flagged",
        ie11: true,
        firefox2: false,
        firefox36: true,
        chrome19 : "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ]
},
{
  name: 'let',
  category: 'bindings',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let',
  subtests: [
    {
      name: 'basic support',
      exec: function(){/*
        let foo = 123;
        return (foo === 123);
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: {
          val: "flagged",
          note_id: 'fx-let',
          note_html: 'Available for code in a <code>&lt;script type="application/javascript;version=1.7"></code> (or <code>version=1.8</code>) tag.'
        },
        firefox44: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'is block-scoped',
      exec: function(){/*
        let bar = 123;
        { let bar = 456; }
        return bar === 123;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'cannot be in statements',
      exec: function(){/*
        let bar = 1;
        try {
          Function("if(true) let baz = 1;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for loop statement scope',
      exec: function(){/*
        let baz = 1;
        for(let baz = 0; false;) {}
        return baz === 1;
      */},
      res: {
        tr: true,
        ejs: true,
        es6tr: true,
        babel: true,
        typescript: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'temporal dead zone',
      exec: function(){/*
        var passed = (function(){ try {  qux; } catch(e) { return true; }}());
        function fn() { passed &= qux === 456; }
        let qux = 456;
        fn();
        return passed;
      */},
      res: {
        babel: "flagged",
        ie11: true,
        firefox2: false,
        firefox35: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for/for-in loop iteration scope',
      exec: function(){/*
        let scopes = [];
        for(let i = 0; i < 2; i++) {
          scopes.push(function(){ return i; });
        }
        let passed = (scopes[0]() === 0 && scopes[1]() === 1);

        scopes = [];
        for(let i in { a:1, b:1 }) {
          scopes.push(function(){ return i; });
        }
        passed &= (scopes[0]() === "a" && scopes[1]() === "b");
        return passed;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'basic support (strict mode)',
      exec: function(){/*
        'use strict';
        let foo = 123;
        return (foo === 123);
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        chrome19 : "flagged",
        chrome41: true,
        node0_12: "flagged",
        node4: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let' },
        firefox44: true,
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'is block-scoped (strict mode)',
      exec: function(){/*
        'use strict';
        let bar = 123;
        { let bar = 456; }
        return bar === 123;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        chrome19 : "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'cannot be in statements (strict mode)',
      exec: function(){/*
        'use strict';
        let bar = 1;
        try {
          Function("'use strict'; if(true) let baz = 1;")();
        } catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        safari10: true,
        chrome19 : "flagged",
        chrome41: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for loop statement scope (strict mode)',
      exec: function(){/*
        'use strict';
        let baz = 1;
        for(let baz = 0; false;) {}
        return baz === 1;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        typescript: true,
        es6tr: true,
        closure: true,
        ie11: true,
        firefox2: false,
        firefox4: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        chrome19 : "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'temporal dead zone (strict mode)',
      exec: function(){/*
        'use strict';
        var passed = (function(){ try {  qux; } catch(e) { return true; }}());
        function fn() { passed &= qux === 456; }
        let qux = 456;
        fn();
        return passed;
      */},
      res: {
        babel: "flagged",
        ie11: true,
        firefox2: false,
        firefox35: { val: "flagged", note_id: 'fx-let', },
        firefox44: true,
        chrome19 : "flagged",
        chrome41: true,
        safari10: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'for/for-in loop iteration scope (strict mode)',
      exec: function(){/*
        'use strict';
        let scopes = [];
        for(let i = 0; i < 2; i++) {
          scopes.push(function(){ return i; });
        }
        let passed = (scopes[0]() === 0 && scopes[1]() === 1);

        scopes = [];
        for(let i in { a:1, b:1 }) {
          scopes.push(function(){ return i; });
        }
        passed &= (scopes[0]() === "a" && scopes[1]() === "b");
        return passed;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        closure: true,
        chrome37: "flagged",
        chrome41: true,
        safari10: true,
        edge14: true,
        firefox2: false,
        firefox51: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'default function parameters',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters',
  subtests: [
    {
      name: 'basic functionality',
      exec: function(){/*
        return (function (a = 1, b = 2) { return a === 3 && b === 2; }(3));
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox15: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        edge12: "flagged",
        edge14: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'explicit undefined defers to the default',
      exec: function(){/*
        return (function (a = 1, b = 2) { return a === 1 && b === 3; }(undefined, 3));
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox18: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        edge12: "flagged",
        edge14: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults can refer to previous params',
      exec: function(){/*
        return (function (a, b = a) { return b === 5; }(5));
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox15: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        edge12: "flagged",
        edge14: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'arguments object interaction',
      exec: function(){/*
        return (function (a = "baz", b = "qux", c = "quux") {
          a = "corge";
          // The arguments object is not mapped to the
          // parameters, even outside of strict mode.
          return arguments.length === 2
            && arguments[0] === "foo"
            && arguments[1] === "bar";
        }("foo", "bar"));
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        safari10: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox43: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'temporal dead zone',
      exec: function(){/*
        return (function(x = 1) {
          try {
            eval("(function(a=a){}())");
            return false;
          } catch(e) {}
          try {
            eval("(function(a=b,b){}())");
            return false;
          } catch(e) {}
          return true;
        }());
      */},
      res: {
        babel: false,
        closure: true,
        typescript: true,
        safari10: true,
        edge12: "flagged",
        edge14: true,
        firefox2: false,
        firefox51: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'separate scope',
      exec: function(){/*
        return (function(a=function(){
          return typeof b === 'undefined';
        }){
          var b = 1;
          return a();
        }());
      */},
      res: {
        babel: false,
        closure: true,
        safari10: true,
        edge12: "flagged",
        edge14: true,
        firefox2: false,
        firefox51: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'new Function() support',
      exec: function() {/*
        return new Function("a = 1", "b = 2",
          "return a === 3 && b === 2;"
        )(3);
      */},
      res: {
        typescript: typescript.fallthrough,
        safari10: true,
        chrome48: "flagged",
        chrome49: true,
        node6: true,
        node6_5: true,
        edge12: "flagged",
        edge14: true,
        firefox2: false,
        firefox53: true,
        xs6: true,
        ejs: { val: false, note_id: 'ejs-no-function-ctor' },
        duktape2_0: false,
      },
    },
  ]
},
{
  name: 'rest parameters',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters',
  subtests: [
    {
      name: 'basic functionality',
      exec: function() {/*
        return (function (foo, ...args) {
          return args instanceof Array && args + "" === "bar,baz";
        }("foo", "bar", "baz"));
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        jsx: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox15: true,
        chrome44: "flagged",
        chrome47: true,
        node4: "flagged",
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'function \'length\' property',
      exec: function() {/*
        return function(a, ...b){}.length === 1 && function(...c){}.length === 0;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox15: true,
        chrome44: "flagged",
        chrome47: true,
        node4: "flagged",
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'arguments object interaction',
      exec: function() {/*
        return (function (foo, ...args) {
          foo = "qux";
          // The arguments object is not mapped to the
          // parameters, even outside of strict mode.
          return arguments.length === 3
            && arguments[0] === "foo"
            && arguments[1] === "bar"
            && arguments[2] === "baz";
        }("foo", "bar", "baz"));
      */},
      res: {
        babel: true,
        typescript: true,
        tr: true,
        ejs: true,
        chrome44: "flagged",
        chrome47: true,
        edge12: true,
        node4: "flagged",
        node6: true,
        node6_5: true,
        firefox2: false,
        firefox43: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'can\'t be used in setters',
      exec: function() {/*
        return (function (...args) {
          try {
            eval("({set e(...args){}})");
          } catch(e) {
            return true;
          }
        }());
      */},
      res: {
        babel: false,
        tr: true,
        ejs: true,
        closure: true,
        jsx: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox38: true,
        chrome47: true,
        node4: "flagged",
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'new Function() support',
      exec: function() {/*
        return new Function("a", "...b",
          "return b instanceof Array && a+b === 'foobar,baz';"
        )('foo','bar','baz');
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox15: true,
        chrome44: "flagged",
        chrome47: true,
        node4: "flagged",
        node6: true,
        node6_5: true,
        xs6: true,
        ejs: { val: false, note_id: 'ejs-no-function-ctor' },
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'spread (...) operator',
  category: 'syntax',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator',
  subtests: [
    {
      name: 'with arrays, in function calls',
      exec: function () {/*
        return Math.max(...[1, 2, 3]) === 3
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox27: true,
        safari7_1: true,
        chrome44: "flagged",
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with arrays, in array literals',
      exec: function() {/*
       return [...[1, 2, 3]][2] === 3;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox16: true,
        safari7_1: true,
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays, in function calls',
      exec: function () {/*
        var a = Array(...[,,]);
        return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox27: true,
        safari7_1: true,
        chrome44: "flagged",
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays, in array literals',
      exec: function() {/*
        var a = [...[,,]];
        return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";
      */},
      res: {
        tr: true,
        firefox2: false,
        firefox16: true,
        safari7_1: true,
        chrome46: true,
        node4: "flagged",
        node5: true,
        edge13: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with strings, in function calls',
      exec: function() {/*
       return Math.max(..."1234") === 4;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: babel.corejs,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox27: true,
        chrome44: "flagged",
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with strings, in array literals',
      exec: function() {/*
       return ["a", ..."bcd", "e"][3] === "d";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox17: true,
        safari9: true,
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings, in function calls',
      exec: function() {/*
       return Array(..."𠮷𠮶")[0] === "𠮷";
      */},
      res: {
        tr: true,
        ejs: true,
        babel: babel.corejs,
        firefox2: false,
        firefox27: true,
        chrome44: "flagged",
        chrome46: true,
        edge12: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings, in array literals',
      exec: function() {/*
       return [..."𠮷𠮶"][0] === "𠮷";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        firefox2: false,
        firefox27: true,
        safari9: true,
        edge12: true,
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances, in calls',
      exec: function () {/*
        var iterable = (function*(){ yield 1; yield 2; yield 3; }());
        return Math.max(...iterable) === 3;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        firefox2: false,
        firefox27: true,
        chrome44: "flagged",
        chrome46: true,
        edge12: "flagged",
        node4: "flagged",
        edge13: true,
        node5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances, in arrays',
      exec: function () {/*
        var iterable = (function*(){ yield "b"; yield "c"; yield "d"; }());
        return ["a", ...iterable, "e"][3] === "d";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome46: true,
        edge12: "flagged",
        node4: "flagged",
        edge13: true,
        node5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables, in calls',
      exec: function () {/*
        var iterable = global.__createIterableObject([1, 2, 3]);
        return Math.max(...iterable) === 3;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        es6tr: {
          val: true,
          note_id: 'compiler-iterable',
          note_html: 'This compiler requires generic iterables have either a <code>Symbol.iterator</code> or non-standard <code>"@@iterator"</code> method.'
        },
        ejs: true,
        firefox2: false,
        firefox36: true,
        chrome44: "flagged",
        chrome46: true,
        edge12: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables, in arrays',
      exec: function () {/*
        var iterable = global.__createIterableObject(["b", "c", "d"]);
        return ["a", ...iterable, "e"][3] === "d";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        es6tr: { val: true, note_id: 'compiler-iterable' },
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of iterables, in calls',
      exec: function () {/*
        var iterable = global.__createIterableObject([1, 2, 3]);
        return Math.max(...Object.create(iterable)) === 3;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        es6tr: { val: true, note_id: 'compiler-iterable' },
        firefox2: false,
        firefox36: true,
        chrome44: "flagged",
        chrome46: true,
        edge12: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of iterables, in arrays',
      exec: function () {/*
        var iterable = global.__createIterableObject(["b", "c", "d"]);
        return ["a", ...Object.create(iterable), "e"][3] === "d";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        es6tr: { val: true, note_id: 'compiler-iterable' },
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome46: true,
        safari9: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'spreading non-iterables is a runtime error',
      exec: function () {/*
        try {
          Math.max(...2);
        } catch(e) {
          return Math.max(...[1, 2, 3]) === 3;
        }
      */},
      res: {
        tr: true,
        closure: true,
        typescript: true,
        es6tr: true,
        edge12: true,
        firefox2: false,
        firefox27: true,
        safari7_1: true,
        chrome44: "flagged",
        chrome46: true,
        node4: "flagged",
        node5: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ]
},
{
  name: 'class',
  category: 'functions',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes',
  subtests: [
    {
      name: 'class statement',
      exec: function () {/*
        class C {}
        return typeof C === "function";
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        jsx: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        typescript: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'is block-scoped',
      exec: function () {/*
        class C {}
        var c1 = C;
        {
          class C {}
          var c2 = C;
        }
        return C === c1;
      */},
      res: {
        babel: true,
        typescript: true,
        jsx: true,
        closure: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class expression',
      exec: function () {/*
        return typeof class C {} === "function";
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'anonymous class',
      exec: function () {/*
        return typeof class {} === "function";
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor',
      exec: function () {/*
        class C {
          constructor() { this.x = 1; }
        }
        return C.prototype.constructor === C
          && new C().x === 1;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'prototype methods',
      exec: function () {/*
        class C {
          method() { return 2; }
        }
        return typeof C.prototype.method === "function"
          && new C().method() === 2;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'string-keyed methods',
      exec: function () {/*
        class C {
          "foo bar"() { return 2; }
        }
        return typeof C.prototype["foo bar"] === "function"
          && new C()["foo bar"]() === 2;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed prototype methods',
      exec: function () {/*
        var foo = "method";
        class C {
          [foo]() { return 2; }
        }
        return typeof C.prototype.method === "function"
          && new C().method() === 2;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'optional semicolons',
      exec: function () {/*
        class C {
          ;
          method() { return 2; };
          method2() { return 2; }
          method3() { return 2; };
        }
        return typeof C.prototype.method === "function"
          && typeof C.prototype.method2 === "function"
          && typeof C.prototype.method3 === "function";
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'static methods',
      exec: function () {/*
        class C {
          static method() { return 3; }
        }
        return typeof C.method === "function"
          && C.method() === 3;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed static methods',
      exec: function () {/*
        var foo = "method";
        class C {
          static [foo]() { return 3; }
        }
        return typeof C.method === "function"
          && C.method() === 3;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'accessor properties',
      exec: function () {/*
        var baz = false;
        class C {
          get foo() { return "foo"; }
          set bar(x) { baz = x; }
        }
        new C().bar = true;
        return new C().foo === "foo" && baz;
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        typescript: true,
        jsx: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed accessor properties',
      exec: function () {/*
        var garply = "foo", grault = "bar", baz = false;
        class C {
          get [garply]() { return "foo"; }
          set [grault](x) { baz = x; }
        }
        new C().bar = true;
        return new C().foo === "foo" && baz;
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'static accessor properties',
      exec: function () {/*
        var baz = false;
        class C {
          static get foo() { return "foo"; }
          static set bar(x) { baz = x; }
        }
        C.bar = true;
        return C.foo === "foo" && baz;
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        typescript: true,
        jsx: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed static accessor properties',
      exec: function () {/*
        var garply = "foo", grault = "bar", baz = false;
        class C {
          static get [garply]() { return "foo"; }
          static set [grault](x) { baz = x; }
        }
        C.bar = true;
        return C.foo === "foo" && baz;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class name is lexically scoped',
      exec: function () {/*
        class C {
          method() { return typeof C === "function"; }
        }
        var M = C.prototype.method;
        C = undefined;
        return C === undefined && M();
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        typescript: true,
        es6tr: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed names, temporal dead zone',
      exec: function () {/*
        try {
          var B = class C {
            [C](){}
          }
        } catch(e) {
          return true;
        }
      */},
      res: {
        typescript: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'methods aren\'t enumerable',
      exec: function () {/*
        class C {
          foo() {}
          static bar() {}
        }
        return !C.prototype.propertyIsEnumerable("foo") && !C.propertyIsEnumerable("bar");
      */},
      res: {
        babel: true,
        ejs: true,
        jsx: true,
        chrome42: "strict",
        chrome49: true,
        safari9: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'implicit strict mode',
      exec: function () {/*
        class C {
          static method() { return this === undefined; }
        }
        return (0,C.method)();
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        class C {}
        try {
          C();
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        babel: true,
        safari9: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'extends',
      exec: function () {/*
        class B {}
        class C extends B {}
        return new C() instanceof B
          && B.isPrototypeOf(C);
      */},
      res: {
        es6tr: {
          val: false,
          note_id: 'compiler-proto',
          note_html: 'Requires native support for <code>Object.prototype.__proto__</code>',
        },
        babel: { val: false, note_id: 'compiler-proto' },
        tr: { val: false, note_id: 'compiler-proto' },
        typescript: {
          val: false,
          note_id: 'typescript-extends',
          note_html: 'TypeScript transforms <code>extends</code> into code that copies static properties from the superclass (but uses the prototype chain for instance properties).'},
        ejs: true,
        closure: {
          val: false,
          note_id: 'compiled-extends',
          note_html: 'This compiler transforms <code>extends</code> into code that uses native <code>Object.prototype.__proto__</code> or copies properties from the superclass, instead of using the prototype chain.'
        },
        jsx: { val: false, note_id: 'compiled-extends' },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'extends expressions',
      exec: function () {/*
        var B;
        class C extends (B = class {}) {}
        return new C() instanceof B
          && B.isPrototypeOf(C);
      */},
      res: {
        es6tr: { val: false, note_id: 'compiler-proto' },
        babel: { val: false, note_id: 'compiler-proto' },
        tr: { val: false, note_id: 'compiler-proto' },
        typescript: {
          val: false,
          note_id: 'typescript-extends',
        },
        ejs: true,
        jsx: { val: false, note_id: 'compiled-extends' },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'extends null',
      exec: function () {/*
        class C extends null {
          constructor() { return Object.create(null); }
        }
        return Function.prototype.isPrototypeOf(C)
          && Object.getPrototypeOf(C.prototype) === null;
      */},
      res: {
        babel: false,
        typescript: true,
        tr: true,
        es6tr: true,
        jsx: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'new.target',
      exec: function () {/*
        var passed = false;
        new function f() {
          passed = new.target === f;
        }();

        class A {
          constructor() {
            passed &= new.target === B;
          }
        }
        class B extends A {}
        new B();
        return passed;
      */},
      res: {
        safari10: true,
        chrome46: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'super',
  category: 'functions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super',
  subtests: [
    {
      name: 'statement in constructors',
      exec: function() {/*
        var passed = false;
        class B {
          constructor(a) { passed = (a === "barbaz"); }
        }
        class C extends B {
          constructor(a) { super("bar" + a); }
        }
        new C("baz");
        return passed;
      */},
      res: {
        tr: true,
        babel: false,
        jsx: true,
        typescript: true,
        closure: true,
        es6tr: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'expression in constructors',
      exec: function() {/*
        class B {
          constructor(a) { return ["foo" + a]; }
        }
        class C extends B {
          constructor(a) { return super("bar" + a); }
        }
        return new C("baz")[0] === "foobarbaz";
      */},
      res: {
        tr: true,
        babel: false,
        jsx: true,
        typescript: true,
        closure: true,
        es6tr: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        safari9: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'in methods, property access',
      exec: function() {/*
        class B {}
        B.prototype.qux = "foo";
        B.prototype.corge = "baz";
        class C extends B {
          quux(a) { return super.qux + a + super["corge"]; }
        }
        C.prototype.qux = "garply";
        return new C().quux("bar") === "foobarbaz";
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        jsx: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'in methods, method calls',
      exec: function() {/*
        class B {
          qux(a) { return "foo" + a; }
        }
        class C extends B {
          qux(a) { return super.qux("bar" + a); }
        }
        return new C().qux("baz") === "foobarbaz";
      */},
      res: {
        tr: true,
        babel: true,
        jsx: true,
        typescript: true,
        closure: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'method calls use correct "this" binding',
      exec: function() {/*
        class B {
          qux(a) { return this.foo + a; }
        }
        class C extends B {
          qux(a) { return super.qux("bar" + a); }
        }
        var obj = new C();
        obj.foo = "foo";
        return obj.qux("baz") === "foobarbaz";
      */},
      res: {
        tr: true,
        babel: true,
        jsx: true,
        typescript: true,
        closure: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor calls use correct "new.target" binding',
      exec: function() {/*
        var passed;
        class B {
          constructor() { passed = (new.target === C); }
        }
        class C extends B {
          constructor() { super(); }
        }
        new C();
        return passed;
      */},
      res: {
        safari10: true,
        chrome46: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        duktape2_0: false,
      },
    },
    {
      name: 'is statically bound',
      exec: function() {/*
        class B {
          qux() { return "bar"; }
        }
        class C extends B {
          qux() { return super.qux() + this.corge; }
        }
        var obj = {
          qux: C.prototype.qux,
          corge: "ley"
        };
        return obj.qux() === "barley";
      */},
      res: {
        tr: true,
        babel: true,
        jsx: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'super() invokes the correct constructor',
      exec: function() {/*
        // checks that super() is *not* a synonym of super.constructor()
        var passed;
        class B {
            constructor() {
                passed = true;
            }
        };
        B.prototype.constructor = function () {
            passed = false;
        };
        class C extends B { };
        new C;
        return passed;
      */},
      res: {
        closure: true,
        node4: "strict",
        chrome41: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        tr: true,
        ejs: true,
        jsx: true,
        es6tr: true,
        typescript: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'object literal extensions',
  category: 'syntax',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-object-initialiser',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015',
  subtests: [
    {
      name: 'computed properties',
      exec: function() {/*
        var x = 'y';
        return ({ [x]: 1 }).y === 1;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        jsx: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        safari7_1: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'shorthand properties',
      exec: function () {/*
        var a = 7, b = 8, c = {a,b};
        return c.a === 7 && c.b === 8;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        chrome41: "flagged",
        chrome43: true,
        node4: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'shorthand methods',
      exec: function() {/*
        return ({ y() { return 2; } }).y() === 2;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox34: { val: true, note_id: "ff-shorthand-methods", note_html: 'Firefox incorrectly produces an error in strict mode if the method is named <code>"arguments"</code>, <code>"eval"</code>, or <code>"delete"</code>.' },
        chrome41: "flagged",
        chrome43: true,
        node4: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'string-keyed shorthand methods',
      exec: function() {/*
        return ({ "foo bar"() { return 4; } })["foo bar"]() === 4;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: false,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome41: "flagged",
        chrome43: true,
        node4: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'computed shorthand methods',
      exec: function() {/*
        var x = 'y';
        return ({ [x](){ return 1 } }).y() === 1;
      */},
      res: {
        edge12: true,
        tr: true,
        closure: true,
        babel: true,
        ejs: true,
        typescript: true,
        jsx: true,
        es6tr: true,
        firefox2: false,
        firefox34: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'computed accessors',
      exec: function() {/*
        var x = 'y',
            valueSet,
            obj = {
              get [x] () { return 1 },
              set [x] (value) { valueSet = value }
            };
        obj.y = 'foo';
        return obj.y === 1 && valueSet === 'foo';
      */},
      res: {
        babel: true,
        typescript: true,
        edge12: true,
        tr: true,
        es6tr: true,
        firefox2: false,
        firefox34: true,
        chrome44: true,
        node4: true,
        safari10: true,
        xs6: true,
        duktape2_0: false,
      }
    }
  ]
},
{
  name: 'non-strict function semantics',
  note_id: 'hoisted-block-functions',
  note_html: 'The 2015 version of the specification contains <a href="https://esdiscuss.org/topic/block-level-function-declarations-web-legacy-compatibility-bug">multiple bugs</a> for hoisted block-level function declaration semantics, which these tests disregard.',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-labelled-function-declarations',
  subtests: [
    {
      name: 'hoisted block-level function declaration',
      exec: function () {/*
        // Note: only available outside of strict mode.
        if (!this) return false;
        var passed = f() === 1;
        function f() { return 1; }

        passed &= typeof g === 'undefined';
        { function g() { return 1; } }
        passed &= g() === 1;

        passed &= h() === 2;
        { function h() { return 1; } }
        function h() { return 2; }
        passed &= h() === 1;

        return passed;
      */},
      res: {
        ie11: true,
        firefox2: false,
        firefox3_5: true,
        rhino1_7: true,
        chrome49: true,
        jxa: true,
        safari10: true,
        opera10_50: false,
        duktape2_0: false,
      },
    },
    {
      name: 'labeled function statements',
      exec: function() {/*
        // Note: only available outside of strict mode.
        if (!this) return false;

        label: function foo() { return 2; }
        return foo() === 2;
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari4: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'function statements in if-statement clauses',
      exec: function() {/*
        // Note: only available outside of strict mode.
        if (!this) return false;

        if(true) function foo() { return 2; }
        if(false) {} else function bar() { return 3; }
        if(true) function baz() { return 4; } else {}
        if(false) function qux() { return 5; } else function qux() { return 6; }
        return foo() === 2 && bar() === 3 && baz() === 4 && qux() === 6;
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari4: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: '__proto__ in object literals',
  category: 'annex b',
  significance: 'tiny',
  note_id: 'proto-in-object-literals',
  note_html: 'Note that this is distinct from the existence or functionality of <code>Object.prototype.__proto__</code>.',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Specifications',
  subtests: [
    {
      name: 'basic support',
      exec: function() {/*
        return { __proto__ : [] } instanceof Array
          && !({ __proto__ : null } instanceof Object);
      */},
      res: {
        ie11: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'multiple __proto__ is an error',
      exec: function() {/*
        try {
          eval("({ __proto__ : [], __proto__: {} })");
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome42: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'not a computed property',
      exec: function() {/*
        if (!({ __proto__ : [] } instanceof Array)) {
          return false;
        }
        var a = "__proto__";
        return !({ [a] : [] } instanceof Array);
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox34: true,
        safari7_1: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'not a shorthand property',
      exec: function() {/*
        if (!({ __proto__ : [] } instanceof Array)) {
          return false;
        }
        var __proto__ = [];
        return !({ __proto__ } instanceof Array);
      */},
      res: {
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome42: true,
        node4: true,
        edge13: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'not a shorthand method',
      exec: function() {/*
        if (!({ __proto__ : [] } instanceof Array)) {
          return false;
        }
        return !({ __proto__(){} } instanceof Function);
      */},
      res: {
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome42: true,
        node4: true,
        edge13: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'for..of loops',
  category: 'syntax',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of',
  subtests: [
    {
      name: 'with arrays',
      exec: function () {/*
        var arr = [5];
        for (var item of arr)
          return item === 5;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        ejs: true,
        jsx: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox13: true,
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays',
      exec: function () {/*
        var arr = [,,];
        var count = 0;
        for (var item of arr)
          count += (item === undefined);
        return count === 2;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        ejs: true,
        jsx: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox13: true,
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with strings',
      exec: function () {/*
        var str = "";
        for (var item of "foo")
          str += item;
        return str === "foo";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        ejs: true,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox17: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings',
      exec: function () {/*
        var str = "";
        for (var item of "𠮷𠮶")
          str += item + " ";
        return str === "𠮷 𠮶 ";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: false,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox27: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances',
      exec: function () {/*
        var result = "";
        var iterable = (function*(){ yield 1; yield 2; yield 3; }());
        for (var item of iterable) {
          result += item;
        }
        return result === "123";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        closure: true,
        edge12: "flagged",
        typescript: false,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome38: true,
        node0_12: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables',
      exec: function () {/*
        var result = "";
        var iterable = global.__createIterableObject([1, 2, 3]);
        for (var item of iterable) {
          result += item;
        }
        return result === "123";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: false,
        es6tr: { val: true, note_id: 'compiler-iterable' },
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome21dev: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of generic iterables',
      exec: function () {/*
        var result = "";
        var iterable = global.__createIterableObject([1, 2, 3]);
        for (var item of Object.create(iterable)) {
          result += item;
        }
        return result === "123";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: false,
        es6tr: { val: true, note_id: 'compiler-iterable' },
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome35: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing, break',
      exec: function () {/*
        var closed = false;
        var iter = __createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        for (var it of iter) break;
        return closed;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: false,
        edge15: true,
        firefox2: false,
        firefox53: true,
        safari9: true,
        xs6: true,
        chrome51: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing, throw',
      exec: function () {/*
        var closed = false;
        var iter = __createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        try {
          for (var it of iter) throw 0;
        } catch(e){}
        return closed;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: false,
        edge15: true,
        firefox2: false,
        firefox53: true,
        safari9: true,
        xs6: true,
        chrome51: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'generators',
  category: 'functions',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*',
  subtests: [
    {
      name: 'basic functionality',
      exec: function() {/*
        function * generator(){
          yield 5; yield 6;
        };
        var iterator = generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'generator function expressions',
      exec: function() {/*
        var generator = function * (){
          yield 5; yield 6;
        };
        var iterator = generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct "this" binding',
      exec: function() {/*
        function * generator(){
          yield this.x; yield this.y;
        };
        var iterator = { g: generator, x: 5, y: 6 }.g();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'can\'t use "this" with new',
      exec: function() {/*
        function * generator(){
          yield this.x; yield this.y;
        };
        try {
          (new generator()).next();
        }
        catch (e) {
          return true;
        }
      */},
      res: {
        firefox2: false,
        firefox43: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'sending',
      exec: function() {/*
        var sent;
        function * generator(){
          sent = [yield 5, yield 6];
        };
        var iterator = generator();
        iterator.next();
        iterator.next("foo");
        iterator.next("bar");
        return sent[0] === "foo" && sent[1] === "bar";
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        ejs: true,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '%GeneratorPrototype%',
      exec: function() {/*
        function * generatorFn(){}
        var ownProto = Object.getPrototypeOf(generatorFn());
        var passed = ownProto === generatorFn.prototype;

        var sharedProto = Object.getPrototypeOf(ownProto);
        passed &= sharedProto !== Object.prototype &&
          sharedProto === Object.getPrototypeOf(function*(){}.prototype) &&
          sharedProto.hasOwnProperty('next');

        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '%GeneratorPrototype% prototype chain',
      exec: function () {/*
        function * generatorFn(){}
        var g = generatorFn();
        var ownProto = Object.getPrototypeOf(g);
        var passed = ownProto === generatorFn.prototype;

        var sharedProto = Object.getPrototypeOf(ownProto);
        var iterProto = Object.getPrototypeOf(sharedProto);

        passed &= iterProto.hasOwnProperty(Symbol.iterator) &&
          !sharedProto     .hasOwnProperty(Symbol.iterator) &&
          !ownProto        .hasOwnProperty(Symbol.iterator) &&
          g[Symbol.iterator]() === g;

        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        firefox2: false,
        firefox45: true,
        chrome45: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '%GeneratorPrototype%.constructor',
      exec: function () {/*
        function * g (){}
        var iterator = new g.constructor("a","b","c","yield a; yield b; yield c;")(5,6,7);
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 7 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;

        passed &= g.constructor === (function*(){}).constructor;
        return passed;
      */},
      res: {
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '%GeneratorPrototype%.throw',
      exec: function() {/*
        var passed = false;
        function * generator(){
          try {
            yield 5; yield 6;
          } catch(e) {
            passed = (e === "foo");
          }
        };
        var iterator = generator();
        iterator.next();
        iterator.throw("foo");
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '%GeneratorPrototype%.return',
      exec: function() {/*
        function * generator(){
          yield 5; yield 6;
        };
        var iterator = generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.return("quxquux");
        passed    &= item.value === "quxquux" && item.done === true;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        firefox2: false,
        firefox38: true,
        edge12: "flagged",
        edge13: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield operator precedence',
      exec: function() {/*
        var passed;
        function * generator(){
          passed = yield 0 ? true : false;
        };
        var iterator = generator();
        iterator.next();
        iterator.next(true);
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, arrays',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * [5, 6];
        }());
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome38: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, sparse arrays',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * [,,];
        }());
        var item = iterator.next();
        var passed = item.value === undefined && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome38: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, strings',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * "56";
        }());
        var item = iterator.next();
        var passed = item.value === "5" && item.done === false;
        item = iterator.next();
        passed    &= item.value === "6" && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        babel: babel.regenerator,
        closure: true,
        tr: true,
        firefox2: false,
        firefox27: true,
        chrome38: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, astral plane strings',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * "𠮷𠮶";
        }());
        var item = iterator.next();
        var passed = item.value === "𠮷" && item.done === false;
        item = iterator.next();
        passed    &= item.value === "𠮶" && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        babel: babel.regenerator,
        ejs: true,
        tr: true,
        firefox2: false,
        firefox27: true,
        chrome38: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, generator instances',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * (function*(){ yield 5; yield 6; yield 7; }());
        }());
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 7 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        ejs: true,
        closure: true,
        firefox2: false,
        firefox27: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, generic iterables',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * global.__createIterableObject([5, 6, 7]);
        }());
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 7 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        ejs: true,
        closure: true,
        firefox2: false,
        firefox36: true,
        chrome21dev: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, instances of iterables',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * Object.create(__createIterableObject([5, 6, 7]));
        }());
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 7 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox36: true,
        chrome35: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield * on non-iterables is a runtime error',
      exec: function () {/*
        var iterator = (function * generator() {
          yield * [5];
        }());
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        iterator = (function * generator() {
          yield * 5;
        }());
        try {
          iterator.next();
        } catch (e) {
          return passed;
        }
      */},
      res: {
        tr: true,
        babel: false,
        firefox2: false,
        firefox27: true,
        chrome35: "flagged",
        chrome39: true,
        node0_12: "flagged",
        node4: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, iterator closing',
      exec: function () {/*
        var closed = '';
        var iter = __createIterableObject([1, 2, 3], {
          'return': function(){
            closed += 'a';
            return {done: true};
          }
        });
        var gen = (function* generator(){
          try {
            yield *iter;
          } finally {
            closed += 'b';
          }
        })();
        gen.next();
        gen['return']();
        return closed === 'ab';
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox53: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'yield *, iterator closing via throw()',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'throw': undefined,
          'return': function() {
            closed = true;
            return {done: true};
          }
        });
        var gen = (function*(){
          try {
            yield *iter;
          } catch(e){}
        })();
        gen.next();
        gen['throw']();
        return closed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        edge13: true,
        firefox2: false,
        firefox53: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'shorthand generator methods',
      exec: function() {/*
        var o = {
          * generator() {
            yield 5; yield 6;
          },
        };
        var iterator = o.generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        chrome41: "flagged",
        chrome42: true,
        firefox2: false,
        firefox34: true,
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'string-keyed shorthand generator methods',
      exec: function() {/*
        var o = {
          * "foo bar"() {
            yield 5; yield 6;
          },
        };
        var iterator = o["foo bar"]();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        chrome41: "flagged",
        chrome42: true,
        firefox2: false,
        firefox34: true,
        node4: true,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed shorthand generators',
      exec: function() {/*
        var garply = "generator";
        var o = {
          * [garply] () {
            yield 5; yield 6;
          },
        };
        var iterator = o.generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        firefox2: false,
        firefox34: true,
        ejs: true,
        chrome44: true,
        edge12: "flagged",
        node4: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'shorthand generator methods, classes',
      exec: function() {/*
        class C {
          * generator() {
            yield 5; yield 6;
          }
        };
        var iterator = new C().generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed shorthand generators, classes',
      exec: function() {/*
        var garply = "generator";
        class C {
          * [garply] () {
            yield 5; yield 6;
          }
        }
        var iterator = new C().generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      */},
      res: {
        tr: true,
        babel: babel.regenerator,
        closure: true,
        edge12: "flagged",
        chrome45: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'shorthand generators can\'t be constructors',
      exec: function() {/*
        class C {
          * generator() {
            yield 5; yield 6;
          }
        };
        try {
          Function("class D { * constructor() { return {}; } }");
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.regenerator,
        chrome41: "strict",
        chrome49: true,
        node4: "strict",
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'prototype of bound functions',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate',
  subtests: [
    {
      name: 'basic functions',
      exec: function () {/*
          function correctProtoBound(proto) {
            var f = function(){};
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(f, proto);
            }
            else {
              f.__proto__ = proto;
            }
            var boundF = Function.prototype.bind.call(f, null);
            return Object.getPrototypeOf(boundF) === proto;
          }
          return correctProtoBound(Function.prototype)
            && correctProtoBound({})
            && correctProtoBound(null);
      */},
      res: {
        chrome46: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'generator functions',
      exec: function() {/*
          function correctProtoBound(proto) {
            var f = function*(){};
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(f, proto);
            }
            else {
              f.__proto__ = proto;
            }
            var boundF = Function.prototype.bind.call(f, null);
            return Object.getPrototypeOf(boundF) === proto;
          }
          return correctProtoBound(Function.prototype)
            && correctProtoBound({})
            && correctProtoBound(null);
      */},
      res: {
        chrome46: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'arrow functions',
      exec: function() {/*
          function correctProtoBound(proto) {
            var f = ()=>5;
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(f, proto);
            }
            else {
              f.__proto__ = proto;
            }
            var boundF = Function.prototype.bind.call(f, null);
            return Object.getPrototypeOf(boundF) === proto;
          }
          return correctProtoBound(Function.prototype)
            && correctProtoBound({})
            && correctProtoBound(null);
      */},
      res: {
        chrome46: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'classes',
      exec: function() {/*
          function correctProtoBound(proto) {
            class C {}
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(C, proto);
            }
            else {
              C.__proto__ = proto;
            }
            var boundF = Function.prototype.bind.call(C, null);
            return Object.getPrototypeOf(boundF) === proto;
          }
          return correctProtoBound(Function.prototype)
            && correctProtoBound({})
            && correctProtoBound(null);
      */},
      res: {
        chrome46: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'subclasses',
      exec: function() {/*
          function correctProtoBound(superclass) {
            class C extends superclass {
              constructor() {
                return Object.create(null);
              }
            }
            var boundF = Function.prototype.bind.call(C, null);
            return Object.getPrototypeOf(boundF) === Object.getPrototypeOf(C);
          }
          return correctProtoBound(function(){})
            && correctProtoBound(Array)
            && correctProtoBound(null);
      */},
      res: {
        chrome46: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'octal and binary literals',
  category: 'syntax',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals',
  subtests: [
    {
      name: 'octal literals',
      exec: function () {/*
        return 0o10 === 8 && 0O10 === 8;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'binary literals',
      exec: function () {/*
        return 0b10 === 2 && 0B10 === 2;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        ejs: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'octal supported by Number()',
      exec: function () {/*
        return Number('0o1') === 1;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox36: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'binary supported by Number()',
      exec: function () {/*
        return Number('0b1') === 1;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox36: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'template literals',
  category: 'syntax',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        var a = "ba", b = "QUX";
        return `foo bar
        ${a + "z"} ${b.toLowerCase()}` === "foo bar\nbaz qux";
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome41: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'toString conversion',
      exec: function () {/*
        var a = {
          toString: function() { return "foo"; },
          valueOf: function() { return "bar"; },
        };
        return `${a}` === "foo";
      */},
      res: {
        ejs: true,
        firefox2: false,
        firefox34: true,
        chrome41: true,
        safari9: true,
        node4: true,
        edge13: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'tagged template literals',
      exec: function () {/*
        var called = false;
        function fn(parts, a, b) {
          called = true;
          return parts instanceof Array &&
            parts[0]     === "foo"      &&
            parts[1]     === "bar\n"    &&
            parts.raw[0] === "foo"      &&
            parts.raw[1] === "bar\\n"   &&
            a === 123                   &&
            b === 456;
        }
        return fn `foo${123}bar\n${456}` && called;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome41: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'passed array is frozen',
      exec: function () {/*
        return (function(parts) {
          return Object.isFrozen(parts) && Object.isFrozen(parts.raw);
        }) `foo${0}bar${0}baz`;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        es6tr: true,
        jsx: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome41: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'line break normalisation',
      /* For some reason, this .fromCharCode stuff is necessary instead of \r\n. */
      exec: function () {/*
        var cr   = eval("`x" + String.fromCharCode(13)    + "y`");
        var lf   = eval("`x" + String.fromCharCode(10)    + "y`");
        var crlf = eval("`x" + String.fromCharCode(13,10) + "y`");

        return cr.length === 3 && lf.length === 3 && crlf.length === 3
          && cr[1] === lf[1] && lf[1] === crlf[1] && crlf[1] === '\n';
      */},
      res: {
        tr: true,
        babel: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox34: true,
        edge12: true,
        chrome41: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'RegExp "y" and "u" flags',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters',
  subtests: [
    {
      name: '"y" flag',
      exec: function () {/*
        var re = new RegExp('\\w', 'y');
        re.exec('xy');
        return (re.exec('xy')[0] === 'y');
      */},
      res: {
        firefox2: false,
        firefox3: true,
        chrome39: "flagged",
        chrome40: false,
        chrome49: true,
        node6: true,
        node6_5: true,
        ejs: true,
        edge12: "flagged",
        typescript: typescript.fallthrough,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"y" flag, lastIndex',
      exec: function () {/*
        var re = new RegExp('yy', 'y');
        re.lastIndex = 3;
        var result = re.exec('xxxyyxx')[0];
        return result === 'yy' && re.lastIndex === 5;
      */},
      res: {
        firefox2: false,
        firefox3: true,
        chrome39: "flagged",
        chrome40: false,
        chrome49: true,
        node6: true,
        node6_5: true,
        ejs: true,
        edge12: "flagged",
        typescript: typescript.fallthrough,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"u" flag',
      exec: function() {/*
        return "𠮷".match(/^.$/u)[0].length === 2;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: typescript.fallthrough,
        edge12: true,
        edge13: true,
        firefox2: false,
        firefox46: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"u" flag, Unicode code point escapes',
      exec: function() {/*
        return "𝌆".match(/\u{1d306}/u)[0].length === 2;
      */},
      res: {
        tr: true,
        babel: true,
        typescript: typescript.fallthrough,
        edge12: true,
        edge13: true,
        firefox2: false,
        firefox46: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"u" flag, case folding',
      exec: function() {/*
        return "ſ".match(/S/iu) && "S".match(/ſ/iu);
      */},
      res: {
        tr: true,
        babel: true,
        typescript: typescript.fallthrough,
        edge13: true,
        firefox2: false,
        firefox46: true,
        chrome50: true,
        node6: true,
        node6_5: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'typed arrays',
  category: 'built-ins',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray',
  subtests: [
    {
      name: 'Int8Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Int8Array(buffer);         view[0] = 0x80;
        return view[0] === -0x80;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Uint8Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Uint8Array(buffer);        view[0] = 0x100;
        return view[0] === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Uint8ClampedArray',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Uint8ClampedArray(buffer); view[0] = 0x100;
        return view[0] === 0xFF;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        firefox2: false,
        firefox4: true,
        edge12: true,
        chrome5: true,
        safari6: true,
        opera12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Int16Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Int16Array(buffer);        view[0] = 0x8000;
        return view[0] === -0x8000;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Uint16Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Uint16Array(buffer);       view[0] = 0x10000;
        return view[0] === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Int32Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Int32Array(buffer);        view[0] = 0x80000000;
        return view[0] === -0x80000000;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Uint32Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Uint32Array(buffer);       view[0] = 0x100000000;
        return view[0] === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Float32Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Float32Array(buffer);       view[0] = 0.1;
        return view[0] === 0.10000000149011612;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Float64Array',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new Float64Array(buffer);       view[0] = 0.1;
        return view[0] === 0.1;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        konq4_14: true,
        node0_12: true,
        android4_0: false,
        android4_1: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Int8)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setInt8 (0, 0x80);
        return view.getInt8(0) === -0x80;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Uint8)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setUint8(0, 0x100);
        return view.getUint8(0) === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Int16)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setInt16(0, 0x8000);
        return view.getInt16(0) === -0x8000;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Uint16)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setUint16(0, 0x10000);
        return view.getUint16(0) === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Int32)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setInt32(0, 0x80000000);
        return view.getInt32(0) === -0x80000000;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Uint32)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setUint32(0, 0x100000000);
        return view.getUint32(0) === 0;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Float32)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setFloat32(0, 0.1);
        return view.getFloat32(0) === 0.10000000149011612;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'DataView (Float64)',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var view = new DataView(buffer);
        view.setFloat64(0, 0.1);
        return view.getFloat64(0) === 0.1;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        ie10: true,
        firefox2: false,
        firefox15: true,
        chrome5: true,
        safari5_1: true,
        opera12: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape1_3: true,
        duktape2_0: true,
      },
    },
    {
      name: 'ArrayBuffer[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/@@species',
      exec: function(){/*
        return typeof ArrayBuffer[Symbol.species] === 'function';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge13: true,
        firefox2: false,
        firefox48: true,
        xs6: true,
        ejs: true,
        safari10: true,
        chrome50: "flagged",
        chrome51: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructors require new',
      exec: function(){/*
        var buffer = new ArrayBuffer(64);
        var constructors = [
          'ArrayBuffer',
          'DataView',
          'Int8Array',
          'Uint8Array',
          'Uint8ClampedArray',
          'Int16Array',
          'Uint16Array',
          'Int32Array',
          'Uint32Array',
          'Float32Array',
          'Float64Array'
        ];
        return constructors.every(function (constructor) {
          try {
            if (constructor in global) {
              global[constructor](constructor === "ArrayBuffer" ? 64 : buffer);
            }
            return false;
          } catch(e) {
            return true;
          }
        });
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        firefox2: false,
        firefox44: true,
        edge14: true,
        chrome5: true,
        safari10: true,
        opera12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        ejs: true,
        duktape2_0: true,
      },
    },
    {
      name: 'constructors accept generic iterables',
      exec: function(){/*
        var constructors = [
          'Int8Array',
          'Uint8Array',
          'Uint8ClampedArray',
          'Int16Array',
          'Uint16Array',
          'Int32Array',
          'Uint32Array',
          'Float32Array',
          'Float64Array'
        ];
        for(var i = 0; i < constructors.length; i++){
          var arr = new global[constructors[i]](__createIterableObject([1, 2, 3]));
          if(arr.length !== 3 || arr[0] !== 1 || arr[1] !== 2 || arr[2] !== 3)return false;
        }
        return true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        chrome45: true,
        edge14: true,
        node4: true,
        safari10: true,
        firefox2: false,
        firefox52:true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct prototype chains',
      exec: function(){/*
        var constructors = [
          'Int8Array',
          'Uint8Array',
          'Uint8ClampedArray',
          'Int16Array',
          'Uint16Array',
          'Int32Array',
          'Uint32Array',
          'Float32Array',
          'Float64Array'
        ];
        var constructor = Object.getPrototypeOf(Int8Array);
        var prototype = Object.getPrototypeOf(Int8Array.prototype);
        if(constructor === Function.prototype || prototype === Object.prototype)return false;
        for(var i = 0; i < constructors.length; i+=1) {
          if (!(constructors[i] in global
              && Object.getPrototypeOf(global[constructors[i]]) === constructor
              && Object.getPrototypeOf(global[constructors[i]].prototype) === prototype
              && Object.getOwnPropertyNames(global[constructors[i]].prototype).sort() + ''
                === "BYTES_PER_ELEMENT,constructor")) {
            return false;
          }
        }
        return true;
      */},
      res: {
        firefox2: false,
        firefox35: true,
        edge12: true,
        chrome51: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
  ].concat([ //@@ jph
    {
      name: '.from',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.of',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      ejs: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.subarray',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      ejs: true,
      edge12: true,
      firefox2: false,
      firefox4: true,
      chrome5: true,
      safari6: true,
      opera12: true,
      node0_12: true,
      xs6: true,
      jxa: true,
      duktape2_0: true,
    }},
    {
      name: '.prototype.join',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.indexOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.lastIndexOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.slice',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.every',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.filter',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.forEach',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.map',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox38: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.reduce',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.reduceRight',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
        safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.reverse',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.some',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
        safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.sort',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox46: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.copyWithin',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox34: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.find',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
        safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.findIndex',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.fill',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      chrome45: true,
      node4: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      chrome38: true,
      node0_12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.values',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      chrome38: true,
      node0_12: true,
      firefox2: false,
      firefox37: true,
      ejs: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype.entries',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      chrome38: true,
      node0_12: true,
      firefox2: false,
      firefox37: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '.prototype[Symbol.iterator]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge12: true,
      chrome38: true,
      node0_12: true,
      firefox2: false,
      firefox36: true,
      ejs: true,
      safari10: true,
      xs6: true,
      jxa: true,
      duktape2_0: false,
    }},
    {
      name: '[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@species',
      res: {
      babel: babel.corejs,
      typescript: typescript.corejs,
      edge13: true,
      firefox2: false,
      firefox48: true,
      xs6: true,
      ejs: true,
      chrome50: "flagged",
      chrome51: true,
      safari10: true,
      jxa: true,
      duktape2_0: false,
    }},
    ].map(function(m) {
      var eqFn = ' === "function"';
      var name = m.name;
      m.name = '%TypedArray%' + name;
      m.exec = eval('0,function(){/*\nreturn typeof '
        + [
          'Int8Array',
          'Uint8Array',
          'Uint8ClampedArray',
          'Int16Array',
          'Uint16Array',
          'Int32Array',
          'Uint32Array',
          'Float32Array',
          'Float64Array'
        ].join(name + eqFn + ' &&\n    typeof ') + name + eqFn + ';\n*/}');
      return m;
    })
  ),
},
{
  name: 'Map',
  category: 'built-ins',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        var key = {};
        var map = new Map();

        map.set(key, 123);

        return map.has(key) && map.get(key) === 123;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor arguments',
      exec: function () {/*
        var key1 = {};
        var key2 = {};
        var map = new Map([[key1, 123], [key2, 456]]);

        return map.has(key1) && map.get(key1) === 123 &&
               map.has(key2) && map.get(key2) === 456;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox13: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        new Map();
        try {
          Map();
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        es6shim: true,
        ie11: true,
        chrome38: true,
        safari9: true,
        node4: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor accepts null',
      exec: function () {/*
        new Map(null);
        return true;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox37: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor invokes set',
      exec: function () {/*
        var passed = false;
        var _set = Map.prototype.set;

        Map.prototype.set = function(k, v) {
          passed = true;
        };

        new Map([ [1, 2] ]);
        Map.prototype.set = _set;

        return passed;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome38: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        try {
          new Map(iter);
        } catch(e){}
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.set returns this',
      exec: function () {/*
        var map = new Map();
        return map.set(0, 0) === map;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: '-0 key converts to +0',
      exec: function () {/*
        var map = new Map();
        map.set(-0, "foo");
        var k;
        map.forEach(function (value, key) {
          k = 1 / key;
        });
        return k === Infinity && map.get(+0) == "foo";
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome39: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.size',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size',
      exec: function () {/*
        var key = {};
        var map = new Map();

        map.set(key, 123);

        return map.size === 1;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox19: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.delete',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete',
      exec: function () {/*
        return typeof Map.prototype.delete === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.clear',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear',
      exec: function () {/*
        return typeof Map.prototype.clear === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox19: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.forEach',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach',
      exec: function () {/*
        return typeof Map.prototype.forEach === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox25: true,
        chrome36: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys',
      exec: function () {/*
        return typeof Map.prototype.keys === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox20: true,
        safari7_1: true,
        chrome37: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.values',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values',
      exec: function () {/*
        return typeof Map.prototype.values === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox20: true,
        safari7_1: true,
        chrome36: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype.entries',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries',
      exec: function () {/*
        return typeof Map.prototype.entries === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox20: true,
        safari7_1: true,
        chrome36: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype[Symbol.iterator]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator',
      exec: function () {/*
        return typeof Map.prototype[Symbol.iterator] === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        firefox2: false,
        firefox36: true,
        chrome37: "flagged",
        chrome38: true,
        safari9: true,
        edge12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map.prototype isn\'t an instance',
      exec: function () {/*
        new Map();
        var obj = {};
        try {
          Map.prototype.has(obj);
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map iterator prototype chain',
      exec: function () {/*
        // Iterator instance
        var iterator = new Map()[Symbol.iterator]();
        // %MapIteratorPrototype%
        var proto1 = Object.getPrototypeOf(iterator);
        // %IteratorPrototype%
        var proto2 = Object.getPrototypeOf(proto1);

        return proto2.hasOwnProperty(Symbol.iterator) &&
          !proto1    .hasOwnProperty(Symbol.iterator) &&
          !iterator  .hasOwnProperty(Symbol.iterator) &&
          iterator[Symbol.iterator]() === iterator;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        safari9: true,
        chrome45: true,
        node4: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@species',
      exec: function () {/*
        var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
        return 'get' in prop && Map[Symbol.species] === Map;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        firefox2: false,
        firefox41: true,
        chrome50: "flagged",
        chrome51: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Set',
  category: 'built-ins',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        var obj = {};
        var set = new Set();

        set.add(123);
        set.add(123);

        return set.has(123);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor arguments',
      exec: function () {/*
        var obj1 = {};
        var obj2 = {};
        var set = new Set([obj1, obj2]);

        return set.has(obj1) && set.has(obj2);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox13: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        new Set();
        try {
          Set();
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        es6shim: true,
        ie11: true,
        chrome38: true,
        safari9: true,
        node4: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor accepts null',
      exec: function () {/*
        new Set(null);
        return true;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox37: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor invokes add',
      exec: function () {/*
        var passed = false;
        var _add = Set.prototype.add;

        Set.prototype.add = function(v) {
          passed = true;
        };

        new Set([1]);
        Set.prototype.add = _add;

        return passed;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome38: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        var add = Set.prototype.add;
        Set.prototype.add = function(){ throw 0 };
        try {
          new Set(iter);
        } catch(e){}
        Set.prototype.add = add;
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.add returns this',
      exec: function () {/*
        var set = new Set();
        return set.add(0) === set;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: '-0 key converts to +0',
      exec: function () {/*
        var set = new Set();
        set.add(-0);
        var k;
        set.forEach(function (value) {
          k = 1 / value;
        });
        return k === Infinity && set.has(+0);
      */},
      res: {
        babel: babel.corejs,
        es6shim: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome39: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        ejs: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.size',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size',
      exec: function () {/*
        var obj = {};
        var set = new Set();

        set.add(123);
        set.add(123);
        set.add(456);

        return set.size === 2;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox19: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.delete',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete',
      exec: function () {/*
        return typeof Set.prototype.delete === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.clear',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear',
      exec: function () {/*
        return typeof Set.prototype.clear === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox19: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.forEach',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach',
      exec: function () {/*
        return typeof Set.prototype.forEach === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox25: true,
        chrome36: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys',
      exec: function () {/*
        return typeof Set.prototype.keys === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox24: true,
        safari7_1: true,
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.values',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values',
      exec: function () {/*
        return typeof Set.prototype.values === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox24: true,
        safari7_1: true,
        chrome37: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype.entries',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries',
      exec: function () {/*
        return typeof Set.prototype.entries === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox24: true,
        safari7_1: true,
        chrome37: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype[Symbol.iterator]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator',
      exec: function () {/*
        return typeof Set.prototype[Symbol.iterator] === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        chrome51: true,
        ejs: true,
        firefox2: false,
        firefox36: true,
        chrome37: "flagged",
        chrome38: true,
        safari9: true,
        edge12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set.prototype isn\'t an instance',
      exec: function () {/*
        new Set();
        var obj = {};
        try {
          Set.prototype.has(obj);
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        ie11: true,
        firefox2: false,
        firefox13: true,
        chrome21dev: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set iterator prototype chain',
      exec: function () {/*
        // Iterator instance
        var iterator = new Set()[Symbol.iterator]();
        // %SetIteratorPrototype%
        var proto1 = Object.getPrototypeOf(iterator);
        // %IteratorPrototype%
        var proto2 = Object.getPrototypeOf(proto1);

        return proto2.hasOwnProperty(Symbol.iterator) &&
          !proto1    .hasOwnProperty(Symbol.iterator) &&
          !iterator  .hasOwnProperty(Symbol.iterator) &&
          iterator[Symbol.iterator]() === iterator;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        safari9: true,
        chrome45: true,
        node4: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@species',
      exec: function () {/*
        var prop = Object.getOwnPropertyDescriptor(Set, Symbol.species);
        return 'get' in prop && Set[Symbol.species] === Set;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        chrome50: "flagged",
        chrome51: true,
        firefox2: false,
        firefox41: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'WeakMap',
  category: 'built-ins',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        var key = {};
        var weakmap = new WeakMap();

        weakmap.set(key, 123);

        return weakmap.has(key) && weakmap.get(key) === 123;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        ie11: true,
        firefox2: false,
        firefox6: true,
        chrome21dev: "flagged",
        chrome36: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor arguments',
      exec: function () {/*
        var key1 = {};
        var key2 = {};
        var weakmap = new WeakMap([[key1, 123], [key2, 456]]);

        return weakmap.has(key1) && weakmap.get(key1) === 123 &&
               weakmap.has(key2) && weakmap.get(key2) === 456;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        new WeakMap();
        try {
          WeakMap();
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        ie11: true,
        chrome36: true,
        safari7_1: true,
        node4: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor accepts null',
      exec: function () {/*
        new WeakMap(null);
        return true;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        ie11: true,
        firefox2: false,
        firefox37: true,
        chrome21dev: "flagged",
        chrome36: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor invokes set',
      exec: function () {/*
        var passed = false;
        var _set = WeakMap.prototype.set;

        WeakMap.prototype.set = function(k, v) {
          passed = true;
        };

        new WeakMap([ [{ }, 42] ]);
        WeakMap.prototype.set = _set;

        return passed;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome38: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'frozen objects as keys',
      exec: function () {/*
        var f = Object.freeze({});
        var m = new WeakMap;
        m.set(f, 42);
        return m.get(f) === 42;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox6: true,
        chrome21dev: "flagged",
        chrome36: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        try {
          new WeakMap(iter);
        } catch(e){}
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakMap.prototype.set returns this',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set#Return_value',
      exec: function () {/*
        var weakmap = new WeakMap();
        var key = {};
        return weakmap.set(key, 0) === weakmap;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        chrome38: true,
        firefox2: false,
        firefox33: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakMap.prototype.delete',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete',
      exec: function () {/*
        return typeof WeakMap.prototype.delete === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        ie11: true,
        firefox2: false,
        firefox6: true,
        chrome21dev: "flagged",
        chrome36: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'no WeakMap.prototype.clear method',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/clear',
      exec: function () {/*
        if (!("clear" in WeakMap.prototype)) {
          return true;
        }
        var m = new WeakMap();
        var key = {};
        m.set(key, 2);
        m.clear();
        return m.has(key);
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        chrome43: true,
        edge12: true,
        firefox2: false,
        firefox6: true,
        firefox20: false,
        firefox46: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: '.has, .get and .delete methods accept primitives',
      exec: function () {/*
        var m = new WeakMap;
        return m.has(1) === false
          && m.get(1) === undefined
          && m.delete(1) === false;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ie11: true,
        firefox2: false,
        firefox38: true,
        chrome41: true,
        safari9: true,
        ejs: null,
        xs6: null,
        jxa: null,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakMap.prototype isn\'t an instance',
      exec: function () {/*
        new WeakMap();
        var obj = {};
        try {
          WeakMap.prototype.has(obj);
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        ie11: true,
        firefox2: false,
        firefox40: true,
        chrome21dev: "flagged",
        chrome36: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'WeakSet',
  category: 'built-ins',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        var obj1 = {};
        var weakset = new WeakSet();

        weakset.add(obj1);
        weakset.add(obj1);

        return weakset.has(obj1);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome30: "flagged",
        chrome36: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor arguments',
      exec: function () {/*
        var obj1 = {}, obj2 = {};
        var weakset = new WeakSet([obj1, obj2]);

        return weakset.has(obj1) && weakset.has(obj2);
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        new WeakSet();
        try {
          WeakSet();
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        firefox2: false,
        firefox37: true,
        edge12: true,
        chrome36: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor accepts null',
      exec: function () {/*
        new WeakSet(null);
        return true;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome30: "flagged",
        chrome36: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor invokes add',
      exec: function () {/*
        var passed = false;
        var _add = WeakSet.prototype.add;

        WeakSet.prototype.add = function(v) {
          passed = true;
        };

        new WeakSet([ { } ]);
        WeakSet.prototype.add = _add;

        return passed;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome38: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        try {
          new WeakSet(iter);
        } catch(e){}
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakSet.prototype.add returns this',
      exec: function () {/*
        var weakset = new WeakSet();
        var obj = {};
        return weakset.add(obj) === weakset;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        chrome38: true,
        safari9: true,
        firefox2: false,
        firefox34: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakSet.prototype.delete',
      exec: function () {/*
        return typeof WeakSet.prototype.delete === "function";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome30: "flagged",
        chrome36: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'no WeakSet.prototype.clear method',
      exec: function () {/*
        if (!("clear" in WeakSet.prototype)) {
          return true;
        }
        var s = new WeakSet();
        var key = {};
        s.add(key);
        s.clear();
        return s.has(key);
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        chrome43: true,
        safari9: true,
        edge12: true,
        firefox2: false,
        firefox46: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: '.has and .delete methods accept primitives',
      exec: function () {/*
        var s = new WeakSet;
        return s.has(1) === false
          && s.delete(1) === false;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome41: true,
        safari9: true,
        ejs: null,
        xs6: null,
        jxa: null,
        duktape2_0: false,
      },
    },
    {
      name: 'WeakSet.prototype isn\'t an instance',
      exec: function () {/*
        new WeakSet();
        var obj = {};
        try {
          WeakSet.prototype.has(obj);
        }
        catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome30: "flagged",
        chrome36: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Proxy',
  category: 'built-ins',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy',
  note_id: 'proxy-enumerate',
  note_html: 'The 2015 version of the specification also specifies an <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots-enumerate">"enumerate" handler</a>, which was removed in the 2016 version.',
  subtests: [
    {
      name: 'constructor requires new',
      exec: function () {/*
        new Proxy({}, {});
        try {
          Proxy({}, {});
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox25: false,
        firefox38: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'no "prototype" property',
      exec: function () {/*
        new Proxy({}, {});
        return !Proxy.hasOwnProperty('prototype');
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"get" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get',
      exec: function () {/*
        var proxied = { };
        var proxy = new Proxy(proxied, {
          get: function (t, k, r) {
            return t === proxied && k === "foo" && r === proxy && 5;
          }
        });
        return proxy.foo === 5;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"get" handler, instances of proxies',
      exec: function () {/*
        var proxied = { };
        var proxy = Object.create(new Proxy(proxied, {
          get: function (t, k, r) {
            return t === proxied && k === "foo" && r === proxy && 5;
          }
        }));
        return proxy.foo === 5;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox18: {
          val: false,
          note_id: 'fx-proxy-get',
          note_html: 'Firefox 18 up to 37 doesn\'t allow a proxy\'s <code>"get"</code> handler to be triggered via the prototype chain, unless the proxied object does possess the named property (or the proxy\'s <code>"has"</code> handler reports it as present).'
        },
        firefox2: false,
        firefox38: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"get" handler invariants',
      exec: function () {/*
        var passed = false;
        var proxied = { };
        var proxy = new Proxy(proxied, {
          get: function () {
            passed = true;
            return 4;
          }
        });
        // The value reported for a property must be the same as the value of the corresponding
        // target object property if the target object property is a non-writable,
        // non-configurable own data property.
        Object.defineProperty(proxied, "foo", { value: 5, enumerable: true });
        try {
          proxy.foo;
          return false;
        }
        catch(e) {}
        // The value reported for a property must be undefined if the corresponding target
        // object property is a non-configurable own accessor property that has undefined
        // as its [[Get]] attribute.
        Object.defineProperty(proxied, "bar",
          { set: function(){}, enumerable: true });
        try {
          proxy.bar;
          return false;
        }
        catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"set" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set',
      exec: function () {/*
        var proxied = { };
        var passed = false;
        var proxy = new Proxy(proxied, {
          set: function (t, k, v, r) {
            passed = t === proxied && k + v === "foobar" && r === proxy;
          }
        });
        proxy.foo = "bar";
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"set" handler, instances of proxies',
      exec: function () {/*
        var proxied = { };
        var passed = false;
        var proxy = Object.create(new Proxy(proxied, {
          set: function (t, k, v, r) {
            passed = t === proxied && k + v === "foobar" && r === proxy;
          }
        }));
        proxy.foo = "bar";
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox37: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"set" handler invariants',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // Cannot change the value of a property to be different from the value of
        // the corresponding target object if the corresponding target object
        // property is a non-writable, non-configurable own data property.
        var proxied = {};
        var proxy = new Proxy(proxied, {
          set: function () {
            passed = true;
            return true;
          }
        });
        Object.defineProperty(proxied, "foo", { value: 2, enumerable: true });
        proxy.foo = 2;
        try {
          proxy.foo = 4;
          return false;
        } catch(e) {}
        // Cannot set the value of a property if the corresponding target
        // object property is a non-configurable own accessor property
        // that has undefined as its [[Set]] attribute.
        Object.defineProperty(proxied, "bar",
          { get: function(){}, enumerable: true });
        try {
          proxy.bar = 2;
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"has" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        "foo" in new Proxy(proxied, {
          has: function (t, k) {
            passed = t === proxied && k === "foo";
          }
        });
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"has" handler, instances of proxies',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        "foo" in Object.create(new Proxy(proxied, {
          has: function (t, k) {
            passed = t === proxied && k === "foo";
          }
        }));
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"has" handler invariants',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // A property cannot be reported as non-existent, if it exists as a
        // non-configurable own property of the target object.
        var proxied = {};
        var proxy = new Proxy(proxied, {
          has: function () {
            passed = true;
            return false;
          }
        });
        Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
        try {
          'foo' in proxy;
          return false;
        } catch(e) {}
        // A property cannot be reported as non-existent, if it exists as an
        // own property of the target object and the target object is not extensible.
        proxied.bar = 2;
        Object.preventExtensions(proxied);
        try {
          'bar' in proxy;
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"deleteProperty" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        delete new Proxy(proxied, {
          deleteProperty: function (t, k) {
            passed = t === proxied && k === "foo";
          }
        }).foo;
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"deleteProperty" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // A property cannot be reported as deleted, if it exists as a non-configurable
        // own property of the target object.
        var proxied = {};
        Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
        try {
          delete new Proxy(proxied, {
            deleteProperty: function () {
              passed = true;
              return true;
            }
          }).foo;
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: '"getOwnPropertyDescriptor" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor',
      exec: function () {/*
        var proxied = {};
        var fakeDesc = { value: "foo", configurable: true };
        var returnedDesc = Object.getOwnPropertyDescriptor(
          new Proxy(proxied, {
            getOwnPropertyDescriptor: function (t, k) {
              return t === proxied && k === "foo" && fakeDesc;
            }
          }),
          "foo"
        );
        return (returnedDesc.value     === fakeDesc.value
          && returnedDesc.configurable === fakeDesc.configurable
          && returnedDesc.writable     === false
          && returnedDesc.enumerable   === false);
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: {
          val: false,
          note_id: 'fx-proxy-getown',
          note_html: 'From Firefox 18 up to 29, the <code>getOwnPropertyDescriptor</code> handler can only report non-existent properties if the proxy target is non-extensible rather than extensible'
        },
        firefox23: { val: false, note_id: 'fx-proxy-getown' },
        firefox30: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"getOwnPropertyDescriptor" handler invariants',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // A property cannot be reported as non-existent, if it exists as a non-configurable
        // own property of the target object.
        var proxied = {};
        var proxy = new Proxy(proxied, {
          getOwnPropertyDescriptor: function () {
            passed = true;
            return undefined;
          }
        });
        Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
        try {
          Object.getOwnPropertyDescriptor(proxy, "foo");
          return false;
        } catch(e) {}
        // A property cannot be reported as non-existent, if it exists as an own property
        // of the target object and the target object is not extensible.
        proxied.bar = 3;
        Object.preventExtensions(proxied);
        try {
          Object.getOwnPropertyDescriptor(proxy, "bar");
          return false;
        } catch(e) {}
        // A property cannot be reported as existent, if it does not exists as an own property
        // of the target object and the target object is not extensible.
        try {
          Object.getOwnPropertyDescriptor(new Proxy(proxied, {
            getOwnPropertyDescriptor: function() {
              return { value: 2, configurable: true, writable: true, enumerable: true };
            }}), "baz");
          return false;
        } catch(e) {}
        // A property cannot be reported as non-configurable, if it does not exists as an own
        // property of the target object or if it exists as a configurable own property of
        // the target object.
        try {
          Object.getOwnPropertyDescriptor(new Proxy({}, {
            getOwnPropertyDescriptor: function() {
              return { value: 2, configurable: false, writable: true, enumerable: true };
            }}), "baz");
          return false;
        } catch(e) {}
        try {
          Object.getOwnPropertyDescriptor(new Proxy({baz:1}, {
            getOwnPropertyDescriptor: function() {
              return { value: 1, configurable: false, writable: true, enumerable: true };
            }}), "baz");
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox32: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"defineProperty" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        Object.defineProperty(
          new Proxy(proxied, {
            defineProperty: function (t, k, d) {
              passed = t === proxied && k === "foo" && d.value === 5;
              return true;
            }
          }),
          "foo",
          { value: 5, configurable: true }
        );
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"defineProperty" handler invariants',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // A property cannot be added, if the target object is not extensible.
        var proxied = Object.preventExtensions({});
        var proxy = new Proxy(proxied, {
          defineProperty: function() {
            passed = true;
            return true;
          }
        });
        try {
          Object.defineProperty(proxy, "foo", { value: 2 });
          return false;
        } catch(e) {}
        // A property cannot be non-configurable, unless there exists a corresponding
        // non-configurable own property of the target object.
        try {
          Object.defineProperty(
            new Proxy({ bar: true }, {
              defineProperty: function () {
                return true;
              }
            }),
            "bar",
            { value: 5, configurable: false, writable: true, enumerable: true }
          );
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox32: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"getPrototypeOf" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf',
      exec: function () {/*
        var proxied = {};
        var fakeProto = {};
        var proxy = new Proxy(proxied, {
          getPrototypeOf: function (t) {
            return t === proxied && fakeProto;
          }
        });
        return Object.getPrototypeOf(proxy) === fakeProto;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox49: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"getPrototypeOf" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // If the target object is not extensible, [[GetPrototypeOf]] applied to the proxy object
        // must return the same value as [[GetPrototypeOf]] applied to the proxy object's target object.
        try {
          Object.getPrototypeOf(new Proxy(Object.preventExtensions({}), {
            getPrototypeOf: function () {
              passed = true;
              return {};
            }
          }));
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox49: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"setPrototypeOf" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf',
      exec: function () {/*
        var proxied = {};
        var newProto = {};
        var passed = false;
        Object.setPrototypeOf(
          new Proxy(proxied, {
            setPrototypeOf: function (t, p) {
              passed = t === proxied && p === newProto;
              return true;
            }
          }),
          newProto
        );
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox49: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"setPrototypeOf" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        Object.setPrototypeOf({},{});
        // If the target object is not extensible, the argument value must be the
        // same as the result of [[GetPrototypeOf]] applied to target object.
        try {
          Object.setPrototypeOf(
            new Proxy(Object.preventExtensions({}), {
              setPrototypeOf: function () {
                passed = true;
                return true;
              }
            }),{});
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox49: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"isExtensible" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        Object.isExtensible(
          new Proxy(proxied, {
            isExtensible: function (t) {
              passed = t === proxied; return true;
            }
          })
        );
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox31: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"isExtensible" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // [[IsExtensible]] applied to the proxy object must return the same value
        // as [[IsExtensible]] applied to the proxy object's target object with the same argument.
        try {
          Object.isExtensible(new Proxy({}, {
            isExtensible: function (t) {
              passed = true;
              return false;
            }
          }));
          return false;
        } catch(e) {}
        try {
          Object.isExtensible(new Proxy(Object.preventExtensions({}), {
            isExtensible: function (t) {
              return true;
            }
          }));
          return false;
        } catch(e) {}
        return true;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox31: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"preventExtensions" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        Object.preventExtensions(
          new Proxy(proxied, {
            preventExtensions: function (t) {
              passed = t === proxied;
              return Object.preventExtensions(proxied);
            }
          })
        );
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox22: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"preventExtensions" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // [[PreventExtensions]] applied to the proxy object only returns true
        // if [[IsExtensible]] applied to the proxy object's target object is false.
        try {
          Object.preventExtensions(new Proxy({}, {
            preventExtensions: function () {
              passed = true;
              return true;
            }
          }));
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox22: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"ownKeys" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys',
      exec: function () {/*
        var proxied = {};
        var passed = false;
        Object.keys(
          new Proxy(proxied, {
            ownKeys: function (t) {
              passed = t === proxied; return [];
            }
          })
        );
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox18: {
          val: false,
          note_id: 'fx-proxy-ownkeys',
          note_html: 'Available from Firefox 18 up to 33 as the draft standard <code>keys</code> handler'
        },
        firefox23: { val: false, note_id: 'fx-proxy-ownkeys' },
        firefox33: true,
        edge12: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        safari10: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: '"ownKeys" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // The Type of each result List element is either String or Symbol.
        try {
          Object.keys(new Proxy({}, {
            ownKeys: function () {
              passed = true;
              return [2];
            }}));
          return false;
        } catch(e) {}
        // The result List must contain the keys of all non-configurable own properties of the target object.
        var proxied = {};
        Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
        try {
          Object.keys(new Proxy(proxied, {
            ownKeys: function () {
              return [];
            }}));
          return false;
        } catch(e) {}
        // If the target object is not extensible, then the result List must contain all the keys
        // of the own properties of the target object and no other values.
        try {
          Object.keys(new Proxy(Object.preventExtensions({b:1}), {
            ownKeys: function () {
              return ['a'];
            }}));
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox18: { val: false, note_id: 'fx-proxy-ownkeys' },
        firefox42: true,
        edge12: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"apply" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply',
      exec: function () {/*
        var proxied = function(){};
        var passed = false;
        var host = {
          method: new Proxy(proxied, {
            apply: function (t, thisArg, args) {
              passed = t === proxied && thisArg === host && args + "" === "foo,bar";
            }
          })
        };
        host.method("foo", "bar");
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"apply" handler invariant',
      exec: function () {/*
        var passed = false;
        new Proxy(function(){}, {
            apply: function () { passed = true; }
        })();
        // A Proxy exotic object only has a [[Call]] internal method if the
        // initial value of its [[ProxyTarget]] internal slot is an object
        // that has a [[Call]] internal method.
        try {
          new Proxy({}, {
            apply: function () {}
          })();
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        chrome50: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"construct" handler',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct',
      exec: function () {/*
        var proxied = function(){};
        var passed = false;
        new new Proxy(proxied, {
          construct: function (t, args) {
            passed = t === proxied && args + "" === "foo,bar";
            return {};
          }
        })("foo","bar");
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: '"construct" handler invariants',
      exec: function () {/*
        var passed = false;
        new Proxy({},{});
        // A Proxy exotic object only has a [[Construct]] internal method if the
        // initial value of its [[ProxyTarget]] internal slot is an object
        // that has a [[Construct]] internal method.
        try {
          new new Proxy({}, {
            construct: function (t, args) {
              return {};
            }
          })();
          return false;
        } catch(e) {}
        // The result of [[Construct]] must be an Object.
        try {
          new new Proxy(function(){}, {
            construct: function (t, args) {
              passed = true;
              return 5;
            }
          })();
          return false;
        } catch(e) {}
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox31: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Proxy.revocable',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable',
      exec: function () {/*
        var obj = Proxy.revocable({}, { get: function() { return 5; } });
        var passed = (obj.proxy.foo === 5);
        obj.revoke();
        try {
          obj.proxy.foo;
        } catch(e) {
          passed &= e instanceof TypeError;
        }
        return passed;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox34: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.isArray support',
      exec: function () {/*
        return Array.isArray(new Proxy([], {}));
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox18: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'JSON.stringify support',
      exec: function () {/*
        return JSON.stringify(new Proxy(['foo'], {})) === '["foo"]';
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox18: true,  // a bug in FF18
        firefox21: false,
        firefox40: true,
        edge12: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'get\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get',
  subtests: [
    {
      name: 'ToPrimitive',
      exec: function() {/*
        // ToPrimitive -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({toString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});
        p + 3;
        return get[0] === Symbol.toPrimitive && get.slice(1) + '' === "valueOf,toString";
      */},
      res: {
        xs6: true,
        edge15: true,
        firefox2: false,
        firefox44: true,
        ejs: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'CreateListFromArrayLike',
      exec: function() {/*
        // CreateListFromArrayLike -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({length:2, 0:0, 1:0}, { get: function(o, k) { get.push(k); return o[k]; }});
        Function.prototype.apply({}, p);
        return get + '' === "length,0,1";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'instanceof operator',
      exec: function() {/*
        // InstanceofOperator -> GetMethod -> GetV -> [[Get]]
        // InstanceofOperator -> OrdinaryHasInstance -> Get -> [[Get]]
        var get = [];
        var p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});
        ({}) instanceof p;
        return get[0] === Symbol.hasInstance && get.slice(1) + '' === "prototype";
      */},
      res: {
        edge15: true,
        firefox2: false,
        firefox50: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'HasBinding',
      exec: function() {/*
        // HasBinding -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({foo:1}, { get: function(o, k) { get.push(k); return o[k]; }});
        p[Symbol.unscopables] = p;
        with(p) {
          typeof foo;
        }
        return get[0] === Symbol.unscopables && get.slice(1) + '' === "foo";
      */},
      res: {
        xs6: true,
        ejs: { val: false, note_id: 'ejs-no-with' },
        firefox2: false,
        firefox48: true,
        chrome49: true,
        safari10: true,
        edge14: true,
        duktape2_0: false,
      },
    },
    {
      name: 'CreateDynamicFunction',
      exec: function() {/*
        // CreateDynamicFunction -> GetPrototypeFromConstructor -> Get -> [[Get]]
        var get = [];
        var p = new Proxy(Function, { get: function(o, k) { get.push(k); return o[k]; }});
        new p;
        return get + '' === "prototype";
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'ClassDefinitionEvaluation',
      exec: function() {/*
        // ClassDefinitionEvaluation -> Get -> [[Get]]
        var get = [];
        var p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});
        class C extends p {}
        return get + '' === "prototype";
      */},
      res: {
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'IteratorComplete, IteratorValue',
      exec: function() {/*
        // IteratorComplete -> Get -> [[Get]]
        // IteratorValue -> Get -> [[Get]]
        var get = [];
        var iterable = {};
        iterable[Symbol.iterator] = function() {
          return {
            next: function() {
              return new Proxy({ value: 2, done: false }, { get: function(o, k) { get.push(k); return o[k]; }});
            }
          };
        }
        var i = 0;
        for(var e of iterable) {
          if (++i >= 2) break;
        }
        return get + '' === "done,value,done,value";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'ToPropertyDescriptor',
      exec: function() {/*
        // ToPropertyDescriptor -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({
            enumerable: true, configurable: true, value: true,
            writable: true, get: Function(), set: Function()
          }, { get: function(o, k) { get.push(k); return o[k]; }});
        try {
          // This will throw, since it will have true for both "get" and "value",
          // but not before performing a Get on every property.
          Object.defineProperty({}, "foo", p);
        } catch(e) {
          return get + '' === "enumerable,configurable,value,writable,get,set";
        }
      */},
      res: {
        ejs: true,
        firefox2: false,
        firefox18: true,
        edge13: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Object.assign',
      exec: function() {/*
        // Object.assign -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({foo:1, bar:2}, { get: function(o, k) { get.push(k); return o[k]; }});
        Object.assign({}, p);
        return get + '' === "foo,bar";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox34: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Object.defineProperties',
      exec: function() {/*
        // Object.defineProperties -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({foo:{}, bar:{}}, { get: function(o, k) { get.push(k); return o[k]; }});
        Object.defineProperties({}, p);
        return get + '' === "foo,bar";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Function.prototype.bind',
      exec: function() {/*
        // Function.prototype.bind -> Get -> [[Get]]
        var get = [];
        var p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});
        Function.prototype.bind.call(p);
        return get + '' === "length,name";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox38: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Error.prototype.toString',
      exec: function() {/*
        // Error.prototype.toString -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
        Error.prototype.toString.call(p);
        return get + '' === "name,message";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'String.raw',
      exec: function() {/*
        // String.raw -> Get -> [[Get]]
        var get = [];
        var raw = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
        var p = new Proxy({raw: raw}, { get: function(o, k) { get.push(k); return o[k]; }});
        String.raw(p);
        return get + '' === "raw,length,0,1";
      */},
      res: {
        ejs: true,
        edge12: true,
        xs6: true,
        firefox2: false,
        firefox34: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp constructor',
      exec: function() {/*
        // RegExp -> Get -> [[Get]]
        var get = [];
        var re = { constructor: null };
        re[Symbol.match] = true;
        var p = new Proxy(re, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp(p);
        return get[0] === Symbol.match && get.slice(1) + '' === "constructor,source,flags";
      */},
      res: {
        firefox2: false,
        firefox40: true,
        edge14: "flagged",
        chrome50: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype.flags',
      exec: function() {/*
        // RegExp.prototype.flags -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
        Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
        return get + '' === "global,ignoreCase,multiline,unicode,sticky";
      */},
      res: {
        firefox2: false,
        firefox37: true,
        firefox39: false,
        firefox46: true,
        xs6: true,
        chrome49: true,
        edge14: "flagged",
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype.test',
      exec: function() {/*
        // RegExp.prototype.test -> RegExpExec -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype.test.call(p);
        return get + '' === "exec";
      */},
      res: {
        firefox2: false,
        firefox46: true,
        edge14: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype.toString',
      exec: function() {/*
        // RegExp.prototype.toString -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype.toString.call(p);
        return get + '' === "source,flags";
      */},
      res: {
        firefox2: false,
        firefox39: true,
        edge14: "flagged",
        chrome50: true,
        xs6: null,
        echojs: null,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.match]',
      exec: function() {/*
        // RegExp.prototype[Symbol.match] -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype[Symbol.match].call(p);
        p.global = true;
        RegExp.prototype[Symbol.match].call(p);
        return get + '' === "global,exec,global,unicode,exec";
      */},
      res: {
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.replace]',
      exec: function() {/*
        // RegExp.prototype[Symbol.replace] -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype[Symbol.replace].call(p);
        p.global = true;
        RegExp.prototype[Symbol.replace].call(p);
        return get + '' === "global,exec,global,unicode,exec";
      */},
      res: {
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.search]',
      exec: function() {/*
        // RegExp.prototype[Symbol.search] -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype[Symbol.search].call(p);
        return get + '' === "lastIndex,exec,lastIndex";
      */},
      note_id: "regexp-prototype-symbolsearch",
      note_html: "The specification for this feature was <a href='https://github.com/tc39/ecma262/pull/627'>updated</a> after ES6 was published.  This test reflects the updated spec, which is implemented by the latest browsers.",
      res: {
        edge14: false,
        firefox2: false,
        firefox49: false,
        firefox55: true,
        chrome51: false,
        chrome56: true,
        node8: true,
        duktape2_0: false,
        safaritp: true,
        webkit: true,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.split]',
      exec: function() {/*
        // RegExp.prototype[Symbol.split] -> Get -> [[Get]]
        var get = [];
        var constructor = Function();
        constructor[Symbol.species] = Object;
        var p = new Proxy({ constructor: constructor, flags: '', exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype[Symbol.split].call(p, "");
        return get + '' === "constructor,flags,exec";
      */},
      res: {
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.from',
      exec: function() {/*
        // Array.from -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
        Array.from(p);
        return get[0] === Symbol.iterator && get.slice(1) + '' === "length,0,1";
      */},
      res: {
        ejs: true,
        firefox2: false,
        firefox36: true,
        edge13: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.concat',
      exec: function() {/*
        // Array.prototype.concat -> Get -> [[Get]]
        var get = [];
        var arr = [1];
        arr.constructor = undefined;
        var p = new Proxy(arr, { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.concat.call(p,p);
        return get[0] === "constructor"
          && get[1] === Symbol.isConcatSpreadable
          && get[2] === "length"
          && get[3] === "0"
          && get[4] === get[1] && get[5] === get[2] && get[6] === get[3]
          && get.length === 7;
      */},
      res: {
        edge15: true,
        chrome50: "flagged",
        chrome51: true,
        firefox2: false,
        firefox48: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype iteration methods',
      exec: function() {/*
        // Array.prototype methods -> Get -> [[Get]]
        var methods = ['copyWithin', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach',
          'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some'];
        var get;
        var p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
        for(var i = 0; i < methods.length; i+=1) {
          get = [];
          Array.prototype[methods[i]].call(p, Function());
          if (get + '' !== (
            methods[i] === 'fill' ? "length" :
            methods[i] === 'every' ? "length,0" :
            methods[i] === 'lastIndexOf' || methods[i] === 'reduceRight' ? "length,1,0" :
            "length,0,1"
          )) {
            return false;
          }
        }
        return true;
      */},
      res: {
        firefox2: false,
        firefox32: true,
        chrome51: true,
        edge12: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.pop',
      exec: function() {/*
        // Array.prototype.pop -> Get -> [[Get]]
        var get = [];
        var p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.pop.call(p);
        return get + '' === "length,3";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.reverse',
      exec: function() {/*
        // Array.prototype.reverse -> Get -> [[Get]]
        var get = [];
        var p = new Proxy([0,,2,,4,,], { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.reverse.call(p);
        return get + '' === "length,0,4,2";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.shift',
      exec: function() {/*
        // Array.prototype.shift -> Get -> [[Get]]
        var get = [];
        var p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.shift.call(p);
        return get + '' === "length,0,1,2,3";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.splice',
      exec: function() {/*
        // Array.prototype.splice -> Get -> [[Get]]
        var get = [];
        var p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.splice.call(p,1,1);
        Array.prototype.splice.call(p,1,0,1);
        return get + '' === "length,constructor,1,2,3,length,constructor,2,1";
      */},
      res: {
        ejs: true,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.toString',
      exec: function() {/*
        // Array.prototype.toString -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({ join:Function() }, { get: function(o, k) { get.push(k); return o[k]; }});
        Array.prototype.toString.call(p);
        return get + '' === "join";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'JSON.stringify',
      exec: function() {/*
        // JSON.stringify -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
        JSON.stringify(p);
        return get + '' === "toJSON";
      */},
      res: {
        ejs: true,
        edge12: true,
        xs6: true,
        firefox2: false,
        firefox18: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Promise resolve functions',
      exec: function() {/*
        // Promise resolve functions -> Get -> [[Get]]
        var get = [];
        var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
        new Promise(function(resolve){ resolve(p); });
        return get + '' === "then";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.prototype.match',
      exec: function() {/*
        // String.prototype.match -> Get -> [[Get]]
        var get = [];
        var proxied = {};
        proxied[Symbol.toPrimitive] = Function();
        var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
        "".match(p);
        return get[0] === Symbol.match && get[1] === Symbol.toPrimitive && get.length === 2;
      */},
      res: {
        edge15: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.prototype.replace',
      exec: function() {/*
        // String.prototype.replace functions -> Get -> [[Get]]
        var get = [];
        var proxied = {};
        proxied[Symbol.toPrimitive] = Function();
        var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
        "".replace(p);
        return get[0] === Symbol.replace && get[1] === Symbol.toPrimitive && get.length === 2;
      */},
      res: {
        edge15: "flagged",
        firefox2: false,
        firefox49: true,
        chrome50: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.prototype.search',
      exec: function() {/*
        // String.prototype.search functions -> Get -> [[Get]]
        var get = [];
        var proxied = {};
        proxied[Symbol.toPrimitive] = Function();
        var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
        "".search(p);
        return get[0] === Symbol.search && get[1] === Symbol.toPrimitive && get.length === 2;
      */},
      res: {
        edge15: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.prototype.split',
      exec: function() {/*
        // String.prototype.split functions -> Get -> [[Get]]
        var get = [];
        var proxied = {};
        proxied[Symbol.toPrimitive] = Function();
        var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
        "".split(p);
        return get[0] === Symbol.split && get[1] === Symbol.toPrimitive && get.length === 2;
      */},
      res: {
        edge15: "flagged",
        firefox2: false,
        firefox49: true,
        chrome50: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Date.prototype.toJSON',
      exec: function() {/*
        // Date.prototype.toJSON -> ToPrimitive -> Get -> [[Get]]
        // Date.prototype.toJSON -> Invoke -> GetMethod -> GetV -> [[Get]]
        var get = [];
        var p = new Proxy({toString:Function(),toISOString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});
        Date.prototype.toJSON.call(p);
        return get[0] === Symbol.toPrimitive && get.slice(1) + '' === "valueOf,toString,toISOString";
      */},
      res: {
        xs6: true,
        edge15: true,
        firefox2: false,
        firefox44: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'set\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set',
  subtests: [
    {
      name: 'Object.assign',
      exec: function() {/*
        // Object.assign -> Set -> [[Set]]
        var set = [];
        var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        Object.assign(p, { foo: 1, bar: 2 });
        return set + '' === "foo,bar";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true
      },
    },
    {
      name: 'Array.from',
      exec: function() {/*
        // Array.from -> Set -> [[Set]]
        var set = [];
        var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        Array.from.call(function(){ return p; }, {length:2, 0:1, 1:2});
        return set + '' === "length";
      */},
      res: {
        edge12: true,
        ejs: true,
        firefox2: false,
        firefox32: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.of',
      exec: function() {/*
        // Array.from -> Set -> [[Set]]
        var set = [];
        var p = new Proxy({}, { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        Array.of.call(function(){ return p; }, 1, 2, 3);
        return set + '' === "length";
      */},
      res: {
        edge12: true,
        ejs: true,
        firefox2: false,
        firefox25: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.copyWithin',
      exec: function() {/*
        // Array.prototype.copyWithin -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.copyWithin(0, 3);
        return set + '' === "0,1,2";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.fill',
      exec: function() {/*
        // Array.prototype.fill -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.fill(0, 3);
        return set + '' === "3,4,5";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.pop',
      exec: function() {/*
        // Array.prototype.pop -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.pop();
        return set + '' === "length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.push',
      exec: function() {/*
        // Array.prototype.push -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.push(0,0,0);
        return set + '' === "0,1,2,length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.reverse',
      exec: function() {/*
        // Array.prototype.reverse -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([0,0,0,,], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.reverse();
        return set + '' === "3,1,2";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.shift',
      exec: function() {/*
        // Array.prototype.shift -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.shift();
        return set + '' === "0,2,length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.splice',
      exec: function() {/*
        // Array.prototype.splice -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([1,2,3], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.splice(1,0,0);
        return set + '' === "3,2,1,length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.unshift',
      exec: function() {/*
        // Array.prototype.unshift -> Set -> [[Set]]
        var set = [];
        var p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
        p.unshift(0,1);
        return set + '' === "5,3,2,0,1,length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'defineProperty\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty',
  subtests: [
    {
      name: '[[Set]]',
      exec: function() {/*
        // [[Set]] -> [[DefineOwnProperty]]
        var def = [];
        var p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
        p.foo = 2; p.bar = 4;
        return def + '' === "foo,bar";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome49: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'SetIntegrityLevel',
      exec: function() {/*
        // SetIntegrityLevel -> DefinePropertyOrThrow -> [[DefineOwnProperty]]
        var def = [];
        var p = new Proxy({foo:1, bar:2}, { defineProperty: function(o, v, desc) { def.push(v); Object.defineProperty(o, v, desc); return true; }});
        Object.freeze(p);
        return def + '' === "foo,bar";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'deleteProperty\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty',
  subtests: [
    {
      name: 'Array.prototype.copyWithin',
      exec: function() {/*
        // Array.prototype.copyWithin -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,0,,,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.copyWithin(0,3);
        return del + '' === "0,1,2";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.pop',
      exec: function() {/*
        // Array.prototype.pop -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.pop();
        return del + '' === "2";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.reverse',
      exec: function() {/*
        // Array.prototype.reverse -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,,2,,4,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.reverse();
        return del + '' === "0,4,2";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.shift',
      exec: function() {/*
        // Array.prototype.shift -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,,0,,0,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.shift();
        return del + '' === "0,2,5";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.splice',
      exec: function() {/*
        // Array.prototype.splice -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,0,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.splice(2,2,0);
        return del + '' === "3,5";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Array.prototype.unshift',
      exec: function() {/*
        // Array.prototype.unshift -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.unshift(0);
        return del + '' === "5,3";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox18: true,
        firefox21: false,
        firefox40: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'getOwnPropertyDescriptor\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor',
  subtests: [
    {
      name: '[[Set]]',
      exec: function() {/*
        // [[Set]] -> [[GetOwnProperty]]
        var gopd = [];
        var p = new Proxy({},
          { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
        p.foo = 1; p.bar = 1;
        return gopd + '' === "foo,bar";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox37: true,
        chrome49: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Object.assign',
      exec: function() {/*
        // Object.assign -> [[GetOwnProperty]]
        var gopd = [];
        var p = new Proxy({foo:1, bar:2},
          { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
        Object.assign({}, p);
        return gopd + '' === "foo,bar";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox34: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Object.prototype.hasOwnProperty',
      exec: function() {/*
        // Object.prototype.hasOwnProperty -> HasOwnProperty -> [[GetOwnProperty]]
        var gopd = [];
        var p = new Proxy({foo:1, bar:2},
          { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
        p.hasOwnProperty('garply');
        return gopd + '' === "garply";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Function.prototype.bind',
      exec: function() {/*
        // Function.prototype.bind -> HasOwnProperty -> [[GetOwnProperty]]
        var gopd = [];
        var p = new Proxy(Function(),
          { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
        p.bind();
        return gopd + '' === "length";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox38: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Proxy, internal \'ownKeys\' calls',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys',
  subtests: [
    {
      name: 'SetIntegrityLevel',
      exec: function() {/*
        // SetIntegrityLevel -> [[OwnPropertyKeys]]
        var ownKeysCalled = 0;
        var p = new Proxy({}, { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});
        Object.freeze(p);
        return ownKeysCalled === 1;
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'TestIntegrityLevel',
      exec: function() {/*
        // TestIntegrityLevel -> [[OwnPropertyKeys]]
        var ownKeysCalled = 0;
        var p = new Proxy(Object.preventExtensions({}), { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});
        Object.isFrozen(p);
        return ownKeysCalled === 1;
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'SerializeJSONObject',
      exec: function() {/*
        // SerializeJSONObject -> EnumerableOwnNames -> [[OwnPropertyKeys]]
        var ownKeysCalled = 0;
        var p = new Proxy({}, { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});
        JSON.stringify({a:p,b:p});
        return ownKeysCalled === 2;
      */},
      res: {
        ejs: true,
        firefox2: false,
        firefox33: true,
        edge13: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Reflect',
  category: 'built-ins',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-reflection',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect',
  note_id: 'reflect-enumerate',
  note_html: 'The 2015 version of the specification also specifies <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-reflect.enumerate">Reflect.enumerate</a>, which was removed in the 2016 version.',
  subtests: [
    {
      name: 'Reflect.get',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get',
      exec: function() {/*
        return Reflect.get({ qux: 987 }, "qux") === 987;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox42: true,
        safari10: true,
        xs6: true,
        chrome49: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.set',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set',
      exec: function() {/*
        var obj = {};
        Reflect.set(obj, "quux", 654);
        return obj.quux === 654;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.has',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has',
      exec: function() {/*
        return Reflect.has({ qux: 987 }, "qux");
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.deleteProperty',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty',
      exec: function() {/*
        var obj = { bar: 456 };
        Reflect.deleteProperty(obj, "bar");
        return !("bar" in obj);
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.getOwnPropertyDescriptor',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor',
      exec: function() {/*
        var obj = { baz: 789 };
        var desc = Reflect.getOwnPropertyDescriptor(obj, "baz");
        return desc.value === 789 &&
          desc.configurable && desc.writable && desc.enumerable;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox42: true,
        safari10: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.defineProperty',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty',
      exec: function() {/*
        var obj = {};
        Reflect.defineProperty(obj, "foo", { value: 123 });
        return obj.foo === 123 &&
          Reflect.defineProperty(Object.freeze({}), "foo", { value: 123 }) === false;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        edge13: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.getPrototypeOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf',
      exec: function() {/*
        return Reflect.getPrototypeOf([]) === Array.prototype;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.setPrototypeOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf',
      exec: function() {/*
        var obj = {};
        Reflect.setPrototypeOf(obj, Array.prototype);
        return obj instanceof Array;
      */},
      res: {
        babel: { val: false, note_id: 'compiler-proto' },
        closure: { val: false, note_id: 'compiler-proto' },
        typescript: { val: false, note_id: 'compiler-proto' },
        ejs: true,
        edge12: true,
        es6shim: { val: false, note_id: 'compiler-proto' },
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.isExtensible',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible',
      exec: function() {/*
        return Reflect.isExtensible({}) &&
          !Reflect.isExtensible(Object.preventExtensions({}));
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.preventExtensions',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions',
      exec: function() {/*
        var obj = {};
        Reflect.preventExtensions(obj);
        return !Object.isExtensible(obj);
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.ownKeys, string keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys',
      exec: function() {/*
        var obj = Object.create({ C: true });
        obj.A = true;
        Object.defineProperty(obj, 'B', { value: true, enumerable: false });

        return Reflect.ownKeys(obj).sort() + '' === "A,B";
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.ownKeys, symbol keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys',
      exec: function() {/*
        var s1 = Symbol(), s2 = Symbol(), s3 = Symbol();
        var proto = {};
        proto[s1] = true;
        var obj = Object.create(proto);
        obj[s2] = true;
        Object.defineProperty(obj, s3, { value: true, enumerable: false });

        var keys = Reflect.ownKeys(obj);
        return keys.indexOf(s2) >-1 && keys.indexOf(s3) >-1 && keys.length === 2;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.apply',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply',
      exec: function() {/*
        return Reflect.apply(Array.prototype.push, [1,2], [3,4,5]) === 5;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        es6shim: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.construct',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct',
      exec: function() {/*
        return Reflect.construct(function(a, b, c) {
          this.qux = a + b + c;
        }, ["foo", "bar", "baz"]).qux === "foobarbaz";
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.construct sets new.target meta-property',
      exec: function() {/*
        return Reflect.construct(function(a, b, c) {
          if (new.target === Object) {
            this.qux = a + b + c;
          }
        }, ["foo", "bar", "baz"], Object).qux === "foobarbaz";
      */},
      res: {
        typescript: typescript.fallthrough,
        firefox2: false,
        firefox42: true,
        edge13: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Reflect.construct creates instances from third argument',
      exec: function() {/*
        function F(){}
        var obj = Reflect.construct(function(){ this.y = 1; }, [], F);
        return obj.y === 1 && obj instanceof F;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        closure: true,
        es6shim: true,
        typescript: typescript.corejs,
        edge13: true,
        firefox2: false,
        firefox44: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Reflect.construct, Array subclassing',
      exec: function() {/*
        function F(){}
        var obj = Reflect.construct(Array, [], F);
        obj[2] = 'foo';
        return obj.length === 3 && obj instanceof F;
      */},
      res: {
        ejs: null,
        typescript: typescript.fallthrough,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: null,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Reflect.construct, RegExp subclassing',
      exec: function() {/*
        function F(){}
        var obj = Reflect.construct(RegExp, ["baz","g"], F);
        return RegExp.prototype.exec.call(obj, "foobarbaz")[0] === "baz"
          && obj.lastIndex === 9 && obj instanceof F;
      */},
      res: {
        ejs: null,
        typescript: typescript.fallthrough,
        edge13: true,
        firefox2: false,
        firefox45: true,
        firefox46: false,
        firefox49: true,
        xs6: null,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Reflect.construct, Function subclassing',
      exec: function() {/*
        function F(){}
        var obj = Reflect.construct(Function, ["return 2"], F);
        return obj() === 2 && obj instanceof F;
      */},
      res: {
        ejs: null,
        typescript: typescript.fallthrough,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: null,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Reflect.construct, Promise subclassing',
      exec: function() {/*
        function F(){}
        var p1 = Reflect.construct(Promise,[function(resolve, reject) { resolve("foo"); }], F);
        var p2 = Reflect.construct(Promise,[function(resolve, reject) { reject("quux"); }], F);
        var score = +(p1 instanceof F && p2 instanceof F);

        function thenFn(result)  { score += (result === "foo");  check(); }
        function catchFn(result) { score += (result === "quux"); check(); }
        function shouldNotRun(result)  { score = -Infinity;   }

        p1.then = p2.then = Promise.prototype.then;
        p1.catch = p2.catch = Promise.prototype.catch;

        p1.then(thenFn, shouldNotRun);
        p2.then(shouldNotRun, catchFn);
        p1.catch(shouldNotRun);
        p2.catch(catchFn);

        function check() {
          if (score === 4) asyncTestPassed();
        }
      */},
      res: {
        ejs: null,
        babel: babel.corejs,
        typescript: typescript.corejs,
        xs6: null,
        edge13: true,
        firefox2: false,
        firefox42: true,
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'block-level function declaration',
  category: 'bindings',
  significance: 'small',
  note_id: 'block-level-function',
  note_html: 'Note that prior to ES6, it was <a href="http://wiki.ecmascript.org/doku.php?id=conventions:no_non_standard_strict_decls">recommended</a> that ES5 implementations forbid block-level declarations in strict mode.',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation',
  exec: function () {/*
    'use strict';
    if (f() !== 1) return false;
    function f() { return 1; }
    {
      if (f() !== 2) return false;
      function f() { return 2; }
      if (f() !== 2) return false;
    }
    if (f() !== 1) return false;
    return true;
  */},
  res: {
    babel: true,
    tr: true,
    closure: true,
    ie11: true,
    firefox2: false,
    firefox46: true,
    chrome21dev: "flagged",
    chrome41: true,
    node0_12: "flagged",
    node4: true,
    xs6: true,
    safari10: true,
    duktape2_0: false,
  }
},
{
  name: 'destructuring, declarations',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
  subtests: [
    {
      name: 'with arrays',
      exec: function(){/*
        var [a, , [b], c] = [5, null, [6]];
        return a === 5 && b === 6 && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays',
      exec: function(){/*
        var [a, , b] = [,,,];
        return a === undefined && b === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with strings',
      exec: function(){/*
        var [a, b, c] = "ab";
        return a === "a" && b === "b" && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings',
      exec: function(){/*
        var [c] = "𠮷𠮶";
        return c === "𠮷";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances',
      exec: function(){/*
        var [a, b, c] = (function*(){ yield 1; yield 2; }());
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        safari10: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables',
      exec: function(){/*
        var [a, b, c] = global.__createIterableObject([1, 2]);
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        babel: babel.corejs,
        closure: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of generic iterables',
      exec: function(){/*
        var [a, b, c] = Object.create(global.__createIterableObject([1, 2]));
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        var [a, b] = iter;
        return closed;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: false,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        node6_5: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in iterable patterns',
      exec: function(){/*
        var [a,] = [1];
        return a === 1;
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        firefox2: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with objects',
      exec: function(){/*
        var {c, x:d, e} = {c:7, x:8};
        return c === 7 && d === 8 && e === undefined;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: {
          val: true,
          note_id: "ff11-object-destructuring",
          note_html: "Firefox < 16 incorrectly treats <code>({f,g} = {f:9,g:10})</code> as assigning to global variables instead of locals."
        },
        firefox15: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object destructuring with primitives',
      exec: function(){/*
        var {toFixed} = 2;
        var {slice} = '';
        return toFixed === Number.prototype.toFixed
          && slice === String.prototype.slice;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in object patterns',
      exec: function(){/*
        var {a,} = {a:1};
        return a === 1;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'throws on null and undefined',
      exec: function(){/*
        try {
          var {a} = null;
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        try {
          var {b} = undefined;
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        return true;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed properties',
      exec: function(){/*
        var qux = "corge";
        var { [qux]: grault } = { corge: "garply" };
        return grault === "garply";
      */},
      res: {
        babel: true,
        typescript: true,
        closure: true,
        tr: true,
        es6tr: true,
        firefox2: false,
        firefox35: true,
        edge13: "flagged",
        edge14: true,
        safari10: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'multiples in a single var statement',
      exec: function() {/*
        var [a,b] = [5,6], {c,d} = {c:7,d:8};
        return a === 5 && b === 6 && c === 7 && d === 8;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        firefox2: false,
        firefox3: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'nested',
      exec: function(){/*
        var [e, {x:f, g}] = [9, {x:10}];
        var {h, x:[i]} = {h:11, x:[12]};
        return e === 9 && f === 10 && g === undefined
          && h === 11 && i === 12;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'in for-in loop heads',
      exec: function(){/*
        for(var [i, j, k] in { qux: 1 }) {
          return i === "q" && j === "u" && k === "x";
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'in for-of loop heads',
      exec: function(){/*
        for(var [i, j, k] of [[1,2,3]]) {
          return i === 1 && j === 2 && k === 3;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        closure: true,
        firefox2: false,
        firefox13: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'in catch heads',
      exec: function(){/*
        try {
          throw [1,2];
        } catch([i,j]) {
          try {
            throw { k: 3, l: 4 };
          } catch({k, l}) {
            return i === 1 && j === 2 && k === 3 && l === 4;
          }
        }
      */},
      res: {
        firefox2: false,
        firefox3: true,
        babel: babel.corejs,
        tr: true,
        jsx: true,
        closure: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        edge14: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'rest',
      exec: function(){/*
        var [a, ...b] = [3, 4, 5];
        var [c, ...d] = [6];
        return a === 3 && b instanceof Array && (b + "") === "4,5" &&
           c === 6 && d instanceof Array && d.length === 0;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults',
      exec: function(){/*
        var {a = 1, b = 0, z:c = 3} = {b:2, z:undefined};
        var [d = 0, e = 5, f = 6] = [4,,undefined];
        return a === 1 && b === 2 && c === 3
          && d === 4 && e === 5 && f === 6;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        closure: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox47: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults, let temporal dead zone',
      exec: function(){/*
        var {a, b = 2} = {a:1};
        try {
          eval("let {c = c} = {};");
          return false;
        } catch(e){}
        try {
          eval("let {c = d, d} = {d:1};");
          return false;
        } catch(e){}
        return a === 1 && b === 2;
      */},
      res: {
        babel: "flagged",
        closure: true,
        typescript: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox47: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'destructuring, assignment',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
  subtests: [
    {
      name: 'with arrays',
      exec: function(){/*
        var a,b,c;
        [a, , [b], c] = [5, null, [6]];
        return a === 5 && b === 6 && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays',
      exec: function(){/*
        var a, b;
        [a, , b] = [,,,];
        return a === undefined && b === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'with strings',
      exec: function(){/*
        var a,b,c;
        [a, b, c] = "ab";
        return a === "a" && b === "b" && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings',
      exec: function(){/*
        var c;
        [c] = "𠮷𠮶";
        return c === "𠮷";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances',
      exec: function(){/*
        var a,b,c;
        [a, b, c] = (function*(){ yield 1; yield 2; }());
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        safari10: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables',
      exec: function(){/*
        var a,b,c;
        [a, b, c] = global.__createIterableObject([1, 2]);
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        babel: babel.corejs,
        closure: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of generic iterables',
      exec: function(){/*
        var a,b,c;
        [a, b, c] = Object.create(global.__createIterableObject([1, 2]));
        return a === 1 && b === 2 && c === undefined;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        var a,b;
        [a, b] = iter;
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: false,
        chrome51: true,
        node6_5: true,
        edge15: true,
        firefox2: false,
        firefox53: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterable destructuring expression',
      exec: function() {/*
        var a, b, iterable = [1,2];
        return ([a, b] = iterable) === iterable;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: true,
        es6tr: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'chained iterable destructuring',
      exec: function() {/*
        var a,b,c,d;
        [a,b] = [c,d] = [1,2];
        return a === 1 && b === 2 && c === 1 && d === 2;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: true,
        es6tr: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in iterable patterns',
      exec: function(){/*
        var a;
        [a,] = [1];
        return a === 1;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        firefox2: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with objects',
      exec: function(){/*
        var c,d,e;
        ({c, x:d, e} = {c:7, x:8});
        return c === 7 && d === 8 && e === undefined;
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: {
          val: false,
          note_id: "ff11-object-destructuring",
          note_html: "Firefox < 16 incorrectly treats <code>({f,g} = {f:9,g:10})</code> as assigning to global variables instead of locals."
        },
        firefox15: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object destructuring with primitives',
      exec: function(){/*
        var toFixed, slice;
        ({toFixed} = 2);
        ({slice} = '');
        return toFixed === Number.prototype.toFixed
          && slice === String.prototype.slice;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        firefox3_5: false,
        firefox15: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in object patterns',
      exec: function(){/*
        var a;
        ({a,} = {a:1});
        return a === 1;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        firefox4: false,
        firefox15: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object destructuring expression',
      exec: function() {/*
        var a, b, obj = { a:1, b:2 };
        return ({a,b} = obj) === obj;
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        typescript: true,
        es6tr: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'parenthesised left-hand-side is a syntax error',
      exec: function() {/*
        var a, b;
        ({a,b} = {a:1,b:2});
        try {
          eval("({a,b}) = {a:3,b:4};");
        }
        catch(e) {
          return a === 1 && b === 2;
        }
      */},
      res: {
        tr: true,
        babel: true,
        closure: true,
        typescript: true,
        safari7_1: true,
        firefox2: false,
        firefox41: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'chained object destructuring',
      exec: function() {/*
        var a,b,c,d;
        ({a,b} = {c,d} = {a:1,b:2,c:3,d:4});
        return a === 1 && b === 2 && c === 3 && d === 4;
      */},
      res: {
        tr: true,
        firefox2: false,
        firefox3: true,
        firefox3_5: false,
        firefox15: true,
        babel: true,
        closure: true,
        typescript: true,
        es6tr: true,
        safari10: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'throws on null and undefined',
      exec: function(){/*
        var a,b;
        try {
          ({a} = null);
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        try {
          ({b} = undefined);
          return false;
        } catch(e) {
          if (!(e instanceof TypeError))
            return false;
        }
        return true;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed properties',
      exec: function(){/*
        var grault, qux = "corge";
        ({ [qux]: grault } = { corge: "garply" });
        return grault === "garply";
      */},
      res: {
        babel: true,
        typescript: true,
        closure: true,
        tr: true,
        es6tr: true,
        firefox2: false,
        firefox34: true,
        edge13: "flagged",
        edge14: true,
        safari10: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'nested',
      exec: function(){/*
        var e,f,g,h,i;
        [e, {x:f, g}] = [9, {x:10}];
        ({h, x:[i]} = {h:11, x:[12]});
        return e === 9 && f === 10 && g === undefined
          && h === 11 && i === 12;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        firefox3_5: false,
        firefox4: false,
        firefox15: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'rest',
      exec: function(){/*
        var a,b,c,d;
        [a, ...b] = [3, 4, 5];
        [c, ...d] = [6];
        return a === 3 && b instanceof Array && (b + "") === "4,5" &&
           c === 6 && d instanceof Array && d.length === 0;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'nested rest',
      exec: function(){/*
        var a = [1, 2, 3], first, last;
        [first, ...[a[2], last]] = a;
        return first === 1 && last === 3 && (a + "") === "1,2,2";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox47: true,
        xs6: true,
        safari10: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'empty patterns',
      exec: function(){/*
        [] = [1,2];
        ({} = {a:1,b:2});
        return true;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults',
      exec: function(){/*
        var a,b,c,d,e,f;
        ({a = 1, b = 0, z:c = 3} = {b:2, z:undefined});
        [d = 0, e = 5, f = 6] = [4,,undefined];
        return a === 1 && b === 2 && c === 3
          && d === 4 && e === 5 && f === 6;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        closure: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox47: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'destructuring, parameters',
  category: 'syntax',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
  subtests: [
    {
      name: 'with arrays',
      exec: function(){/*
        return function([a, , [b], c]) {
          return a === 5 && b === 6 && c === undefined;
        }([5, null, [6]]);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with sparse arrays',
      exec: function(){/*
        return function([a, , b]) {
          return a === undefined && b === undefined;
        }([,,,]);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'with strings',
      exec: function(){/*
        return function([a, b, c]) {
          return a === "a" && b === "b" && c === undefined;
        }("ab");
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        ejs: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with astral plane strings',
      exec: function(){/*
        return function([c]) {
          return c === "𠮷";
        }("𠮷𠮶");
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generator instances',
      exec: function(){/*
        return function([a, b, c]) {
          return a === 1 && b === 2 && c === undefined;
        }(function*(){ yield 1; yield 2; }());
      */},
      res: {
        tr: true,
        typescript: false,
        firefox2: false,
        firefox34: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        safari5_1: false,
        safari10: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with generic iterables',
      exec: function(){/*
        return function([a, b, c]) {
          return a === 1 && b === 2 && c === undefined;
        }(global.__createIterableObject([1, 2]));
      */},
      res: {
        tr: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        babel: babel.corejs,
        closure: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with instances of generic iterables',
      exec: function(){/*
        return function([a, b, c]) {
          return a === 1 && b === 2 && c === undefined;
        }(Object.create(global.__createIterableObject([1, 2])));
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        typescript: false,
        firefox2: false,
        firefox36: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        (function([a,b]) {}(iter));
        return closed;
      */},
      res: {
        babel: babel.corejs,
        typescript: false,
        edge15: true,
        firefox2: false,
        firefox53: true,
        chrome51: true,
        node6_5: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in iterable patterns',
      exec: function(){/*
        return function([a,]) {
          return a === 1;
        }([1]);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        firefox2: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'with objects',
      exec: function(){/*
        return function({c, x:d, e}) {
          return c === 7 && d === 8 && e === undefined;
        }({c:7, x:8});
      */},
      res: {
        tr: true,
        babel: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: {
          val: true,
          note_id: "ff11-object-destructuring",
          note_html: "Firefox < 16 incorrectly treats <code>({f,g} = {f:9,g:10})</code> as assigning to global variables instead of locals."
        },
        firefox16: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object destructuring with primitives',
      exec: function(){/*
        return function({toFixed}, {slice}) {
          return toFixed === Number.prototype.toFixed
            && slice === String.prototype.slice;
        }(2,'');
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'trailing commas in object patterns',
      exec: function(){/*
        return function({a,}) {
          return a === 1;
        }({a:1});
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'throws on null and undefined',
      exec: function(){/*
        try {
          (function({a}){}(null));
          return false;
        } catch(e) {}
        try {
          (function({b}){}(undefined));
          return false;
        } catch(e) {}
        return true;
      */},
      res: {
        tr: true,
        babel: true,
        ejs: true,
        es6tr: true,
        jsx: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'computed properties',
      exec: function(){/*
        var qux = "corge";
        return function({ [qux]: grault }) {
          return grault === "garply";
        }({ corge: "garply" });
      */},
      res: {
        babel: true,
        typescript: true,
        closure: true,
        tr: true,
        es6tr: true,
        firefox2: false,
        firefox35: true,
        edge13: "flagged",
        edge14: true,
        safari10: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'nested',
      exec: function(){/*
        return function([e, {x:f, g}], {h, x:[i]}) {
          return e === 9 && f === 10 && g === undefined
            && h === 11 && i === 12;
        }([9, {x:10}],{h:11, x:[12]});
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        es6tr: true,
        jsx: true,
        closure: true,
        typescript: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: '\'arguments\' interaction',
      exec: function(){/*
        return (function({a, x:b, y:e}, [c, d]) {
          return arguments[0].a === 1 && arguments[0].x === 2
            && !("y" in arguments[0]) && arguments[1] + '' === "3,4";
        }({a:1, x:2}, [3, 4]));
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        jxa: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'new Function() support',
      exec: function(){/*
        return new Function("{a, x:b, y:e}","[c, d]",
          "return a === 1 && b === 2 && c === 3 && "
          + "d === 4 && e === undefined;"
        )({a:1, x:2}, [3, 4]);
      */},
      res: {
        safari7_1: true,
        typescript: typescript.fallthrough,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox53: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },{
      name: 'in parameters, function \'length\' property',
      exec: function(){/*
        return function({a, b}, [c, d]){}.length === 2;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        firefox2: false,
        firefox3: true,
        safari7_1: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'rest',
      exec: function(){/*
        return function([a, ...b], [c, ...d]) {
          return a === 3 && b instanceof Array && (b + "") === "4,5" &&
             c === 6 && d instanceof Array && d.length === 0;
        }([3, 4, 5], [6]);
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        jsx: true,
        closure: true,
        firefox2: false,
        firefox34: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'empty patterns',
      exec: function(){/*
        return function ([],{}){
          return arguments[0] + '' === "3,4" && arguments[1].x === "foo";
        }([3,4],{x:"foo"});
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        es6tr: true,
        closure: true,
        typescript: true,
        firefox2: true,
        safari9: true,
        edge13: "flagged",
        edge14: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults',
      exec: function(){/*
        return (function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5},
            [f = 6, g = 0, h = 8]) {
          return a === 1 && b === 2 && c === 3 && d === 4 &&
            e === 5 && f === 6 && g === 7 && h === 8;
        }({b:2, c:undefined, x:4},[, 7, undefined]));
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: true,
        es6tr: true,
        closure: true,
        safari10: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox47: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults, separate scope',
      exec: function(){/*
        return (function({a=function(){
          return typeof b === 'undefined';
        }}){
          var b = 1;
          return a();
        }({}));
      */},
      res: {
        babel: false,
        closure: true,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox51: true,
        xs6: true,
        chrome49: true,
        node6: true,
        node6_5: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults, new Function() support',
      exec: function(){/*
        return new Function("{a = 1, b = 0, c = 3, x:d = 0, y:e = 5}",
          "return a === 1 && b === 2 && c === 3 && d === 4 && e === 5;"
        )({b:2, c:undefined, x:4});
      */},
      res: {
        safari10: true,
        typescript: typescript.fallthrough,
        edge13: "flagged",
        edge14: true,
        firefox2: false,
        firefox53: true,
        xs6: true,
        ejs: { val: false, note_id: 'ejs-no-function-ctor' },
        chrome49: true,
        node6: true,
        node6_5: true,
        duktape2_0: false,
      },
    },
    {
      name: 'defaults, arrow function',
      exec: function(){/*
        return ((a, {b = 0, c = 3}) => {
          return a === 1 && b === 2 && c === 3;
        })(1, {b: 2});
      */},
      res: {
        babel: true,
        typescript: true,
        traceur: true,
        edge15: false,
        chrome50: true,
        firefox50: false,
        firefox52: true,
        node6: true,
        node6_5: true,
        node8: true,
        safari9: false,
        safari10: true,
      },
    },
  ],
},
{
  name: 'Promise',
  category: 'built-ins',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  subtests: [
    {
      name: 'basic functionality',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      exec: function () {/*
        var p1 = new Promise(function(resolve, reject) { resolve("foo"); });
        var p2 = new Promise(function(resolve, reject) { reject("quux"); });
        var score = 0;

        function thenFn(result)  { score += (result === "foo");  check(); }
        function catchFn(result) { score += (result === "quux"); check(); }
        function shouldNotRun(result)  { score = -Infinity;   }

        p1.then(thenFn, shouldNotRun);
        p2.then(shouldNotRun, catchFn);
        p1.catch(shouldNotRun);
        p2.catch(catchFn);

        p1.then(function() {
          // Promise.prototype.then() should return a new Promise
          score += p1.then() !== p1;
          check();
        });

        function check() {
          if (score === 4) asyncTestPassed();
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome33: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor requires new',
      exec: function () {/*
        new Promise(function(){});
        try {
          Promise(function(){});
          return false;
        } catch(e) {
          return true;
        }
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        firefox2: false,
        firefox30: true,
        edge12: true,
        chrome33: true,
        node4: true,
        safari10: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.prototype isn\'t an instance',
      exec: function () {/*
        new Promise(function(){});
        try {
          Promise.prototype.then(function(){});
        } catch (e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        firefox31: false,
        firefox45: true,
        chrome33: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.all',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
      exec: function () {/*
        var fulfills = Promise.all([
          new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
          new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); }),
        ]);
        var rejects = Promise.all([
          new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
          new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); }),
        ]);
        var score = 0;
        fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
        rejects.catch(function(result) { score += (result === "qux"); check(); });

        function check() {
          if (score === 2) asyncTestPassed();
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome33: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.all, generic iterables',
      exec: function () {/*
        var fulfills = Promise.all(global.__createIterableObject([
          new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
          new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); }),
        ]));
        var rejects = Promise.all(global.__createIterableObject([
          new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
          new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); }),
        ]));
        var score = 0;
        fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
        rejects.catch(function(result) { score += (result === "qux"); check(); });

        function check() {
          if (score === 2) asyncTestPassed();
        }
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        es6shim: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome43: true,
        safari9: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.race',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race',
      exec: function () {/*
        var fulfills = Promise.race([
          new Promise(function(resolve)   { setTimeout(resolve,1000,"foo"); }),
          new Promise(function(_, reject) { setTimeout(reject, 2000,"bar"); }),
        ]);
        var rejects = Promise.race([
          new Promise(function(_, reject) { setTimeout(reject, 1000,"baz"); }),
          new Promise(function(resolve)   { setTimeout(resolve,2000,"qux"); }),
        ]);
        var score = 0;
        fulfills.then(function(result) { score += (result === "foo"); check(); });
        rejects.catch(function(result) { score += (result === "baz"); check(); });

        function check() {
          if (score === 2) asyncTestPassed();
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome33: true,
        safari10: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.race, generic iterables',
      exec: function () {/*
        var fulfills = Promise.race(global.__createIterableObject([
          new Promise(function(resolve)   { setTimeout(resolve,1000,"foo"); }),
          new Promise(function(_, reject) { setTimeout(reject, 2000,"bar"); }),
        ]));
        var rejects = Promise.race(global.__createIterableObject([
          new Promise(function(_, reject) { setTimeout(reject, 1000,"baz"); }),
          new Promise(function(resolve)   { setTimeout(resolve,2000,"qux"); }),
        ]));
        var score = 0;
        fulfills.then(function(result) { score += (result === "foo"); check(); });
        rejects.catch(function(result) { score += (result === "baz"); check(); });

        function check() {
          if (score === 2) asyncTestPassed();
        }
      */},
      res: {
        babel: babel.corejs,
        closure: true,
        es6shim: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome43: true,
        safari9: true,
        node4: true,
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise[Symbol.species]',
      exec: function () {/*
        var prop = Object.getOwnPropertyDescriptor(Promise, Symbol.species);
        return 'get' in prop && Promise[Symbol.species] === Promise;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Object static methods',
  category: 'built-in extensions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor',
  subtests: [
    {
      name: 'Object.assign',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign',
      exec: function () {/*
        var o = Object.assign({a:true}, {b:true}, {c:true});
        return "a" in o && "b" in o && "c" in o;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.is',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is',
      exec: function () {/*
        return typeof Object.is === 'function' &&
          Object.is(NaN, NaN) &&
         !Object.is(-0, 0);
      */},
      res: {
        tr: true,
        ejs: true,
        es6shim: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox22: true,
        chrome19 : true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        android4_1: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.getOwnPropertySymbols',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols',
      exec: function () {/*
        var o = {};
        var sym = Symbol(), sym2 = Symbol(), sym3 = Symbol();
        o[sym]  = true;
        o[sym2] = true;
        o[sym3] = true;
        var result = Object.getOwnPropertySymbols(o);
        return result[0] === sym
          && result[1] === sym2
          && result[2] === sym3;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        tr: true,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome34: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.setPrototypeOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf',
      exec: function () {/*
        return Object.setPrototypeOf({}, Array.prototype) instanceof Array;
      */},
      res: {
        ejs: true,
        babel: { val: false, note_id: 'compiler-proto' },
        closure: { val: false, note_id: 'compiler-proto' },
        typescript: { val: false, note_id: 'compiler-proto' },
        es6shim: { val: false, note_id: 'compiler-proto' },
        ie11: true,
        firefox2: false,
        firefox31: true,
        chrome34: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Object static methods accept primitives',
  category: 'misc',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor',
  subtests: [
    {
      name: 'Object.getPrototypeOf',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf',
      exec: function () {/*
        return Object.getPrototypeOf('a').constructor === String;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox3_5: true,
        firefox4: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.getOwnPropertyDescriptor',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor',
      exec: function () {/*
        return Object.getOwnPropertyDescriptor('a', 'foo') === undefined;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.getOwnPropertyNames',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames',
      exec: function () {/*
        var s = Object.getOwnPropertyNames('a');
        return s.length === 2 &&
          ((s[0] === 'length' && s[1] === '0') || (s[0] === '0' && s[1] === 'length'));
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox33: true,
        chrome40: true,
        node4: true,
        es6shim: true,
        safari9: true,
        chrome44: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.seal',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal',
      exec: function () {/*
        return Object.seal('a') === 'a';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.freeze',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze',
      exec: function () {/*
        return Object.freeze('a') === 'a';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.preventExtensions',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions',
      exec: function () {/*
        return Object.preventExtensions('a') === 'a';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.isSealed',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed',
      exec: function () {/*
        return Object.isSealed('a') === true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.isFrozen',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen',
      exec: function () {/*
        return Object.isFrozen('a') === true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.isExtensible',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible',
      exec: function () {/*
        return Object.isExtensible('a') === false;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        safari9: true,
        chrome44: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys',
      exec: function () {/*
        var s = Object.keys('a');
        return s.length === 1 && s[0] === '0';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox35: true,
        chrome40: true,
        safari9: true,
        node4: true,
        chrome44: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Object.prototype.__proto__',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.__proto__',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto',
  subtests: [
    {
      name: 'get prototype',
      exec: function() {/*
        var A = function(){};
        return (new A()).__proto__ === A.prototype;
      */},
      res: {
        ie11: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape1_0: true,
        duktape2_0: true,
      },
    },
    {
      name: 'set prototype',
      exec: function() {/*
        var o = {};
        o.__proto__ = Array.prototype;
        return o instanceof Array;
      */},
      res: {
        ie11: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'absent from Object.create(null)',
      exec: function () {/*
        var o = Object.create(null), p = {};
        o.__proto__ = p;
        return Object.getPrototypeOf(o) !== p;
      */},
      res: {
        ie11: true,
        firefox2: false,
        firefox4: true,
        chrome30: true,
        safari6: true,
        opera12: true,
        rhino1_7: true,
        node0_12: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'present in hasOwnProperty()',
      exec: function () {/*
        return Object.prototype.hasOwnProperty('__proto__');
      */},
      res: {
        konq4_14: true,
        ie11: true,
        firefox2: true,
        chrome30: true,
        safari3_1: true,
        opera12: true,
        rhino1_7: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        android4_0: true,
        android4_1: false,
        duktape2_0: true,
      },
    },
    {
      name: 'correct property descriptor',
      exec: function () {/*
        var desc = Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");
        var A = function(){};

        return (desc
          && "get" in desc
          && "set" in desc
          && desc.configurable
          && !desc.enumerable);
      */},
      res: {
        ie11: true,
        firefox2: false,
        firefox17: true,
        chrome30: true,
        safari6: true,
        opera12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'present in Object.getOwnPropertyNames()',
      exec: function () {/*
        return Object.getOwnPropertyNames(Object.prototype).indexOf('__proto__') > -1;
      */},
      res: {
        ie11: true,
        firefox2: false,
        firefox7: true,
        firefox10: false,
        firefox39: true,
        chrome30: true,
        safari6: true,
        opera12: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'function "name" property',
  category: 'built-in extensions',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name',
  subtests: [
    {
      name: 'function statements',
      exec: function () {/*
        function foo(){};
        return foo.name === 'foo' &&
          (function(){}).name === '';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        firefox2: true,
        chrome5: true,
        safari4: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        edge12: true,
        edge13: false,
        edge14: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'function expressions',
      exec: function () {/*
        return (function foo(){}).name === 'foo' &&
          (function(){}).name === '';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        firefox2: true,
        chrome5: true,
        safari4: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        edge12: true,
        edge13: false,
        edge14: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'new Function',
      exec: function () {/*
        return (new Function).name === "anonymous";
      */},
      res: {
        firefox2: true,
        edge12: true,
        safari4: true,
        konq4_14: true,
        rhino1_7: true,
        android4_0: true,
        android4_1: false,
        chrome48: true,
        node6: true,
        node6_5: true,
        xs6: true,
        ejs: { val: false, note_id: 'ejs-no-function-ctor' },
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'bound functions',
      exec: function() {/*
        function foo() {};
        return foo.bind({}).name === "bound foo" &&
          (function(){}).bind({}).name === "bound ";
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox47: true,
        chrome45: true,
        node4: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'variables (function)',
      exec: function() {/*
        var foo = function() {};
        var bar = function baz() {};
        return foo.name === "foo" && bar.name === "baz";
      */},
      res: {
        edge12: "flagged",
        firefox2: false,
        firefox53: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        babel: babel.corejs,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object methods (function)',
      exec: function() {/*
        var o = { foo: function(){}, bar: function baz(){}};
        o.qux = function(){};
        return o.foo.name === "foo" &&
               o.bar.name === "baz" &&
               o.qux.name === "";
      */},
      res: {
        babel: babel.corejs,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox53: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'accessor properties',
      exec: function() {/*
        var o = { get foo(){}, set foo(x){} };
        var descriptor = Object.getOwnPropertyDescriptor(o, "foo");
        return descriptor.get.name === "get foo" &&
               descriptor.set.name === "set foo";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox49: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'shorthand methods',
      exec: function() {/*
        var o = { foo(){} };
        return o.foo.name === "foo";
      */},
      res: {
        babel: babel.corejs,
        firefox2: false,
        firefox34: true,
        edge12: "flagged",
        edge13: true,
        chrome41: "flagged",
        chrome42: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'shorthand methods (no lexical binding)',
      exec: function() {/*
        var f = "foo";
        return ({f() { return f; }}).f() === "foo";
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        firefox2: false,
        firefox34: true,
        edge12: true,
        chrome41: "flagged",
        chrome42: true,
        node4: true,
        xs6: true,
        ejs: true,
        jxa: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'symbol-keyed methods',
      exec: function() {/*
        var sym1 = Symbol("foo");
        var sym2 = Symbol();
        var o = {
          [sym1]: function(){},
          [sym2]: function(){}
        };

        return o[sym1].name === "[foo]" &&
               o[sym2].name === "";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox53: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class statements',
      exec: function() {/*
        class foo {};
        class bar { static name() {} };
        return foo.name === "foo" &&
          typeof bar.name === "function";
      */},
      res: {
        babel: {
          val: false,
          note_id: "name-configurable",
          note_html: 'Requires function <code>"name"</code> properties to be natively configurable',
        },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class expressions',
      exec: function() {/*
        return class foo {}.name === "foo" &&
          typeof class bar { static name() {} }.name === "function";
      */},
      res: {
        babel: { val: false, note_id: "name-configurable" },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'variables (class)',
      exec: function() {/*
        var foo = class {};
        var bar = class baz {};
        var qux = class { static name() {} };
        return foo.name === "foo" &&
               bar.name === "baz" &&
               typeof qux.name === "function";
      */},
      res: {
        babel: { val: false, note_id: "name-configurable" },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox53: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'object methods (class)',
      exec: function() {/*
        var o = { foo: class {}, bar: class baz {}};
        o.qux = class {};
        return o.foo.name === "foo" &&
               o.bar.name === "baz" &&
               o.qux.name === "";
      */},
      res: {
        babel: false,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox53: true,
        chrome50: "flagged",
        chrome51: true,
        node6_5: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class prototype methods',
      exec: function() {/*
        class C { foo(){} };
        return (new C).foo.name === "foo";
      */},
      res: {
        babel: babel.corejs,
        edge12: "flagged",
        edge13: true,
        edge14: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'class static methods',
      exec: function() {/*
        class C { static foo(){} };
        return C.foo.name === "foo";
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari9: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'isn\'t writable, is configurable',
      exec: function () {/*
        var descriptor = Object.getOwnPropertyDescriptor(function f(){},"name");
        return descriptor.enumerable   === false &&
               descriptor.writable     === false &&
               descriptor.configurable === true;
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox38: true,
        chrome43: true,
        node4: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'String static methods',
  category: 'built-in extensions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-constructor',
  subtests: [
    {
      name: 'String.raw',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw',
      exec: function() {/*
        return typeof String.raw === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome41: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.fromCodePoint',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint',
      exec: function() {/*
        return typeof String.fromCodePoint === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome38: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'String.prototype methods',
  category: 'built-in extensions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object',
  subtests: [
    {
      name: 'String.prototype.codePointAt',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt',
      exec: function () {/*
        return typeof String.prototype.codePointAt === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome38: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'String.prototype.normalize',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize',
      exec: function () {/*
        return typeof String.prototype.normalize === "function"
          && "c\u0327\u0301".normalize("NFC") === "\u1e09"
          && "\u1e09".normalize("NFD") === "c\u0327\u0301";
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox31: true,
        chrome34: true,
        chrome41: true,
        node4: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String.prototype.repeat',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat',
      exec: function () {/*
        return typeof String.prototype.repeat === 'function'
          && "foo".repeat(3) === "foofoofoo";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox24: true,
        safari9: true,
        chrome30: "flagged",
        chrome41: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'String.prototype.startsWith',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith',
      exec: function () {/*
        return typeof String.prototype.startsWith === 'function'
          && "foobar".startsWith("foo");
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox17: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'String.prototype.startsWith throws on RegExp',
      exec: function () {/*
        try {
          "a".startsWith(/./);
        } catch(e) {
          return typeof String.prototype.startsWith === 'function';
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox17: false,
        firefox29: true,
        chrome34: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'String.prototype.endsWith',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith',
      exec: function () {/*
        return typeof String.prototype.endsWith === 'function'
          && "foobar".endsWith("bar");
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox17: true,
        chrome30: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'String.prototype.endsWith throws on RegExp',
      exec: function () {/*
        try {
          "a".endsWith(/./);
        } catch(e) {
          return typeof String.prototype.endsWith === 'function';
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox29: true,
        chrome30: false,
        chrome34: "flagged",
        chrome41: true,
        safari9: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'String.prototype.includes',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes',
      exec: function () {/*
        return typeof String.prototype.includes === 'function'
          && "foobar".includes("oba");
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        firefox2: false,
        firefox18: {
          val: false,
          note_id: 'string-contains',
          note_html: 'Available as the draft standard <code>String.prototype.contains</code>'
        },
        firefox40: true,
        chrome30: { val: false, note_id: 'string-contains' },
        chrome41: true,
        safari9: true,
        node0_12: { val: "flagged", note_id: 'string-contains' },
        node4: true,
        edge12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'String.prototype[Symbol.iterator]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator',
      exec: function () {/*
        return typeof String.prototype[Symbol.iterator] === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome37: "flagged",
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String iterator prototype chain',
      exec: function () {/*
        // Iterator instance
        var iterator = ''[Symbol.iterator]();
        // %StringIteratorPrototype%
        var proto1 = Object.getPrototypeOf(iterator);
        // %IteratorPrototype%
        var proto2 = Object.getPrototypeOf(proto1);

        return proto2.hasOwnProperty(Symbol.iterator) &&
          !proto1    .hasOwnProperty(Symbol.iterator) &&
          !iterator  .hasOwnProperty(Symbol.iterator) &&
          iterator[Symbol.iterator]() === iterator;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        safari9: true,
        chrome45: true,
        node4: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'String.prototype HTML methods',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor',
  subtests: [
    {
      name: 'existence',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype#HTML_wrapper_methods',
      exec: function () {/*
        var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
          "italics", "link", "small", "strike", "sub", "sup"];
        for (i = 0; i < names.length; i++) {
          if (typeof String.prototype[names[i]] !== 'function') {
            return false;
          }
        }
        return true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        ie10: true,
        firefox2: false,
        firefox3: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: false,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'tags\' names are lowercase',
      exec: function () {/*
        var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
          "italics", "link", "small", "strike", "sub", "sup"];
        for (i = 0; i < names.length; i++) {
          if (""[names[i]]().toLowerCase() !== ""[names[i]]()) {
            return false;
          }
        }
        return true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: false,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'quotes in arguments are escaped',
      exec: function () {/*
        var i, names = ["anchor", "fontcolor", "fontsize", "link"];
        for (i = 0; i < names.length; i++) {
          if (""[names[i]]('"') !== ""[names[i]]('&' + 'quot;')) {
            return false;
          }
        }
        return true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox17: true,
        chrome5: true,
        safari6: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: false,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Unicode code point escapes',
  category: 'syntax',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals',
  subtests: [
    {
      name: 'in strings',
      exec: function () {/*
        return '\u{1d306}' == '\ud834\udf06';
      */},
      res: {
        tr: true,
        babel: true,
        typescript: true,
        es6tr: true,
        ejs: true,
        closure: true,
        edge12: true,
        safari9: true,
        chrome44: true,
        firefox2: false,
        firefox40: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      }
    },
    {
      name: 'in identifiers',
      exec: function(){/*
        var \u{102C0} = { \u{102C0} : 2 };
        return \u{102C0}['\ud800\udec0'] === 2;
      */},
      res: {
        ejs: true,
        edge12: true,
        chrome44: true,
        firefox2: false,
        firefox53: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      }
    },
  ]
},
{
  name: 'new.target',
  category: 'syntax',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-built-in-function-objects',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target',
  subtests: [
    {
      name: 'in constructors',
      exec: function () {/*
        var passed = false;
        new function f() {
          passed = (new.target === f);
        }();
        (function() {
          passed &= (new.target === undefined);
        }());
        return passed;
      */},
      res: {
        firefox2: false,
        firefox41: true,
        safari10: true,
        chrome46: true,
        edge13: true,
        node5: true,
        xs6: true,
        ejs: true,
        duktape2_0: false,
      }
    },
    {
      name: 'assignment is an early error',
      exec: function(){/*
        var passed = false;
        new function f() {
          passed = (new.target === f);
        }();

        try {
          Function("new.target = function(){};");
        } catch(e) {
          return passed;
        }
      */},
      res: {
        firefox2: false,
        firefox41: true,
        chrome46: true,
        edge14: true,
        node5: true,
        xs6: true,
        ejs: true,
        safari10: true,
        duktape2_0: false,
      }
    },
  ]
},
{
  name: 'Symbol',
  category: 'built-ins',
  significance: 'large',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
  subtests: [
    {
      name: 'basic functionality',
      exec: function(){/*
        var object = {};
        var symbol = Symbol();
        var value = {};
        object[symbol] = value;
        return object[symbol] === value;
      */},
      res: {
        tr: true,
        ejs: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome30: "flagged", // Actually Chrome 29
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'typeof support',
      exec: function(){/*
        return typeof Symbol() === "symbol";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.fallthrough,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome30: "flagged", // Actually Chrome 29
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'symbol keys are hidden to pre-ES6 code',
      exec: function(){/*
        var object = {};
        var symbol = Symbol();
        object[symbol] = 1;

        for (var x in object){}
        var passed = !x;

        if (Object.keys && Object.getOwnPropertyNames) {
          passed &= Object.keys(object).length === 0
            && Object.getOwnPropertyNames(object).length === 0;
        }

        return passed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome30: "flagged", // Actually Chrome 29
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.defineProperty support',
      exec: function(){/*
        var object = {};
        var symbol = Symbol();
        var value = {};

        if (Object.defineProperty) {
          Object.defineProperty(object, symbol, { value: value });
          return object[symbol] === value;
        }

        return passed;
      */},
      res: {
        tr: true,
        typescript: typescript.corejs,
        ejs: true,
        babel: babel.corejs,
        closure: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome30: "flagged", // Actually Chrome 29
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'symbols inherit from Symbol.prototype',
      exec: function(){/*
        var symbol = Symbol();
        var passed = symbol.foo === undefined;
        Symbol.prototype.foo = 2;
        passed &= symbol.foo === 2;
        delete Symbol.prototype.foo;
        return passed;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome30: "flagged", // Actually Chrome 29
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'cannot coerce to string or number',
      exec: function(){/*
        var symbol = Symbol();

        try {
          symbol + "";
          return false;
        }
        catch(e) {}

        try {
          symbol + 0;
          return false;
        } catch(e) {}

        return true;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'can convert with String()',
      exec: function(){/*
        return String(Symbol("foo")) === "Symbol(foo)";
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        chrome39: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'new Symbol() throws',
      exec: function(){/*
        var symbol = Symbol();
        try {
          new Symbol();
        } catch(e) {
          return true;
        }
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome35: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object(symbol)',
      exec: function(){/*
        var symbol = Symbol();
        var symbolObject = Object(symbol);

        return typeof symbolObject === "object" &&
          symbolObject instanceof Symbol &&
          symbolObject == symbol &&
          symbolObject !== symbol &&
          symbolObject.valueOf() === symbol;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome30: "flagged",
        chrome35: false,
        chrome48: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
        duktape2_1: true,
      },
    },
    {
      name: 'JSON.stringify ignores symbol primitives',
      exec: function() {/*
        var object = { foo: Symbol() };
        object[Symbol()] = 1;
        var array = [Symbol()];
        return JSON.stringify(object) === '{}' && JSON.stringify(array) === '[null]' && JSON.stringify(Symbol()) === undefined;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge13: true,
        es6shim: true,
        firefox2: false,
        firefox35: false,
        firefox36: true,
        firefox48: true,
        chrome35: "flagged",
        chrome38: true,
        chrome49: true,
        chrome52: true,
        node0_12: true,
        node4: true,
        node6: true,
        safari9: false,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'JSON.stringify ignores symbol objects',
      exec: function() {/*
        var testSymbolObject = function (sym) {
          var object = { foo: sym };
          try {
            // some browsers throw a TypeError when setting symbol object keys.
            // this isn't part of this test, so, ignore it if so.
            object[sym] = 1;
          } catch (e) {} // some browsers throw a TypeError when setting symbol object keys.
          var array = [sym];
          return JSON.stringify(object) === '{"foo":{}}' && JSON.stringify(array) === '[{}]' && JSON.stringify(sym) === '{}';
        };
        var objSym = Object(Symbol());
        var symNoToJSON = Object(Symbol());
        Object.defineProperty(symNoToJSON, 'toJSON', { enumerable: false, value: null }); // ensure it overrides the prototype, but is not callable
        return testSymbolObject(objSym) && testSymbolObject(symNoToJSON);
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge13: true,
        es6shim: true,
        firefox2: false,
        firefox35: false,
        firefox36: true,
        firefox48: true,
        node0_12: false,
        node4: false,
        node6: true,
        chrome38: false,
        chrome48: false,
        chrome49: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      }
    },
    {
      name: 'global symbol registry',
      exec: function() {/*
        var symbol = Symbol.for('foo');
        return Symbol.for('foo') === symbol &&
           Symbol.keyFor(symbol) === 'foo';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox36: true,
        chrome35: "flagged",
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'well-known symbols',
  category: 'built-ins',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols',
  note_id: 'symbol-iterator-functionality',
  note_html: 'Functionality for <code>Symbol.iterator</code> is tested by the "generic iterators" subtests for '
    + 'the <a href="#test-spread_(...)_operator">spread (...) operator</a>, <a href="#test-for..of_loops">for..of loops</a>, '
    + '<a href="#test-destructuring">destructuring</a>, <a href="#test-generators">yield *</a>, '
    + 'and <a href="#test-Array_static_methods">Array.from</a>.',
  subtests: [
    {
      name: 'Symbol.hasInstance',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance',
      exec: function() {/*
        var passed = false;
        var obj = { foo: true };
        var C = function(){};
        Object.defineProperty(C, Symbol.hasInstance, {
          value: function(inst) { passed = inst.foo; return false; }
        });
        obj instanceof C;
        return passed;
      */},
      res: {
        babel: "flagged",
        typescript: typescript.fallthrough,
        edge15: true,
        chrome50: "flagged",
        chrome51: true,
        firefox2: false,
        firefox50: true,
        ejs: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.isConcatSpreadable',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable',
      exec: function() {/*
        var a = [], b = [];
        b[Symbol.isConcatSpreadable] = false;
        a = a.concat(b);
        return a[0] === b;
      */},
      res: {
        typescript: typescript.fallthrough,
        edge15: true,
        ejs: true,
        chrome48: true,
        firefox2: false,
        firefox48: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.iterator, existence',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator',
      exec: function() {/*
        return "iterator" in Symbol;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        edge12: true,
        edge14: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome37: "flagged",
        chrome38: true,
        ejs: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Symbol.iterator, arguments object',
      exec: function() {/*
        return (function() {
          return typeof arguments[Symbol.iterator] === 'function'
            && Object.hasOwnProperty.call(arguments, Symbol.iterator);
        }());
      */},
      res: {
        chrome37: "flagged",
        chrome38: true,
        safari9: true,
        firefox2: false,
        firefox46: true,
        node0_12: false,
        node4: true,
        node5: true,
        edge12: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.species, existence',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species',
      exec: function() {/*
        return "species" in Symbol;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        firefox2: false,
        firefox41: true,
        edge13: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.species, Array.prototype.concat',
      exec: function () {/*
        var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.concat.call(obj, []).foo === 1;
      */},
      res: {
        ejs: true,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, Array.prototype.filter',
      exec: function () {/*
        var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.filter.call(obj, Boolean).foo === 1;
      */},
      res: {
        ejs: true,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, Array.prototype.map',
      exec: function () {/*
        var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.map.call(obj, Boolean).foo === 1;
      */},
      res: {
        ejs: true,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, Array.prototype.slice',
      exec: function () {/*
        var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.slice.call(obj, 0).foo === 1;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, Array.prototype.splice',
      exec: function () {/*
        var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.splice.call(obj, 0).foo === 1;
      */},
      res: {
        ejs: true,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, RegExp.prototype[Symbol.split]',
      exec: function () {/*
        var passed = false;
        var obj = { constructor: {} };
        obj[Symbol.split] = RegExp.prototype[Symbol.split];
        obj.constructor[Symbol.species] = function() {
          passed = true;
          return /./;
        };
        "".split(obj);
        return passed;
      */},
      res: {
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        chrome51: true,
        xs6: true,
        ejs: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.species, Promise.prototype.then',
      exec: function () {/*
        var promise      = new Promise(function(resolve){ resolve(42); });
        var FakePromise1 = promise.constructor = function(exec){ exec(function(){}, function(){}); };
        var FakePromise2 = function(exec){ exec(function(){}, function(){}); };
        Object.defineProperty(FakePromise1, Symbol.species, {value: FakePromise2});
        return promise.then(function(){}) instanceof FakePromise2;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge13: false,
        edge14: true,
        firefox2: false,
        firefox45: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: null,
        ejs: null,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.replace',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace',
      exec: function () {/*
        var O = {};
        O[Symbol.replace] = function(){
          return 42;
        };
        return ''.replace(O) === 42;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.search',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/search',
      exec: function () {/*
        var O = {};
        O[Symbol.search] = function(){
          return 42;
        };
        return ''.search(O) === 42;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.split',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split',
      exec: function () {/*
        var O = {};
        O[Symbol.split] = function(){
          return 42;
        };
        return ''.split(O) === 42;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.match',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match',
      exec: function () {/*
        var O = {};
        O[Symbol.match] = function(){
          return 42;
        };
        return ''.match(O) === 42;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.match, RegExp constructor',
      exec: function () {/*
        var re = /./;
        re[Symbol.match] = false;
        var foo = {constructor: RegExp};
        foo[Symbol.match] = true;
        return RegExp(re) !== re && RegExp(foo) === foo;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        edge14: "flagged",
        firefox2: false,
        firefox40: true,
        chrome50: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.match, String.prototype.startsWith',
      exec: function () {/*
        var re = /./;
        try {
          '/./'.startsWith(re);
        } catch(e){
          re[Symbol.match] = false;
          return '/./'.startsWith(re);
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        firefox2: false,
        firefox40: true,
        edge14: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.match, String.prototype.endsWith',
      exec: function () {/*
        var re = /./;
        try {
          '/./'.endsWith(re);
        } catch(e){
          re[Symbol.match] = false;
          return '/./'.endsWith(re);
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        firefox2: false,
        firefox40: true,
        edge14: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.match, String.prototype.includes',
      exec: function () {/*
        var re = /./;
        try {
          '/./'.includes(re);
        } catch(e){
          re[Symbol.match] = false;
          return '/./'.includes(re);
        }
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        firefox2: false,
        firefox40: true,
        edge14: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Symbol.toPrimitive',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive',
      exec: function() {/*
        var a = {}, b = {}, c = {};
        var passed = 0;
        a[Symbol.toPrimitive] = function(hint) { passed += hint === "number";  return 0; };
        b[Symbol.toPrimitive] = function(hint) { passed += hint === "string";  return 0; };
        c[Symbol.toPrimitive] = function(hint) { passed += hint === "default"; return 0; };

        a >= 0;
        b in {};
        c == 0;
        return passed === 3;
      */},
      res: {
        ejs: true,
        typescript: typescript.fallthrough,
        edge15: true,
        firefox2: false,
        firefox44: true,
        chrome47: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.toStringTag',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag',
      exec: function() {/*
        var a = {};
        a[Symbol.toStringTag] = "foo";
        return (a + "") === "[object foo]";
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox51: true,
        chrome40: "flagged",
        chrome49: true,
        node4: "flagged",
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.toStringTag affects existing built-ins',
      exec: function() {/*
        var s = Symbol.toStringTag;
        var passed = true;
        [
          [Array.prototype, []],
          [String.prototype, ''],
          [arguments, arguments],
          [Function.prototype, function(){}],
          [Error.prototype, new Error()],
          [Boolean.prototype, true],
          [Number.prototype, 2],
          [Date.prototype, new Date()],
          [RegExp.prototype, /./]
        ].forEach(function(pair){
          pair[0][s] = "foo";
          passed &= (Object.prototype.toString.call(pair[1]) === "[object foo]");
          delete pair[0][s];
        });
        return passed;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox51: true,
        chrome40: "flagged",
        chrome49: true,
        chrome55: false,
        chrome57: true,
        node4: "flagged",
        node8: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.toStringTag, new built-ins',
      exec: function() {/*
        var passed = true;
        var s = Symbol.toStringTag;
        [
          [String, "String Iterator"],
          [Array, "Array Iterator"],
          [Map, "Map Iterator"],
          [Set, "Set Iterator"]
        ].forEach(function(pair){
          var iterProto = Object.getPrototypeOf(new pair[0]()[Symbol.iterator]());
          passed = passed
            && iterProto.hasOwnProperty(s)
            && iterProto[s] === pair[1];
        });
        passed = passed
          && Object.getPrototypeOf(function*(){})[s] === "GeneratorFunction"
          && Object.getPrototypeOf(function*(){}())[s] === "Generator"
          && Map.prototype[s] === "Map"
          && Set.prototype[s] === "Set"
          && ArrayBuffer.prototype[s] === "ArrayBuffer"
          && DataView.prototype[s] === "DataView"
          && Promise.prototype[s] === "Promise"
          && Symbol.prototype[s] === "Symbol"
          && typeof Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get === "function";
          return passed;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox51: true,
        chrome49: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.toStringTag, misc. built-ins',
      exec: function() {/*
        var s = Symbol.toStringTag;
        return Math[s] === "Math"
          && JSON[s] === "JSON";
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox51: true,
        chrome40: "flagged",
        chrome49: true,
        node4: "flagged",
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Symbol.unscopables',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables',
      exec: function() {/*
        var a = { foo: 1, bar: 2 };
        a[Symbol.unscopables] = { bar: true };
        with (a) {
          return foo === 1 && typeof bar === "undefined";
        }
      */},
      res: {
        edge12: true,
        firefox2: false,
        firefox48: true,
        chrome38: true,
        safari9: true,
        ejs: {
          val: false,
          note_id: 'ejs-no-with',
          note_html: '<code>with</code> is not supported in ejs'
        },
        typescript: typescript.fallthrough,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'RegExp.prototype properties',
  category: 'built-in extensions',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/prototype',
  subtests: [
    {
      name: 'RegExp.prototype.flags',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags',
      exec: function () {/*
        return /./igm.flags === "gim" && /./.flags === "";
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        es6shim: true,
        firefox2: false,
        firefox37: true,
        safari9: true,
        xs6: true,
        chrome48: "flagged",
        chrome49: true,
        edge14: "flagged",
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.match]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match',
      exec: function () {/*
        return typeof RegExp.prototype[Symbol.match] === 'function';
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.replace]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace',
      exec: function () {/*
        return typeof RegExp.prototype[Symbol.replace] === 'function';
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.split]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@split',
      exec: function () {/*
        return typeof RegExp.prototype[Symbol.split] === 'function';
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype[Symbol.search]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@search',
      exec: function () {/*
        return typeof RegExp.prototype[Symbol.search] === 'function';
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        chrome50: true,
        edge14: "flagged",
        firefox2: false,
        firefox49: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@species',
      exec: function () {/*
        var prop = Object.getOwnPropertyDescriptor(RegExp, Symbol.species);
        return 'get' in prop && RegExp[Symbol.species] === RegExp;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge13: true,
        firefox2: false,
        firefox49: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ]
},
// As this one is Annex B, it is separate from the above.
{
  name: 'RegExp.prototype.compile',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.compile',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile',
  subtests: [
    {
      name: "basic functionality",
      exec: function () {/*
        if (typeof RegExp.prototype.compile !== 'function')
          return false
        var rx = /a/;
        rx.compile('b');
        return rx.test('b');
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        duktape2_0: false,
      }
    },
    {
      name: "returns this",
      exec: function () {/*
        var rx = /a/;
        return rx.compile('b') === rx;
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: false,
        chrome57: true,
        safari5_1: false,
        safari10: true,
        konq4_14: null,
        rhino1_7: null,
        node0_12: false,
        node8: true,
        android4_0: false,
        xs6: null,
        duktape2_0: false,
      }
    },
  ]
},
{
  name: 'RegExp syntax extensions',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns',
  subtests: [
    {
      name: 'hyphens in character sets',
      exec: function() {/*
        return /[\w-_]/.exec("-")[0] === "-";
      */},
      res: {
        ejs: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'invalid character escapes',
      exec: function() {/*
        return /\z/.exec("\\z")[0] === "z"
          && /[\z]/.exec("[\\z]")[0] === "z";
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'invalid control-character escapes',
      exec: function() {/*
        return /\c2/.exec("\\c2")[0] === "\\c2";
      */},
      res: {
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari4: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'invalid Unicode escapes',
      exec: function() {/*
        return /\u1/.exec("u1")[0] === "u1"
          && /[\u1]/.exec("u")[0] === "u";
      */},
      res: {
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari3_1: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'invalid hexadecimal escapes',
      exec: function() {/*
        return /\x1/.exec("x1")[0] === "x1"
          && /[\x1]/.exec("x")[0] === "x";
      */},
      res: {
        ie10: true,
        firefox2: false,
        firefox4: true,
        chrome5: true,
        safari3_1: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'incomplete patterns and quantifiers',
      exec: function() {/*
        return /x{1/.exec("x{1")[0] === "x{1"
          && /x]1/.exec("x]1")[0] === "x]1";
      */},
      res: {
        ejs: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'octal escape sequences',
      exec: function() {/*
        return /\041/.exec("!")[0] === "!"
          && /[\041]/.exec("!")[0] === "!";
      */},
      res: {
        ejs: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'invalid backreferences become octal escapes',
      exec: function() {/*
        return /\41/.exec("!")[0] === "!"
          && /[\41]/.exec("!")[0] === "!";
      */},
      res: {
        ejs: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Array static methods',
  category: 'built-in extensions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor',
  subtests: [
    {
      name: 'Array.from, array-like objects',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Array_from_an_Array-like_object_(arguments)',
      exec: function () {/*
        return Array.from({ 0: "foo", 1: "bar", length: 2 }) + '' === "foo,bar";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox32: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from, generator instances',
      exec: function () {/*
        var iterable = (function*(){ yield 1; yield 2; yield 3; }());
        return Array.from(iterable) + '' === "1,2,3";
      */},
      res: {
        tr: true,
        ejs: true,
        babel: true,
        typescript: typescript.fallthrough,
        closure: true,
        es6shim: true,
        firefox2: false,
        firefox32: true,
        chrome45: true,
        edge12: "flagged",
        node4: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from, generic iterables',
      exec: function () {/*
        var iterable = global.__createIterableObject([1, 2, 3]);
        return Array.from(iterable) + '' === "1,2,3";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        closure: true,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from, instances of generic iterables',
      exec: function () {/*
        var iterable = global.__createIterableObject([1, 2, 3]);
        return Array.from(Object.create(iterable)) + '' === "1,2,3";
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        tr: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from map function, array-like objects',
      exec: function () {/*
        return Array.from({ 0: "foo", 1: "bar", length: 2 }, function(e, i) {
          return e + this.baz + i;
        }, { baz: "d" }) + '' === "food0,bard1";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox32: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from map function, generator instances',
      exec: function () {/*
        var iterable = (function*(){ yield "foo"; yield "bar"; yield "bal"; }());
        return Array.from(iterable, function(e, i) {
          return e + this.baz + i;
        }, { baz: "d" }) + '' === "food0,bard1,bald2";
      */},
      res: {
        tr: true,
        babel: true,
        typescript: typescript.fallthrough,
        es6shim: true,
        firefox2: false,
        firefox32: true,
        chrome45: true,
        edge12: "flagged",
        node4: true,
        edge13: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from map function, generic iterables',
      exec: function () {/*
        var iterable = global.__createIterableObject(["foo", "bar", "bal"]);
        return Array.from(iterable, function(e, i) {
          return e + this.baz + i;
        }, { baz: "d" }) + '' === "food0,bard1,bald2";
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        es6shim: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from map function, instances of iterables',
      exec: function () {/*
        var iterable = global.__createIterableObject(["foo", "bar", "bal"]);
        return Array.from(Object.create(iterable), function(e, i) {
          return e + this.baz + i;
        }, { baz: "d" }) + '' === "food0,bard1,bald2";
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        tr: true,
        edge12: true,
        firefox2: false,
        firefox36: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from, iterator closing',
      exec: function () {/*
        var closed = false;
        var iter = global.__createIterableObject([1, 2, 3], {
          'return': function(){ closed = true; return {}; }
        });
        try {
          Array.from(iter, function() { throw 42 });
        } catch(e){}
        return closed;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge15: true,
        firefox2: false,
        firefox36: true,
        chrome51: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.of',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of',
      exec: function () {/*
        return typeof Array.of === 'function' &&
          Array.of(2)[0] === 2;
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome39: "flagged",
        chrome40: false,
        chrome45: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array[Symbol.species]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species',
      exec: function () {/*
        var prop = Object.getOwnPropertyDescriptor(Array, Symbol.species);
        return 'get' in prop && Array[Symbol.species] === Array;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Array.prototype methods',
  category: 'built-in extensions',
  significance: 'medium',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object',
  subtests: [
    {
      name: 'Array.prototype.copyWithin',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin',
      exec: function () {/*
        return typeof Array.prototype.copyWithin === 'function';
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox32: true,
        safari9: true,
        chrome45: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.find',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
      exec: function () {/*
        return typeof Array.prototype.find === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome30: "flagged",
        chrome45: true,
        safari7_1: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.findIndex',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
      exec: function () {/*
        return typeof Array.prototype.findIndex === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome30: "flagged",
        chrome45: true,
        safari7_1: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.fill',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill',
      exec: function () {/*
        return typeof Array.prototype.fill === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox31: true,
        chrome36: "flagged",
        chrome45: true,
        safari7_1: true,
        node0_12: "flagged",
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.keys',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys',
      exec: function () {/*
        return typeof Array.prototype.keys === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox28: true,
        chrome30: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.values',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values',
      exec: function () {/*
        return typeof Array.prototype.values === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        chrome51: true,
        chrome52: {
          val: false,
          note_id: 'cr-array-prototype-values',
          note_html: 'The feature was disabled due to a <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=615873">compatibility issue</a>.',
        },
        safari9: true,
        firefox2: false,
        firefox17: {
          val: false,
          note_id: 'fx-array-prototype-values',
          note_html: 'Available from Firefox 17 up to 27 as the non-standard <code>Array.prototype.iterator</code>'
        },
        firefox27: {
          val: false,
          note_id: 'fx-array-prototype-values-2',
          note_html: 'Available from Firefox 27 up to 35 as the non-standard <code>Array.prototype["@@iterator"]</code>'
        },
        firefox36: {
          val: false,
          note_id: 'array-prototype-iterator',
          note_html: 'Available from Firefox 36 up to 47 as <code>Array.prototype[Symbol.iterator]</code>'
        },
        firefox48: true,
        firefox49: {
          val: false,
          note_id: 'array-prototype-values',
          note_html: 'The feature is enabled only in Firefox Nightly due to a <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1299593">compatibility issue</a>.',
        },
        chrome30: "flagged",
        chrome38: { val: false, note_id: 'array-prototype-iterator' },
        node0_12: true,
        node4: false,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype.entries',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries',
      exec: function () {/*
        return typeof Array.prototype.entries === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox28: true,
        chrome30: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype[Symbol.iterator]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator',
      exec: function () {/*
        return typeof Array.prototype[Symbol.iterator] === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        ejs: true,
        edge12: true,
        safari9: true,
        firefox2: false,
        firefox17: {
          val: false,
          note_id: 'fx-array-prototype-values',
        },
        firefox27: {
          val: false,
          note_id: 'fx-array-prototype-values-2',
        },
        firefox36: true,
        chrome37: "flagged",
        chrome38: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array iterator prototype chain',
      exec: function () {/*
        // Iterator instance
        var iterator = [][Symbol.iterator]();
        // %ArrayIteratorPrototype%
        var proto1 = Object.getPrototypeOf(iterator);
        // %IteratorPrototype%
        var proto2 = Object.getPrototypeOf(proto1);

        return proto2.hasOwnProperty(Symbol.iterator) &&
          !proto1    .hasOwnProperty(Symbol.iterator) &&
          !iterator  .hasOwnProperty(Symbol.iterator) &&
          iterator[Symbol.iterator]() === iterator;
      */},
      res: {
        babel: babel.corejs,
        ejs: true,
        typescript: typescript.corejs,
        safari9: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        chrome51: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.prototype[Symbol.unscopables]',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables',
      exec: function () {/*
        var unscopables = Array.prototype[Symbol.unscopables];
        if (!unscopables) {
          return false;
        }
        var ns = "find,findIndex,fill,copyWithin,entries,keys,values".split(",");
        for (var i = 0; i < ns.length; i++) {
          if (Array.prototype[ns[i]] && !unscopables[ns[i]]) return false;
        }
        return true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge12: true,
        firefox2: false,
        firefox48: true,
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Number properties',
  category: 'built-in extensions',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number',
  subtests: [
    {
      name: 'Number.isFinite',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite',
      exec: function () {/*
        return typeof Number.isFinite === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox16: true,
        chrome19 : true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        android4_1: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.isInteger',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger',
      exec: function () {/*
        return typeof Number.isInteger === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox16: true,
        chrome34: true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.isSafeInteger',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger',
      exec: function () {/*
        return typeof Number.isSafeInteger === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox32: true,
        chrome34: true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.isNaN',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN',
      exec: function () {/*
        return typeof Number.isNaN === 'function';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox15: true,
        chrome19 : true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        android4_1: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.parseFloat',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat',
      exec: function () {/*
        var actualGlobal = Function('return this')();
        return typeof Number.parseFloat === 'function'
          && Number.parseFloat === actualGlobal.parseFloat;
      */},
      res: {
        babel: babel.corejs,
        chrome34: true,
        edge12: true,
        es6shim: true,
        firefox25: true,
        node0_12: true,
        safari9: true,
        typescript: typescript.corejs,
      },
    },
    {
      name: 'Number.parseInt',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt',
      exec: function () {/*
        var actualGlobal = Function('return this')();
        return typeof Number.parseInt === 'function'
          && Number.parseInt === actualGlobal.parseInt;
      */},
      res: {
        babel: babel.corejs,
        chrome34: true,
        edge12: true,
        es6shim: true,
        firefox25: true,
        node0_12: true,
        safari9: true,
        typescript: typescript.corejs,
      },
    },
    {
      name: 'Number.EPSILON',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON',
      exec: function () {/*
        return typeof Number.EPSILON === 'number';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.MIN_SAFE_INTEGER',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER',
      exec: function () {/*
        return typeof Number.MIN_SAFE_INTEGER === 'number';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox31: true,
        chrome34: true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number.MAX_SAFE_INTEGER',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER',
      exec: function () {/*
        return typeof Number.MAX_SAFE_INTEGER === 'number';
      */},
      res: {
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox31: true,
        chrome34: true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Math methods',
  category: 'built-in extensions',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-math',
  subtests: (function(){
    var methods = {
      'clz32': {
        ejs: true,
        tr: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox31: true,
        chrome35: "flagged",
        chrome38: true,
        safari9: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'imul': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox23: true,
        chrome21dev: {
          val: true,
          note_id: 'chromu-imul',
          note_html: 'Available since Chrome 28'
        },
        chrome30: true,
        safari7: true,
        safari10: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'sign': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome33: "flagged",
        chrome38: true,
        safari9: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'log10': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
      'log2': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
      'log1p': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome35: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'expm1': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome35: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'cosh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'sinh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'tanh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'acosh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'asinh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'atanh': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'trunc': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        closure: true,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome33: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
      'fround': {
        ejs: true,
        babel: babel.corejs,
        typescript: typescript.corejs,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox26: true,
        chrome35: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
      'cbrt': {
        ejs: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        tr: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox25: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    };
    var eqFn = ' === "function"';
    return Object.keys(methods).map(function(m) {
      return {
        name: 'Math.' + m,
        mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/' + m,
        exec: eval('0,function(){/*\n  return typeof Math.' +
          m + eqFn + ';\n*/}'),
        res: methods[m]
      };
    }).concat({
      name: 'Math.hypot',
      mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot',
      exec: function(){/*
        return Math.hypot() === 0 &&
          Math.hypot(1) === 1 &&
          Math.hypot(9, 12, 20) === 25 &&
          Math.hypot(27, 36, 60, 100) === 125;
      */},
      res: {
        ejs: true,
        babel: babel.corejs,
        closure: true,
        typescript: typescript.corejs,
        tr: true,
        es6shim: true,
        firefox2: false,
        firefox27: true,
        edge12: true,
        chrome34: "flagged",
        chrome38: true,
        safari7_1: true,
        konq4_14: true,
        node0_12: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      }
    });
  }()),
},
{
  name: 'Date.prototype[Symbol.toPrimitive]',
  category: 'built-in extensions',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype-@@toprimitive',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive',
  exec: function () {/*
    var tp = Date.prototype[Symbol.toPrimitive];
    return tp.call(Object(2), "number") === 2
      && tp.call(Object(2), "string") === "2"
      && tp.call(Object(2), "default") === "2";
  */},
  res: {
    ejs: true,
    babel: babel.corejs,
    typescript: typescript.corejs,
    edge15: true,
    firefox2: false,
    firefox44: true,
    chrome47: true,
    xs6: true,
    safari10: true,
    duktape2_0: false,
  }
},
{
  name: 'Array is subclassable',
  category: 'subclassing',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor',
  subtests: [
    {
      name: 'length property (accessing)',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        var len1 = c.length;
        c[2] = 'foo';
        var len2 = c.length;
        return len1 === 0 && len2 === 3;
      */},
      res: {
        node4: "strict",
        chrome43: "strict",
        chrome49: true,
        safari9: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'length property (setting)',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        c[2] = 'foo';
        c.length = 1;
        return c.length === 1 && !(2 in c);
      */},
      res: {
        node4: "strict",
        chrome43: "strict",
        chrome49: true,
        safari9: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct prototype chain',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        return c instanceof C && c instanceof Array && Object.getPrototypeOf(C) === Array;
      */},
      res: {
        babel: { val: false, note_id: 'compiler-proto' },
        node4: "strict",
        chrome43: "strict",
        chrome49: true,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Array.isArray support',
      exec: function () {/*
        class C extends Array {}
        return Array.isArray(new C());
      */},
      res: {
        safari9: true,
        chrome43: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.prototype.concat',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        return c.concat(1) instanceof C;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.prototype.filter',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        return c.filter(Boolean) instanceof C;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.prototype.map',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        return c.map(Boolean) instanceof C;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        jxa: true,
        safari10: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.prototype.slice',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        c.push(2,4,6);
        return c.slice(1,2) instanceof C;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.prototype.splice',
      exec: function () {/*
        class C extends Array {}
        var c = new C();
        c.push(2,4,6);
        return c.splice(1,2) instanceof C;
      */},
      res: {
        edge13: true,
        firefox2: false,
        firefox48: true,
        chrome50: "flagged",
        chrome51: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.from',
      exec: function () {/*
        class C extends Array {}
        return C.from({ length: 0 }) instanceof C;
      */},
      res: {
        tr: { val: false, note_id: 'compiler-proto' },
        babel: { val: false, note_id: 'compiler-proto' },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        ejs: true,
        chrome45: "strict",
        chrome49: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
    {
      name: 'Array.of',
      exec: function () {/*
        class C extends Array {}
        return C.of(0) instanceof C;
      */},
      res: {
        tr: { val: false, note_id: 'compiler-proto' },
        babel: { val: false, note_id: 'compiler-proto' },
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        chrome45: "strict",
        chrome49: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      }
    },
  ],
},
{
  name: 'RegExp is subclassable',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor',
  category: 'subclassing',
  significance: 'tiny',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        class R extends RegExp {}
        var r = new R("baz","g");
        return r.global && r.source === "baz";
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        safari9: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct prototype chain',
      exec: function () {/*
        class R extends RegExp {}
        var r = new R("baz","g");
        return r instanceof R && r instanceof RegExp && Object.getPrototypeOf(R) === RegExp;
      */},
      res: {
        babel: { val: false, note_id: 'compiler-proto' },
        node4: "strict",
        chrome43: "strict",
        chrome49: true,
        typescript: false,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        safari10: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype.exec',
      exec: function () {/*
        class R extends RegExp {}
        var r = new R("baz","g");
        return r.exec("foobarbaz")[0] === "baz" && r.lastIndex === 9;
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        safari9: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'RegExp.prototype.test',
      exec: function () {/*
        class R extends RegExp {}
        var r = new R("baz");
        return r.test("foobarbaz");
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        safari9: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Function is subclassable',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor',
  category: 'subclassing',
  significance: 'tiny',
  subtests: [
    {
      name: 'can be called',
      exec: function () {/*
        class C extends Function {}
        var c = new C("return 'foo';");
        return c() === 'foo';
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct prototype chain',
      exec: function () {/*
        class C extends Function {}
        var c = new C("return 'foo';");
        return c instanceof C && c instanceof Function && Object.getPrototypeOf(C) === Function;
      */},
      res: {
        babel: { val: false, note_id: 'compiler-proto' },
        typescript: false,
        edge12: "flagged",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        chrome48: "flagged",
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'can be used with "new"',
      exec: function () {/*
        class C extends Function {}
        var c = new C("this.bar = 2;");
        c.prototype.baz = 3;
        return new c().bar === 2 && new c().baz === 3;
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome48: false,
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Function.prototype.call',
      exec: function () {/*
        class C extends Function {}
        var c = new C("x", "return this.bar + x;");
        return c.call({bar:1}, 2) === 3;
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Function.prototype.apply',
      exec: function () {/*
        class C extends Function {}
        var c = new C("x", "return this.bar + x;");
        return c.apply({bar:1}, [2]) === 3;
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Function.prototype.bind',
      exec: function () {/*
        class C extends Function {}
        var c = new C("x", "y", "return this.bar + x + y;").bind({bar:1}, 2);
        return c(6) === 9 && c instanceof C;
      */},
      res: {
        typescript: false,
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        chrome48: "flagged",
        chrome49: true,
        safari10: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Promise is subclassable',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor',
  category: 'subclassing',
  significance: 'small',
  subtests: [
    {
      name: 'basic functionality',
      exec: function () {/*
        class P extends Promise {}
        var p1 = new P(function(resolve, reject) { resolve("foo"); });
        var p2 = new P(function(resolve, reject) { reject("quux"); });
        var score = +(p1 instanceof P);

        function thenFn(result)  { score += (result === "foo");  check(); }
        function catchFn(result) { score += (result === "quux"); check(); }
        function shouldNotRun(result)  { score = -Infinity;   }

        p1.then(thenFn, shouldNotRun);
        p2.then(shouldNotRun, catchFn);
        p1.catch(shouldNotRun);
        p2.catch(catchFn);

        p1.then(function() {
          // P.prototype.then() should return a new P
          score += p1.then() instanceof P && p1.then() !== p1;
          check();
        });

        function check() {
          if (score === 5) asyncTestPassed();
        }
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        duktape2_0: false,
      },
    },
    {
      name: 'correct prototype chain',
      exec: function () {/*
        class C extends Promise {}
        var c = new C(function(resolve, reject) { resolve("foo"); });
        return c instanceof C && c instanceof Promise && Object.getPrototypeOf(C) === Promise;
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        node5: "strict",
        xs6: true,
        ejs: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.all',
      exec: function () {/*
        class P extends Promise {}
        var fulfills = P.all([
          new Promise(function(resolve)   { setTimeout(resolve,2000,"foo"); }),
          new Promise(function(resolve)   { setTimeout(resolve,1000,"bar"); }),
        ]);
        var rejects = P.all([
          new Promise(function(_, reject) { setTimeout(reject, 2000,"baz"); }),
          new Promise(function(_, reject) { setTimeout(reject, 1000,"qux"); }),
        ]);
        var score = +(fulfills instanceof P);
        fulfills.then(function(result) { score += (result + "" === "foo,bar"); check(); });
        rejects.catch(function(result) { score += (result === "qux"); check(); });

        function check() {
          if (score === 3) asyncTestPassed();
        }
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        node5: "strict",
        xs6: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Promise.race',
      exec: function () {/*
        class P extends Promise {}
        var fulfills = P.race([
          new Promise(function(resolve)   { setTimeout(resolve,1000,"foo"); }),
          new Promise(function(_, reject) { setTimeout(reject, 2000,"bar"); }),
        ]);
        var rejects = P.race([
          new Promise(function(_, reject) { setTimeout(reject, 1000,"baz"); }),
          new Promise(function(resolve)   { setTimeout(resolve,2000,"qux"); }),
        ]);
        var score = +(fulfills instanceof P);
        fulfills.then(function(result) { score += (result === "foo"); check(); });
        rejects.catch(function(result) { score += (result === "baz"); check(); });

        function check() {
          if (score === 3) asyncTestPassed();
        }
      */},
      res: {
        typescript: false,
        chrome43: "strict",
        chrome49: true,
        edge13: true,
        firefox2: false,
        firefox45: true,
        safari10: true,
        node5: "strict",
        xs6: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'miscellaneous subclassables',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor',
  category: 'subclassing',
  significance: 'tiny',
  subtests: [
    {
      name: 'Boolean is subclassable',
      exec: function () {/*
        class C extends Boolean {}
        var c = new C(true);
        return c instanceof Boolean
          && c instanceof C
          && c == true;
      */},
      res: {
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Number is subclassable',
      exec: function () {/*
        class C extends Number {}
        var c = new C(6);
        return c instanceof Number
          && c instanceof C
          && +c === 6;
      */},
      res: {
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'String is subclassable',
      exec: function () {/*
        class C extends String {}
        var c = new C("golly");
        return c instanceof String
          && c instanceof C
          && c + '' === "golly"
          && c[0] === "g"
          && c.length === 5;
      */},
      res: {
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Error is subclassable',
      exec: function () {/*
        class C extends Error {}
        var c = new C();
        return c instanceof Error
          && c instanceof C
          && Object.prototype.toString.call(c) === "[object Error]";
      */},
      res: {
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Map is subclassable',
      exec: function () {/*
        var key = {};
        class M extends Map {}
        var map = new M();

        map.set(key, 123);

        return map instanceof M && map.has(key) && map.get(key) === 123;
      */},
      res: {
        closure: true,
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'Set is subclassable',
      exec: function () {/*
        var obj = {};
        class S extends Set {}
        var set = new S();

        set.add(123);
        set.add(123);

        return set instanceof S && set.has(123);
      */},
      res: {
        closure: true,
        safari10: true,
        chrome43: "strict",
        chrome49: true,
        node4: "strict",
        edge13: true,
        firefox2: false,
        firefox45: true,
        xs6: true,
        ejs: true,
        jxa: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'own property order',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys',
  category: 'misc',
  significance: 'tiny',
  subtests: [
    {
      name: 'Object.keys',
      exec: function () {/*
        var obj = {
          // Non-negative integer names appear first in value order
          2: true,
          0: true,
          1: true,
          // Other string names appear in source order
          ' ': true,
          // Non-negative integers are sorted above other names
          9: true,
          D: true,
          B: true,
          // Negative integers are treated as other names
          '-1': true,
        };
        // Other string names are added in order of creation
        obj.A = true;
        // Non-negative integer names, conversely, ignore order of creation
        obj[3] = true;
        // Having a total of 20+ properties doesn't affect property order
        "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
          obj[key] = true;
        });
        // Object.defineProperty doesn't affect the above rules
        Object.defineProperty(obj, 'C', { value: true, enumerable: true });
        Object.defineProperty(obj, '4', { value: true, enumerable: true });
        // Deleting and reinserting a property doesn't preserve its position
        delete obj[2];
        obj[2] = true;

        var forInOrder = '';
        for(var key in obj)forInOrder += key;

        return Object.keys(obj).join('') === forInOrder;
      */},
      res: {
        ie10: true,
        chrome5: true,
        firefox2: false,
        firefox4: true,
        node0_12: true,
        opera12: true,
        safari4: true,
        android4_0: true,
        xs6: true,
        phantom: true,
        ejs: false,
        konq4_14: null,
        rhino1_7: null,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.getOwnPropertyNames',
      exec: function () {/*
        var obj = {
          2: true,
          0: true,
          1: true,
          ' ': true,
          9: true,
          D: true,
          B: true,
          '-1': true
        };
        obj.A = true;
        obj[3] = true;
        "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
          obj[key] = true;
        });
        Object.defineProperty(obj, 'C', { value: true, enumerable: true });
        Object.defineProperty(obj, '4', { value: true, enumerable: true });
        delete obj[2];
        obj[2] = true;

        return Object.getOwnPropertyNames(obj).join('') === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";
      */},
      res: {
        ie10: { val: true, note_id: 'ie_property_order' },
        firefox2: false,
        firefox44: true,
        opera12: true,
        safari7_1: true,
        xs6: true,
        chrome49: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Object.assign',
      exec: function () {/*
        var result = '';
        var target = {};

        "012349 DBACEFGHIJKLMNOPQRST".split('').concat(-1).forEach(function(key){
          Object.defineProperty(target, key, {
            set: function(){
              result += key;
            }
          })
        });

        var obj = {2: 2, 0: 0, 1: 1, ' ': ' ', 9: 9, D: 'D', B: 'B', '-1': '-1'};
        Object.defineProperty(obj, 'A', {value: 'A',  enumerable: true});
        Object.defineProperty(obj, '3', {value: '3',  enumerable: true});
        Object.defineProperty(obj, 'C', {value: 'C',  enumerable: true});
        Object.defineProperty(obj, '4', {value: '4',  enumerable: true});
        delete obj[2];
        obj[2] = true;

        "EFGHIJKLMNOPQRST".split('').forEach(function(key){
          obj[key] = key;
        });

        Object.assign(target, obj);

        return result === "012349 DB-1ACEFGHIJKLMNOPQRST";
      */},
      res: {
        edge12: { val: true, note_id: 'ie_property_order' },
        firefox2: false,
        firefox44: true,
        safari9: true,
        xs6: true,
        chrome49: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'JSON.stringify',
      exec: function () {/*
        var obj = {
          2: true,
          0: true,
          1: true,
          ' ': true,
          9: true,
          D: true,
          B: true,
          '-1': true
        };
        obj.A = true;
        obj[3] = true;
        "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
          obj[key] = true;
        });
        Object.defineProperty(obj, 'C', { value: true, enumerable: true });
        Object.defineProperty(obj, '4', { value: true, enumerable: true });
        delete obj[2];
        obj[2] = true;

        return JSON.stringify(obj) ===
          '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"A":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"M":true,"N":true,"O":true,"P":true,"Q":true,"R":true,"S":true,"T":true,"U":true,"V":true,"W":true,"X":true,"Y":true,"Z":true,"C":true}';
      */},
      res: {
        ie10: { val: true, note_id: 'ie_property_order' },
        firefox2: false,
        firefox44: true,
        ejs: true,
        chrome5: true,
        node0_12: true,
        opera12: true,
        safari7: true,
        safari10: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'JSON.parse',
      exec: function () {/*
        var result = '';
        JSON.parse(
          '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"A":true,"C":true}',
          function reviver(k,v) {
            result += k;
            return v;
          }
        );
        return result === "012349 DB-1EFGHIJKLAC";
      */},
      res: {
        ie10: {
          val: true,
          note_id: 'ie_property_order',
          note_html: 'Unlike other engines, Chakra sorts properties removed by <code>delete</code>, then recreated by assignment, to their original creation positions, not their latest positions.'
        },
        firefox2: false,
        firefox3_5: true,
        firefox4: true,
        chrome5: true,
        node0_12: true,
        opera10_50: true,
        opera12: true,
        safari4: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.ownKeys, string key order',
      exec: function() {/*
        var obj = {
          2: true,
          0: true,
          1: true,
          ' ': true,
          9: true,
          D: true,
          B: true,
          '-1': true
        };
        obj.A = true;
        obj[3] = true;
        "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
          obj[key] = true;
        });
        Object.defineProperty(obj, 'C', { value: true, enumerable: true });
        Object.defineProperty(obj, '4', { value: true, enumerable: true });
        delete obj[2];
        obj[2] = true;

        return Reflect.ownKeys(obj).join('') === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";
      */},
      res: {
        babel: { val: false, note_id: "forin-order", note_html: "This uses native for-in enumeration order, rather than the correct order." },
        closure: { val: false, note_id: "forin-order" },
        typescript: { val: false, note_id: "forin-order" },
        es6shim: { val: false, note_id: "forin-order" },
        firefox2: false,
        firefox44: true,
        edge12: true,
        safari10: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Reflect.ownKeys, symbol key order',
      exec: function() {/*
        var sym1 = Symbol(), sym2 = Symbol(), sym3 = Symbol();
        var obj = {
          1: true,
          A: true,
        };
        obj.B = true;
        obj[sym1] = true;
        obj[2] = true;
        obj[sym2] = true;
        Object.defineProperty(obj, 'C', { value: true, enumerable: true });
        Object.defineProperty(obj, sym3,{ value: true, enumerable: true });
        Object.defineProperty(obj, 'D', { value: true, enumerable: true });

        var result = Reflect.ownKeys(obj);
        var l = result.length;
        return result[l-3] === sym1 && result[l-2] === sym2 && result[l-1] === sym3;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        edge12: true,
        safari10: true,
        firefox2: false,
        firefox42: true,
        xs6: true,
        ejs: true,
        chrome49: true,
        duktape2_0: false,
      }
    },
  ],
},
{
  name: 'Updated identifier syntax',
  category: 'misc',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords',
  subtests: [
    {
      name: 'var ⸯ;',
      exec: function() {/*
        try {
          eval('var ⸯ');
        } catch(e) {
          return true;
        }
      */},
      res: {
        es6tr: null,
        tr: null,
        babel: null,
        closure: null,
        jsx: null,
        typescript: null,
        es6shim: null,
        konq414: null,
        ie7: null,
        ie10: false,
        edge12: null,
        edge14: true,
        firefox1: null,
        firefox2: false,
        firefox52: true,
        opera12: null,
        chrome1: null,
        chrome58: true,
        safari1: null,
        webkit: false,
        rhino1_7: null,
        xs6: null,
        jxa: null,
        node0_10: null,
        duktape2_0: null,
        android1_5: null,
        ios4: null,
      },
    },
    {
      name: 'var 𐋀;',
      exec: function() {/*
        var 𐋀;
        return true;
      */},
      res: {
        es6tr: null,
        tr: null,
        babel: null,
        closure: null,
        jsx: null,
        typescript: null,
        es6shim: null,
        konq414: null,
        ie7: null,
        ie10: false,
        edge12: null,
        edge14: true,
        firefox1: null,
        firefox2: false,
        firefox52: true,
        opera12: null,
        chrome1: null,
        chrome58: true,
        safari1: null,
        webkit: false,
        rhino1_7: null,
        xs6: null,
        jxa: null,
        node0_10: null,
        duktape2_0: null,
        android1_5: null,
        ios4: null,
      },
    },
    {
      name: 'no escaped reserved words as identifiers',
      exec: function() {/*
        var \u0061;
        try {
          eval('var v\\u0061r');
        } catch(e) {
          return true;
        }
      */},
      res: {
        es6tr: true,
        tr: true,
        babel: true,
        closure: true,
        jsx: true,
        typescript: true,
        es6shim: null,
        konq414: null,
        ie7: null,
        ie10: true,
        firefox1: null,
        firefox2: false,
        firefox10: true,
        opera12: true,
        chrome1: null,
        chrome49: true,
        safari1: null,
        safari9: true,
        rhino1_7: null,
        xs6: true,
        jxa: true,
        node0_10: null,
        duktape2_0: false,
        android1_5: null,
        ios4: null,
      },
    },
  ],
},
{
  name: 'miscellaneous',
  category: 'misc',
  significance: 'small',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions',
  subtests: [
    {
      name: 'duplicate property names in strict mode',
      exec: function(){/*
        'use strict';
        return this === undefined && ({ a:1, a:1 }).a === 1;
      */},
      res: {
        ejs: true,
        edge12: true,
        firefox2: false,
        firefox34: true,
        chrome42: true,
        safari9: true,
        node4: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'no semicolon needed after do-while',
      exec: function(){/*
        do {} while (false) return true;
      */},
      res: {
        ejs: true,
        babel: true,
        closure: true,
        typescript: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'no assignments allowed in for-in head in strict mode',
      exec: function(){/*
       'use strict';
       try {
         eval('for (var i = 0 in {}) {}');
       }
       catch(e) {
         return true;
       }
      */},
      res: {
        ejs: true,
        babel: true,
        closure: true,
        typescript: true,
        edge15: true,
        firefox2: false,
        firefox52: true,
        chrome45: true,
        safari9: true,
        xs6: true,
        jxa: true,
        duktape2_0: false,
      },
    },
    {
      name: 'accessors aren\'t constructors',
      exec: function(){/*
        var f = (Object.getOwnPropertyDescriptor({get a(){}}, 'a')).get;
        try {
          new f;
        } catch(e) {
          return true;
        }
      */},
      res: {
        edge12: true,
        chrome42: true,
        node4: true,
        firefox2: false,
        firefox41: true,
        safari10: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'Invalid Date',
      exec: function(){/*
        return new Date(NaN) + "" === "Invalid Date";
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        es6shim: true,
        ejs: true,
        ie10: true,
        firefox2: true,
        chrome5: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        konq4_14: true,
        rhino1_7: true,
        node0_12: true,
        android4_0: true,
        xs6: true,
        jxa: true,
        duktape2_0: true,
      },
    },
    {
      name: 'RegExp constructor can alter flags',
      exec: function(){/*
        return new RegExp(/./im, "g").global === true;
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        ejs: true,
        es6shim: true,
        edge12: true,
        firefox2: false,
        firefox39: true,
        xs6: true,
        chrome49: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'RegExp.prototype.toString generic and uses "flags" property',
      exec: function(){/*
        return RegExp.prototype.toString.call({source: 'foo', flags: 'bar'}) === '/foo/bar';
      */},
      res: {
        babel: babel.corejs,
        typescript: typescript.corejs,
        edge14: "flagged",
        firefox2: false,
        firefox39: true,
        chrome50: true,
        ejs: null,
        xs6: null,
        jxa: true,
        safari10: true,
        duktape2_0: true,
      },
    },
    {
      name: 'built-in prototypes are not instances',
      exec: function(){/*
        try {
          RegExp.prototype.exec(); return false;
        } catch(e) {}
        try {
          Date.prototype.valueOf(); return false;
        } catch(e) {}

        if (![Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].every(function (E) {
            return Object.prototype.toString.call(E.prototype) === '[object Object]';
        })) {
          return false;
        }

        return true;
      */},
      res: {
        xs6: false,
        jxa: true,
        edge14: "flagged",
        firefox2: false,
        firefox53: true,
        chrome50: true,
        safari10: true,
        duktape2_0: false,
      },
    },
    {
      name: 'function \'length\' is configurable',
      exec: function(){/*
        var fn = function(a, b) {};

        var desc = Object.getOwnPropertyDescriptor(fn, "length");
        if (desc.configurable) {
          Object.defineProperty(fn, "length", { value: 1 });
          return fn.length === 1;
        }

        return false;
      */},
      res: {
        firefox2: false,
        firefox37: true,
        chrome43: true,
        edge12: true,
        node4: true,
        xs6: true,
        safari10: true,
        jxa: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'HTML-style comments',
  category: 'annex b',
  significance: 'tiny',
  spec: 'http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments',
  exec: function () {/*
    --> A comment
    <!-- Another comment
    var a = 3; <!-- Another comment
    return a === 3;
  */},
  res: {
    ejs: true,
    firefox2: true,
    chrome5: true,
    safari5_1: true,
    edge14: true,
    opera12: true,
    konq4_14: true,
    rhino1_7: true,
    node0_12: true,
    android4_0: true,
    edge13: false,
    xs6: false,
    duktape2_0: false,
    duktape2_1: true,
  }
},
];

//Shift annex B features to the bottom
exports.tests = exports.tests.reduce(function(a,e) {
  var index = ['optimisation','syntax','bindings','functions',
    'built-ins','built-in extensions','subclassing','misc','annex b'].indexOf(e.category);
  if (index === -1) {
    console.log('"' + a.category + '" is not an ES6 category!');
  }
  (a[index] = a[index] || []).push(e);
  return a;
},[]).reduce(function(a,e) {
  return a.concat(e);
},[]);
