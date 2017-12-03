// regjsparser
//
// ==================================================================
//
// See ECMA-262 Standard: 15.10.1
//
// Pattern ::
//      Disjunction
//
// Disjunction ::
//      Alternative
//      Alternative | Disjunction
//
// Alternative ::
//      [empty]
//      Alternative Term
//
// Term ::
//      Assertion
//      Atom
//      Atom Quantifier
//
// Assertion ::
//      ^
//      $
//      \ b
//      \ B
//      ( ? = Disjunction )
//      ( ? ! Disjunction )
//
// Quantifier ::
//      QuantifierPrefix
//      QuantifierPrefix ?
//
// QuantifierPrefix ::
//      *
//      +
//      ?
//      { DecimalDigits }
//      { DecimalDigits , }
//      { DecimalDigits , DecimalDigits }
//
// Atom ::
//      PatternCharacter
//      .
//      \ AtomEscape
//      CharacterClass
//      ( Disjunction )
//      ( ? : Disjunction )
//
// PatternCharacter ::
//      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
//
// AtomEscape ::
//      DecimalEscape
//      CharacterEscape
//      CharacterClassEscape
//
// CharacterEscape[U] ::
//      ControlEscape
//      c ControlLetter
//      HexEscapeSequence
//      RegExpUnicodeEscapeSequence[?U] (ES6)
//      IdentityEscape[?U]
//
// ControlEscape ::
//      one of f n r t v
// ControlLetter ::
//      one of
//          a b c d e f g h i j k l m n o p q r s t u v w x y z
//          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
//
// IdentityEscape ::
//      SourceCharacter but not IdentifierPart
//      <ZWJ>
//      <ZWNJ>
//
// DecimalEscape ::
//      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
//      CharacterClassEscape :: one of
//      d D s S w W
//
// CharacterClass ::
//      [ [lookahead ∉ {^}] ClassRanges ]
//      [ ^ ClassRanges ]
//
// ClassRanges ::
//      [empty]
//      NonemptyClassRanges
//
// NonemptyClassRanges ::
//      ClassAtom
//      ClassAtom NonemptyClassRangesNoDash
//      ClassAtom - ClassAtom ClassRanges
//
// NonemptyClassRangesNoDash ::
//      ClassAtom
//      ClassAtomNoDash NonemptyClassRangesNoDash
//      ClassAtomNoDash - ClassAtom ClassRanges
//
// ClassAtom ::
//      -
//      ClassAtomNoDash
//
// ClassAtomNoDash ::
//      SourceCharacter but not one of \ or ] or -
//      \ ClassEscape
//
// ClassEscape ::
//      DecimalEscape
//      b
//      CharacterEscape
//      CharacterClassEscape

