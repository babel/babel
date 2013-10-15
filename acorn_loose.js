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
// - Bogus Identifier nodes with a name of `"✖"` are inserted whenever
//   the parser got too confused to return anything meaningful.
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
//
// The expected use for this is to *first* try `acorn.parse`, and only
// if that fails switch to `parse_dammit`. The loose parser might
// parse badly indented code incorrectly, so **don't** use it as
// your default parser.
//
// Quite a lot of acorn.js is duplicated here. The alternative was to
// add a *lot* of extra cruft to that file, making it less readable
// and slower. Copying and editing the code allowed me to make
// invasive changes and simplifications without creating a complicated
// tangle.

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports, require("./acorn")); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports", "./acorn"], mod); // AMD
  mod(root.acorn || (root.acorn = {}), root.acorn); // Plain browser env
})(this, function(exports, acorn) {
  "use strict";

  var tt = acorn.tokTypes;

  var options, input, fetchToken, context;

  exports.parse_dammit = function(inpt, opts) {
    if (!opts) opts = {};
    input = String(inpt);
    options = opts;
    if (!opts.tabSize) opts.tabSize = 4;
    fetchToken = acorn.tokenize(inpt, opts);
    sourceFile = options.sourceFile || null;
    context = [];
    nextLineStart = 0;
    ahead.length = 0;
    next();
    return parseTopLevel();
  };

  var lastEnd, token = {start: 0, end: 0}, ahead = [];
  var curLineStart, nextLineStart, curIndent, lastEndLoc, sourceFile;

  function next() {
    lastEnd = token.end;
    if (options.locations)
      lastEndLoc = token.endLoc;

    if (ahead.length)
      token = ahead.shift();
    else
      token = readToken();

    if (token.start >= nextLineStart) {
      while (token.start >= nextLineStart) {
        curLineStart = nextLineStart;
        nextLineStart = lineEnd(curLineStart) + 1;
      }
      curIndent = indentationAfter(curLineStart);
    }
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
          if (/string/.test(msg)) {
            replace = {start: e.pos, end: pos, type: tt.string, value: input.slice(e.pos + 1, pos)};
          } else if (/regular expr/i.test(msg)) {
            var re = input.slice(e.pos, pos);
            try { re = new RegExp(re); } catch(e) {}
            replace = {start: e.pos, end: pos, type: tt.regexp, value: re};
          } else {
            replace = false;
          }
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
        if (replace === true) replace = {start: pos, end: pos, type: tt.name, value: "✖"};
        if (replace) {
          if (options.locations) {
            replace.startLoc = acorn.getLineInfo(input, replace.start);
            replace.endLoc = acorn.getLineInfo(input, replace.end);
          }
          return replace;
        }
      }
    }
  }

  function resetTo(pos) {
    var ch = input.charAt(pos - 1);
    var reAllowed = !ch || /[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(ch) ||
      /[enwfd]/.test(ch) && /\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(input.slice(pos - 10, pos));
    fetchToken.jumpTo(pos, reAllowed);
  }

  function copyToken(token) {
    var copy = {start: token.start, end: token.end, type: token.type, value: token.value};
    if (options.locations) {
      copy.startLoc = token.startLoc;
      copy.endLoc = token.endLoc;
    }
    return copy;
  }

  function lookAhead(n) {
    // Copy token objects, because fetchToken will overwrite the one
    // it returns, and in this case we still need it
    if (!ahead.length)
      token = copyToken(token);
    while (n > ahead.length)
      ahead.push(copyToken(readToken()));
    return ahead[n-1];
  }

  var newline = /[\n\r\u2028\u2029]/;

  function isNewline(ch) {
    return ch === 10 || ch === 13 || ch === 8232 || ch === 8329;
  }
  function isSpace(ch) {
    return (ch < 14 && ch > 8) || ch === 32 || ch === 160 || isNewline(ch);
  }

  function pushCx() {
    context.push(curIndent);
  }
  function popCx() {
    curIndent = context.pop();
  }

  function lineEnd(pos) {
    while (pos < input.length && !isNewline(input.charCodeAt(pos))) ++pos;
    return pos;
  }
  function indentationAfter(pos) {
    for (var count = 0;; ++pos) {
      var ch = input.charCodeAt(pos);
      if (ch === 32) ++count;
      else if (ch === 9) count += options.tabSize;
      else return count;
    }
  }

  function closes(closeTok, indent, line, blockHeuristic) {
    if (token.type === closeTok || token.type === tt.eof) return true;
    if (line != curLineStart && curIndent < indent && tokenStartsLine() &&
        (!blockHeuristic || nextLineStart >= input.length ||
         indentationAfter(nextLineStart) < indent)) return true;
    return false;
  }

  function tokenStartsLine() {
    for (var p = token.start - 1; p >= curLineStart; --p) {
      var ch = input.charCodeAt(p);
      if (ch !== 9 && ch !== 32) return false;
    }
    return true;
  }

  function node_t(start) {
    this.type = null;
    this.start = start;
    this.end = null;
  }

  function node_loc_t(start) {
    this.start = start || token.startLoc || {line: 1, column: 0};
    this.end = null;
    if (sourceFile !== null) this.source = sourceFile;
  }

  function startNode() {
    var node = new node_t(token.start);
    if (options.locations)
      node.loc = new node_loc_t();
    if (options.directSourceFile)
      node.sourceFile = options.directSourceFile;
    return node;
  }

  function startNodeFrom(other) {
    var node = new node_t(other.start);
    if (options.locations)
      node.loc = new node_loc_t(other.loc.start);
    return node;
  }

  function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    if (options.locations)
      node.loc.end = lastEndLoc;
    return node;
  }

  function getDummyLoc() {
    if (options.locations) {
      var loc = new node_loc_t();
      loc.end = loc.start;
      return loc;
    }
  };

  function dummyIdent() {
    var dummy = new node_t(token.start);
    dummy.type = "Identifier";
    dummy.end = token.start;
    dummy.name = "✖";
    dummy.loc = getDummyLoc();
    return dummy;
  }
  function isDummy(node) { return node.name == "✖"; }

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
    case tt._break: case tt._continue:
      next();
      var isBreak = starttype === tt._break;
      node.label = token.type === tt.name ? parseIdent() : null;
      semicolon();
      return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

    case tt._debugger:
      next();
      semicolon();
      return finishNode(node, "DebuggerStatement");

    case tt._do:
      next();
      node.body = parseStatement();
      node.test = eat(tt._while) ? parseParenExpression() : dummyIdent();
      semicolon();
      return finishNode(node, "DoWhileStatement");

    case tt._for:
      next();
      pushCx();
      expect(tt.parenL);
      if (token.type === tt.semi) return parseFor(node, null);
      if (token.type === tt._var) {
        var init = startNode();
        next();
        parseVar(init, true);
        if (init.declarations.length === 1 && eat(tt._in))
          return parseForIn(node, init);
        return parseFor(node, init);
      }
      var init = parseExpression(false, true);
      if (eat(tt._in)) {return parseForIn(node, checkLVal(init));}
      return parseFor(node, init);

    case tt._function:
      next();
      return parseFunction(node, true);

    case tt._if:
      next();
      node.test = parseParenExpression();
      node.consequent = parseStatement();
      node.alternate = eat(tt._else) ? parseStatement() : null;
      return finishNode(node, "IfStatement");

    case tt._return:
      next();
      if (eat(tt.semi) || canInsertSemicolon()) node.argument = null;
      else { node.argument = parseExpression(); semicolon(); }
      return finishNode(node, "ReturnStatement");

    case tt._switch:
      var blockIndent = curIndent, line = curLineStart;
      next();
      node.discriminant = parseParenExpression();
      node.cases = [];
      pushCx();
      expect(tt.braceL);

      for (var cur; !closes(tt.braceR, blockIndent, line, true);) {
        if (token.type === tt._case || token.type === tt._default) {
          var isCase = token.type === tt._case;
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
      popCx();
      eat(tt.braceR);
      return finishNode(node, "SwitchStatement");

    case tt._throw:
      next();
      node.argument = parseExpression();
      semicolon();
      return finishNode(node, "ThrowStatement");

    case tt._try:
      next();
      node.block = parseBlock();
      node.handler = null;
      if (token.type === tt._catch) {
        var clause = startNode();
        next();
        expect(tt.parenL);
        clause.param = parseIdent();
        expect(tt.parenR);
        clause.guard = null;
        clause.body = parseBlock();
        node.handler = finishNode(clause, "CatchClause");
      }
      node.finalizer = eat(tt._finally) ? parseBlock() : null;
      if (!node.handler && !node.finalizer) return node.block;
      return finishNode(node, "TryStatement");

    case tt._var:
      next();
      node = parseVar(node);
      semicolon();
      return node;

    case tt._while:
      next();
      node.test = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WhileStatement");

    case tt._with:
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
      var expr = parseExpression();
      if (isDummy(expr)) {
        next();
        if (token.type === tt.eof) return finishNode(node, "EmptyStatement");
        return parseStatement();
      } else if (starttype === tt.name && expr.type === "Identifier" && eat(tt.colon)) {
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
    var node = startNode();
    pushCx();
    expect(tt.braceL);
    var blockIndent = curIndent, line = curLineStart;
    node.body = [];
    while (!closes(tt.braceR, blockIndent, line, true))
      node.body.push(parseStatement());
    popCx();
    eat(tt.braceR);
    return finishNode(node, "BlockStatement");
  }

  function parseFor(node, init) {
    node.init = init;
    node.test = node.update = null;
    if (eat(tt.semi) && token.type !== tt.semi) node.test = parseExpression();
    if (eat(tt.semi) && token.type !== tt.parenR) node.update = parseExpression();
    popCx();
    expect(tt.parenR);
    node.body = parseStatement();
    return finishNode(node, "ForStatement");
  }

  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    popCx();
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

  function parseExpression(noComma, noIn) {
    var expr = parseMaybeAssign(noIn);
    if (!noComma && token.type === tt.comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(tt.comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  function parseParenExpression() {
    pushCx();
    expect(tt.parenL);
    var val = parseExpression();
    popCx();
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
    var indent = curIndent, line = curLineStart;
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn, indent, line);
  }

  function parseExprOp(left, minPrec, noIn, indent, line) {
    if (curLineStart != line && curIndent < indent && tokenStartsLine()) return left;
    var prec = token.type.binop;
    if (prec != null && (!noIn || token.type !== tt._in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = token.value;
        next();
        if (curLineStart != line && curIndent < indent && tokenStartsLine())
          node.right = dummyIdent();
        else
          node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn, indent, line);
        var node = finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
        return parseExprOp(node, minPrec, noIn, indent, line);
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
    return parseSubscripts(parseExprAtom(), false, curIndent, curLineStart);
  }

  function parseSubscripts(base, noCalls, startIndent, line) {
    for (;;) {
      if (curLineStart != line && curIndent <= startIndent && tokenStartsLine()) {
        if (token.type == tt.dot && curIndent == startIndent)
          --startIndent;
        else
          return base;
      }

      if (eat(tt.dot)) {
        var node = startNodeFrom(base);
        node.object = base;
        if (curLineStart != line && curIndent <= startIndent && tokenStartsLine())
          node.property = dummyIdent();
        else
          node.property = parsePropertyName() || dummyIdent();
        node.computed = false;
        base = finishNode(node, "MemberExpression");
      } else if (token.type == tt.bracketL) {
        pushCx();
        next();
        var node = startNodeFrom(base);
        node.object = base;
        node.property = parseExpression();
        node.computed = true;
        popCx();
        expect(tt.bracketR);
        base = finishNode(node, "MemberExpression");
      } else if (!noCalls && token.type == tt.parenL) {
        pushCx();
        var node = startNodeFrom(base);
        node.callee = base;
        node.arguments = parseExprList(tt.parenR);
        base = finishNode(node, "CallExpression");
      } else {
        return base;
      }
    }
  }

  function parseExprAtom() {
    switch (token.type) {
    case tt._this:
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

    case tt._null: case tt._true: case tt._false:
      var node = startNode();
      node.value = token.type.atomValue;
      node.raw = token.type.keyword;
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
      pushCx();
      node.elements = parseExprList(tt.bracketR);
      return finishNode(node, "ArrayExpression");

    case tt.braceL:
      return parseObj();

    case tt._function:
      var node = startNode();
      next();
      return parseFunction(node, false);

    case tt._new:
      return parseNew();

    default:
      return dummyIdent();
    }
  }

  function parseNew() {
    var node = startNode(), startIndent = curIndent, line = curLineStart;
    next();
    node.callee = parseSubscripts(parseExprAtom(), true, startIndent, line);
    if (token.type == tt.parenL) {
      pushCx();
      node.arguments = parseExprList(tt.parenR);
    } else {
      node.arguments = [];
    }
    return finishNode(node, "NewExpression");
  }

  function parseObj() {
    var node = startNode();
    node.properties = [];
    pushCx();
    next();
    var propIndent = curIndent, line = curLineStart;
    while (!closes(tt.braceR, propIndent, line)) {
      var name = parsePropertyName();
      if (!name) { if (isDummy(parseExpression(true))) next(); eat(tt.comma); continue; }
      var prop = {key: name}, isGetSet = false, kind;
      if (eat(tt.colon)) {
        prop.value = parseExpression(true);
        kind = prop.kind = "init";
      } else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set")) {
        isGetSet = true;
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
    popCx();
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
    pushCx();
    expect(tt.parenL);
    while (token.type == tt.name) {
      node.params.push(parseIdent());
      eat(tt.comma);
    }
    popCx();
    eat(tt.parenR);
    node.body = parseBlock();
    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  }

  function parseExprList(close) {
    var indent = curIndent, line = curLineStart, elts = [], continuedLine = nextLineStart;
    next(); // Opening bracket
    if (curLineStart > continuedLine) continuedLine = curLineStart;
    while (!closes(close, indent + (curLineStart <= continuedLine ? 1 : 0), line)) {
      var elt = parseExpression(true);
      if (isDummy(elt)) {
        if (closes(close, indent, line)) break;
        next();
      } else {
        elts.push(elt);
      }
      while (eat(tt.comma)) {}
    }
    popCx();
    eat(close);
    return elts;
  }
});
