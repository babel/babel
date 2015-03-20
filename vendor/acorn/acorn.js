// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke and various contributors and
// released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
  mod(root.acorn || (root.acorn = {})); // Plain browser env
})(this, function(exports) {
  "use strict";

  exports.version = "0.12.1";

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api].
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  exports.parse = function(input, options) {
    var p = new Parser(options, input);
    var startPos = p.options.locations ? [p.pos, p.curPosition()] : p.pos;
    p.nextToken();
    return p.parseTopLevel(p.options.program || p.startNodeAt(startPos));
  };

  // A second optional argument can be given to further configure
  // the parser process. These options are recognized:

  var defaultOptions = exports.defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must
    // be either 3, or 5, or 6. This influences support for strict
    // mode, the set of reserved words, support for getters and
    // setters and other features.
    ecmaVersion: 5,
    // Source type ("script" or "module") for different semantics
    sourceType: "script",
    // `onInsertedSemicolon` can be a callback that will be called
    // when a semicolon is automatically inserted. It will be passed
    // th position of the comma as an offset, and if `locations` is
    // enabled, it is given the location as a `{line, column}` object
    // as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are not enforced. Disable
    // `allowReserved` to enforce them. When this option has the
    // value "never", reserved words and keywords can also not be
    // used as property names.
    allowReserved: true,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program.
    allowImportExportEverywhere: false,
    // When enabled, hashbang directive in the beginning of file
    // is allowed and treated as a line comment.
    allowHashBang: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokenize() returns. Note that you are not
    // allowed to call the parser from the callback—that will
    // corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false,
    plugins: {},
    // Babel-specific options
    features: {},
    strictMode: false
  };

  exports.plugins = {};

  // This function tries to parse a single expression at a given
  // offset in a string. Useful for parsing mixed-language formats
  // that embed JavaScript expressions.

  exports.parseExpressionAt = function(input, pos, options) {
    var p = new Parser(options, input, pos);
    p.nextToken();
    return p.parseExpression();
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  var getLineInfo = exports.getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return new Position(line, offset - cur);
  };

  // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.

  var Token = exports.Token = function(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations)
      this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
    if (p.options.ranges)
      this.range = [p.start, p.end];
  };

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenize` export provides an interface to the tokenizer.
  // Because the tokenizer is optimized for being efficiently used by
  // the Acorn parser itself, this interface is somewhat crude and not
  // very modular.

  exports.tokenizer = function(input, options) {
    return new Parser(options, input);
  };

  // Interpret and default an options object

  function parseOptions(opts) {
    var options = {};
    for (var opt in defaultOptions)
      options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];

    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function (token) { tokens.push(token); };
    }
    if (isArray(options.onComment))
      options.onComment = pushComment(options, options.onComment);

    return options;
  }

  function pushComment(options, array) {
    return function (block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? 'Block' : 'Line',
        value: text,
        start: start,
        end: end
      };
      if (options.locations)
        comment.loc = new SourceLocation(this, startLoc, endLoc);
      if (options.ranges)
        comment.range = [start, end];
      array.push(comment);
    };
  }

  // Reused empty array added for node fields that are always empty.

  var empty = [];

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var TokenType = exports.TokenType = function(label, conf) {
    if (!conf) conf = {};
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.rightAssociative = !!conf.rightAssociative;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };

  function binop(name, prec) {
    return new TokenType(name, {beforeExpr: true, binop: prec});
  }
  var beforeExpr = {beforeExpr: true}, startsExpr = {startsExpr: true};;

  var tt = exports.tokTypes = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    eof: new TokenType("eof"),

    // Punctuation token types.
    bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.

    eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
    assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
    incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
    prefix: new TokenType("prefix", {beforeExpr: true, prefix: true, startsExpr: true}),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=", 6),
    relational: binop("</>", 7),
    bitShift: binop("<</>>", 8),
    plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    exponent: new TokenType("**", {beforeExpr: true, binop: 11, rightAssociative: true})
  };

  // Map keyword names to token types.

  var keywordTypes = {};

  // Succinct definitions of keyword token types
  function kw(name, options) {
    if (!options) options = {};
    options.keyword = name;
    keywordTypes[name] = tt["_" + name] = new TokenType(name, options);
  };

  kw("break"),
  kw("case", beforeExpr),
  kw("catch"),
  kw("continue"),
  kw("debugger"),
  kw("default"),
  kw("do", {isLoop: true}),
  kw("else", beforeExpr),
  kw("finally"),
  kw("for", {isLoop: true}),
  kw("function"),
  kw("if"),
  kw("return", beforeExpr),
  kw("switch");
  kw("throw", beforeExpr),
  kw("try"),
  kw("var"),
  kw("let");
  kw("const");
  kw("while", {isLoop: true});
  kw("with");
  kw("new", {beforeExpr: true, startsExpr: true});
  kw("this", startsExpr);
  kw("super", startsExpr);
  kw("class");
  kw("extends", beforeExpr);
  kw("export");
  kw("import");
  kw("yield", {beforeExpr: true, startsExpr: true});
  kw("null", startsExpr);
  kw("true", startsExpr);
  kw("false", startsExpr);
  kw("in", {beforeExpr: true, binop: 7});
  kw("instanceof", {beforeExpr: true, binop: 7});
  kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true});
  kw("void", {beforeExpr: true, prefix: true, startsExpr: true});
  kw("delete", {beforeExpr: true, prefix: true, startsExpr: true});

  // This is a trick taken from Esprima. It turns out that, on
  // non-Chrome browsers, to check whether a string is in a set, a
  // predicate containing a big ugly `switch` statement is faster than
  // a regular expression, and on Chrome the two are about on par.
  // This function uses `eval` (non-lexical) to produce such a
  // predicate from a space-separated string of words.
  //
  // It starts by sorting the words by length.

  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [];
    out: for (var i = 0; i < words.length; ++i) {
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          continue out;
        }
      cats.push([words[i]]);
    }
    function compareTo(arr) {
      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.

    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";

    // Otherwise, simply generate a flat `switch` statement.

    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }

  // The ECMAScript 3 reserved word list.

  var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");

  // ECMAScript 5 reserved words.

  var isReservedWord5 = makePredicate("class enum extends super const export import");

  // The additional reserved words in strict mode.

  var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");

  // ECMAScript 6 reserved words.

  var isReservedWord6 = makePredicate("enum await");

  // The forbidden variable names in strict mode.

  var isStrictBadIdWord = makePredicate("eval arguments");

  // And the keywords.

  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

  var isEcma5AndLessKeyword = makePredicate(ecma5AndLessKeywords);

  var isEcma6Keyword = makePredicate(ecma5AndLessKeywords + " let const class extends export import yield super");

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.
  // Generated by `tools/generate-identifier-regex.js`.

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0-\u08b2\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua7ad\ua7b0\ua7b1\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab5f\uab64\uab65\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d01-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf8\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2d\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

  // These are a run-length and offset encoded representation of the
  // >0xffff code points that are a valid part of identifiers. The
  // offset starts at 0x10000, and each pair of numbers represents an
  // offset to the next range, and then a size of the range. They were
  // generated by tools/generate-identifier-regex.js
  var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,99,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,98,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,955,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,38,17,2,24,133,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,32,4,287,47,21,1,2,0,185,46,82,47,21,0,60,42,502,63,32,0,449,56,1288,920,104,110,2962,1070,13266,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,16481,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,1340,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,16355,541];
  var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,16,9,83,11,168,11,6,9,8,2,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,316,19,13,9,214,6,3,8,112,16,16,9,82,12,9,9,535,9,20855,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,4305,6,792618,239];

  // This has a complexity linear to the value of the code. The
  // assumption is that looking up astral identifier characters is
  // rare.
  function isInAstralSet(code, set) {
    var pos = 0x10000;
    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) return false;
      pos += set[i + 1];
      if (pos >= code) return true;
    }
  }

  // Whether a single character denotes a newline.

  var newline = exports.newline = /[\n\r\u2028\u2029]/;

  var isNewLine = exports.isNewLine = function(code) {
    return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
  };

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = exports.lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

  // Test whether a given character code starts an identifier.

  var isIdentifierStart = exports.isIdentifierStart = function(code, astral) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
    if (astral === false) return false;
    return isInAstralSet(code, astralIdentifierStartCodes);
  };

  // Test whether a given character is part of an identifier.

  var isIdentifierChar = exports.isIdentifierChar = function(code, astral) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
    if (astral === false) return false;
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
  };

  // ## Tokenizer

  // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.

  function Position(line, col) {
    this.line = line;
    this.column = col;
  }

  Position.prototype.offset = function(n) {
    return new Position(this.line, this.column + n);
  };

  // ## Parser

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

  var Parser = exports.Parser = function(options, input, startPos) {
    this.options = parseOptions(options);
    this.loadPlugins(this.options.plugins);
    this.sourceFile = this.options.sourceFile || null;
    this.isKeyword = this.options.ecmaVersion >= 6 ? isEcma6Keyword : isEcma5AndLessKeyword;
    this.isReservedWord = this.options.ecmaVersion === 3 ? isReservedWord3 : this.options.ecmaVersion === 5 ? isReservedWord5 : isReservedWord6;
    this.input = String(input);

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
      this.curLine = this.input.slice(0, this.lineStart).split(newline).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = tt.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = null;

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = [tc.b_stat];
    this.exprAllowed = true;

    // Figure out if it's a module code.
    this.inModule = this.options.sourceType === "module";
    this.strict = options.strictMode === false ? false : this.inModule;
    // Flags to track whether we are in a function, a generator.
    this.inFunction = this.inGenerator = this.inAsync = false;
    // Labels in scope.
    this.labels = [];

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && this.options.allowHashBang && this.input.slice(0, 2) === '#!')
      this.skipLineComment(2);
  };

  // Shorthand because we are going to be adding a _lot_ of methods to
  // this.
  var pp = Parser.prototype;

  pp.extend = function(name, f) {
    this[name] = f(this[name]);
  };

  pp.loadPlugins = function(plugins) {
    for (var name in plugins) {
      var plugin = exports.plugins[name];
      if (!plugin) throw new Error("Plugin '" + name + "' not found");
      plugin(this, plugins[name]);
    }
  };

  // Move to the next token

  pp.next = function() {
    if (this.options.onToken)
      this.options.onToken(new Token(this));

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };

  var STATE_KEYS = ["lastTokStartLoc", "lastTokEndLoc", "lastTokStart", "lastTokEnd", "startLoc", "endLoc", "start", "pos", "end", "type", "value"];

  pp.getState = function () {
    var state = {};
    for (var i = 0; i < STATE_KEYS.length; i++) {
      var key = STATE_KEYS[i];
      state[key] = this[key];
    }
    return state;
  };

  pp.lookahead = function() {
    var old = this.getState();
    this.next();
    var curr = this.getState();
    for (var key in old) this[key] = old[key];
    return curr;
  };

  pp.getToken = function() {
    this.next();
    return new Token(this);
  };

  // If we're in an ES6 environment, make parsers iterable
  if (typeof Symbol !== "undefined")
    pp[Symbol.iterator] = function () {
      var self = this;
      return {next: function () {
        var token = self.getToken();
        return {
          done: token.type === tt.eof,
          value: token
        };
      }};
    };

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  pp.setStrict = function(strict) {
    this.strict = strict;
    if (this.type !== tt.num && this.type !== tt.string) return;
    this.pos = this.start;
    if (this.options.locations) {
      while (this.pos < this.lineStart) {
        this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
        --this.curLine;
      }
    }
    this.nextToken();
  };

  pp.curContext = function() {
    return this.context[this.context.length - 1];
  };

  // Read a single token, updating the parser object's token-related
  // properties.

  pp.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) this.skipSpace();

    this.start = this.pos;
    if (this.options.locations) this.startLoc = this.curPosition();
    if (this.pos >= this.input.length) return this.finishToken(tt.eof);

    if (curContext === tc.q_tmpl) return this.readTmplToken();

    this.readToken(this.fullCharCodeAtPos());
  };

  pp.readToken = function(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
      return this.readWord();

    return this.getTokenFromCode(code);
  };

  pp.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 0xd7ff || code >= 0xe000) return code;
    var next = this.input.charCodeAt(this.pos + 1);
    return (code << 10) + next - 0x35fdc00;
  };

  pp.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.options.locations && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
    this.pos = end + 2;
    if (this.options.locations) {
      lineBreak.lastIndex = start;
      var match;
      while ((match = lineBreak.exec(this.input)) && match.index < this.pos) {
        ++this.curLine;
        this.lineStart = match.index + match[0].length;
      }
    }
    if (this.options.onComment)
      this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                             startLoc, this.options.locations && this.curPosition());
  };

  pp.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.options.locations && this.curPosition();
    var ch = this.input.charCodeAt(this.pos+=startSkip);
    while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
      ++this.pos;
      ch = this.input.charCodeAt(this.pos);
    }
    if (this.options.onComment)
      this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                             startLoc, this.options.locations && this.curPosition());
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  pp.skipSpace = function() {
    while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 32) { // ' '
        ++this.pos;
      } else if (ch === 13) {
        ++this.pos;
        var next = this.input.charCodeAt(this.pos);
        if (next === 10) {
          ++this.pos;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
      } else if (ch === 10 || ch === 8232 || ch === 8233) {
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
      } else if (ch > 8 && ch < 14) {
        ++this.pos;
      } else if (ch === 47) { // '/'
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 42) { // '*'
          this.skipBlockComment();
        } else if (next === 47) { // '/'
          this.skipLineComment(2);
        } else break;
      } else if (ch === 160) { // '\xa0'
        ++this.pos;
      } else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this.pos;
      } else {
        break;
      }
    }
  };

  pp.curPosition = function() {
    return new Position(this.curLine, this.pos - this.lineStart);
  };

  // The algorithm used to determine whether a regexp can appear at a
  // given point in the program is loosely based on sweet.js' approach.
  // See https://github.com/mozilla/sweet.js/wiki/design

  var TokContext = exports.TokContext = function(token, isExpr, preserveSpace) {
    this.token = token;
    this.isExpr = isExpr;
    this.preserveSpace = preserveSpace;
  };

  var tc = exports.tokContexts = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", true),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true),
    f_expr: new TokContext("function", true)
  };

  pp.braceIsBlock = function(prevType) {
    var parent;
    if (prevType === tt.colon && (parent = this.curContext()).token == "{")
      return !parent.isExpr;
    if (prevType === tt._return)
      return newline.test(this.input.slice(this.lastTokEnd, this.start));
    if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof)
      return true;
    if (prevType == tt.braceL)
      return this.curContext() === tc.b_stat;
    return !this.exprAllowed;
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) this.endLoc = this.curPosition();
    var prevType = this.type;
    this.type = type;
    this.value = val;

    this.updateContext(prevType);
  };

  pp.updateContext = function(prevType) {
    var update, type = this.type;
    if (type.keyword && prevType == tt.dot)
      this.exprAllowed = false;
    else if (update = type.updateContext)
      update.call(this, prevType);
    else
      this.exprAllowed = type.beforeExpr;
  };

  // Token-specific context update code

  tt.parenR.updateContext = tt.braceR.updateContext = function() {
    var out = this.context.pop();
    if (out === tc.b_stat && this.curContext() === tc.f_expr) {
      this.context.pop();
      this.exprAllowed = false;
    } else if (out === tc.b_tmpl) {
      this.exprAllowed = true;
    } else {
      this.exprAllowed = !(out && out.isExpr);
    }
  };

  tt.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? tc.b_stat : tc.b_expr);
    this.exprAllowed = true;
  };

  tt.dollarBraceL.updateContext = function() {
    this.context.push(tc.b_tmpl);
    this.exprAllowed = true;
  };

  tt.parenL.updateContext = function(prevType) {
    var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
    this.context.push(statementParens ? tc.p_stat : tc.p_expr);
    this.exprAllowed = true;
  };

  tt.incDec.updateContext = function() {
    // tokExprAllowed stays unchanged
  };

  tt._function.updateContext = function() {
    if (this.curContext() !== tc.b_stat)
      this.context.push(tc.f_expr);
    this.exprAllowed = false;
  };

  tt.backQuote.updateContext = function() {
    if (this.curContext() === tc.q_tmpl)
      this.context.pop();
    else
      this.context.push(tc.q_tmpl);
    this.exprAllowed = false;
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  pp.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) return this.readNumber(true);
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(tt.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(tt.dot);
    }
  };

  pp.readToken_slash = function() { // '/'
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {++this.pos; return this.readRegexp();}
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(tt.slash, 1);
  };

  pp.readToken_mult_modulo = function(code) { // '%*'
    var type = code === 42 ? tt.star : tt.modulo;
    var width = 1;
    var next = this.input.charCodeAt(this.pos + 1);

    if (next === 42) { // '*'
      width++;
      next = this.input.charCodeAt(this.pos + 2);
      type = tt.exponent;
    }

    if (next === 61) {
      width++;
      type = tt.assign;
    }

    return this.finishOp(type, width);
  };

  pp.readToken_pipe_amp = function(code) { // '|&'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
  };

  pp.readToken_caret = function() { // '^'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(tt.bitwiseXOR, 1);
  };

  pp.readToken_plus_min = function(code) { // '+-'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 &&
          newline.test(this.input.slice(this.lastTokEnd, this.pos))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(tt.incDec, 2);
    }
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(tt.plusMin, 1);
  };

  pp.readToken_lt_gt = function(code) { // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(tt.assign, size + 1);
      return this.finishOp(tt.bitShift, size);
    }
    if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 &&
        this.input.charCodeAt(this.pos + 3) == 45) {
      if (this.inModule) unexpected();
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }
    if (next === 61)
      size = this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2;
    return this.finishOp(tt.relational, size);
  };

  pp.readToken_eq_excl = function(code) { // '=!'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
      this.pos += 2;
      return this.finishToken(tt.arrow);
    }
    return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
  };

  pp.getTokenFromCode = function(code) {
    switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46: // '.'
      return this.readToken_dot();

    // Punctuation tokens.
    case 40: ++this.pos; return this.finishToken(tt.parenL);
    case 41: ++this.pos; return this.finishToken(tt.parenR);
    case 59: ++this.pos; return this.finishToken(tt.semi);
    case 44: ++this.pos; return this.finishToken(tt.comma);
    case 91: ++this.pos; return this.finishToken(tt.bracketL);
    case 93: ++this.pos; return this.finishToken(tt.bracketR);
    case 123: ++this.pos; return this.finishToken(tt.braceL);
    case 125: ++this.pos; return this.finishToken(tt.braceR);
    case 58: ++this.pos; return this.finishToken(tt.colon);
    case 63: ++this.pos; return this.finishToken(tt.question);

    case 96: // '`'
      if (this.options.ecmaVersion < 6) break;
      ++this.pos;
      return this.finishToken(tt.backQuote);

    case 48: // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return this.readNumber(false);

    // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return this.readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47: // '/'
      return this.readToken_slash();

    case 37: case 42: // '%*'
      return this.readToken_mult_modulo(code);

    case 124: case 38: // '|&'
      return this.readToken_pipe_amp(code);

    case 94: // '^'
      return this.readToken_caret();

    case 43: case 45: // '+-'
      return this.readToken_plus_min(code);

    case 60: case 62: // '<>'
      return this.readToken_lt_gt(code);

    case 61: case 33: // '=!'
      return this.readToken_eq_excl(code);

    case 126: // '~'
      return this.finishOp(tt.prefix, 1);
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  pp.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };

  var regexpUnicodeSupport = false;
  try { new RegExp("\uffff", "u"); regexpUnicodeSupport = true; }
  catch(e) {}

  // Parse a regular expression. Some context-awareness is necessary,
  // since a '/' inside a '[]' set does not end the expression.

  pp.readRegexp = function() {
    var content = "", escaped, inClass, start = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
      var ch = this.input.charAt(this.pos);
      if (newline.test(ch)) this.raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++this.pos;
    }
    var content = this.input.slice(start, this.pos);
    ++this.pos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = this.readWord1();
    var tmp = content;
    if (mods) {
      var validFlags = /^[gmsiy]*$/;
      if (this.options.ecmaVersion >= 6) validFlags = /^[gmsiyu]*$/;
      if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
      if (mods.indexOf('u') >= 0 && !regexpUnicodeSupport) {
        // Replace each astral symbol and every Unicode escape sequence that
        // possibly represents an astral symbol or a paired surrogate with a
        // single ASCII symbol to avoid throwing on regular expressions that
        // are only valid in combination with the `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it would
        // be replaced by `[x-b]` which throws an error.
        tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|\\u\{([0-9a-fA-F]+)\}|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x")
      }
    }
    // Detect invalid regular expressions.
    try {
      new RegExp(tmp);
    } catch (e) {
      if (e instanceof SyntaxError) this.raise(start, "Error parsing regular expression: " + e.message);
      this.raise(e);
    }
    // Get a regular expression object for this pattern-flag pair, or `null` in
    // case the current environment doesn't support the flags it uses.
    try {
      var value = new RegExp(content, mods);
    } catch (err) {
      value = null;
    }
    return this.finishToken(tt.regexp, {pattern: content, flags: mods, value: value});
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  pp.readInt = function(radix, len) {
    var start = this.pos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.pos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++this.pos;
      total = total * radix + val;
    }
    if (this.pos === start || len != null && this.pos - start !== len) return null;

    return total;
  };

  pp.readRadixNumber = function(radix) {
    this.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
    if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");
    return this.finishToken(tt.num, val);
  };

  // Read an integer, octal integer, or floating-point number.

  pp.readNumber = function(startsWithDot) {
    var start = this.pos, isFloat = false, octal = this.input.charCodeAt(this.pos) === 48;
    if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
    if (this.input.charCodeAt(this.pos) === 46) {
      ++this.pos;
      this.readInt(10);
      isFloat = true;
    }
    var next = this.input.charCodeAt(this.pos);
    if (next === 69 || next === 101) { // 'eE'
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) ++this.pos; // '+-'
      if (this.readInt(10) === null) this.raise(start, "Invalid number");
      isFloat = true;
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");

    var str = this.input.slice(start, this.pos), val;
    if (isFloat) val = parseFloat(str);
    else if (!octal || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return this.finishToken(tt.num, val);
  };

  // Read a string value, interpreting backslash-escapes.

  pp.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;

    if (ch === 123) {
      if (this.options.ecmaVersion < 6) this.unexpected();
      ++this.pos;
      code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos);
      ++this.pos;
      if (code > 0x10FFFF) this.unexpected();
    } else {
      code = this.readHexChar(4);
    }
    return code;
  };

  function codePointToString(code) {
    // UTF-16 Decoding
    if (code <= 0xFFFF) return String.fromCharCode(code);
    return String.fromCharCode(((code - 0x10000) >> 10) + 0xD800,
                               ((code - 0x10000) & 1023) + 0xDC00);
  }

  pp.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) break;
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar();
        chunkStart = this.pos;
      } else {
        if (isNewLine(ch)) this.raise(this.start, "Unterminated string constant");
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(tt.string, out);
  };

  // Reads template string tokens.

  pp.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(this.start, "Unterminated template");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
        if (this.pos === this.start && this.type === tt.template) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(tt.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(tt.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(tt.template, out);
      }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar();
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
          out += "\n";
        } else {
          out += String.fromCharCode(ch);
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };

  // Used to read escaped characters

  pp.readEscapedChar = function() {
    var ch = this.input.charCodeAt(++this.pos);
    var octal = /^[0-7]+/.exec(this.input.slice(this.pos, this.pos + 3));
    if (octal) octal = octal[0];
    while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
    if (octal === "0") octal = null;
    ++this.pos;
    if (octal) {
      if (this.strict) this.raise(this.pos - 2, "Octal literal in strict mode");
      this.pos += octal.length - 1;
      return String.fromCharCode(parseInt(octal, 8));
    } else {
      switch (ch) {
        case 110: return "\n"; // 'n' -> '\n'
        case 114: return "\r"; // 'r' -> '\r'
        case 120: return String.fromCharCode(this.readHexChar(2)); // 'x'
        case 117: return codePointToString(this.readCodePoint()); // 'u'
        case 116: return "\t"; // 't' -> '\t'
        case 98: return "\b"; // 'b' -> '\b'
        case 118: return "\u000b"; // 'v' -> '\u000b'
        case 102: return "\f"; // 'f' -> '\f'
        case 48: return "\0"; // 0 -> '\0'
        case 13: if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
        case 10: // ' \n'
          if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
          return "";
        default: return String.fromCharCode(ch);
      }
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  pp.readHexChar = function(len) {
    var n = this.readInt(16, len);
    if (n === null) this.raise(this.start, "Bad character escape sequence");
    return n;
  };

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.

  var containsEsc;

  // Read an identifier, and return it as a string. Sets `containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  pp.readWord1 = function() {
    containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) { // "\"
        containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) != 117) // "u"
          this.raise(this.pos, "Expecting Unicode escape sequence \\uXXXX");
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
          this.raise(escStart, "Invalid Unicode escape");
        word += codePointToString(esc);
        chunkStart = this.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  pp.readWord = function() {
    var word = this.readWord1();
    var type = tt.name;
    if ((this.options.ecmaVersion >= 6 || !containsEsc) && this.isKeyword(word))
      type = keywordTypes[word];
    return this.finishToken(type, word);
  };

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
    throw err;
  };

  pp.currentPos = function() {
    return this.options.locations ? [this.start, this.startLoc] : this.start;
  };

  // ### Parser utilities

  // Start an AST node, attaching a start offset.

  var Node = exports.Node = function() {};

  var SourceLocation = exports.SourceLocation = function(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) this.source = p.sourceFile;
  };

  pp.startNode = function() {
    var node = new Node;
    node.start = this.start;
    if (this.options.locations)
      node.loc = new SourceLocation(this, this.startLoc);
    if (this.options.directSourceFile)
      node.sourceFile = this.options.directSourceFile;
    if (this.options.ranges)
      node.range = [this.start, 0];
    return node;
  };

  pp.startNodeAt = function(pos) {
    var node = new Node, start = pos;
    if (this.options.locations) {
      node.loc = new SourceLocation(this, start[1]);
      start = pos[0];
    }
    node.start = start;
    if (this.options.directSourceFile)
      node.sourceFile = this.options.directSourceFile;
    if (this.options.ranges)
      node.range = [start, 0];
    return node;
  };

  // Finish an AST node, adding `type` and `end` properties.

  pp.finishNode = function(node, type) {
    node.type = type;
    node.end = this.lastTokEnd;
    if (this.options.locations)
      node.loc.end = this.lastTokEndLoc;
    if (this.options.ranges)
      node.range[1] = this.lastTokEnd;
    return node;
  };

  // Finish node at given position

  pp.finishNodeAt = function(node, type, pos) {
    if (this.options.locations) { node.loc.end = pos[1]; pos = pos[0]; }
    node.type = type;
    node.end = pos;
    if (this.options.ranges)
      node.range[1] = pos;
    return node;
  };

  // Test whether a statement node is the string literal `"use strict"`.

  pp.isUseStrict = function(stmt) {
    return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  pp.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  };

  // Tests whether parsed token is a contextual keyword.

  pp.isContextual = function(name) {
    return this.type === tt.name && this.value === name;
  };

  // Consumes contextual keyword if possible.

  pp.eatContextual = function(name) {
    return this.value === name && this.eat(tt.name);
  };

  // Asserts that following token is given contextual keyword.

  pp.expectContextual = function(name) {
    if (!this.eatContextual(name)) this.unexpected();
  };

  // Test whether a semicolon can be inserted at the current position.

  pp.canInsertSemicolon = function() {
    return this.type === tt.eof ||
      this.type === tt.braceR ||
      newline.test(this.input.slice(this.lastTokEnd, this.start));
  };

  pp.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon)
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc)
      return true;
    }
  };

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  pp.semicolon = function() {
    if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected();
  };

  pp.afterTrailingComma = function(tokType) {
    if (this.type == tokType) {
      if (this.options.onTrailingComma)
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      this.next();
      return true;
    }
  };

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  pp.expect = function(type) {
    this.eat(type) || this.unexpected();
  };

  // Raise an unexpected token error.

  pp.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  // Checks if an object has a property.

  function has(obj, propName) {
    return Object.prototype.hasOwnProperty.call(obj, propName);
  }

  // Convert existing expression atom to assignable pattern
  // if possible.

  pp.toAssignable = function(node, isBinding) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
          break;

        case "ObjectExpression":
          node.type = "ObjectPattern";
          for (var i = 0; i < node.properties.length; i++) {
            var prop = node.properties[i];
            if (prop.kind !== "init") this.raise(prop.key.start, "Object pattern can't contain getter or setter");
            this.toAssignable(prop.value, isBinding);
          }
          break;

        case "ArrayExpression":
          node.type = "ArrayPattern";
          this.toAssignableList(node.elements, isBinding);
          break;

        case "AssignmentExpression":
          if (node.operator === "=") {
            node.type = "AssignmentPattern";
          } else {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }
          break;

        case "MemberExpression":
          if (!isBinding) break;

        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    }
    return node;
  };

  // Convert list of expression atoms to binding list.

  pp.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    if (end) {
      var last = exprList[end - 1];
      if (last && last.type == "RestElement") {
        --end;
      } else if (last && last.type == "SpreadElement") {
        last.type = "RestElement";
        var arg = last.argument;
        this.toAssignable(arg, isBinding);
        if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern")
          this.unexpected(arg.start);
        --end;
       }
     }
    for (var i = 0; i < end; i++) {
      var elt = exprList[i];
      if (elt) this.toAssignable(elt, isBinding);
    }
    return exprList;
  };

  // Parses spread element.

  pp.parseSpread = function(refShorthandDefaultPos) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(refShorthandDefaultPos);
    return this.finishNode(node, "SpreadElement");
  };

  pp.parseRest = function() {
    var node = this.startNode();
    this.next();
    node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();
    return this.finishNode(node, "RestElement");
  };

  // Parses lvalue (assignable) atom.

  pp.parseBindingAtom = function() {
    if (this.options.ecmaVersion < 6) return this.parseIdent();
    switch (this.type) {
      case tt.name:
        return this.parseIdent();

      case tt.bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(tt.bracketR, true, true);
        return this.finishNode(node, "ArrayPattern");

      case tt.braceL:
        return this.parseObj(true);

      default:
        this.unexpected();
    }
  };

  pp.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (first) first = false;
      else this.expect(tt.comma);
      if (allowEmpty && this.type === tt.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      } else if (this.type === tt.ellipsis) {
        elts.push(this.parseAssignableListItemTypes(this.parseRest()));
        this.expect(close);
        break;
      } else {
        elts.push(this.parseAssignableListItemTypes(this.parseMaybeDefault()));
      }
    }
    return elts;
  };

  pp.parseAssignableListItemTypes = function(param) {
    return param;
  };

  // Parses assignment pattern around given atom if possible.

  pp.parseMaybeDefault = function(startPos, left) {
    startPos = startPos || this.currentPos();
    left = left || this.parseBindingAtom();
    if (!this.eat(tt.eq)) return left;
    var node = this.startNodeAt(startPos);
    node.operator = "=";
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  };

  // Verify that argument names are not repeated, and it does not
  // try to bind the words `eval` or `arguments`.

  pp.checkFunctionParam = function(param, nameHash) {
    switch (param.type) {
      case "Identifier":
        if (isStrictReservedWord(param.name) || isStrictBadIdWord(param.name))
          this.raise(param.start, "Defining '" + param.name + "' in strict mode");
        if (has(nameHash, param.name))
          this.raise(param.start, "Argument name clash in strict mode");
        nameHash[param.name] = true;
        break;

      case "ObjectPattern":
        for (var i = 0; i < param.properties.length; i++) {
          var prop = param.properties[i];
          if (prop.type === "Property") prop = prop.value;
          this.checkFunctionParam(prop, nameHash);
        }
        break;

      case "ArrayPattern":
        for (var i = 0; i < param.elements.length; i++) {
          var elem = param.elements[i];
          if (elem) this.checkFunctionParam(elem, nameHash);
        }
        break;

      case "SpreadProperty":
      case "RestElement":
        return this.checkFunctionParam(param.argument, nameHash);
    }
  };

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp.checkPropClash = function(prop, propHash) {
    if (this.options.ecmaVersion >= 6) return;
    var key = prop.key, name;
    switch (key.type) {
      case "Identifier": name = key.name; break;
      case "Literal": name = String(key.value); break;
      default: return;
    }
    var kind = prop.kind || "init", other;
    if (has(propHash, name)) {
      other = propHash[name];
      var isGetSet = kind !== "init";
      if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init))
        this.raise(key.start, "Redefinition of property");
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };

  // Verify that a node is an lval — something that can be assigned
  // to.

  pp.checkLVal = function(expr, isBinding) {
    switch (expr.type) {
      case "Identifier":
        if (this.strict && (isStrictBadIdWord(expr.name) || isStrictReservedWord(expr.name)))
          this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        break;

      case "MemberExpression":
        if (isBinding) this.raise(expr.start, "Binding to member expression");
        break;

      case "ObjectPattern":
        for (var i = 0; i < expr.properties.length; i++) {
          var prop = expr.properties[i];
          if (prop.type === "Property") prop = prop.value;
          this.checkLVal(prop, isBinding);
        }
        break;

      case "ArrayPattern":
        for (var i = 0; i < expr.elements.length; i++) {
          var elem = expr.elements[i];
          if (elem) this.checkLVal(elem, isBinding);
        }
        break;

      case "AssignmentPattern":
        this.checkLVal(expr.left);
        break;

      case "SpreadProperty":
      case "RestElement":
        this.checkLVal(expr.argument);
        break;

      default:
        this.raise(expr.start, "Assigning to rvalue");
    }
  };

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp.parseTopLevel = function(node) {
    var first = true;
    if (!node.body) node.body = [];
    while (this.type !== tt.eof) {
      var stmt = this.parseStatement(true, true);
      node.body.push(stmt);
      if (first && this.isUseStrict(stmt)) this.setStrict(true);
      first = false;
    }

    this.next();
    if (this.options.ecmaVersion >= 6) {
      node.sourceType = this.options.sourceType;
    }
    return this.finishNode(node, "Program");
  };

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
  // does not help.

  pp.parseStatement = function(declaration, topLevel) {
    var starttype = this.type, node = this.startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
    case tt._break: case tt._continue: return this.parseBreakContinueStatement(node, starttype.keyword);
    case tt._debugger: return this.parseDebuggerStatement(node);
    case tt._do: return this.parseDoStatement(node);
    case tt._for: return this.parseForStatement(node);
    case tt._function:
      if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
      return this.parseFunctionStatement(node);
    case tt._class:
      if (!declaration) this.unexpected();
      return this.parseClass(node, true);
    case tt._if: return this.parseIfStatement(node);
    case tt._return: return this.parseReturnStatement(node);
    case tt._switch: return this.parseSwitchStatement(node);
    case tt._throw: return this.parseThrowStatement(node);
    case tt._try: return this.parseTryStatement(node);
    case tt._let: case tt._const: if (!declaration) this.unexpected(); // NOTE: falls through to _var
    case tt._var: return this.parseVarStatement(node, starttype);
    case tt._while: return this.parseWhileStatement(node);
    case tt._with: return this.parseWithStatement(node);
    case tt.braceL: return this.parseBlock(); // no point creating a function for this
    case tt.semi: return this.parseEmptyStatement(node);
    case tt._export:
    case tt._import:
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel)
          this.raise(this.start, "'import' and 'export' may only appear at the top level");
        if (!this.inModule)
          this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
      }
      return starttype === tt._import ? this.parseImport(node) : this.parseExport(node);

    case tt.name:
      if (this.options.features["es7.asyncFunctions"] && this.value === "async") {
        // check to see if `function ` appears after this token, this is
        // pretty hacky
        if (this.input.slice(this.pos + 1, this.pos + 10) === "function ") {
          this.next();
          this.expect(tt._function);
          return this.parseFunction(node, true, false, true);
        }
      }

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
    default:
      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon))
        return this.parseLabeledStatement(node, maybeName, expr);
      else return this.parseExpressionStatement(node, expr);
    }
  };

  pp.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword == "break";
    this.next();
    if (this.eat(tt.semi) || this.insertSemicolon()) node.label = null;
    else if (this.type !== tt.name) this.unexpected();
    else {
      node.label = this.parseIdent();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    for (var i = 0; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
        if (node.label && isBreak) break;
      }
    }
    if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };

  pp.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };

  pp.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement(false);
    this.labels.pop();
    this.expect(tt._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6)
      this.eat(tt.semi);
    else
      this.semicolon();
    return this.finishNode(node, "DoWhileStatement");
  };

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  pp.parseForStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    this.expect(tt.parenL);
    if (this.type === tt.semi) return this.parseFor(node, null);
    if (this.type === tt._var || this.type === tt._let || this.type === tt._const) {
      var init = this.startNode(), varKind = this.type;
      this.next();
      this.parseVar(init, true, varKind);
      this.finishNode(init, "VariableDeclaration");
      if ((this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init.declarations.length === 1 &&
          !(varKind !== tt._var && init.declarations[0].init))
        return this.parseForIn(node, init);
      return this.parseFor(node, init);
    }
    var refShorthandDefaultPos = {start: 0};
    var init = this.parseExpression(true, refShorthandDefaultPos);
    if (this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.toAssignable(init);
      this.checkLVal(init);
      return this.parseForIn(node, init);
    } else if (refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    return this.parseFor(node, init);
  };

  pp.parseFunctionStatement = function(node) {
    this.next();
    return this.parseFunction(node, true);
  };

  pp.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement(false);
    node.alternate = this.eat(tt._else) ? this.parseStatement(false) : null;
    return this.finishNode(node, "IfStatement");
  };

  pp.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction)
      this.raise(this.start, "'return' outside of function");
    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(tt.semi) || this.insertSemicolon()) node.argument = null;
    else { node.argument = this.parseExpression(); this.semicolon(); }
    return this.finishNode(node, "ReturnStatement");
  };

  pp.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(tt.braceL);
    this.labels.push(switchLabel);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    for (var cur, sawDefault; this.type != tt.braceR;) {
      if (this.type === tt._case || this.type === tt._default) {
        var isCase = this.type === tt._case;
        if (cur) this.finishNode(cur, "SwitchCase");
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) cur.test = this.parseExpression();
        else {
          if (sawDefault) this.raise(this.lastTokStart, "Multiple default clauses"); sawDefault = true;
          cur.test = null;
        }
        this.expect(tt.colon);
      } else {
        if (!cur) this.unexpected();
        cur.consequent.push(this.parseStatement(true));
      }
    }
    if (cur) this.finishNode(cur, "SwitchCase");
    this.next(); // Closing brace
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };

  pp.parseThrowStatement = function(node) {
    this.next();
    if (newline.test(this.input.slice(this.lastTokEnd, this.start)))
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  };

  pp.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === tt._catch) {
      var clause = this.startNode();
      this.next();
      this.expect(tt.parenL);
      clause.param = this.parseBindingAtom();
      this.checkLVal(clause.param, true);
      this.expect(tt.parenR);
      clause.guard = null;
      clause.body = this.parseBlock();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.guardedHandlers = empty;
    node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer)
      this.raise(node.start, "Missing catch or finally clause");
    return this.finishNode(node, "TryStatement");
  };

  pp.parseVarStatement = function(node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };

  pp.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };

  pp.parseWithStatement = function(node) {
    if (this.strict) this.raise(this.start, "'with' in strict mode");
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement(false);
    return this.finishNode(node, "WithStatement");
  };

  pp.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };

  pp.parseLabeledStatement = function(node, maybeName, expr) {
    for (var i = 0; i < this.labels.length; ++i)
      if (this.labels[i].name === maybeName) this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null;
    this.labels.push({name: maybeName, kind: kind});
    node.body = this.parseStatement(true);
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };

  pp.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  };

  // Used for constructs like `switch` and `if` that insist on
  // parentheses around their expression.

  pp.parseParenExpression = function() {
    this.expect(tt.parenL);
    var val = this.parseExpression();
    this.expect(tt.parenR);
    return val;
  };

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  pp.parseBlock = function(allowStrict) {
    var node = this.startNode(), first = true, oldStrict;
    node.body = [];
    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      var stmt = this.parseStatement(true);
      node.body.push(stmt);
      if (first && allowStrict && this.isUseStrict(stmt)) {
        oldStrict = this.strict;
        this.setStrict(this.strict = true);
      }
      first = false;
    }
    if (oldStrict === false) this.setStrict(false);
    return this.finishNode(node, "BlockStatement");
  };

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  pp.parseFor = function(node, init) {
    node.init = init;
    this.expect(tt.semi);
    node.test = this.type === tt.semi ? null : this.parseExpression();
    this.expect(tt.semi);
    node.update = this.type === tt.parenR ? null : this.parseExpression();
    this.expect(tt.parenR);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  };

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  pp.parseForIn = function(node, init) {
    var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement";
    this.next();
    node.left = init;
    node.right = this.parseExpression();
    this.expect(tt.parenR);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, type);
  };

  // Parse a list of variable declarations.

  pp.parseVar = function(node, noIn, kind) {
    node.declarations = [];
    node.kind = kind.keyword;
    for (;;) {
      var decl = this.startNode();
      this.parseVarHead(decl);
      if (this.eat(tt.eq)) {
        decl.init = this.parseMaybeAssign(noIn);
      } else if (kind === tt._const && !(this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
        this.unexpected();
      } else if (decl.id.type != "Identifier") {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(tt.comma)) break;
    }
    return node;
  };

  pp.parseVarHead = function (decl) {
    decl.id = this.parseBindingAtom();
    this.checkLVal(decl.id, true);
  };

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  pp.parseExpression = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
    if (this.type === tt.comma) {
      var node = this.startNodeAt(start);
      node.expressions = [expr];
      while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  };

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  pp.parseMaybeAssign = function(noIn, refShorthandDefaultPos, afterLeftParse) {
    if (this.type == tt._yield && this.inGenerator) return this.parseYield();

    var failOnShorthandAssign;
    if (!refShorthandDefaultPos) {
      refShorthandDefaultPos = {start: 0};
      failOnShorthandAssign = true;
    } else {
      failOnShorthandAssign = false;
    }
    var start = this.currentPos();
    var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos);
    if (afterLeftParse) left = afterLeftParse.call(this, left, start);
    if (this.type.isAssign) {
      var node = this.startNodeAt(start);
      node.operator = this.value;
      node.left = this.type === tt.eq ? this.toAssignable(left) : left;
      refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly
      this.checkLVal(left);
      this.next();
      node.right = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "AssignmentExpression");
    } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    return left;
  };

  // Parse a ternary conditional (`?:`) operator.

  pp.parseMaybeConditional = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    if (this.eat(tt.question)) {
      var node = this.startNodeAt(start);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(tt.colon);
      node.alternate = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };

  // Start the precedence parser.

  pp.parseExprOps = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseMaybeUnary(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    return this.parseExprOp(expr, start, -1, noIn);
  };

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  pp.parseExprOp = function(left, leftStart, minPrec, noIn) {
    var prec = this.type.binop;
    if (prec != null && (!noIn || this.type !== tt._in)) {
      if (prec > minPrec) {
        var node = this.startNodeAt(leftStart);
        node.left = left;
        node.operator = this.value;
        var op = this.type;
        this.next();
        var start = this.currentPos();
        node.right = this.parseExprOp(this.parseMaybeUnary(), start, op.rightAssociative ? (prec - 1) : prec, noIn);
        this.finishNode(node, (op === tt.logicalOR || op === tt.logicalAND) ? "LogicalExpression" : "BinaryExpression");
        return this.parseExprOp(node, leftStart, minPrec, noIn);
      }
    }
    return left;
  };

  // Parse unary operators, both prefix and postfix.

  pp.parseMaybeUnary = function(refShorthandDefaultPos) {
    if (this.type.prefix) {
      var node = this.startNode(), update = this.type === tt.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary();
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);
      if (update) this.checkLVal(node.argument);
      else if (this.strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        this.raise(node.start, "Deleting local variable in strict mode");
      return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var start = this.currentPos();
    var expr = this.parseExprSubscripts(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node = this.startNodeAt(start);
      node.operator = this.value;
      node.prefix = false;
      node.argument = expr;
      this.checkLVal(expr);
      this.next();
      expr = this.finishNode(node, "UpdateExpression");
    }
    return expr;
  };

  // Parse call, dot, and `[]`-subscript expressions.

  pp.parseExprSubscripts = function(refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseExprAtom(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    return this.parseSubscripts(expr, start);
  };

  pp.parseSubscripts = function(base, start, noCalls) {
    if (this.eat(tt.dot)) {
      var node = this.startNodeAt(start);
      node.object = base;
      node.property = this.parseIdent(true);
      node.computed = false;
      return this.parseSubscripts(this.finishNode(node, "MemberExpression"), start, noCalls);
    } else if (this.eat(tt.bracketL)) {
      var node = this.startNodeAt(start);
      node.object = base;
      node.property = this.parseExpression();
      node.computed = true;
      this.expect(tt.bracketR);
      return this.parseSubscripts(this.finishNode(node, "MemberExpression"), start, noCalls);
    } else if (!noCalls && this.eat(tt.parenL)) {
      var node = this.startNodeAt(start);
      node.callee = base;
      node.arguments = this.parseExprList(tt.parenR, false);
      return this.parseSubscripts(this.finishNode(node, "CallExpression"), start, noCalls);
    } else if (this.type === tt.backQuote) {
      var node = this.startNodeAt(start);
      node.tag = base;
      node.quasi = this.parseTemplate();
      return this.parseSubscripts(this.finishNode(node, "TaggedTemplateExpression"), start, noCalls);
    } return base;
  };

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  pp.parseExprAtom = function(refShorthandDefaultPos) {
    switch (this.type) {
    case tt._this:
    case tt._super:
      var type = this.type === tt._this ? "ThisExpression" : "SuperExpression";
      var node = this.startNode();
      this.next();
      return this.finishNode(node, type);

    case tt._yield:
      if (this.inGenerator) unexpected();

    case tt.name:
      var start = this.currentPos();
      var node = this.startNode();
      var id = this.parseIdent(this.type !== tt.name);

      //
      if (this.options.features["es7.asyncFunctions"]) {
        // async functions!
        if (id.name === "async") {
          // arrow functions
          if (this.type === tt.parenL) {
            var expr = this.parseParenAndDistinguishExpression(start, true);
            if (expr.type === "ArrowFunctionExpression") {
              return expr;
            } else {
              node.callee = id;
              if (expr.type === "SequenceExpression") {
                node.arguments = expr.expressions;
              } else {
                node.arguments = [expr];
              }
              return this.parseSubscripts(this.finishNode(node, "CallExpression"), start);
            }
          } else if (this.type === tt.name) {
            id = this.parseIdent();
            this.expect(tt.arrow);
            return this.parseArrowExpression(node, [id], true);
          }

          // normal functions
          if (this.type === tt._function && !this.canInsertSemicolon()) {
            this.next();
            return this.parseFunction(node, false, false, true);
          }
        } else if (id.name === "await") {
          if (this.inAsync) return this.parseAwait(node);
        }
      }
      //

      if (!this.canInsertSemicolon() && this.eat(tt.arrow)) {
        return this.parseArrowExpression(this.startNodeAt(start), [id]);
      }
      return id;

    case tt.regexp:
      var value = this.value;
      var node = this.parseLiteral(value.value);
      node.regex = {pattern: value.pattern, flags: value.flags};
      return node;

    case tt.num: case tt.string:
      return this.parseLiteral(this.value);

    case tt._null: case tt._true: case tt._false:
      var node = this.startNode();
      node.value = this.type === tt._null ? null : this.type === tt._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");

    case tt.parenL:
      return this.parseParenAndDistinguishExpression();

    case tt.bracketL:
      var node = this.startNode();
      this.next();
      // check whether this is array comprehension or regular array
      if ((this.options.features["es7.comprehensions"] || this.options.ecmaVersion >= 7) && this.type === tt._for) {
        return this.parseComprehension(node, false);
      }
      node.elements = this.parseExprList(tt.bracketR, true, true, refShorthandDefaultPos);
      return this.finishNode(node, "ArrayExpression");

    case tt.braceL:
      return this.parseObj(false, refShorthandDefaultPos);

    case tt._function:
      var node = this.startNode();
      this.next();
      return this.parseFunction(node, false);

    case tt._class:
      return this.parseClass(this.startNode(), false);

    case tt._new:
      return this.parseNew();

    case tt.backQuote:
      return this.parseTemplate();

    default:
      this.unexpected();
    }
  };

  pp.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    this.next();
    return this.finishNode(node, "Literal");
  };

  pp.parseParenAndDistinguishExpression = function(start, isAsync) {
    start = start || this.currentPos();
    var val;
    if (this.options.ecmaVersion >= 6) {
      this.next();

      if ((this.options.features["es7.comprehensions"] || this.options.ecmaVersion >= 7) && this.type === tt._for) {
        return this.parseComprehension(this.startNodeAt(start), true);
      }

      var innerStart = this.currentPos(), exprList = [], first = true;
      var refShorthandDefaultPos = {start: 0}, spreadStart, innerParenStart;
      while (this.type !== tt.parenR) {
        first ? first = false : this.expect(tt.comma);
        if (this.type === tt.ellipsis) {
          var spreadNodeStart = this.currentPos();
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRest(), spreadNodeStart));
          break;
        } else {
          if (this.type === tt.parenL && !innerParenStart) {
            innerParenStart = this.start;
          }
          exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem));
        }
      }
      var innerEnd = this.currentPos();
      this.expect(tt.parenR);

      if (!this.canInsertSemicolon() && this.eat(tt.arrow)) {
        if (innerParenStart) this.unexpected(innerParenStart);
        return this.parseParenArrowList(start, exprList, isAsync);
      }

      if (!exprList.length) this.unexpected(this.lastTokStart);
      if (spreadStart) this.unexpected(spreadStart);
      if (refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStart);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEnd);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(start);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };

  pp.parseParenArrowList = function (start, exprList, isAsync) {
    return this.parseArrowExpression(this.startNodeAt(start), exprList, isAsync);
  };

  pp.parseParenItem = function (node, start) {
    return node;
  };

  // New's precedence is slightly tricky. It must allow its argument
  // to be a `[]` or dot subscript expression, but not a call — at
  // least, not without wrapping it in parentheses. Thus, it uses the

  pp.parseNew = function() {
    var node = this.startNode();
    this.next();
    var start = this.currentPos();
    node.callee = this.parseSubscripts(this.parseExprAtom(), start, true);
    if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR, false);
    else node.arguments = empty;
    return this.finishNode(node, "NewExpression");
  };

  // Parse template expression.

  pp.parseTemplateElement = function() {
    var elem = this.startNode();
    elem.value = {
      raw: this.input.slice(this.start, this.end),
      cooked: this.value
    };
    this.next();
    elem.tail = this.type === tt.backQuote;
    return this.finishNode(elem, "TemplateElement");
  };

  pp.parseTemplate = function() {
    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement();
    node.quasis = [curElt];
    while (!curElt.tail) {
      this.expect(tt.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(tt.braceR);
      node.quasis.push(curElt = this.parseTemplateElement());
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };

  // Parse an object literal or binding pattern.

  pp.parseObj = function(isPattern, refShorthandDefaultPos) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma);
        if (this.afterTrailingComma(tt.braceR)) break;
      } else first = false;

      var prop = this.startNode(), isGenerator = false, isAsync = false, start;
      if (this.options.features["es7.objectRestSpread"] && this.type === tt.ellipsis) {
        prop = this.parseSpread();
        prop.type = "SpreadProperty";
        node.properties.push(prop);
        continue;
      }
      if (this.options.ecmaVersion >= 6) {
        prop.method = false;
        prop.shorthand = false;
        if (isPattern || refShorthandDefaultPos)
          start = this.currentPos();
        if (!isPattern)
          isGenerator = this.eat(tt.star);
      }
      if (this.options.features["es7.asyncFunctions"] && this.isContextual("async")) {
        if (isGenerator || isPattern) this.unexpected();

        var asyncId = this.parseIdent();
        if (this.type === tt.colon || this.type === tt.parenL) {
          prop.key = asyncId;
        } else {
          isAsync = true;
          this.parsePropertyName(prop);
        }
      } else {
        this.parsePropertyName(prop);
      }
      this.parseObjPropValue(prop, start, isGenerator, isAsync, isPattern, refShorthandDefaultPos);
      this.checkPropClash(prop, propHash);
      node.properties.push(this.finishNode(prop, "Property"));
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };

  pp.parseObjPropValue = function (prop, start, isGenerator, isAsync, isPattern, refShorthandDefaultPos) {
    if (this.eat(tt.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault() : this.parseMaybeAssign(false, refShorthandDefaultPos);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
      if (isPattern) this.unexpected();
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
               (prop.key.name === "get" || prop.key.name === "set") &&
               (this.type != tt.comma && this.type != tt.braceR)) {
      if (isGenerator || isAsync || isPattern) this.unexpected();
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      prop.kind = "init";
      if (isPattern) {
        if (this.isKeyword(prop.key.name) ||
              (this.strict && (isStrictBadIdWord(prop.key.name) || isStrictReservedWord(prop.key.name))) ||
              (!this.options.allowReserved && this.isReservedWord(prop.key.name)))
            this.raise(prop.key.start, "Binding " + prop.key.name);
        prop.value = this.parseMaybeDefault(start, prop.key);
      } else if (this.type === tt.eq && refShorthandDefaultPos) {
        if (!refShorthandDefaultPos.start)
          refShorthandDefaultPos.start = this.start;
        prop.value = this.parseMaybeDefault(start, prop.key);
      } else {
        prop.value = prop.key;
      }
      prop.shorthand = true;
    } else this.unexpected();
  };

  pp.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(tt.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(tt.bracketR);
        return;
      } else {
        prop.computed = false;
      }
    }
    prop.key = (this.type === tt.num || this.type === tt.string) ? this.parseExprAtom() : this.parseIdent(true);
  };

  // Initialize empty function node.

  pp.initFunction = function(node, isAsync) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) {
      node.generator = false;
      node.expression = false;
    }
    if (this.options.features["es7.asyncFunctions"]) {
      node.async = !!isAsync;
    }
  };

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  pp.parseFunction = function(node, isStatement, allowExpressionBody, isAsync) {
    this.initFunction(node, isAsync);
    if (this.options.ecmaVersion >= 6) {
      node.generator = this.eat(tt.star);
    }
    if (isStatement || this.type === tt.name) {
      node.id = this.parseIdent();
    }
    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody);
    return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  };

  pp.parseFunctionParams = function(node) {
    this.expect(tt.parenL);
    node.params = this.parseBindingList(tt.parenR, false, false);
  };

  // Parse object or class method.

  pp.parseMethod = function(isGenerator, isAsync) {
    var node = this.startNode();
    this.initFunction(node, isAsync);
    this.expect(tt.parenL);
    node.params = this.parseBindingList(tt.parenR, false, false);
    var allowExpressionBody;
    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
      allowExpressionBody = true;
    } else {
      allowExpressionBody = false;
    }
    this.parseFunctionBody(node, allowExpressionBody);
    return this.finishNode(node, "FunctionExpression");
  };

  // Parse arrow function expression with given parameters.

  pp.parseArrowExpression = function(node, params, isAsync) {
    this.initFunction(node, isAsync);
    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true);
    return this.finishNode(node, "ArrowFunctionExpression");
  };

  // Parse function body and check parameters.

  pp.parseFunctionBody = function(node, allowExpression) {
    var isExpression = allowExpression && this.type !== tt.braceL;

    var oldInAsync = this.inAsync;
    this.inAsync = node.async;
    if (isExpression) {
      node.body = this.parseMaybeAssign();
      node.expression = true;
    } else {
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldInFunc = this.inFunction, oldInGen = this.inGenerator, oldLabels = this.labels;
      this.inFunction = true; this.inGenerator = node.generator; this.labels = [];
      node.body = this.parseBlock(true);
      node.expression = false;
      this.inFunction = oldInFunc; this.inGenerator = oldInGen; this.labels = oldLabels;
    }
    this.inAsync = oldInAsync;

    // If this is a strict mode function, verify that argument names
    // are not repeated, and it does not try to bind the words `eval`
    // or `arguments`.
    if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
      var nameHash = {};
      if (node.id)
        this.checkFunctionParam(node.id, {});
      for (var i = 0; i < node.params.length; i++)
        this.checkFunctionParam(node.params[i], nameHash);
    }
  };

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  pp.parseClass = function(node, isStatement) {
    this.next();
    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var classBody = this.startNode();
    classBody.body = [];
    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      if (this.eat(tt.semi)) continue;
      var method = this.startNode();
      var isGenerator = this.eat(tt.star), isAsync = false;
      this.parsePropertyName(method);
      if (this.type !== tt.parenL && !method.computed && method.key.type === "Identifier" &&
          method.key.name === "static") {
        if (isGenerator) this.unexpected();
        method['static'] = true;
        isGenerator = this.eat(tt.star);
        this.parsePropertyName(method);
      } else {
        method['static'] = false;
      }
      if (this.options.features["es7.asyncFunctions"] && this.type !== tt.parenL &&
          !method.computed && method.key.type === "Identifier" && method.key.name === "async") {
        isAsync = true;
        this.parsePropertyName(method);
      }
      method.kind = "method";
      if (!method.computed && !isGenerator) {
        if (method.key.type === "Identifier") {
          if (this.type !== tt.parenL && (method.key.name === "get" || method.key.name === "set")) {
            method.kind = method.key.name;
            this.parsePropertyName(method);
          } else if (!method['static'] && method.key.name === "constructor") {
            method.kind = "constructor";
          }
        } else if (!method['static'] && method.key.type === "Literal" && method.key.value === "constructor") {
          method.kind = "constructor";
        }
      }
      this.parseClassMethod(classBody, method, isGenerator, isAsync);
    }
    node.body = this.finishNode(classBody, "ClassBody");
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };

  pp.parseClassMethod = function (classBody, method, isGenerator, isAsync) {
    method.value = this.parseMethod(isGenerator, isAsync);
    classBody.body.push(this.finishNode(method, "MethodDefinition"));
  };

  pp.parseClassId = function (node, isStatement) {
    node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
  };

  pp.parseClassSuper = function (node) {
    node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
  };

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  pp.parseExprList = function(close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(tt.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) break;
      } else first = false;

      if (allowEmpty && this.type === tt.comma) {
        elts.push(null);
      } else {
        if (this.type === tt.ellipsis)
          elts.push(this.parseSpread(refShorthandDefaultPos));
        else
          elts.push(this.parseMaybeAssign(false, refShorthandDefaultPos));
      }
    }
    return elts;
  };

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  pp.parseIdent = function(liberal) {
    var node = this.startNode();
    if (liberal && this.options.allowReserved == "never") liberal = false;
    if (this.type === tt.name) {
      if (!liberal &&
          (!this.options.allowReserved &&
           this.isReservedWord(this.value) ||
           this.strict && isStrictReservedWord(this.value)) &&
          this.input.slice(this.start, this.end).indexOf("\\") == -1)
        this.raise(this.start, "The keyword '" + this.value + "' is reserved");
      node.name = this.value;
    } else if (liberal && this.type.keyword) {
      node.name = this.type.keyword;
    } else {
      this.unexpected();
    }
    this.next();
    return this.finishNode(node, "Identifier");
  };

  // Parses module export declaration.

  pp.parseExport = function(node) {
    this.next();
    // export * from '...';
    if (this.eat(tt.star)) {
      this.expectContextual("from");
      node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
      this.semicolon();
      return this.finishNode(node, "ExportAllDeclaration");
    }
    if (this.eat(tt._default)) { // export default ...;
      var expr = this.parseMaybeAssign();
      if (expr.id) {
        switch (expr.type) {
          case "FunctionExpression": expr.type = "FunctionDeclaration"; break;
          case "ClassExpression": expr.type = "ClassDeclaration"; break;
        }
      }
      node.declaration = expr;
      this.semicolon();
      return this.finishNode(node, "ExportDefaultDeclaration");
    }
    // export var|const|let|function|class ...;
    if (this.type.keyword || this.shouldParseExportDeclaration()) {
      node.declaration = this.parseStatement(true);
      node.specifiers = [];
      node.source = null;
    } else { // export { x, y as z } [from '...'];
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers();
      if (this.eatContextual("from")) {
        node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
      } else {
        node.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration");
  };

  pp.shouldParseExportDeclaration = function () {
    return this.options.features["es7.asyncFunctions"] && this.isContextual("async");
  };

  // Parses a comma-separated list of module exports.

  pp.parseExportSpecifiers = function() {
    var nodes = [], first = true;
    // export { x, y as z } [from '...']
    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma);
        if (this.afterTrailingComma(tt.braceR)) break;
      } else first = false;

      var node = this.startNode();
      node.local = this.parseIdent(this.type === tt._default);
      node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
      nodes.push(this.finishNode(node, "ExportSpecifier"));
    }
    return nodes;
  };

  // Parses import declaration.

  pp.parseImport = function(node) {
    this.next();
    node.specifiers = [];
    // import '...';
    if (this.type === tt.string) {
      node.source = this.parseExprAtom();
      node.kind = "";
    } else {
      this.parseImportSpecifiers(node);
      this.expectContextual("from");
      node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  };

  // Parses a comma-separated list of module imports.

  pp.parseImportSpecifiers = function(node) {
    var first = true;
    if (this.type === tt.name) {
      // import defaultObj, { x, y as z } from '...'
      var start = this.currentPos();
      node.specifiers.push(this.parseImportSpecifierDefault(this.parseIdent(), start));
      if (!this.eat(tt.comma)) return;
    }
    if (this.type === tt.star) {
      var specifier = this.startNode();
      this.next();
      this.expectContextual("as");
      specifier.local = this.parseIdent();
      this.checkLVal(specifier.local, true);
      node.specifiers.push(this.finishNode(specifier, "ImportNamespaceSpecifier"));
      return;
    }
    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma);
        if (this.afterTrailingComma(tt.braceR)) break;
      } else first = false;

      var specifier = this.startNode();
      specifier.imported = this.parseIdent(true);
      specifier.local = this.eatContextual("as") ? this.parseIdent() : specifier.imported;
      this.checkLVal(specifier.local, true);
      node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
    }
  };

  pp.parseImportSpecifierDefault = function (id, start) {
    var node = this.startNodeAt(start);
    node.local = id;
    this.checkLVal(node.local, true);
    return this.finishNode(node, "ImportDefaultSpecifier");
  };

  // Parses yield expression inside generator.

  pp.parseYield = function() {
    var node = this.startNode();
    this.next();
    if (this.type == tt.semi || this.canInsertSemicolon() || (this.type != tt.star && !this.type.startsExpr)) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(tt.star);
      node.argument = this.parseMaybeAssign();
    }
    return this.finishNode(node, "YieldExpression");
  };

  // Parses await expression inside async function.

  pp.parseAwait = function (node) {
    if (this.eat(tt.semi) || this.canInsertSemicolon()) {
      this.unexpected();
    }
    node.all = this.eat(tt.star);
    node.argument = this.parseMaybeAssign(true);
    return this.finishNode(node, "AwaitExpression");
  };

  // Parses array and generator comprehensions.

  pp.parseComprehension = function(node, isGenerator) {
    node.blocks = [];
    while (this.type === tt._for) {
      var block = this.startNode();
      this.next();
      this.expect(tt.parenL);
      block.left = this.parseBindingAtom();
      this.checkLVal(block.left, true);
      this.expectContextual("of");
      block.right = this.parseExpression();
      this.expect(tt.parenR);
      node.blocks.push(this.finishNode(block, "ComprehensionBlock"));
    }
    node.filter = this.eat(tt._if) ? this.parseParenExpression() : null;
    node.body = this.parseExpression();
    this.expect(isGenerator ? tt.parenR : tt.bracketR);
    node.generator = isGenerator;
    return this.finishNode(node, "ComprehensionExpression");
  };

  // init plugins

  require("./plugins/flow");
  require("./plugins/jsx");
});