function parse(str) {
  var hasUnicodeFlag = (arguments[1] || "").indexOf("u") !== -1;// EDITED BY termi :: unicode flag support
  var pos = 0;
  var lastMatchIdx = 0;
  var lastMatchClosed = 0;

  function addRaw(node) {
    node.raw = str.substring(node.from, node.to);
    return node;
  }

  function createAssertion(sub) {
    return addRaw({
      type: 'assertion',
      sub:  sub,
      from: pos - 1,
      to: pos
    });
  }

  function createCharacter(matches) {
// EDITED BY termi :: astral ranges support START
    if(hasUnicodeFlag){
	  var _char = matches[0];
	  var first = _char.charCodeAt(0);
	  var second;
	  if(_char.length == 1
		  && first >= 0xD800 && first <= 0xDBFF ) {
		  second = str[pos].charCodeAt(0);
		  if(second >= 0xDC00 && second <= 0xDFFF) {
			  //String.fromCharCode(first, second);
			  pos++;
			  return addRaw({
				  type: 'escape',
				  name: 'codePoint',
				  value: (((first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000)).toString(16).toUpperCase(),
				  from: pos - 2,
				  to: pos
			  });
		  }
	  }
	}
// EDITED BY termi :: astral ranges support END
    return addRaw({
      type: 'character',
      char: matches[0],
      from: pos - 1,
      to: pos
    });
  }

  function createDisjunction(alternatives, from, to) {
    return addRaw({
      type: 'disjunction',
      alternatives: alternatives,
      from: from,
      to: to
    });
  }

  function createEmpty() {
    return addRaw({
      type: 'empty',
      from: pos,
      to: pos
    });
  }

  function createDot(name) {
    return addRaw({
      type: 'dot',
      from: pos - 1,
      to: pos
    });
  }

  function createEscaped(name, value, fromOffset) {
    fromOffset = fromOffset || 0;
    return addRaw({
      type: 'escape',
      name: name,
      value: value,
      from: pos - (value.length + fromOffset),
      to: pos
    });
  }

  function createEscapedChar(value) {
    return addRaw({
      type: 'escapeChar',
      value: value,
      from: pos - 2,
      to: pos
    });
  }

  function createRef(ref) {
    return addRaw({
      type: 'ref',
      ref: parseInt(ref, 10),
      from: pos - 1 - ref.length,
      to: pos
    });
  }

  function createGroup(behavior, disjunction, from, to) {
    return addRaw({
      type: 'group',
      behavior: behavior,
      disjunction: disjunction,
      from: from,
      to: to
    });
  }

  function createQuantifier(min, max, from, to) {
    if (to == null) {
      from = pos - 1;
      to = pos;
    }

    return addRaw({
      type: 'quantifier',
      min: min,
      max: max,
      greedy: true,
      child: null, // set later on,
      from: from,
      to: to
    });
  }

  function createAlternative(terms, from, to) {
    return addRaw({
      type: 'alternative',
      terms: terms,
      from: from,
      to: to
    });
  }

  function createCharacterClass(classRanges, negative, from, to) {
    return addRaw({
      type: 'characterClass',
      classRanges: classRanges,
      negative: negative,
      from: from,
      to: to
    });
  }

  function createClassRange(min, max, from, to) {
    var charCodeMin = nodeToCharCode(min);
    var charCodeMax = nodeToCharCode(max);

    // See 15.10.2.15:
    if (charCodeMin > charCodeMax) {
      throw syntaxError('invalid range in character class |' + charCodeMin + '|' + charCodeMax);
    }

    return addRaw({
      type: 'characterClassRange',
      min: min,
      max: max,
// EDITED BY termi :: right 'from' (in my opinion)
      from: min.from,//from: from,

      to: to
    });
  }

  function isEmpty(obj) {
    return obj.type === 'empty';
  }

  function incr(amount) {
    amount = (amount || 1);
    var res = str.substring(pos, pos + amount);
    pos += (amount || 1);
    return res;
  }

  function skip(value) {
    if (!match(value)) {
      throw syntaxError('character: ' + value);
    }
  }

  function match(value) {
    if (str.indexOf(value, pos) === pos) {
      return incr(value.length);
    }
  }

  function lookahead() {
    return str[pos];
  }

  function current(value) {
    return str.indexOf(value, pos) === pos;
  }

  function next(value) {
    return str[pos + 1] === value;
  }

  function matchReg(regExp) {
    var subStr = str.substring(pos);
    var res = subStr.match(regExp);
    if (res) {
      res.from = pos;
      incr(res[0].length);
      res.to = pos;
    }
    return res;
  }

  function parseDisjunction() {
    // Disjunction ::
    //      Alternative
    //      Alternative | Disjunction
    var res = [], from = pos;
    res.push(parseAlternative());

    while (match('|')) {
      res.push(parseAlternative());
    }

    if (res.length === 1) {
      return res[0];
    }

    return createDisjunction(res, from, pos);
  }

  function parseAlternative() {
    var res = [], from = pos;

    // Alternative ::
    //      [empty]
    //      Alternative Term
    while (term = parseTerm()) {
      if (isEmpty(term)) {
        // Only add Empty if there is nothing else in the result array.
        // Otherwise ignore it to save noice in the AST.
        if (res.length === 0) {
          res.push(term);
        }
        break;
      }

      res.push(term);
    }

    return createAlternative(res, from, pos);
  }

  function parseTerm() {
    // Term ::
    //      Assertion
    //      Atom
    //      Atom Quantifier

    if (pos >= str.length || current('|') || current(')')) {
      return createEmpty();
    }

    var assertion = parseAssertion();

    if (assertion) {
      return assertion;
    }

    var matchIdx = lastMatchIdx;

    var atom = parseAtom();
    if (!atom) {
      throw syntaxError('Expected atom')
      // return createEmpty();
    }
    var quantifier = parseQuantifier() || false;
    if (quantifier) {
      quantifier.child = atom;
      if (matchIdx + 1 <= lastMatchIdx) {
        quantifier.firstMatchIdx = matchIdx + 1;
        quantifier.lastMatchIdx = lastMatchIdx;
      }

      return quantifier;
    }
    return atom;
  }

  function parseGroup(matchA, typeA, matchB, typeB) {
    var type = null, from = pos;

    if (match(matchA)) {
      type = typeA;
    } else if (match(matchB)) {
      type = typeB;
    } else {
      return false;
    }

    var matchIdx;
    if (type === 'normal') {
      matchIdx = ++lastMatchIdx;
    } else {
      matchIdx = lastMatchIdx;
    }

    res = parseDisjunction();
    if (!res) {
      throw syntaxError('disjunction');
    }
    skip(')');
    var group = createGroup(type, res, from, pos);

    if (type == 'normal') {
      group.matchIdx = matchIdx;
      group.lastMatchIdx = lastMatchIdx;
      lastMatchClosed++;
    } else if (type == 'lookahead' || type == 'negativeLookahead') {
      if (matchIdx !== lastMatchIdx) {
        group.firstMatchIdx = matchIdx + 1;
        group.lastMatchIdx = lastMatchIdx;
      }
    }
    return group;
  }

  function parseAssertion() {
    // Assertion ::
    //      ^
    //      $
    //      \ b
    //      \ B
    //      ( ? = Disjunction )
    //      ( ? ! Disjunction )
    var res, from = pos;

    if (match('^')) {
      return createAssertion('start');
    } else if (match('$')) {
      return createAssertion('end');
    } else if (res = matchReg(/^\\(b|B)/)) {
      return createEscapedChar(res[1]);
    } else {
      return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
    }
  }

  function parseQuantifier() {
    // Quantifier ::
    //      QuantifierPrefix
    //      QuantifierPrefix ?
    //
    // QuantifierPrefix ::
    //      *
    //      +
    //      ?
    //      { DecimalDigits }
    //      { DecimalDigits , }
    //      { DecimalDigits , DecimalDigits }

    var res;
    var quantifier;
    var min, max;

    if (match('*')) {
      quantifier = createQuantifier(0);
    }
    else if (match('+')) {
      quantifier = createQuantifier(1);
    }
    else if (match('?')) {
      quantifier = createQuantifier(0, 1);
    }
    else if (res = matchReg(/^\{([0-9]+)\}/)) {
      min = parseInt(res[1], 10);
      quantifier = createQuantifier(min, min, res.from, res.to);
    }
    else if (res = matchReg(/^\{([0-9]+),\}/)) {
      min = parseInt(res[1], 10);
      quantifier = createQuantifier(min, undefined, res.from, res.to);
    }
    else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
      min = parseInt(res[1], 10);
      max = parseInt(res[2], 10);
      if (min > max) {
        throw syntaxError('numbers out of order in {} quantifier');
      }
      quantifier = createQuantifier(min, max, res.from, res.to);
    }

    if (quantifier) {
      if (match('?')) {
        quantifier.greedy = false;
        quantifier.to += 1;
      }
    }

    return quantifier;
  }

  function parseAtom() {
    // Atom ::
    //      PatternCharacter
    //      .
    //      \ AtomEscape
    //      CharacterClass
    //      ( Disjunction )
    //      ( ? : Disjunction )

    var res;

    // jviereck: allow ']', '}' here as well to be compatible with browser's
    //   implementations: ']'.match(/]/);
    // if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
    if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
      //      PatternCharacter
      return createCharacter(res);
    }
    else if (match('.')) {
      //      .
      return createDot();
    }
    else if (match('\\')) {
      //      \ AtomEscape
      var res = parseAtomEscape();
      if (!res) {
        throw syntaxError('atomEscape');
      }
      return res;
    }
    else if (res = parseCharacterClass()) {
      return res;
    }
    else {
      //      ( Disjunction )
      //      ( ? : Disjunction )
      return parseGroup('(?:', 'ignore', '(', 'normal');
    }
  }

  function parseClassEscape() {
    return parseAtomEscape(true);
  }

  function parseAtomEscape(insideCharacterClass) {
    // AtomEscape ::
    //      DecimalEscape
    //      CharacterEscape
    //      CharacterClassEscape

    var res;

    res = parseDecimalEscape();
    if (res) {
      return res;
    }

    // For ClassEscape
    if (insideCharacterClass) {
      if (match('b')) {
        // 15.10.2.19
        // The production ClassEscape :: b evaluates by returning the
        // CharSet containing the one character <BS> (Unicode value 0008).
        return createEscaped('unicode', '0008', -2);
      } else if (match('B')) {
        throw syntaxError('\\B not possible inside of CharacterClass');
      }
    }

    res = parseCharacterEscape();
    if (res) {
      return res;
    }

    res = parseCharacterClassEscape();
    if (res) {
      return res;
    }

    return res;
  }


  function parseDecimalEscape() {
    // DecimalEscape ::
    //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
    //      CharacterClassEscape :: one of
    //      d D s S w W

    var res, match;

    if (res = matchReg(/^(?!0)\d+/)) {
      match = res[0];
      var refIdx = parseInt(res[0], 10);
      if (refIdx <= lastMatchClosed) {
        // If the number is smaller than the matching-groups found so
        // far, then it is a reference...
        return createRef(res[0]);
      } else {
        // ... otherwise it needs to be interpreted as a octal (if the
        // number is in an octal format). If it is NOT octal format,
        // then the slash is ignored and the number is matched later
        // as normal characters.

        // Reset the position again, as maybe only parts of the previous
        // matched numbers are actual octal numbers. E.g. in '019' only
        // the '01' should be matched.
        incr(-res[0].length);
        if (res = matchReg(/^[0-7]{1,3}/)) {
          return createEscaped('octal', res[0], 1);
        } else {
          // If we end up here, we have a case like /\91/. Then the
          // first slash is to be ignored and the 9 & 1 to be treated
          // like ordinary characters. Create a character for the
          // first number only here - other number-characters
          // (if available) will be matched later.
          res = matchReg(/^[89]/);
          return createCharacter(res);
        }
      }
    }
    // Only allow octal numbers in the following. All matched numbers start
    // with a zero (if the do not, the previous if-branch is executed).
    // If the number is not octal format and starts with zero (e.g. `091`)
    // then only the zeros `0` is treated here and the `91` are ordinary
    // characters.
    // Example:
    //   /\091/.exec('\091')[0].length === 3
    else if (res = matchReg(/^[0-7]{1,3}/)) {
      match = res[0];
      if (/^0{1,3}$/.test(match)) {
        // If they are all zeros, then only take the first one.
        return createEscaped('null', '', match.length + 1);
      } else {
        return createEscaped('octal', match, 1);
      }
    } else if (res = matchReg(/^[dDsSwW]/)) {
      return createEscapedChar(res[0]);
    }
    return false;
  }

  function parseCharacterEscape() {
    // CharacterEscape ::
    //      ControlEscape
    //      c ControlLetter
    //      HexEscapeSequence
    //      UnicodeEscapeSequence
    //      IdentityEscape

    var res;
    if (res = matchReg(/^[fnrtv]/)) {
      // ControlEscape
      return createEscapedChar(res[0]);
    } else if (res = matchReg(/^c([a-zA-Z])/)) {
      // c ControlLetter
      return createEscaped('controlLetter', res[1], 2);
    } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
      // HexEscapeSequence
      return createEscaped('hex', res[1], 2);
    } else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
      // UnicodeEscapeSequence
      return createEscaped('unicode', res[1], 2);
    } else if (res = matchReg(/^u\{([0-9a-fA-F]{1,6})\}/)) {
      // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
      return createEscaped('codePoint', res[1], 4);
    } else {
      // IdentityEscape
      return parseIdentityEscape();
    }
  }

  // Taken from the esprima parser.
  function isIdentifierPart(ch) {
    var NonAsciiIdentifierPart = new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')

    return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
      (ch >= 65 && ch <= 90) ||         // A..Z
      (ch >= 97 && ch <= 122) ||        // a..z
      (ch >= 48 && ch <= 57) ||         // 0..9
      (ch === 92) ||                    // \ (backslash)
      ((ch >= 0x80) && NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
  }

  function parseIdentityEscape() {
    // IdentityEscape ::
    //      SourceCharacter but not IdentifierPart
    //      <ZWJ>
    //      <ZWNJ>

    var ZWJ = '\u200C';
    var ZWNJ = '\u200D';

    var res;

    if (!isIdentifierPart(lookahead())) {
      return createEscaped('identifier', incr(), 1);
    }

    if (match(ZWJ)) {
      // <ZWJ>
      return createEscaped('identifier', ZWJ);
    } else if (match(ZWNJ)) {
      // <ZWNJ>
      return createEscaped('identifier', ZWNJ);
    }

    return null;
  }

  function parseCharacterClass() {
    // CharacterClass ::
    //      [ [lookahead ∉ {^}] ClassRanges ]
    //      [ ^ ClassRanges ]

    var res, from = pos;
    if (res = matchReg(/^\[\^/)) {
      res = parseClassRanges();
      skip(']');
      return createCharacterClass(res, true, from, pos);
    } else if (match('[')) {
      res = parseClassRanges();
      skip(']');
      return createCharacterClass(res, false, from, pos);
    }

    return null;
  }

  function parseClassRanges() {
    // ClassRanges ::
    //      [empty]
    //      NonemptyClassRanges

    var res;
    if (current(']')) {
      // Empty array means nothing insinde of the ClassRange.
      return [];
    } else {
      res = parseNonemptyClassRanges();
      if (!res) {
        throw syntaxError('nonEmptyClassRanges');
      }
      return res;
    }
  }

  function parseHelperClassRanges(atom) {
    var from = pos, to, res;
    if (current('-') && !next(']')) {
      // ClassAtom - ClassAtom ClassRanges
      skip('-');

      res = parseClassAtom();
      if (!res) {
        throw syntaxError('classAtom');
      }
      to = pos;
      var classRanges = parseClassRanges();
      if (!classRanges) {
        throw syntaxError('classRanges');
      }
      if (classRanges.type === 'empty') {
        return [createClassRange(atom, res, from, to)];
      }
      return [createClassRange(atom, res, from, to)].concat(classRanges);
    }

    res = parseNonemptyClassRangesNoDash();
    if (!res) {
      throw syntaxError('nonEmptyClassRangesNoDash');
    }

    return [atom].concat(res);
  }

  function parseNonemptyClassRanges() {
    // NonemptyClassRanges ::
    //      ClassAtom
    //      ClassAtom NonemptyClassRangesNoDash
    //      ClassAtom - ClassAtom ClassRanges

    var atom = parseClassAtom();
    if (!atom) {
      throw syntaxError('classAtom');
    }

    if (current(']')) {
      // ClassAtom
      return [atom];
    }

    // ClassAtom NonemptyClassRangesNoDash
    // ClassAtom - ClassAtom ClassRanges
    return parseHelperClassRanges(atom);
  }

  function parseNonemptyClassRangesNoDash() {
    // NonemptyClassRangesNoDash ::
    //      ClassAtom
    //      ClassAtomNoDash NonemptyClassRangesNoDash
    //      ClassAtomNoDash - ClassAtom ClassRanges

    var res = parseClassAtom();
    if (!res) {
      throw syntaxError('classAtom');
    }
    if (current(']')) {
      //      ClassAtom
      return res;
    }

    // ClassAtomNoDash NonemptyClassRangesNoDash
    // ClassAtomNoDash - ClassAtom ClassRanges
    return parseHelperClassRanges(res);
  }

  function parseClassAtom() {
    // ClassAtom ::
    //      -
    //      ClassAtomNoDash
    if (match('-')) {
      return createCharacter('-');
    } else {
      return parseClassAtomNoDash();
    }
  }

  function parseClassAtomNoDash() {
    // ClassAtomNoDash ::
    //      SourceCharacter but not one of \ or ] or -
    //      \ ClassEscape

    var res;
    if (res = matchReg(/^[^\\\]-]/)) {
      return createCharacter(res[0]);
    } else if (match('\\')) {
      res = parseClassEscape();
      if (!res) {
        throw syntaxError('classEscape');
      }
// EDITED BY termi :: astral ranges support START
	  if(hasUnicodeFlag){
	  var value;
	  if ( res.type == 'escape' 
		&& (value = parseInt(res.value, 16)) >= 0xD800 
		&& value <= 0xDBFF
		&& current('\\')
		&& str[pos + 1] == 'u' ) {
		  var prevPos = pos;
		  pos++;
		  var newRes = parseClassEscape();
		  var second;
		  if ( newRes.type == 'escape' 
		    && (second = parseInt(newRes.value, 16)) >= 0xDC00
			&& second <= 0xDFFF) {
			  // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
			  res.raw += newRes.raw;
		      res.to = newRes.to;
		      res.value = ((value - 0xD800) * 0x400 + second - 0xDC00 + 0x10000).toString(16).toUpperCase();
			  res.type = 'escape';
			  res.name = 'codePoint';

		  }
		  else {pos = prevPos;}
	    }
	  }
// EDITED BY termi :: astral ranges support END
      return res;
    }
  }

  function syntaxError(str) {
    return new SyntaxError(str);
  }

  var result = parseDisjunction();
  result.lastMatchIdx = lastMatchIdx;

  if (result.to !== str.length) {
    throw syntaxError('Could not parse entire input - got stuck: ' + str);
  }

  return result;
};

function nodeToCharCode(node) {
  switch (node.type) {
    case 'character':
      return node.char.charCodeAt(0);

    case 'escape':
      switch (node.name) {
        case 'unicode':
          return parseInt(node.value, 16);
        case 'codePoint':
          return parseInt(node.value, 16);
        case 'controlLetter':
          return node.value.charCodeAt(0) % 32;
        case 'identifier':
          return node.value.charCodeAt(0);
        case 'octal':
          return parseInt(node.value, 8);
        case 'hex':
          return parseInt(node.value, 16);
        case 'null':
          return 0;
        default:
          throw new Error('Unsupported node escape name: ' + node.name);
      }

    default:
      throw new Error('Unkown nodeType: ' + node.type);
  }

  return null;
}

exports.nodeToCharCode = nodeToCharCode;
exports.parse = parse;
