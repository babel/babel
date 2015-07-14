import XHTMLEntities from "./xhtml";
import { TokenType, types as tt } from "../../tokentype";
import { TokContext, types as tc } from "../../tokencontext";
import { Parser } from "../../state";
import { isIdentifierChar, isIdentifierStart } from "../../identifier";
import { isNewLine } from "../../whitespace";

const HEX_NUMBER = /^[\da-fA-F]+$/;
const DECIMAL_NUMBER = /^\d+$/;

tc.j_oTag = new TokContext("<tag", false);
tc.j_cTag = new TokContext("</tag", false);
tc.j_expr = new TokContext("<tag>...</tag>", true, true);

tt.jsxName = new TokenType("jsxName");
tt.jsxText = new TokenType("jsxText", { beforeExpr: true });
tt.jsxTagStart = new TokenType("jsxTagStart");
tt.jsxTagEnd = new TokenType("jsxTagEnd");

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

var pp = Parser.prototype;

// Reads inline JSX contents token.

pp.jsxReadToken = function() {
  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated JSX contents");
    }

    var ch = this.input.charCodeAt(this.pos);

    switch (ch) {
      case 60: // "<"
      case 123: // "{"
        if (this.pos === this.start) {
          if (ch === 60 && this.exprAllowed) {
            ++this.pos;
            return this.finishToken(tt.jsxTagStart);
          }
          return this.getTokenFromCode(ch);
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(tt.jsxText, out);

      case 38: // "&"
        out += this.input.slice(chunkStart, this.pos);
        out += this.jsxReadEntity();
        chunkStart = this.pos;
        break;

      default:
        if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsxReadNewLine(true);
          chunkStart = this.pos;
        } else {
          ++this.pos;
        }
    }
  }
};

pp.jsxReadNewLine = function(normalizeCRLF) {
  var ch = this.input.charCodeAt(this.pos);
  var out;
  ++this.pos;
  if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
    ++this.pos;
    out = normalizeCRLF ? "\n" : "\r\n";
  } else {
    out = String.fromCharCode(ch);
  }
  if (this.options.locations) {
    ++this.curLine;
    this.lineStart = this.pos;
  }

  return out;
};

pp.jsxReadString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated string constant");
    }

    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) break;
    if (ch === 38) { // "&"
      out += this.input.slice(chunkStart, this.pos);
      out += this.jsxReadEntity();
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.jsxReadNewLine(false);
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(tt.string, out);
};

