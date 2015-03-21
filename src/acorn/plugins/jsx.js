var acorn = require("..")

var tt = acorn.tokTypes;
var tc = acorn.tokContexts;

tc.j_oTag = new acorn.TokContext("<tag", false);
tc.j_cTag = new acorn.TokContext("</tag", false);
tc.j_expr = new acorn.TokContext("<tag>...</tag>", true, true);

tt.jsxName = new acorn.TokenType("jsxName");
tt.jsxText = new acorn.TokenType("jsxText", {beforeExpr: true});
tt.jsxTagStart = new acorn.TokenType("jsxTagStart");
tt.jsxTagEnd = new acorn.TokenType("jsxTagEnd");

tt.jsxTagStart.updateContext = function() {
  this.context.push(tc.j_expr); // treat as beginning of JSX expression
  this.context.push(tc.j_oTag); // start opening tag context
  this.exprAllowed = false;
};
tt.jsxTagEnd.updateContext = function(prevType) {
  var out = this.context.pop();
  if (out === tc.j_oTag && prevType === tt.slash || out === tc.j_cTag) {
    this.context.pop();
    this.exprAllowed = this.curContext() === tc.j_expr;
  } else {
    this.exprAllowed = true;
  }
};

var pp = acorn.Parser.prototype;

// Reads inline JSX contents token.

pp.jsx_readToken = function() {
  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length)
      this.raise(this.start, "Unterminated JSX contents");
    var ch = this.input.charCodeAt(this.pos);

    switch (ch) {
    case 60: // '<'
    case 123: // '{'
      if (this.pos === this.start) {
        if (ch === 60 && this.exprAllowed) {
          ++this.pos;
          return this.finishToken(tt.jsxTagStart);
        }
        return this.getTokenFromCode(ch);
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(tt.jsxText, out);

    case 38: // '&'
      out += this.input.slice(chunkStart, this.pos);
      out += this.jsx_readEntity();
      chunkStart = this.pos;
      break;

    default:
      if (acorn.isNewLine(ch)) {
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
  }
};

pp.jsx_readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length)
      this.raise(this.start, "Unterminated string constant");
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) break;
    if (ch === 38) { // '&'
      out += this.input.slice(chunkStart, this.pos);
      out += this.jsx_readEntity();
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(tt.string, out);
};

