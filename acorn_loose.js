// Acorn: Loose parser
//
// This module provides an alternative parser (`parse_dammit`) that
// exposes that same interface as `parse`, but will try to parse
// anything as JavaScript, repairing syntax error the best it can.
// There are circumstances in which it will raise an error and give
// up, but they are very rare. The resulting AST will be a mostly
// valid JavaScript AST (as per the [Mozilla parser API][api], except
// that:
//
// - Return outside functions is allowed
//
// - Label consistency (no conflicts, break only to existing labels)
//   is not enforced.
//
// - Bogus Identifier nodes with a name of `"?"` are inserted whenever
//   the parser got too confused to return anything meaningful.
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
//
// Quite a lot of acorn.js is duplicated here. The alternative was to
// add a *lot* of extra cruft to that file, making it less readable
// and slower. Copying and editing the code allowed me to make
// invasive changes and simplifications without creating a complicated
// tangle.

(function(exports) {
  "use strict";

  var acorn = exports.parse ? exports : require("./acorn"), tt = acorn.tokTypes;

  var options, input, fetchToken;

  exports.parse_dammit = function(inpt, opts) {
    if (!opts) opts = {};
    input = String(inpt);
    options = opts;
    fetchToken = acorn.tokenize(inpt, opts);
    next();
    return parseTopLevel();
  };

  var lastEnd, token = {start: 0, end: 0}, ahead = [];

  function next() {
    lastEnd = token.end;
    if (ahead.length)
      token = ahead.shift();
    else
      token = readToken();
  }

  function readToken() {
    for (;;) {
      try {
        return fetchToken();
      } catch(e) {
        if (!(e instanceof SyntaxError)) throw e;

        // Try to skip some text, based on the error message, and then continue
        var msg = e.message, pos = e.raisedAt, replace = true;
        if (/unterminated/i.test(msg)) {
          pos = lineEnd(e.pos);
          replace = !/comment/i.test(msg);
        } else if (/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number/i.test(msg)) {
          while (pos < input.length && !isSpace(input.charCodeAt(pos))) ++pos;
        } else if (/character escape|expected hexadecimal/i.test(msg)) {
          while (pos < input.length) {
            var ch = input.charCodeAt(pos++);
            if (ch === 34 || ch === 39 || isNewline(ch)) break;
          }
        } else if (/unexpected character/i.test(msg)) {
          pos++;
          replace = false;
        } else {
          throw e;
        }
        resetTo(pos);
        if (replace) return {start: pos, end: pos, type: tt.name, value: "?"};
      }
    }
  }

  function resetTo(pos) {
    var ch = input.charAt(pos - 1);
    var reAllowed = !ch || /[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(ch) ||
      /[enwfd]/.test(ch) && /\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(input.slice(pos - 10, pos));
    fetchToken.jumpTo(pos, reAllowed);
  }

  function lookAhead(n) {
    // Copy token objects, because fetchToken will overwrite the one
    // it returns, and in this case we still need it
    if (!ahead.length)
      token = {start: token.start, end: token.end, type: token.type, value: token.value};
    while (n > ahead.length) {
      var tok = readToken();
      ahead.push({start: tok.from, end: tok.end, type: tok.type, value: tok.value});
    }
    return ahead[n-1];
  }

  var newline = /[\n\r\u2028\u2029]/;

  function isNewline(ch) {
    return ch === 10 || ch === 13 || ch === 8232 || ch === 8329;
  }
  function isSpace(ch) {
    return (ch < 14 && ch > 8) || ch === 32 || ch === 160 || isNewline(ch);
  }

  function lineEnd(pos) {
    while (pos < input.length && !isNewline(input.charCodeAt(pos))) ++pos;
    return pos;
  }
  function lineStart(pos) {
    while (pos > 0 && !isNewline(input.charCodeAt(pos - 1))) --pos;
    return pos;
  }
  function indentationAt(pos) {
    for (var cur = lineStart(pos), count = 0; cur < pos; ++cur) {
      var ch = input.charCodeAt(cur);
      if (ch === 32) ++count;
      else if (ch === 9) count += 4;
    }
    return count;
  }
  function closesBlock(closeTok, indent) {
    return token.type === closeTok || token.type === tt.eof || indent > indentationAt(token.start);
  }

  function node_t(start) {
    this.type = null;
    this.start = start;
    this.end = null;
  }

  function startNode() {
    return new node_t(token.start);
  }
  function startNodeFrom(other) {
    return new node_t(other.start);
  }
  function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    return node;
  }

  function dummyIdent() {
    var dummy = new node_t(0);
    dummy.type = "Identifier";
    dummy.end = 0;
    dummy.name = "?";
    return dummy;
  }

  function eat(type) {
    if (token.type === type) {
      next();
      return true;
    }
  }

  function canInsertSemicolon() {
    return (token.type === tt.eof || token.type === tt.braceR || newline.test(input.slice(lastEnd, token.start)));
  }
  function semicolon() {
    eat(tt.semi);
  }

  function expect(type) {
    if (eat(type)) return true;
    if (lookAhead(1).type == type) {
      next(); next();
      return true;
    }
    if (lookAhead(2).type == type) {
      next(); next(); next();
      return true;
    }
  }

  function checkLVal(expr) {
    if (expr.type === "Identifier" || expr.type === "MemberExpression") return expr;
    return dummyIdent();
  }

  function parseTopLevel() {
    var node = startNode();
    node.body = [];
    while (token.type !== tt.eof) node.body.push(parseStatement());
    return finishNode(node, "Program");
  }

  function parseStatement() {
    var starttype = token.type, node = startNode();

    switch (starttype) {
    case tt.break: case tt.continue:
      next();
      var isBreak = starttype === tt.break;
      node.label = token.type === tt.name ? parseIdent() : null;
      semicolon();
      return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

    case tt.debugger:
      next();
      semicolon();
      return finishNode(node, "DebuggerStatement");

    case tt.do:
      next();
      node.body = parseStatement();
      node.test = eat(tt.while) ? parseParenExpression() : dummyIdent();
      semicolon();
      return finishNode(node, "DoWhileStatement");

    case tt.for:
      next();
      expect(tt.parenL);
      if (token.type === tt.semi) return parseFor(node, null);
      if (token.type === tt.var) {
        var init = startNode();
        next();
        parseVar(init, true);
        if (init.declarations.length === 1 && eat(tt.in))
          return parseForIn(node, init);
        return parseFor(node, init);
      }
      var init = parseExpression(false, true);
      if (eat(tt.in)) {return parseForIn(node, checkLVal(init));}
      return parseFor(node, init);

    case tt.function:
      next();
      return parseFunction(node, true);

    case tt.if:
      next();
      node.test = parseParenExpression();
      node.consequent = parseStatement();
      node.alternate = eat(tt.else) ? parseStatement() : null;
      return finishNode(node, "IfStatement");

    case tt.return:
      next();
      if (eat(tt.semi) || canInsertSemicolon()) node.argument = null;
      else { node.argument = parseExpression(); semicolon(); }
      return finishNode(node, "ReturnStatement");

    case tt.switch:
      var blockIndent = indentationAt(token.start);
      next();
      node.discriminant = parseParenExpression();
      node.cases = [];
      expect(tt.braceL);

      for (var cur; !closesBlock(tt.braceR, blockIndent);) {
        if (token.type === tt.case || token.type === tt.default) {
          var isCase = token.type === tt.case;
          if (cur) finishNode(cur, "SwitchCase");
          node.cases.push(cur = startNode());
          cur.consequent = [];
          next();
          if (isCase) cur.test = parseExpression();
          else cur.test = null;
          expect(tt.colon);
        } else {
          if (!cur) {
            node.cases.push(cur = startNode());
            cur.consequent = [];
            cur.test = null;
          }
          cur.consequent.push(parseStatement());
        }
      }
      if (cur) finishNode(cur, "SwitchCase");
      eat(tt.braceR);
      return finishNode(node, "SwitchStatement");

    case tt.throw:
      next();
      node.argument = parseExpression();
      semicolon();
      return finishNode(node, "ThrowStatement");

    case tt.try:
      next();
      node.block = parseBlock();
      node.handlers = [];
      while (token.type === tt.catch) {
        var clause = startNode();
        next();
        expect(tt.parenL);
        clause.param = parseIdent();
        expect(tt.parenR);
        clause.guard = null;
        clause.body = parseBlock();
        node.handlers.push(finishNode(clause, "CatchClause"));
      }
      node.finalizer = eat(tt.finally) ? parseBlock() : null;
      if (!node.handlers.length && !node.finalizer) return node.block;
      return finishNode(node, "TryStatement");

    case tt.var:
      next();
      node = parseVar(node);
      semicolon();
      return node;

    case tt.while:
      next();
      node.test = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WhileStatement");

    case tt.with:
      next();
      node.object = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WithStatement");

    case tt.braceL:
      return parseBlock();

    case tt.semi:
      next();
      return finishNode(node, "EmptyStatement");

    default:
      var maybeName = token.value, expr = parseExpression$();
      if (starttype === tt.name && expr.type === "Identifier" && eat(tt.colon)) {
        node.body = parseStatement();
        node.label = expr;
        return finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        semicolon();
        return finishNode(node, "ExpressionStatement");
      }
    }
  }

  function parseBlock() {
    expect(tt.braceL);
    var node = startNode(), blockIndent = indentationAt(token.start);
    node.body = [];
    while (!closesBlock(tt.braceR, blockIndent))
      node.body.push(parseStatement());
    eat(tt.braceR);
    return finishNode(node, "BlockStatement");
  }

  function parseFor(node, init) {
    node.init = init;
    node.test = node.update = null;
    if (eat(tt.semi) && token.type !== tt.semi) node.test = parseExpression();
    if (eat(tt.semi) && token.type !== tt.parenR) node.update = parseExpression();
    expect(tt.parenR);
    node.body = parseStatement();
    return finishNode(node, "ForStatement");
  }

  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    expect(tt.parenR);
    node.body = parseStatement();
    return finishNode(node, "ForInStatement");
  }

  function parseVar(node, noIn) {
    node.declarations = [];
    node.kind = "var";
    while (token.type === tt.name) {
      var decl = startNode();
      decl.id = parseIdent();
      decl.init = eat(tt.eq) ? parseExpression(true, noIn) : null;
      node.declarations.push(finishNode(decl, "VariableDeclarator"));
      if (!eat(tt.comma)) break;
    }
    return finishNode(node, "VariableDeclaration");
  }

  var mustConsume;

  function parseExpression(noComma, noIn) {
    return parseExpressionInner(noComma, noIn, false);
  }
  function parseExpression$(noComma, noIn) {
    return parseExpressionInner(noComma, noIn, true);
  }

  function parseExpressionInner(noComma, noIn, consume) {
    var old = mustConsume;
    mustConsume = consume;
    var expr = parseMaybeAssign(noIn);
    if (!noComma && token.type === tt.comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(tt.comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    mustConsume = old;
    return expr;
  }

  function parseParenExpression() {
    expect(tt.parenL);
    var val = parseExpression();
    expect(tt.parenR);
    return val;
  }

  function parseMaybeAssign(noIn) {
    var left = parseMaybeConditional(noIn);
    if (token.type.isAssign) {
      var node = startNodeFrom(left);
      node.operator = token.value;
      node.left = checkLVal(left);
      next();
      node.right = parseMaybeAssign(noIn);
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  function parseMaybeConditional(noIn) {
    var expr = parseExprOps(noIn);
    if (eat(tt.question)) {
      var node = startNodeFrom(expr);
      node.test = expr;
      node.consequent = parseExpression(true);
      node.alternate = expect(tt.colon) ? parseExpression(true, noIn) : dummyIdent();
      return finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }

  function parseExprOp(left, minPrec, noIn) {
    var prec = token.type.binop;
    if (prec != null && (!noIn || token.type !== tt.in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = token.value;
        next();
        node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
        var node = finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
        return parseExprOp(node, minPrec, noIn);
      }
    }
    return left;
  }

  function parseMaybeUnary(noIn) {
    if (token.type.prefix) {
      var node = startNode(), update = token.type.isUpdate;
      node.operator = token.value;
      node.prefix = true;
      next();
      node.argument = parseMaybeUnary(noIn);
      if (update) node.argument = checkLVal(node.argument);
      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var expr = parseExprSubscripts();
    while (token.type.postfix && !canInsertSemicolon()) {
      var node = startNodeFrom(expr);
      node.operator = token.value;
      node.prefix = false;
      node.argument = checkLVal(expr);
      next();
      expr = finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  function parseExprSubscripts() {
    return parseSubscripts(parseExprAtom());
  }

  function parseSubscripts(base, noCalls) {
    if (eat(tt.dot)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parsePropertyName() || dummyIdent();
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (eat(tt.bracketL)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseExpression();
      node.computed = true;
      expect(tt.bracketR);
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (!noCalls && eat(tt.parenL)) {
      var node = startNodeFrom(base);
      node.callee = base;
      node.arguments = parseExprList(tt.parenR);
      return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
    } else return base;
  }

  function parseExprAtom() {
    switch (token.type) {
    case tt.this:
      var node = startNode();
      next();
      return finishNode(node, "ThisExpression");
    case tt.name:
      return parseIdent();
    case tt.num: case tt.string: case tt.regexp:
      var node = startNode();
      node.value = token.value;
      node.raw = input.slice(token.start, token.end);
      next();
      return finishNode(node, "Literal");

    case tt.null: case tt.true: case tt.false:
      var node = startNode();
      node.value = token.type.atomValue;
      node.raw = token.type.keyword
      next();
      return finishNode(node, "Literal");

    case tt.parenL:
      var tokStart1 = token.start;
      next();
      var val = parseExpression();
      val.start = tokStart1;
      val.end = token.end;
      expect(tt.parenR);
      return val;

    case tt.bracketL:
      var node = startNode();
      next();
      node.elements = parseExprList(tt.bracketR);
      return finishNode(node, "ArrayExpression");

    case tt.braceL:
      return parseObj();

    case tt.function:
      var node = startNode();
      next();
      return parseFunction(node, false);

    case tt.new:
      return parseNew();

    default:
      if (mustConsume) {
        next();
        mustConsume = false;
        return parseExprAtom();
      } else return dummyIdent();
    }
  }

  function parseNew() {
    var node = startNode();
    next();
    node.callee = parseSubscripts(parseExprAtom(), true);
    if (eat(tt.parenL)) node.arguments = parseExprList(tt.parenR);
    else node.arguments = [];
    return finishNode(node, "NewExpression");
  }

  function parseObj() {
    var node = startNode();
    node.properties = [];
    next();
    var propIndent = indentationAt(token.start);
    while (!closesBlock(tt.braceR, propIndent)) {
      var name = parsePropertyName();
      if (!name) { parseExpression$(true); eat(tt.comma); continue; }
      var prop = {key: name}, isGetSet = false, kind;
      if (eat(tt.colon)) {
        prop.value = parseExpression(true);
        kind = prop.kind = "init";
      } else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set")) {
        isGetSet = sawGetSet = true;
        kind = prop.kind = prop.key.name;
        prop.key = parsePropertyName() || dummyIdent();
        prop.value = parseFunction(startNode(), false);
      } else {
        next();
        eat(tt.comma);
        continue;
      }

      node.properties.push(prop);
      eat(tt.comma);
    }
    eat(tt.braceR);
    return finishNode(node, "ObjectExpression");
  }

  function parsePropertyName() {
    if (token.type === tt.num || token.type === tt.string) return parseExprAtom();
    if (token.type === tt.name || token.type.keyword) return parseIdent();
  }

  function parseIdent() {
    var node = startNode();
    node.name = token.type === tt.name ? token.value : token.type.keyword;
    next();
    return finishNode(node, "Identifier");
  }

  function parseFunction(node, isStatement) {
    if (token.type === tt.name) node.id = parseIdent();
    else if (isStatement) node.id = dummyIdent();
    else node.id = null;
    node.params = [];
    expect(tt.parenL);
    while (!eat(tt.parenR)) {
      node.params.push(parseIdent());
      eat(tt.comma);
    }
    node.body = parseBlock();
    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  }

  function parseExprList(close) {
    var elts = [], indent = indentationAt(token.start);
    while (!closesBlock(close, indent)) {
      elts.push(parseExpression$(true));
      while (eat(tt.comma)) {}
    }
    eat(close);
    return elts;
  }
})(typeof exports === "undefined" ? self.acorn : exports);