pp.jsxReadEntity = function() {
  var str = "", count = 0, entity;
  var ch = this.input[this.pos];
  if (ch !== "&") this.raise(this.pos, "Entity must start with an ampersand");

  var startPos = ++this.pos;
  while (this.pos < this.input.length && count++ < 10) {
    ch = this.input[this.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (HEX_NUMBER.test(str))
            entity = String.fromCharCode(parseInt(str, 16));
        } else {
          str = str.substr(1);
          if (DECIMAL_NUMBER.test(str))
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
// Optimized version since JSX identifiers can"t contain
// escape characters and so can be read as single slice.
// Also assumes that first character was already checked
// by isIdentifierStart in readToken.

pp.jsxReadWord = function() {
  var ch, start = this.pos;
  do {
    ch = this.input.charCodeAt(++this.pos);
  } while (isIdentifierChar(ch) || ch === 45); // "-"
  return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier") {
    return object.name;
  }

  if (object.type === "JSXNamespacedName") {
    return object.namespace.name + ":" + object.name.name;
  }

  if (object.type === "JSXMemberExpression") {
    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  }
}

// Parse next token as JSX identifier

pp.jsxParseIdentifier = function() {
  var node = this.startNode();
  if (this.type === tt.jsxName) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "JSXIdentifier");
};

// Parse namespaced identifier.

pp.jsxParseNamespacedName = function() {
  var startPos = this.start, startLoc = this.startLoc;
  var name = this.jsxParseIdentifier();
  if (!this.eat(tt.colon)) return name;

  var node = this.startNodeAt(startPos, startLoc);
  node.namespace = name;
  node.name = this.jsxParseIdentifier();
  return this.finishNode(node, "JSXNamespacedName");
};

// Parses element name in any form - namespaced, member
// or single identifier.

pp.jsxParseElementName = function() {
  var startPos = this.start, startLoc = this.startLoc;
  var node = this.jsxParseNamespacedName();
  while (this.eat(tt.dot)) {
    var newNode = this.startNodeAt(startPos, startLoc);
    newNode.object = node;
    newNode.property = this.jsxParseIdentifier();
    node = this.finishNode(newNode, "JSXMemberExpression");
  }
  return node;
};

// Parses any type of JSX attribute value.

pp.jsxParseAttributeValue = function() {
  switch (this.type) {
    case tt.braceL:
      var node = this.jsxParseExpressionContainer();
      if (node.expression.type === "JSXEmptyExpression") {
        this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
      } else {
        return node;
      }

    case tt.jsxTagStart:
    case tt.string:
      return this.parseExprAtom();

    default:
      this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
  }
};

// JSXEmptyExpression is unique type since it doesn"t actually parse anything,
// and so it should start at the end of last read token (left brace) and finish
// at the beginning of the next one (right brace).

pp.jsxParseEmptyExpression = function() {
  var tmp = this.start;
  this.start = this.lastTokEnd;
  this.lastTokEnd = tmp;

  tmp = this.startLoc;
  this.startLoc = this.lastTokEndLoc;
  this.lastTokEndLoc = tmp;

  return this.finishNode(this.startNode(), "JSXEmptyExpression");
};

// Parses JSX expression enclosed into curly brackets.


pp.jsxParseExpressionContainer = function() {
  var node = this.startNode();
  this.next();
  if (this.type === tt.braceR) {
    node.expression = this.jsxParseEmptyExpression();
  } else {
    node.expression = this.parseExpression();
  }
  this.expect(tt.braceR);
  return this.finishNode(node, "JSXExpressionContainer");
};

// Parses following JSX attribute name-value pair.

pp.jsxParseAttribute = function() {
  var node = this.startNode();
  if (this.eat(tt.braceL)) {
    this.expect(tt.ellipsis);
    node.argument = this.parseMaybeAssign();
    this.expect(tt.braceR);
    return this.finishNode(node, "JSXSpreadAttribute");
  }
  node.name = this.jsxParseNamespacedName();
  node.value = this.eat(tt.eq) ? this.jsxParseAttributeValue() : null;
  return this.finishNode(node, "JSXAttribute");
};

// Parses JSX opening tag starting after "<".

pp.jsxParseOpeningElementAt = function(startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.attributes = [];
  node.name = this.jsxParseElementName();
  while (this.type !== tt.slash && this.type !== tt.jsxTagEnd) {
    node.attributes.push(this.jsxParseAttribute());
  }
  node.selfClosing = this.eat(tt.slash);
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXOpeningElement");
};

// Parses JSX closing tag starting after "</".

pp.jsxParseClosingElementAt = function(startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.name = this.jsxParseElementName();
  this.expect(tt.jsxTagEnd);
  return this.finishNode(node, "JSXClosingElement");
};

// Parses entire JSX element, including it"s opening tag
// (starting after "<"), attributes, contents and closing tag.

pp.jsxParseElementAt = function(startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  var children = [];
  var openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
  var closingElement = null;

  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (this.type) {
        case tt.jsxTagStart:
          startPos = this.start; startLoc = this.startLoc;
          this.next();
          if (this.eat(tt.slash)) {
            closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
            break contents;
          }
          children.push(this.jsxParseElementAt(startPos, startLoc));
          break;

        case tt.jsxText:
          children.push(this.parseExprAtom());
          break;

        case tt.braceL:
          children.push(this.jsxParseExpressionContainer());
          break;

        default:
          this.unexpected();
      }
    }
    if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
      this.raise(
        closingElement.start,
        "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">"
      );
    }
  }

  node.openingElement = openingElement;
  node.closingElement = closingElement;
  node.children = children;
  if (this.type === tt.relational && this.value === "<") {
    this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
  }
  return this.finishNode(node, "JSXElement");
};

// Parses entire JSX element from current position.

pp.jsxParseElement = function() {
  var startPos = this.start, startLoc = this.startLoc;
  this.next();
  return this.jsxParseElementAt(startPos, startLoc);
};

export default function(instance) {
  instance.extend("parseExprAtom", function(inner) {
    return function(refShortHandDefaultPos) {
      if (this.type === tt.jsxText)
        return this.parseLiteral(this.value);
      else if (this.type === tt.jsxTagStart)
        return this.jsxParseElement();
      else
        return inner.call(this, refShortHandDefaultPos);
    };
  });

  instance.extend("readToken", function(inner) {
    return function(code) {
      var context = this.curContext();

      if (context === tc.j_expr) return this.jsxReadToken();

      if (context === tc.j_oTag || context === tc.j_cTag) {
        if (isIdentifierStart(code)) return this.jsxReadWord();

        if (code === 62) {
          ++this.pos;
          return this.finishToken(tt.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context === tc.j_oTag)
          return this.jsxReadString(code);
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
      if (this.type === tt.braceL) {
        var curContext = this.curContext();
        if (curContext === tc.j_oTag) this.context.push(tc.b_expr);
        else if (curContext === tc.j_expr) this.context.push(tc.b_tmpl);
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
