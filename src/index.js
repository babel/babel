// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
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

import {has, isArray} from "./util"
import {lineBreak} from "./tokenize"
import {getLineInfo as getLineInfo_, SourceLocation} from "./location"

export const version = "0.12.1"

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

export function parse(input, options) {
  let p = parser(options, input)
  let startPos = p.options.locations ? [p.pos, p.curPosition()] : p.pos
  p.nextToken()
  return p.parseTopLevel(p.options.program || p.startNodeAt(startPos))
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

export const defaultOptions = {
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
  plugins: {}
}

// Registered plugins

export const plugins = {}

// Interpret and default an options object

function getOptions(opts) {
  let options = {}
  for (let opt in defaultOptions)
    options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = (token) => tokens.push(token)
  }
  if (isArray(options.onComment))
    options.onComment = pushComment(options, options.onComment);

  return options;
}

function pushComment(options, array) {
  return function (block, text, start, end, startLoc, endLoc) {
    let comment = {
      type: block ? 'Block' : 'Line',
      value: text,
      start: start,
      end: end
    }
    if (options.locations)
      comment.loc = new SourceLocation(this, startLoc, endLoc)
    if (options.ranges)
      comment.range = [start, end]
    array.push(comment)
  }
}

function parser(options, input) {
  return new Parser(getOptions(options), String(input))
}

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

import {types as tt} from "./tokentype"
import Parser from "./state"
import {reservedWords} from "./identifier"

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