var XHTMLEntities = {
  quot: '\u0022',
  amp: '&',
  apos: '\u0027',
  lt: '<',
  gt: '>',
  nbsp: '\u00A0',
  iexcl: '\u00A1',
  cent: '\u00A2',
  pound: '\u00A3',
  curren: '\u00A4',
  yen: '\u00A5',
  brvbar: '\u00A6',
  sect: '\u00A7',
  uml: '\u00A8',
  copy: '\u00A9',
  ordf: '\u00AA',
  laquo: '\u00AB',
  not: '\u00AC',
  shy: '\u00AD',
  reg: '\u00AE',
  macr: '\u00AF',
  deg: '\u00B0',
  plusmn: '\u00B1',
  sup2: '\u00B2',
  sup3: '\u00B3',
  acute: '\u00B4',
  micro: '\u00B5',
  para: '\u00B6',
  middot: '\u00B7',
  cedil: '\u00B8',
  sup1: '\u00B9',
  ordm: '\u00BA',
  raquo: '\u00BB',
  frac14: '\u00BC',
  frac12: '\u00BD',
  frac34: '\u00BE',
  iquest: '\u00BF',
  Agrave: '\u00C0',
  Aacute: '\u00C1',
  Acirc: '\u00C2',
  Atilde: '\u00C3',
  Auml: '\u00C4',
  Aring: '\u00C5',
  AElig: '\u00C6',
  Ccedil: '\u00C7',
  Egrave: '\u00C8',
  Eacute: '\u00C9',
  Ecirc: '\u00CA',
  Euml: '\u00CB',
  Igrave: '\u00CC',
  Iacute: '\u00CD',
  Icirc: '\u00CE',
  Iuml: '\u00CF',
  ETH: '\u00D0',
  Ntilde: '\u00D1',
  Ograve: '\u00D2',
  Oacute: '\u00D3',
  Ocirc: '\u00D4',
  Otilde: '\u00D5',
  Ouml: '\u00D6',
  times: '\u00D7',
  Oslash: '\u00D8',
  Ugrave: '\u00D9',
  Uacute: '\u00DA',
  Ucirc: '\u00DB',
  Uuml: '\u00DC',
  Yacute: '\u00DD',
  THORN: '\u00DE',
  szlig: '\u00DF',
  agrave: '\u00E0',
  aacute: '\u00E1',
  acirc: '\u00E2',
  atilde: '\u00E3',
  auml: '\u00E4',
  aring: '\u00E5',
  aelig: '\u00E6',
  ccedil: '\u00E7',
  egrave: '\u00E8',
  eacute: '\u00E9',
  ecirc: '\u00EA',
  euml: '\u00EB',
  igrave: '\u00EC',
  iacute: '\u00ED',
  icirc: '\u00EE',
  iuml: '\u00EF',
  eth: '\u00F0',
  ntilde: '\u00F1',
  ograve: '\u00F2',
  oacute: '\u00F3',
  ocirc: '\u00F4',
  otilde: '\u00F5',
  ouml: '\u00F6',
  divide: '\u00F7',
  oslash: '\u00F8',
  ugrave: '\u00F9',
  uacute: '\u00FA',
  ucirc: '\u00FB',
  uuml: '\u00FC',
  yacute: '\u00FD',
  thorn: '\u00FE',
  yuml: '\u00FF',
  OElig: '\u0152',
  oelig: '\u0153',
  Scaron: '\u0160',
  scaron: '\u0161',
  Yuml: '\u0178',
  fnof: '\u0192',
  circ: '\u02C6',
  tilde: '\u02DC',
  Alpha: '\u0391',
  Beta: '\u0392',
  Gamma: '\u0393',
  Delta: '\u0394',
  Epsilon: '\u0395',
  Zeta: '\u0396',
  Eta: '\u0397',
  Theta: '\u0398',
  Iota: '\u0399',
  Kappa: '\u039A',
  Lambda: '\u039B',
  Mu: '\u039C',
  Nu: '\u039D',
  Xi: '\u039E',
  Omicron: '\u039F',
  Pi: '\u03A0',
  Rho: '\u03A1',
  Sigma: '\u03A3',
  Tau: '\u03A4',
  Upsilon: '\u03A5',
  Phi: '\u03A6',
  Chi: '\u03A7',
  Psi: '\u03A8',
  Omega: '\u03A9',
  alpha: '\u03B1',
  beta: '\u03B2',
  gamma: '\u03B3',
  delta: '\u03B4',
  epsilon: '\u03B5',
  zeta: '\u03B6',
  eta: '\u03B7',
  theta: '\u03B8',
  iota: '\u03B9',
  kappa: '\u03BA',
  lambda: '\u03BB',
  mu: '\u03BC',
  nu: '\u03BD',
  xi: '\u03BE',
  omicron: '\u03BF',
  pi: '\u03C0',
  rho: '\u03C1',
  sigmaf: '\u03C2',
  sigma: '\u03C3',
  tau: '\u03C4',
  upsilon: '\u03C5',
  phi: '\u03C6',
  chi: '\u03C7',
  psi: '\u03C8',
  omega: '\u03C9',
  thetasym: '\u03D1',
  upsih: '\u03D2',
  piv: '\u03D6',
  ensp: '\u2002',
  emsp: '\u2003',
  thinsp: '\u2009',
  zwnj: '\u200C',
  zwj: '\u200D',
  lrm: '\u200E',
  rlm: '\u200F',
  ndash: '\u2013',
  mdash: '\u2014',
  lsquo: '\u2018',
  rsquo: '\u2019',
  sbquo: '\u201A',
  ldquo: '\u201C',
  rdquo: '\u201D',
  bdquo: '\u201E',
  dagger: '\u2020',
  Dagger: '\u2021',
  bull: '\u2022',
  hellip: '\u2026',
  permil: '\u2030',
  prime: '\u2032',
  Prime: '\u2033',
  lsaquo: '\u2039',
  rsaquo: '\u203A',
  oline: '\u203E',
  frasl: '\u2044',
  euro: '\u20AC',
  image: '\u2111',
  weierp: '\u2118',
  real: '\u211C',
  trade: '\u2122',
  alefsym: '\u2135',
  larr: '\u2190',
  uarr: '\u2191',
  rarr: '\u2192',
  darr: '\u2193',
  harr: '\u2194',
  crarr: '\u21B5',
  lArr: '\u21D0',
  uArr: '\u21D1',
  rArr: '\u21D2',
  dArr: '\u21D3',
  hArr: '\u21D4',
  forall: '\u2200',
  part: '\u2202',
  exist: '\u2203',
  empty: '\u2205',
  nabla: '\u2207',
  isin: '\u2208',
  notin: '\u2209',
  ni: '\u220B',
  prod: '\u220F',
  sum: '\u2211',
  minus: '\u2212',
  lowast: '\u2217',
  radic: '\u221A',
  prop: '\u221D',
  infin: '\u221E',
  ang: '\u2220',
  and: '\u2227',
  or: '\u2228',
  cap: '\u2229',
  cup: '\u222A',
  'int': '\u222B',
  there4: '\u2234',
  sim: '\u223C',
  cong: '\u2245',
  asymp: '\u2248',
  ne: '\u2260',
  equiv: '\u2261',
  le: '\u2264',
  ge: '\u2265',
  sub: '\u2282',
  sup: '\u2283',
  nsub: '\u2284',
  sube: '\u2286',
  supe: '\u2287',
  oplus: '\u2295',
  otimes: '\u2297',
  perp: '\u22A5',
  sdot: '\u22C5',
  lceil: '\u2308',
  rceil: '\u2309',
  lfloor: '\u230A',
  rfloor: '\u230B',
  lang: '\u2329',
  rang: '\u232A',
  loz: '\u25CA',
  spades: '\u2660',
  clubs: '\u2663',
  hearts: '\u2665',
  diams: '\u2666'
};

