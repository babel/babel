"use strict";

var acorn = require("..");

var tt = acorn.tokTypes;
var tc = acorn.tokContexts;

tc.j_oTag = new acorn.TokContext("<tag", false);
tc.j_cTag = new acorn.TokContext("</tag", false);
tc.j_expr = new acorn.TokContext("<tag>...</tag>", true, true);

tt.jsxName = new acorn.TokenType("jsxName");
tt.jsxText = new acorn.TokenType("jsxText", { beforeExpr: true });
tt.jsxTagStart = new acorn.TokenType("jsxTagStart");
tt.jsxTagEnd = new acorn.TokenType("jsxTagEnd");

tt.jsxTagStart.updateContext = function () {
  this.context.push(tc.j_expr); // treat as beginning of JSX expression
  this.context.push(tc.j_oTag); // start opening tag context
  this.exprAllowed = false;
};
tt.jsxTagEnd.updateContext = function (prevType) {
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

pp.jsx_readToken = function () {
  var out = "",
      chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) this.raise(this.start, "Unterminated JSX contents");
    var ch = this.input.charCodeAt(this.pos);

    switch (ch) {
      case 60: // '<'
      case 123:
        // '{'
        if (this.pos === this.start) {
          if (ch === 60 && this.exprAllowed) {
            ++this.pos;
            return this.finishToken(tt.jsxTagStart);
          }
          return this.getTokenFromCode(ch);
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(tt.jsxText, out);

      case 38:
        // '&'
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

pp.jsx_readString = function (quote) {
  var out = "",
      chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant");
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) break;
    if (ch === 38) {
      // '&'
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
  quot: "\"",
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  frasl: "⁄",
  euro: "€",
  image: "ℑ",
  weierp: "℘",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
};

var hexNumber = /^[\da-fA-F]+$/;
var decimalNumber = /^\d+$/;

pp.jsx_readEntity = function () {
  var str = "",
      count = 0,
      entity;
  var ch = this.input[this.pos];
  if (ch !== "&") this.raise(this.pos, "Entity must start with an ampersand");
  var startPos = ++this.pos;
  while (this.pos < this.input.length && count++ < 10) {
    ch = this.input[this.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (hexNumber.test(str)) entity = String.fromCharCode(parseInt(str, 16));
        } else {
          str = str.substr(1);
          if (decimalNumber.test(str)) entity = String.fromCharCode(parseInt(str, 10));
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

pp.jsx_readWord = function () {
  var ch,
      start = this.pos;
  do {
    ch = this.input.charCodeAt(++this.pos);
  } while (acorn.isIdentifierChar(ch) || ch === 45); // '-'
  return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier") return object.name;

  if (object.type === "JSXNamespacedName") return object.namespace.name + ":" + object.name.name;

  if (object.type === "JSXMemberExpression") return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
}

// Parse next token as JSX identifier

pp.jsx_parseIdentifier = function () {
  var node = this.startNode();
  if (this.type === tt.jsxName) node.name = this.value;else if (this.type.keyword) node.name = this.type.keyword;else this.unexpected();
  this.next();
  return this.finishNode(node, "JSXIdentifier");
};

// Parse namespaced identifier.

pp.jsx_parseNamespacedName = function () {
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

pp.jsx_parseElementName = function () {
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

pp.jsx_parseAttributeValue = function () {
  switch (this.type) {
    case tt.braceL:
      var node = this.jsx_parseExpressionContainer();
      if (node.expression.type === "JSXEmptyExpression") this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
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

pp.jsx_parseEmptyExpression = function () {
  var tmp = this.start;
  this.start = this.lastTokEnd;
  this.lastTokEnd = tmp;

  tmp = this.startLoc;
  this.startLoc = this.lastTokEndLoc;
  this.lastTokEndLoc = tmp;

  return this.finishNode(this.startNode(), "JSXEmptyExpression");
};

// Parses JSX expression enclosed into curly brackets.

pp.jsx_parseExpressionContainer = function () {
  var node = this.startNode();
  this.next();
  node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
  this.expect(tt.braceR);
  return this.finishNode(node, "JSXExpressionContainer");
};

// Parses following JSX attribute name-value pair.

pp.jsx_parseAttribute = function () {
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

pp.jsx_parseOpeningElementAt = function (start) {
  var node = this.startNodeAt(start);
  node.attributes = [];
  node.name = this.jsx_parseElementName();
  while (this.type !== tt.slash && this.type !== tt.jsxTagEnd) node.attributes.push(this.jsx_parseAttribute());
  node.selfClosing = this.eat(tt.slash);
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXOpeningElement");
};

// Parses JSX closing tag starting after '</'.

pp.jsx_parseClosingElementAt = function (start) {
  var node = this.startNodeAt(start);
  node.name = this.jsx_parseElementName();
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXClosingElement");
};

// Parses entire JSX element, including it's opening tag
// (starting after '<'), attributes, contents and closing tag.

pp.jsx_parseElementAt = function (start) {
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
    if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
  }

  node.openingElement = openingElement;
  node.closingElement = closingElement;
  node.children = children;
  return this.finishNode(node, "JSXElement");
};

// Parses entire JSX element from current position.

pp.jsx_parseElement = function () {
  var start = this.markPosition();
  this.next();
  return this.jsx_parseElementAt(start);
};

acorn.plugins.jsx = function (instance) {
  instance.extend("parseExprAtom", function (inner) {
    return function (refShortHandDefaultPos) {
      if (this.type === tt.jsxText) return this.parseLiteral(this.value);else if (this.type === tt.jsxTagStart) return this.jsx_parseElement();else return inner.call(this, refShortHandDefaultPos);
    };
  });

  instance.extend("readToken", function (inner) {
    return function (code) {
      var context = this.curContext();

      if (context === tc.j_expr) return this.jsx_readToken();

      if (context === tc.j_oTag || context === tc.j_cTag) {
        if (acorn.isIdentifierStart(code)) return this.jsx_readWord();

        if (code == 62) {
          ++this.pos;
          return this.finishToken(tt.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context == tc.j_oTag) return this.jsx_readString(code);
      }

      if (code === 60 && this.exprAllowed) {
        ++this.pos;
        return this.finishToken(tt.jsxTagStart);
      }
      return inner.call(this, code);
    };
  });

  instance.extend("updateContext", function (inner) {
    return function (prevType) {
      if (this.type == tt.braceL) {
        var curContext = this.curContext();
        if (curContext == tc.j_oTag) this.context.push(tc.b_expr);else if (curContext == tc.j_expr) this.context.push(tc.b_tmpl);else inner.call(this, prevType);
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
};