export function parseExpressionAt(input, pos, options) {
  let p = parser(options, input, pos)
  p.nextToken()
  return p.parseExpression()
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenize` export provides an interface to the tokenizer.
// Because the tokenizer is optimized for being efficiently used by
// the Acorn parser itself, this interface is somewhat crude and not
// very modular.

export function tokenizer(input, options) {
  return parser(options, input)
}

export const getLineInfo = getLineInfo_ // FIXME cleaner way?

// ### Parser utilities

// Start an AST node, attaching a start offset.

var Node = exports.Node = function() {};

const pp = Parser.prototype

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
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
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
      elts.push(this.parseRest());
      this.expect(close);
      break;
    } else {
      elts.push(this.parseMaybeDefault());
    }
  }
  return elts;
};

// Parses assignment pattern around given atom if possible.

pp.parseMaybeDefault = function(startPos, left) {
  startPos = startPos || this.markPosition();
  left = left || this.parseBindingAtom();
  if (!this.eat(tt.eq)) return left;
  var node = this.startNodeAt(startPos);
  node.operator = "=";
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
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

pp.checkLVal = function(expr, isBinding, checkClashes) {
  switch (expr.type) {
  case "Identifier":
    if (this.strict && (reservedWords.strictBind(expr.name) || reservedWords.strict(expr.name)))
      this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
    if (checkClashes) {
      if (has(checkClashes, expr.name))
        this.raise(expr.start, "Argument name clash in strict mode");
      checkClashes[expr.name] = true;
    }
    break;

  case "MemberExpression":
    if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
    break;

  case "ObjectPattern":
    for (var i = 0; i < expr.properties.length; i++)
      this.checkLVal(expr.properties[i].value, isBinding, checkClashes);
    break;

  case "ArrayPattern":
    for (var i = 0; i < expr.elements.length; i++) {
      var elem = expr.elements[i];
      if (elem) this.checkLVal(elem, isBinding, checkClashes);
    }
    break;

  case "AssignmentPattern":
    this.checkLVal(expr.left, isBinding, checkClashes);
    break;

  case "RestElement":
    this.checkLVal(expr.argument, isBinding, checkClashes);
    break;

  default:
    this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
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
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    this.raise(this.lastTokEnd, "Illegal newline after throw");
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};

// Reused empty array added for node fields that are always empty.

var empty = [];


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
    decl.id = this.parseBindingAtom();
    this.checkLVal(decl.id, true);
    if (this.eat(tt.eq)) {
      decl.init = this.parseMaybeAssign(noIn);
    } else if (kind === tt._const && !(this.type === tt._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
      this.unexpected();
    } else if (decl.id.type != "Identifier") {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value")
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(tt.comma)) break;
  }
  return node;
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
  var start = this.markPosition();
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

pp.parseMaybeAssign = function(noIn, refShorthandDefaultPos) {
  if (this.type == tt._yield && this.inGenerator) return this.parseYield();

  var failOnShorthandAssign;
  if (!refShorthandDefaultPos) {
    refShorthandDefaultPos = {start: 0};
    failOnShorthandAssign = true;
  } else {
    failOnShorthandAssign = false;
  }
  var start = this.markPosition();
  var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos);
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
  var start = this.markPosition();
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
  var start = this.markPosition();
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
      var start = this.markPosition();
      node.right = this.parseExprOp(this.parseMaybeUnary(), start, prec, noIn);
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
  var start = this.markPosition();
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
  var start = this.markPosition();
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
    var start = this.markPosition();
    var id = this.parseIdent(this.type !== tt.name);
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
    if (this.options.ecmaVersion >= 7 && this.type === tt._for) {
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

pp.parseParenAndDistinguishExpression = function() {
  var start = this.markPosition(), val;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    if (this.options.ecmaVersion >= 7 && this.type === tt._for) {
      return this.parseComprehension(this.startNodeAt(start), true);
    }

    var innerStart = this.markPosition(), exprList = [], first = true;
    var refShorthandDefaultPos = {start: 0}, spreadStart, innerParenStart;
    while (this.type !== tt.parenR) {
      first ? first = false : this.expect(tt.comma);
      if (this.type === tt.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseRest());
        break;
      } else {
        if (this.type === tt.parenL && !innerParenStart) {
          innerParenStart = this.start;
        }
        exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos));
      }
    }
    var innerEnd = this.markPosition();
    this.expect(tt.parenR);

    if (!this.canInsertSemicolon() && this.eat(tt.arrow)) {
      if (innerParenStart) this.unexpected(innerParenStart);
      return this.parseArrowExpression(this.startNodeAt(start), exprList);
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

// New's precedence is slightly tricky. It must allow its argument
// to be a `[]` or dot subscript expression, but not a call — at
// least, not without wrapping it in parentheses. Thus, it uses the

pp.parseNew = function() {
  var node = this.startNode();
  this.next();
  var start = this.markPosition();
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

    var prop = this.startNode(), isGenerator, start;
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refShorthandDefaultPos)
        start = this.markPosition();
      if (!isPattern)
        isGenerator = this.eat(tt.star);
    }
    this.parsePropertyName(prop);
    if (this.eat(tt.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault() : this.parseMaybeAssign(false, refShorthandDefaultPos);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
      if (isPattern) this.unexpected();
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator);
    } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
               (prop.key.name === "get" || prop.key.name === "set") &&
               (this.type != tt.comma && this.type != tt.braceR)) {
      if (isGenerator || isPattern) this.unexpected();
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      prop.kind = "init";
      if (isPattern) {
        if (this.isKeyword(prop.key.name) ||
            (this.strict && (reservedWords.strictBind(prop.key.name) || reservedWords.strict(prop.key.name))) ||
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

    this.checkPropClash(prop, propHash);
    node.properties.push(this.finishNode(prop, "Property"));
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};

pp.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(tt.bracketL)) {
      prop.computed = true;
      prop.key = this.parseExpression();
      this.expect(tt.bracketR);
      return;
    } else {
      prop.computed = false;
    }
  }
  prop.key = (this.type === tt.num || this.type === tt.string) ? this.parseExprAtom() : this.parseIdent(true);
};

// Initialize empty function node.

pp.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp.parseFunction = function(node, isStatement, allowExpressionBody) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = this.eat(tt.star);
  }
  if (isStatement || this.type === tt.name) {
    node.id = this.parseIdent();
  }
  this.expect(tt.parenL);
  node.params = this.parseBindingList(tt.parenR, false, false);
  this.parseFunctionBody(node, allowExpressionBody);
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

// Parse object or class method.

pp.parseMethod = function(isGenerator) {
  var node = this.startNode();
  this.initFunction(node);
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

pp.parseArrowExpression = function(node, params) {
  this.initFunction(node);
  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);
  return this.finishNode(node, "ArrowFunctionExpression");
};

// Parse function body and check parameters.

pp.parseFunctionBody = function(node, allowExpression) {
  var isExpression = allowExpression && this.type !== tt.braceL;

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

  // If this is a strict mode function, verify that argument names
  // are not repeated, and it does not try to bind the words `eval`
  // or `arguments`.
  if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
    var nameHash = {}, oldStrict = this.strict;
    this.strict = true;
    if (node.id)
      this.checkLVal(node.id, true);
    for (var i = 0; i < node.params.length; i++)
      this.checkLVal(node.params[i], true, nameHash);
    this.strict = oldStrict;
  }
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp.parseClass = function(node, isStatement) {
  this.next();
  node.id = this.type === tt.name ? this.parseIdent() : isStatement ? this.unexpected() : null;
  node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
  var classBody = this.startNode();
  classBody.body = [];
  this.expect(tt.braceL);
  while (!this.eat(tt.braceR)) {
    if (this.eat(tt.semi)) continue;
    var method = this.startNode();
    var isGenerator = this.eat(tt.star);
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
    method.value = this.parseMethod(isGenerator);
    classBody.body.push(this.finishNode(method, "MethodDefinition"));
  }
  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
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
        ((!this.options.allowReserved && this.isReservedWord(this.value)) ||
         (this.strict && reservedWords.strict(this.value)) &&
         (this.options.ecmaVersion >= 6 || 
          this.input.slice(this.start, this.end).indexOf("\\") == -1)))
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
  if (this.type.keyword) {
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
  // import '...';
  if (this.type === tt.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
    node.kind = "";
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

// Parses a comma-separated list of module imports.

pp.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === tt.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(tt.comma)) return nodes;
  }
  if (this.type === tt.star) {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportNamespaceSpecifier"));
    return nodes;
  }
  this.expect(tt.braceL);
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this.expect(tt.comma);
      if (this.afterTrailingComma(tt.braceR)) break;
    } else first = false;

    var node = this.startNode();
    node.imported = this.parseIdent(true);
    node.local = this.eatContextual("as") ? this.parseIdent() : node.imported;
    this.checkLVal(node.local, true);
    nodes.push(this.finishNode(node, "ImportSpecifier"));
  }
  return nodes;
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
