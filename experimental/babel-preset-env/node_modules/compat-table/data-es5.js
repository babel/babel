var common = require('./data-common');

var sparseNote = common.sparseNote;

exports.name = 'ES5';
exports.target_file = 'es5/index.html';
exports.skeleton_file = 'es5/skeleton.html';

exports.tests = [
{
  name: 'Object/array literal extensions',
  significance: 'large',
  subtests: [{
    name: 'Getter accessors',
    exec: function () {/*
      return ({ get x(){ return 1 } }).x === 1;
    */},
    res: {
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Setter accessors',
    exec: function () {/*
      var value = 0;
      ({ set x(v){ value = v; } }).x = 1;
      return value === 1;
    */},
    res: {
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    },
  },
  {
    name: 'Trailing commas in object literals',
    exec: function () {/*
      return { a: true, }.a === true;
    */},
    res: {
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: null,
      chrome7: true,
      opera10_50: true,
      opera12_10: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  },
  {
    name: 'Trailing commas in array literals',
    exec: function () {/*
      return [1,].length === 1;
    */},
    res: {
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: null,
      chrome7: true,
      opera10_50: true,
      opera12_10: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  },
  {
    name: 'Reserved words as property names',
    exec: function () {/*
      return ({ if: 1 }).if === 1;
    */},
    res: {
      ie9: true,
      firefox2: true,
      safari5_1: true,
      chrome5: false,
      chrome6: false,
      chrome7: true,
      chrome13: true,
      chrome19: true,
      chrome23: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: false,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    },
  }],
  separator: 'after'
},
{
  name: 'Object static methods',
  significance: 'large',
  subtests: [{
    name: 'Object.create',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create',
    exec: function () {
      return typeof Object.create == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.defineProperty',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty',
    exec: function () {
      return typeof Object.defineProperty == 'function';
    },
    res: {
      ie8: {
        val: true,
        note_id: 'define-property-ie',
        note_html: 'In Internet Explorer 8 <code>Object.defineProperty</code> only accepts DOM objects ' +
          '(<a href="http://msdn.microsoft.com/en-us/library/dd548687(VS.85).aspx">MSDN reference</a>).'
      },
      ie9: true,
      firefox2: false,
      firefox4: true,
      firefox21: true,
      safari4: {
        val: true,
        note_id: 'define-property-webkit',
        note_html: 'In some versions of Safari 5, <code>Object.defineProperty</code> does <b>not</b> work with DOM objects.'
      },
      safari5_1: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.defineProperties',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties',
    exec: function () {
      return typeof Object.defineProperties == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.getPrototypeOf',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf',
    exec: function () {
      return typeof Object.getPrototypeOf == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox3_5: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.keys',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys',
    exec: function () {
      return typeof Object.keys == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.seal',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal',
    exec: function () {
      return typeof Object.seal == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.freeze',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze',
    exec: function () {
      return typeof Object.freeze == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.preventExtensions',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions',
    exec: function () {
      return typeof Object.preventExtensions == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.isSealed',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed',
    exec: function () {
      return typeof Object.isSealed == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.isFrozen',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen',
    exec: function () {
      return typeof Object.isFrozen == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.isExtensible',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible',
    exec: function () {
      return typeof Object.isExtensible == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome6: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.getOwnPropertyDescriptor',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor',
    exec: function () {
      return typeof Object.getOwnPropertyDescriptor == 'function';
    },
    res: {
      ie7: false,
      ie8: {
        val: true,
        note_id: 'get-own-property-descriptor-ie',
        note_html: 'In Internet Explorer 8 <code>Object.getOwnPropertyDescriptor</code> only accepts DOM objects ' +
          '(<a href="http://msdn.microsoft.com/en-us/library/dd548687(VS.85).aspx">MSDN reference</a>).'
      },
      ie9: true,
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Object.getOwnPropertyNames',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames',
    exec: function () {
      return typeof Object.getOwnPropertyNames == 'function';
    },
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    },
    separator: 'after'
  }],
},
{
  name: 'Array methods',
  significance: 'large',
  subtests: [{
    name: 'Array.isArray',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray',
    exec: function () {
      return typeof Array.isArray == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.indexOf',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf',
    exec: function () {
      return typeof Array.prototype.indexOf == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.lastIndexOf',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf',
    exec: function () {
      return typeof Array.prototype.lastIndexOf == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.every',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
    exec: function () {
      return typeof Array.prototype.every == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.some',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
    exec: function () {
      return typeof Array.prototype.some == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.forEach',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
    exec: function () {
      return typeof Array.prototype.forEach == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.map',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    exec: function () {
      return typeof Array.prototype.map == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.filter',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    exec: function () {
      return typeof Array.prototype.filter == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.reduce',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    exec: function () {
      return typeof Array.prototype.reduce == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: false,
      firefox3: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Array.prototype.reduceRight',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight',
    exec: function () {
      return typeof Array.prototype.reduceRight == 'function';
    },
    res: {
      es5shim: sparseNote,
      ie9: true,
      firefox2: false,
      firefox3: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    },
  }, {
    name: 'Array.prototype.sort: compareFn must be function or undefined',
    exec: function () {
      try {
        [1,2].sort(null);
        return false;
      } catch (enull) {}
      try {
        [1,2].sort(true);
        return false;
      } catch (etrue) {}
      try {
        [1,2].sort({});
        return false;
      } catch (eobj) {}
      try {
        [1,2].sort([]);
        return false;
      } catch (earr) {}
      try {
        [1,2].sort(/a/g);
        return false;
      } catch (eregex) {}
      return true;
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox5: true,
      safari1: false,
      safari10_1: true,
      chrome1: false,
      chrome63: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      konq4_9: null,
      konq4_13: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: false,
      duktape2_0: true,
    },
  },
  {
    name: 'Array.prototype.sort: compareFn may be explicit undefined',
    exec: function () {
      try {
        var arr = [2, 1];
        return arr.sort(undefined) === arr && arr[0] === 1 && arr[1] === 2;
      } catch (e) {
        return false;
      }
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari3_1: true,
      chrome13: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      konq4_9: null,
      konq4_13: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: true,
      duktape2_0: true,
    },
  }],
},
{
  name: 'String properties and methods',
  significance: 'small',
  subtests: [{
    name: 'Property access on strings',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Character_access',
    exec: function () {
      return "foobar"[3] === "b";
    },
    res: {
      ie7: false,
      ie8: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'String.prototype.trim',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim',
    exec: function () {
      return typeof String.prototype.trim == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox3_5: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    },
    separator: 'after'
  }
  ]
},
{
  name: 'Date methods',
  significance: 'small',
  subtests: [{
    name: 'Date.prototype.toISOString',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString',
    exec: function () {
      return typeof Date.prototype.toISOString == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox3_5: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: false,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Date.now',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now',
    exec: function () {
      return typeof Date.now == 'function';
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: true,
      safari4: true,
      chrome5: true,
      opera10_50: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Date.prototype.toJSON',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON',
    exec: function () {
      try {
        return Date.prototype.toJSON.call(new Date(NaN)) === null;
      } catch (e) {
        return false;
      }
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari10: true,
      chrome5: true,
      opera10_10: false,
      opera10_50: false,
      opera12: {
        val: true,
        note_id: 'Date.prototype.toJSON-OP11_60-OP11_64',
        note_html: 'In Opera 11.60-11.64 Date.prototype.toJSON is undefined.'
      },
      opera12_10: true,
      konq4_3: true,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_0: true,
      duktape2_0: true,
    }
  }]
},
{
  name: 'Function.prototype.bind',
  significance: 'medium',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind',
  exec: function () {
    return typeof Function.prototype.bind == 'function';
  },
  res: {
    es5shim: true,
    ie9: true,
    firefox2: false,
    firefox4: true,
    safari5_1: true,
    chrome7: true,
    opera10_50: false,
    opera12: true,
    konq4_13: true,
    besen: true,
    rhino1_7: true,
    phantom: true,
    ejs: true,
    ios7: true,
    android4_0: true,
    duktape2_0: true,
  },
},
{
  name: 'JSON',
  significance: 'medium',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON',
  exec: function () {
    return typeof JSON == 'object';
  },
  res: {
    ie7: false,
    ie8: true,
    ie9: true,
    ie10: true,
    firefox2: false,
    firefox3_5: true,
    safari4: true,
    chrome5: true,
    opera10_50: true,
    konq4_3: false,
    konq4_9: true,
    konq4_13: true,
    besen: true,
    rhino1_7: true,
    phantom: true,
    ejs: true,
    ios7: true,
    android4_0: true,
    duktape2_0: true,
  },
  separator: 'after'
},
{
  name: 'Immutable globals',
  significance: 'small',
  subtests: [
  {
    name: 'undefined',
    exec: function () {/*
      undefined = 12345;
      var result = typeof undefined == 'undefined';
      undefined = void 0;
      return result;
    */},
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome19: true,
      chrome23: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: false,
      android4_1: true,
      duktape2_0: true,
    }
  },
  {
    name: 'NaN',
    exec: function () {/*
      NaN = false;
      var result = typeof NaN == 'number';
      NaN = Math.sqrt(-1);
      return result;
    */},
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome19: true,
      chrome23: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: false,
      android4_1: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Infinity',
    exec: function () {/*
      Infinity = false;
      var result = typeof Infinity == 'number';
      Infinity = 1/0;
      return result;
    */},
    res: {
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari4: true,
      chrome19: true,
      chrome23: true,
      opera10_50: false,
      opera12: true,
      konq4_3: false,
      konq4_9: true,
      konq4_13: true,
      besen: true,
      rhino1_7: true,
      ejs: false,
      android4_1: true,
      duktape2_0: true,
    }
  }]
},
{
  name: 'Miscellaneous',
  significance: 'medium',
  subtests: [{
    name: 'Function.prototype.apply permits array-likes',
    exec: function () {
      return (function(a,b) { return a === 1 && b === 2; }).apply({}, {0:1, 1:2, length:2});
    },
    res: {
      ie7: null,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari3_1: false,
      safari5_1: true,
      chrome5: false,
      chrome13: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  },
  {
    name: 'parseInt ignores leading zeros',
    exec: function () {
      return parseInt('010') === 10;
    },
    res: {
      es5shim: true,
      ie9: true,
      firefox2: false,
      firefox21: true,
      safari6: true,
      chrome23: true,
      opera10_10: false,
      konq4_3: false,
      konq4_9: false,
      konq4_13: false,
      besen: true,
      rhino1_7: false,
      ejs: true,
      android4_4: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Function "prototype" property is non-enumerable',
    exec: function () {/*
      return !Function().propertyIsEnumerable('prototype');
    */},
    res: {
      ie7: null,
      ie9: true,
      firefox2: false,
      firefox3_6: true,
      safari5_1: true,
      chrome5: false,
      chrome13: true,
      opera10_10: null,
      opera10_50: false,
      opera12_10: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  },
  {
    name: 'Arguments toStringTag is "Arguments"',
    exec: function () {/*
      return (function(){ return Object.prototype.toString.call(arguments) === '[object Arguments]'; }());
    */},
    res: {
      ie7: null,
      ie9: true,
      firefox2: false,
      firefox4: true,
      safari3_1: true,
      chrome5: null,
      chrome7: true,
      chrome13: true,
      opera10_10: null,
      opera10_50: false,
      opera12_10: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  },
  {
    name: 'Zero-width chars in identifiers',
    exec: function () {/*
      var _\u200c\u200d = true;
      return _\u200c\u200d;
    */},
    res: {
      ie9: true,
      firefox2: false,
      firefox3_5: false,
      firefox8: true,
      firefox21: true,
      safari6: true,
      chrome19: true,
      chrome23: true,
      opera10_10: false,
      opera12_10: true,
      konq4_3: false,
      konq4_9: false,
      konq4_13: false,
      besen: true,
      rhino1_7: true,
      ejs: true,
      android4_1: true,
      duktape2_0: true,
    }
  },
  {
    name: 'Unreserved words',
    exec: function () {/*
      var abstract, boolean, byte, char, double, final, float, goto, int, long,
        native, short, synchronized, transient, volatile;
      return true;
    */},
    res: {
      ie7: null,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: false,
      chrome13: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    }
  },
  {
    name: 'Enumerable properties can be shadowed by non-enumerables',
    exec: function () {/*
      var result = true;
      Object.prototype.length = 42;
      for (var i in Function) {
          if (i == 'length') {
              result = false;
          }
      }
      delete Object.prototype.length;
      return result;
    */},
    res: {
      ie7: null,
      ie9: false,
      edge13: true,
      firefox2: true,
      safari3_1: false,
      chrome5: false,
      chrome13: false,
      chrome54: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: false,
    }
  },
  {
    name: 'Thrown functions have proper "this" values',
    exec: function () {/*
      try {
        throw function() { return !('a' in this); };
      }
      catch(e) {
        var a = true;
        return e();
      }
    */},
    res: {
      ie7: null,
      ie9: true,
      firefox2: true,
      safari3_1: true,
      chrome5: true,
      opera10_10: null,
      opera10_50: true,
      konq4_3: null,
      besen: null,
      rhino1_7: null,
      ejs: null,
      android4_0: null,
      duktape2_0: true,
    },
  }]
},
{
  name: 'Strict mode',
  significance: 'large',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode',
  subtests: [
  {
    name: 'reserved words',
    exec: function() {/*
      'use strict';
      var words = 'implements,interface,let,package,private,protected,public,static,yield'.split(',');
      for (var i = 0; i < 9; i+=1) {
        try { eval('var ' + words[i]); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      }
      return true;
    */},
    res: {
      ie10: true,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: '"this" is undefined in functions',
    exec: function() {/*
      'use strict';
      return this === undefined && (function(){ return this === undefined; }).call();
    */},
    res: {
      ie10: {
        val: true,
        note_id: 'strict-mode-ie10',
        note_html: 'IE10 PP2 fails this test.</code>'
      },
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: '"this" is not coerced to object in primitive methods',
    exec: function() {/*
      'use strict';
      return (function(){ return typeof this === 'string' }).call('')
        && (function(){ return typeof this === 'number' }).call(1)
        && (function(){ return typeof this === 'boolean' }).call(true);
    */},
    res: {
      ie10: true,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: '"this" is not coerced to object in primitive accessors',
    exec: function() {/*
      'use strict';

      function test(Class, instance) {
        Object.defineProperty(Class.prototype, 'test', {
          get: function () { passed = passed && this === instance; },
          set: function () { passed = passed && this === instance; },
          configurable: true
        });

        var passed = true;
        instance.test;
        instance.test = 42;
        return passed;
      }

      return test(String, '')
        && test(Number, 1)
        && test(Boolean, true);
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox46: true,
      safari6: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'legacy octal is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('010');     return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('"\\010"'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'assignment to unresolvable identifiers is a ReferenceError',
    exec: function() {/*
      'use strict';
      try { eval('__i_dont_exist = 1'); } catch (err) { return err instanceof ReferenceError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'assignment to eval or arguments is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('eval = 1');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('arguments = 1'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('eval++');        return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('arguments++');   return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'assignment to non-writable properties is a TypeError',
    exec: function() {/*
      'use strict';
      try { Object.defineProperty({},"x",{ writable: false }).x = 1; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      try { Object.preventExtensions({}).x = 1;                      return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      try { ({ get x(){ } }).x = 1;                                  return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      try { (function f() { f = 123; })();                           return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'eval or arguments bindings is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('var eval');                return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('var arguments');           return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('(function(eval){})');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('(function(arguments){})'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('try{}catch(eval){}');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      try { eval('try{}catch(arguments){}'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'arguments.caller removed or is a TypeError',
    exec: function() {/*
      'use strict';
      if ('caller' in arguments) {
        try { arguments.caller; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari3_1: true,
      chrome13: true,
      opera10_50: true,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'arguments.callee is a TypeError',
    exec: function() {/*
      'use strict';
      try { arguments.callee; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: '(function(){}).caller and (function(){}).arguments is a TypeError',
    exec: function() {/*
      'use strict';
      try { (function(){}).caller;    return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      try { (function(){}).arguments; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
      return true;
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'arguments is unmapped',
    exec: function() {/*
      'use strict';
      return (function(x){
        x = 2;
        return arguments[0] === 1;
      })(1) && (function(x){
        arguments[0] = 2;
        return x === 1;
      })(1);
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'eval() can\'t create bindings',
    exec: function() {/*
      'use strict';
      try { eval('var __some_unique_variable;'); __some_unique_variable; } catch (err) { return err instanceof ReferenceError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'deleting bindings is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('var x; delete x;'); } catch (err) { return err instanceof SyntaxError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'deleting non-configurable properties is a TypeError',
    exec: function() {/*
      'use strict';
      try { delete Object.prototype; } catch (err) { return err instanceof TypeError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: '"with" is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('with({}){}'); } catch (err) { return err instanceof SyntaxError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'repeated parameter names is a SyntaxError',
    exec: function() {/*
      'use strict';
      try { eval('function f(x, x) { }'); } catch (err) { return err instanceof SyntaxError; }
    */},
    res: {
      ie10: true,
      firefox2: false,
      firefox4: true,
      safari5_1: true,
      chrome13: true,
      opera10_50: false,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      android4_1: true,
      duktape2_0: true,
    },
  },
  {
    name: 'function expressions with matching name and argument are valid',
    exec: function() {/*
      var foo = function bar(bar) {'use strict'};
      return typeof foo === 'function';
    */},
    res: {
      ie10: true,
      firefox2: true,
      safari3_1: true,
      safari5_1: false,
      safari10: true,
      chrome13: true,
      opera10_50: true,
      opera12: true,
      besen: true,
      phantom: true,
      ejs: true,
      ios7: true,
      ios8: true,
      ios9: true,
      android4_1: true,
      duktape2_0: true,
    }
  }]
}
];