var hexNumber = /^[\da-fA-F]+$/;
var decimalNumber = /^\d+$/;

pp.jsx_readEntity = function() {
  var str = "", count = 0, entity;
  var ch = this.input[this.pos];
  if (ch !== "&")
    this.raise(this.pos, "Entity must start with an ampersand");
  var startPos = ++this.pos;
  while (this.pos < this.input.length && count++ < 10) {
    ch = this.input[this.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (hexNumber.test(str))
            entity = String.fromCharCode(parseInt(str, 16));
        } else {
          str = str.substr(1);
          if (decimalNumber.test(str))
            entity = String.fromCharCode(parseInt(str, 10));
        }
      } else {
        entity = XHTMLEntities[str];
      }
      break;
    }
    str += ch;
  }
  if (!entity) {
    this.pos = startPos;
    return "&";
  }
  return entity;
};


// Read a JSX identifier (valid tag or attribute name).
//
// Optimized version since JSX identifiers can't contain
// escape characters and so can be read as single slice.
// Also assumes that first character was already checked
// by isIdentifierStart in readToken.

pp.jsx_readWord = function() {
  var ch, start = this.pos;
  do {
    ch = this.input.charCodeAt(++this.pos);
  } while (acorn.isIdentifierChar(ch) || ch === 45); // '-'
  return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier")
    return object.name;

  if (object.type === "JSXNamespacedName")
    return object.namespace.name + ':' + object.name.name;

  if (object.type === "JSXMemberExpression")
    return getQualifiedJSXName(object.object) + '.' +
    getQualifiedJSXName(object.property);
}

// Parse next token as JSX identifier

pp.jsx_parseIdentifier = function() {
  var node = this.startNode();
  if (this.type === tt.jsxName)
    node.name = this.value;
  else if (this.type.keyword)
    node.name = this.type.keyword;
  else
    this.unexpected();
  this.next();
  return this.finishNode(node, "JSXIdentifier");
};

// Parse namespaced identifier.

pp.jsx_parseNamespacedName = function() {
  var start = this.markPosition();
  var name = this.jsx_parseIdentifier();
  if (!this.eat(tt.colon)) return name;
  var node = this.startNodeAt(start);
  node.namespace = name;
  node.name = this.jsx_parseIdentifier();
  return this.finishNode(node, "JSXNamespacedName");
};

// Parses element name in any form - namespaced, member
// or single identifier.

pp.jsx_parseElementName = function() {
  var start = this.markPosition();
  var node = this.jsx_parseNamespacedName();
  while (this.eat(tt.dot)) {
    var newNode = this.startNodeAt(start);
    newNode.object = node;
    newNode.property = this.jsx_parseIdentifier();
    node = this.finishNode(newNode, "JSXMemberExpression");
  }
  return node;
};

// Parses any type of JSX attribute value.

pp.jsx_parseAttributeValue = function() {
  switch (this.type) {
  case tt.braceL:
    var node = this.jsx_parseExpressionContainer();
    if (node.expression.type === "JSXEmptyExpression")
      this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
    return node;

  case tt.jsxTagStart:
  case tt.string:
    return this.parseExprAtom();

  default:
    this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
  }
};

// JSXEmptyExpression is unique type since it doesn't actually parse anything,
// and so it should start at the end of last read token (left brace) and finish
// at the beginning of the next one (right brace).

