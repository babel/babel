var common = require('./data-common');

var firefox = common.firefox;

exports.name = 'ES Intl';
exports.target_file = 'esintl/index.html';
exports.skeleton_file = 'esintl/skeleton.html';

exports.tests = [
{
  name: 'Intl object',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-8',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl',
  subtests: [
    {
      name: 'exists on global',
      exec: function(){/*
        return typeof Intl === 'object';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'has prototype of Object',
      exec: function(){/*
        return Intl.constructor === Object;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Intl.Collator',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator',
  subtests: [
    {
      name: 'exists on intl object',
      exec: function(){/*
        return typeof Intl.Collator === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'creates new Collator instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.3.1',
      exec: function(){/*
        return new Intl.Collator() instanceof Intl.Collator;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor called without new creates instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1',
      exec: function(){/*
        return Intl.Collator() instanceof Intl.Collator;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
// The spec was updated making this test invalid.  It was disabled until it can be fixed
//    {
//      name: 'calling Collator with Collator instance throws error',
//      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.1.1',
//      exec: function(){/*
//        try {
//          Intl.Collator.call(Intl.Collator());
//          return false;
//        } catch(e) {
//          return e instanceof TypeError;
//        }
//      */},
//      res: {
//        ie11: true,
//        edge12: true,
//        firefox29: firefox.nomob,
//        firefox56: true,
//        chrome24: true,
//        node0_12: true,
//      },
//    },
    {
      name: 'accepts valid language tags',
      exec: function(){/*
        try {
          // Taken from https://github.com/tc39/test262/blob/83b07ff15eadb141c3d6f4d236a8733b720041d2/test/intl402/6.2.2_a.js
          var validLanguageTags = [
            "de", // ISO 639 language code
            "de-DE", // + ISO 3166-1 country code
            "DE-de", // tags are case-insensitive
            "cmn", // ISO 639 language code
            "cmn-Hans", // + script code
            "CMN-hANS", // tags are case-insensitive
            "cmn-hans-cn", // + ISO 3166-1 country code
            "es-419", // + UN M.49 region code
            "es-419-u-nu-latn-cu-bob", // + Unicode locale extension sequence
            "i-klingon", // grandfathered tag
            "cmn-hans-cn-t-ca-u-ca-x-t-u", // singleton subtags can also be used as private use subtags
            "de-gregory-u-ca-gregory", // variant and extension subtags may be the same
            "aa-a-foo-x-a-foo-bar", // variant subtags can also be used as private use subtags
            "x-en-US-12345", // anything goes in private use tags
            "x-12345-12345-en-US",
            "x-en-US-12345-12345",
            "x-en-u-foo",
            "x-en-u-foo-u-bar"
          ];
          for (var i in validLanguageTags) {
            Intl.Collator(validLanguageTags[i]);
          }
          return true;
        } catch(e) {
          return false;
        }
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome29: true,
        safari10_1: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Intl.Collator.prototype.compare',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.3.2',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator/compare',
  subtests: [
    {
      name: 'exists on Collator prototype',
      exec: function(){/*
        return typeof Intl.Collator().compare === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'Intl.Collator.prototype.resolvedOptions',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.3.3',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator/resolvedOptions',
  subtests: [
    {
      name: 'exists on Collator prototype',
      exec: function(){/*
        return typeof Intl.Collator().resolvedOptions === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'NumberFormat',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-11',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat',
  subtests: [
    {
      name: 'exists on intl object',
      exec: function(){/*
        return typeof Intl.NumberFormat === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'exists on intl object',
      exec: function(){/*
        return typeof Intl.NumberFormat === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'creates new NumberFormat instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.3.1',
      exec: function(){/*
        return new Intl.NumberFormat() instanceof Intl.NumberFormat;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor called without new creates instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1',
      exec: function(){/*
        return Intl.NumberFormat() instanceof Intl.NumberFormat;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
// The spec was updated making this test invalid.  It was disabled until it can be fixed
//    {
//      name: 'calling NumberFormat with NumberFormat instance throws error',
//      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.1.1',
//      exec: function(){/*
//        try {
//          Intl.NumberFormat.call(Intl.NumberFormat());
//          return false;
//        } catch(e) {
//          return e instanceof TypeError;
//        }
//      */},
//      res: {
//        ie11: true,
//        edge12: true,
//        firefox29: firefox.nomob,
//        firefox56: true,
//        chrome24: true,
//        node0_12: true,
//      },
//    },
    {
      name: 'accepts valid language tags',
      exec: function(){/*
        try {
          // Taken from https://github.com/tc39/test262/blob/83b07ff15eadb141c3d6f4d236a8733b720041d2/test/intl402/6.2.2_a.js
          var validLanguageTags = [
            "de", // ISO 639 language code
            "de-DE", // + ISO 3166-1 country code
            "DE-de", // tags are case-insensitive
            "cmn", // ISO 639 language code
            "cmn-Hans", // + script code
            "CMN-hANS", // tags are case-insensitive
            "cmn-hans-cn", // + ISO 3166-1 country code
            "es-419", // + UN M.49 region code
            "es-419-u-nu-latn-cu-bob", // + Unicode locale extension sequence
            "i-klingon", // grandfathered tag
            "cmn-hans-cn-t-ca-u-ca-x-t-u", // singleton subtags can also be used as private use subtags
            "de-gregory-u-ca-gregory", // variant and extension subtags may be the same
            "aa-a-foo-x-a-foo-bar", // variant subtags can also be used as private use subtags
            "x-en-US-12345", // anything goes in private use tags
            "x-12345-12345-en-US",
            "x-en-US-12345-12345",
            "x-en-u-foo",
            "x-en-u-foo-u-bar"
          ];
          for (var i in validLanguageTags) {
            Intl.NumberFormat(validLanguageTags[i]);
          }
          return true;
        } catch(e) {
          return false;
        }
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome29: true,
        safari10_1: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
  ],
},
{
  name: 'DateTimeFormat',
  spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-12',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat',
  subtests: [
    {
      name: 'exists on intl object',
      exec: function(){/*
        return typeof Intl.DateTimeFormat === 'function';
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'creates new DateTimeFormat instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.3.1',
      exec: function(){/*
        return new Intl.DateTimeFormat() instanceof Intl.DateTimeFormat;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'constructor called without new creates instances',
      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1',
      exec: function(){/*
        return Intl.DateTimeFormat() instanceof Intl.DateTimeFormat;
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
// The spec was updated making this test invalid.  It was disabled until it can be fixed
//    {
//      name: 'calling DateTimeFormat with DateTimeFormat instance throws error',
//      spec: 'http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.1.1',
//      exec: function(){/*
//        try {
//          Intl.DateTimeFormat.call(Intl.DateTimeFormat());
//          return false;
//        } catch(e) {
//          return e instanceof TypeError;
//        }
//      */},
//      res: {
//        ie11: true,
//        edge12: true,
//        firefox29: firefox.nomob,
//        firefox56: true,
//        chrome24: true,
//        node0_12: true,
//      },
//    },
    {
      name: 'accepts valid language tags',
      exec: function(){/*
        try {
          // Taken from https://github.com/tc39/test262/blob/83b07ff15eadb141c3d6f4d236a8733b720041d2/test/intl402/6.2.2_a.js
          var validLanguageTags = [
            "de", // ISO 639 language code
            "de-DE", // + ISO 3166-1 country code
            "DE-de", // tags are case-insensitive
            "cmn", // ISO 639 language code
            "cmn-Hans", // + script code
            "CMN-hANS", // tags are case-insensitive
            "cmn-hans-cn", // + ISO 3166-1 country code
            "es-419", // + UN M.49 region code
            "es-419-u-nu-latn-cu-bob", // + Unicode locale extension sequence
            "i-klingon", // grandfathered tag
            "cmn-hans-cn-t-ca-u-ca-x-t-u", // singleton subtags can also be used as private use subtags
            "de-gregory-u-ca-gregory", // variant and extension subtags may be the same
            "aa-a-foo-x-a-foo-bar", // variant subtags can also be used as private use subtags
            "x-en-US-12345", // anything goes in private use tags
            "x-12345-12345-en-US",
            "x-en-US-12345-12345",
            "x-en-u-foo",
            "x-en-u-foo-u-bar"
          ];
          for (var i in validLanguageTags) {
            Intl.DateTimeFormat(validLanguageTags[i]);
          }
          return true;
        } catch(e) {
          return false;
        }
      */},
      res: {
        ie11: true,
        edge12: true,
        firefox2: false,
        firefox29: firefox.nomob,
        firefox56: true,
        chrome29: true,
        safari10_1: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      },
    },
    {
      name: 'resolvedOptions().timeZone defaults to the host environment',
      exec: function () {/*
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return tz !== undefined && tz.length > 0;
      */},
      res: {
        ie9: false,
        edge12: false,
        edge14: true,
        firefox2: false,
        firefox52: true,
        chrome24: null,
        chrome29: true,
        safari3_1: false,
        safari6: null,
        safari7: false,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        opera12: null,
        android4_0: null,
        ios7: false,
        duktape2_0: false,
      }
    },
    {
      name: 'accepts IANA timezone names',
      exec: function() {/*
        try {
          new Intl.DateTimeFormat('en-US', {
            timeZone: 'Australia/Sydney',
            timeZoneName: 'long'
          }).format();
          return true;
        } catch (e) {
          return false;
        }
      */},
      res: {
        ie9: false,
        edge12: false,
        edge14: true,
        firefox2: false, // Firefox bug #1266290
        firefox52: true,
        chrome24: true,
        safari10: true,
        opera10_50: false,
        node0_12: true,
        duktape2_0: false,
      }
    }
  ],
},
{
  name: 'String.prototype.localeCompare',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.localecompare',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare',
  subtests: [
    {
      name: 'exists on String prototype',
      exec: function(){/*
        return typeof String.prototype.localeCompare === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Number.prototype.toLocaleString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.prototype.tolocalestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString',
  subtests: [
    {
      name: 'exists on Number prototype',
      exec: function(){/*
        return typeof Number.prototype.toLocaleString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Array.prototype.toLocaleString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.tolocalestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString',
  subtests: [
    {
      name: 'exists on Array prototype',
      exec: function(){/*
        return typeof Array.prototype.toLocaleString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Object.prototype.toLocaleString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tolocalestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString',
  subtests: [
    {
      name: 'exists on Object prototype',
      exec: function(){/*
        return typeof Object.prototype.toLocaleString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Date.prototype.toLocaleString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocalestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString',
  subtests: [
    {
      name: 'exists on Date prototype',
      exec: function(){/*
        return typeof Date.prototype.toLocaleString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Date.prototype.toLocaleDateString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocaledatestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString',
  subtests: [
    {
      name: 'exists on Date prototype',
      exec: function(){/*
        return typeof Date.prototype.toLocaleDateString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
{
  name: 'Date.prototype.toLocaleTimeString',
  spec: 'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocaletimestring',
  mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString',
  subtests: [
    {
      name: 'exists on Date prototype',
      exec: function(){/*
        return typeof Date.prototype.toLocaleTimeString === 'function';
      */},
      res: {
        ie9: true,
        edge12: true,
        firefox2: true,
        chrome22: true,
        safari3_1: true,
        opera10_50: true,
        opera12: true,
        ios7: true,
        node0_10: true,
        android4_0: true,
        duktape2_0: true,
      },
    },
  ],
},
];