pp.jsx_parseEmptyExpression = function() {
  var tmp = this.start;
  this.start = this.lastTokEnd;
  this.lastTokEnd = tmp;

  tmp = this.startLoc;
  this.startLoc = this.lastTokEndLoc;
  this.lastTokEndLoc = tmp;

  return this.finishNode(this.startNode(), "JSXEmptyExpression");
};

// Parses JSX expression enclosed into curly brackets.


pp.jsx_parseExpressionContainer = function() {
  var node = this.startNode();
  this.next();
  node.expression = this.type === tt.braceR
    ? this.jsx_parseEmptyExpression()
    : this.parseExpression();
  this.expect(tt.braceR);
  return this.finishNode(node, "JSXExpressionContainer");
};

// Parses following JSX attribute name-value pair.

pp.jsx_parseAttribute = function() {
  var node = this.startNode();
  if (this.eat(tt.braceL)) {
    this.expect(tt.ellipsis);
    node.argument = this.parseMaybeAssign();
    this.expect(tt.braceR);
    return this.finishNode(node, "JSXSpreadAttribute");
  }
  node.name = this.jsx_parseNamespacedName();
  node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
  return this.finishNode(node, "JSXAttribute");
};

// Parses JSX opening tag starting after '<'.

pp.jsx_parseOpeningElementAt = function(start) {
  var node = this.startNodeAt(start);
  node.attributes = [];
  node.name = this.jsx_parseElementName();
  while (this.type !== tt.slash && this.type !== tt.jsxTagEnd)
    node.attributes.push(this.jsx_parseAttribute());
  node.selfClosing = this.eat(tt.slash);
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXOpeningElement");
};

// Parses JSX closing tag starting after '</'.

pp.jsx_parseClosingElementAt = function(start) {
  var node = this.startNodeAt(start);
  node.name = this.jsx_parseElementName();
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXClosingElement");
};

// Parses entire JSX element, including it's opening tag
// (starting after '<'), attributes, contents and closing tag.

pp.jsx_parseElementAt = function(start) {
  var node = this.startNodeAt(start);
  var children = [];
  var openingElement = this.jsx_parseOpeningElementAt(start);
  var closingElement = null;

  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (this.type) {
      case tt.jsxTagStart:
        start = this.markPosition();
        this.next();
        if (this.eat(tt.slash)) {
          closingElement = this.jsx_parseClosingElementAt(start);
          break contents;
        }
        children.push(this.jsx_parseElementAt(start));
        break;

      case tt.jsxText:
        children.push(this.parseExprAtom());
        break;

      case tt.braceL:
        children.push(this.jsx_parseExpressionContainer());
        break;

      default:
        this.unexpected();
      }
    }
    if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name))
      this.raise(
        closingElement.start,
        "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
  }

  node.openingElement = openingElement;
  node.closingElement = closingElement;
  node.children = children;
  return this.finishNode(node, "JSXElement");
};

// Parses entire JSX element from current position.

pp.jsx_parseElement = function() {
  var start = this.markPosition();
  this.next();
  return this.jsx_parseElementAt(start);
};

acorn.plugins.jsx = function(instance) {
  instance.extend("parseExprAtom", function(inner) {
    return function(refShortHandDefaultPos) {
      if (this.type === tt.jsxText)
        return this.parseLiteral(this.value);
      else if (this.type === tt.jsxTagStart)
        return this.jsx_parseElement();
      else
        return inner.call(this, refShortHandDefaultPos);
    };
  });

  instance.extend("readToken", function(inner) {
    return function(code) {
      var context = this.curContext();

      if (context === tc.j_expr) return this.jsx_readToken();

      if (context === tc.j_oTag || context === tc.j_cTag) {
        if (acorn.isIdentifierStart(code)) return this.jsx_readWord();

        if (code == 62) {
          ++this.pos;
          return this.finishToken(tt.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context == tc.j_oTag)
          return this.jsx_readString(code);
      }

      if (code === 60 && this.exprAllowed) {
        ++this.pos;
        return this.finishToken(tt.jsxTagStart);
      }
      return inner.call(this, code);
    };
  });

  instance.extend("updateContext", function(inner) {
    return function(prevType) {
      if (this.type == tt.braceL) {
        var curContext = this.curContext();
        if (curContext == tc.j_oTag) this.context.push(tc.b_expr);
        else if (curContext == tc.j_expr) this.context.push(tc.b_tmpl);
        else inner.call(this, prevType);
        this.exprAllowed = true;
      } else if (this.type === tt.slash && prevType === tt.jsxTagStart) {
        this.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
        this.context.push(tc.j_cTag); // reconsider as closing tag context
        this.exprAllowed = false;
      } else {
        return inner.call(this, prevType);
      }
    };
  });
}
