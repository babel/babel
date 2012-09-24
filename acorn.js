// Some regexps (identifierchars, whitespace) and error message
// strings from esprima(.org) by Ariya Hidayat.

(function(exports) {
  "strict mode";

  exports.version = "0.0.1";

  // State variables

  var options, input, inputLen;
  var next, last;
  var lastStart, lastEnd, lastCommentsAfter;
  var inFunction, labels, strict;

  // PARSER

  var defaultOptions = {
    ecmaVersion: 5,
    strictSemicolons: false,
    allowTrailingCommas: true,
    forbidReserved: false,
    trackComments: false,
    linePositions: false
  };

  function next() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    lastCommentsAfter = tokCommentsAfter;
    readToken();
  }

  function setStrict(strct) {
    strict = strct;
    tokPos = options.linePositions ? lastEnd.offset : lastEnd;
    skipSpace();
    readToken();
  }

  function startNode() {
    var node = {type: null, start: tokStart};
    if (options.trackComments && tokCommentsBefore) {
      node.commentsBefore = tokCommentsBefore;
      tokCommentsBefore = null;
    }
    return node;
  }

  function startNodeFrom(other) {
    var node = {type: null, start: other.start};
    if (other.commentsBefore) {
      node.commentsBefore = other.commentsBefore;
      other.commentsBefore = null;
    }
    return node;
  }

  function finishNode(node, type) {
    if (type != null) node.type = type;
    node.end = lastEnd;
    if (options.trackComments && lastCommentsAfter)
      node.commentsAfter = tokCommentsAfter;
    return node;
  }

  exports.parse = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    options = opts || {};
    for (var opt in defaultOptions) if (!options.hasOwnProperty(opt))
      options[opt] = defaultOptions[opt];
    initTokenState();
    lastStart = lastEnd = options.linePositions ? curLinePos() : tokPos;
    lastCommentsAfter = inFunction = strict = null;
    labels = [];
    readToken();

    var node = startNode(), first = true;
    node.body = [];
    while (tokType !== _eof) {
      var stmt = parseStatement();
      node.body.push(stmt);
      if (first && isUseStrict(stmt)) setStrict(true);
      first = false;
    }
    return finishNode(node, "Program");
  };

  function isUseStrict(stmt) {
    return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" &&
      stmt.expression.value === "use strict";
  }

  function eat(type) {
    if (tokType === type) {
      next();
      return true;
    }
  }

  function canInsertSemicolon() {
    return tokType === _eof || tokType === _braceR ||
      !options.strictSemicolons &&
      newline.test(options.linePositions ? input.slice(lastEnd.offset, tokStart.offset)
                                         : input.slice(lastEnd, tokStart));
  }

  function semicolon() {
    if (!eat(_semi) && !canInsertSemicolon()) unexpected();
  }

  function expect(type) {
    if (tokType === type) next();
    else unexpected();
  }

  function unexpected() {
    raise(tokStart, "Unexpected token");
  }

  function parseStatement() {
    // if expecting a statement and found a slash as operator,
    // it must be a literal regexp.
    if (tokType === _slash)
      readToken(true);

    var starttype = tokType, node = startNode();

    switch (starttype) {
    case _break: case _continue:
      next();
      var isBreak = starttype === _break;
      if (eat(_semi) || canInsertSemicolon()) node.label = null;
      else if (tokType !== _name) unexpected();
      else {
        node.label = parseIdent();
        semicolon();
      }
      for (var i = 0; i < labels.length; ++i) {
        var lab = labels[i];
        if ((node.label == null || lab.name === node.label.name) &&
            lab.kind != null && (isBreak || lab.kind === "loop")) break;
      }
      if (i === labels.length) raise(node.start, "Unsyntactic " + starttype.keyword);
      return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

    case _debugger:
      next();
      return finishNode(node, "DebuggerStatement");

    case _do:
      next();
      labels.push({kind: "loop"});
      node.body = parseStatement();
      labels.pop();
      expect(_while);
      node.test = parseParenExpression();
      return finishNode(node, "DoWhileStatement");

    case _for:
      next();
      expect(_parenL);
      if (tokType === _semi) return parseFor(node, null);
      if (tokType === _var) {
        var init = startNode();
        next();
        parseVar(init, true);
        if (init.declarations.length === 1 && eat(_in))
          return parseForIn(node, init);
        return parseFor(node, init);
      }
      var init = parseExpression(false, true);
      if (eat(_in)) {checkLVal(init); return parseForIn(node, init);}
      return parseFor(node, init);

    case _function:
      next();
      return parseFunction(node, true);

    case _if:
      next();
      node.test = parseParenExpression();
      node.consequent = parseStatement();
      node.alternate = eat(_else) ? parseStatement() : null;
      return finishNode(node, "IfStatement");

    case _return:
      if (!inFunction) raise(tokStart, "'return' outside of function");
      next();
      if (eat(_semi) || canInsertSemicolon()) node.argument = null;
      else { node.argument = parseExpression(); semicolon(); }
      return finishNode(node, "ReturnStatement");

    case _switch:
      next();
      node.discriminant = parseParenExpression();
      node.lexical = false;
      node.cases = [];
      expect(_braceL);
      labels.push({kind: "switch"});
      for (var cur, sawDefault; !eat(_braceR);) {
        if (tokType === _case || tokType === _default) {
          var isCase = tokType === _case;
          if (cur) finishNode(cur, "SwitchCase");
          node.cases.push(cur = startNode());
          cur.consequent = [];
          next();
          if (isCase) cur.test = parseExpression();
          else {
            if (sawDefault) raise(lastStart, "Multiple default clauses"); sawDefault = true;
            cur.test = null;
          }
          expect(_colon);
        } else {
          if (!cur) unexpected();
          cur.consequent.push(parseStatement());
        }
      }
      if (cur) finishNode(cur, "SwitchCase");
      labels.pop();
      return finishNode(node, "SwitchStatement");

    case _throw:
      next();
      node.argument = parseExpression();
      return finishNode(node, "ThrowStatement");

    case _try:
      next();
      node.block = parseBlock();
      node.handlers = [];
      while (tokType === _catch) {
        var clause = startNode();
        next();
        expect(_parenL);
        clause.param = parseIdent();
        if (strict && strictBadWords.test(clause.param.name))
          raise(clause.param.start, "Binding " + clause.param.name + " in strict mode");
        expect(_parenR);
        clause.guard = null;
        clause.body = parseBlock();
        node.handlers.push(finishNode(clause, "CatchClause"));
      }
      node.finalizer = eat(_finally) ? parseBlock() : null;
      if (!node.handlers.length && !node.finalizer)
        raise(node.start, "Missing catch or finally clause");
      return finishNode(node, "TryStatement");

    case _var:
      next();
      node = parseVar(node);
      semicolon();
      return node;

    case _while:
      next();
      node.test = parseParenExpression();
      labels.push({kind: "loop"});
      node.body = parseStatement();
      labels.pop();
      return finishNode(node, "WhileStatement");

    case _with:
      if (strict) raise(tokStart, "'with' in strict mode");
      next();
      node.object = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WithStatement");

    case _braceL:
      return parseBlock();

    case _semi:
      next();
      return finishNode(node, "EmptyStatement");

    default:
      var maybeName = tokVal, expr = parseExpression();
      if (starttype === _name && expr.type === "Identifier" && eat(_colon)) {
        for (var i = 0; i < labels.length; ++i)
          if (labels[i].name === maybeName) raise(expr.start, "Label '" + maybeName + "' is already declared");
        var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
        labels.push({name: maybeName, kind: kind});
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

  function parseParenExpression() {
    expect(_parenL);
    var val = parseExpression();
    expect(_parenR);
    return val;
  }

  function parseBlock(allowStrict) {
    var node = startNode(), first = true, strict = false, oldStrict;
    node.body = [];
    expect(_braceL);
    while (!eat(_braceR)) {
      var stmt = parseStatement();
      node.body.push(stmt);
      if (first && isUseStrict(stmt)) {
        oldStrict = strict;
        setStrict(strict = true);
      }
      first = false
    }
    if (strict && !oldStrict) setStrict(false);
    return finishNode(node, "BlockStatement");
  }

  function parseFor(node, init) {
    node.init = init;
    expect(_semi);
    node.test = tokType === _semi ? null : parseExpression();
    expect(_semi);
    node.update = tokType === _parenR ? null : parseExpression();
    expect(_parenR);
    labels.push({kind: "loop"});
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForStatement");
  }

  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    expect(_parenR);
    labels.push({kind: "loop"});
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForInStatement");
  }

  function parseVar(node, noIn) {
    node.declarations = [];
    node.kind = "var";
    for (;;) {
      var decl = startNode();
      decl.id = parseIdent();
      if (strict && strictBadWords.test(decl.id.name))
        raise(id.start, "Binding " + decl.id.name + " in strict mode");
      decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
      node.declarations.push(finishNode(decl, "VariableDeclarator"));
      if (!eat(_comma)) break;
    }
    return finishNode(node, "VariableDeclaration");
  }

  function parsePropertyName() {
    if (tokType === _num || tokType === _string) return parseExprAtom();
    return parseIdent(true);
  }

  function parseIdent(liberal) {
    var node = startNode();
    if (tokType !== _name) {
      if (liberal && tokType.keyword) node.name = tokType.keyword;
      else unexpected();
    } else node.name = tokVal;
    next();
    return finishNode(node, "Identifier");
  }

  function parseFunction(node, isStatement) {
    if (tokType === _name) node.id = parseIdent();
    else if (isStatement) unexpected();
    else node.id = null;
    node.params = [];
    var first = true;
    expect(_parenL);
    while (!eat(_parenR)) {
      if (!first) expect(_comma); else first = false;
      node.params.push(parseIdent());
    }

    var oldInFunc = inFunction, oldLabels = labels;
    inFunction = true; labels = [];
    node.body = parseBlock(true);
    if (strict || node.body.body.length && isUseStrict(node.body.body[0])) {
      for (var i = node.id ? -1 : 0; i < node.params.length; ++i) {
        var id = i < 0 ? node.id : node.params[i];
        if (strictReservedWords.test(id.name) ||
            strictBadWords.test(id.name))
          raise(id.start, "Defining '" + id.name + "' in strict mode");
        if (i >= 0) for (var j = 0; j < i; ++j) if (id.name === node.params[j].name)
          raise(id.start, "Argument name clash in strict mode");
      }
    }

    inFunction = oldInFunc; labels = oldLabels;
    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  }

  // EXPRESSION PARSING

  function parseExprList(close, allowTrailingComma, allowEmpty) {
    var elts = [], first = true;
    while (!eat(close)) {
      if (!first) {
        expect(_comma);
        if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
      } else first = false;

      if (allowEmpty && tokType === _comma) elts.push(null);
      else elts.push(parseExpression(true));
    }
    return elts;
  }

  function parseNew() {
    var node = startNode();
    next();
    node.callee = parseSubscripts(parseExprAtom(false), false);
    if (eat(_parenL)) node.arguments = parseExprList(_parenR, false);
    else node.arguments = [];
    return finishNode(node, "NewExpression");
  }

  function parseObj() {
    var node = startNode(), first = true;
    node.properties = [];
    next();
    while (!eat(_braceR)) {
      if (!first) {
        expect(_comma);
        if (options.allowTrailingCommas && eat(_braceR)) break;
      } else first = false;

      var prop = {key: parsePropertyName()};
      if (eat(_colon)) {
        prop.value = parseExpression(true);
        prop.kind = "init";
      } else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
                 /^[sg]et$/.test(prop.key.name)) {
        prop.kind = prop.key.name;
        prop.key = parsePropertyName();
        if (!tokType === _parenL) unexpected();
        prop.value = parseFunction(startNode(), false);
      } else unexpected();
      if (prop.key.type === "Identifier") for (var i = 0; i < node.properties.length; ++i) {
        var other = node.properties[i];
        if (other.key.name === prop.key.name) {
          var haveGetSet = /.et/.test(prop.kind) || /.et/.test(other.kind);
          var haveInit = prop.kind === "init" || other.kind === "init";
          if (haveGetSet && (other.kind === prop.kind || haveInit) ||
              strict && prop.kind === "init" && other.kind === "init")
            raise(prop.key.start, "Redefinition of property");
        }
      }
      node.properties.push(prop);
    }
    return finishNode(node, "ObjectExpression");
  }

  function parseExprAtom() {
    if (tokType === _new) return parseNew();

    switch (tokType) {
    case _parenL:
      next();
      var val = parseExpression();
      expect(_parenR);
      return val;

    case _bracketL:
      var node = startNode();
      next();
      node.elements = parseExprList(_bracketR, true, true);
      return finishNode(node, "ArrayExpression");

    case _braceL:
      return parseObj();

    case _function:
      var node = startNode();
      next();
      return parseFunction(node, false);

    case _num: case _string: case _regexp:
      var node = startNode();
      node.value = tokVal;
      next();
      return finishNode(node, "Literal");

    case _null: case _true: case _false:
      var node = startNode();
      node.value = tokType.atomValue;
      next();
      return finishNode(node, "Literal");

    case _name:
      if (tokVal === "this") {
        var node = startNode();
        next();
        return finishNode(node, "ThisExpression");
      } else return parseIdent();

    default:
      unexpected();
    }
  }

  function parseSubscripts(base, allowCalls) {
    if (eat(_dot)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseIdent(true);
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), allowCalls);
    } else if (eat(_bracketL)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseExpression();
      node.computed = true;
      expect(_bracketR);
      return parseSubscripts(finishNode(node, "MemberExpression"), allowCalls);
    } else if (allowCalls && eat(_parenL)) {
      var node = startNodeFrom(base);
      node.callee = base;
      node.arguments = parseExprList(_parenR, false);
      return parseSubscripts(finishNode(node, "CallExpression"), allowCalls);
    } else return base;
  }

  function parseExprSubscripts(allowCalls) {
    return parseSubscripts(parseExprAtom(allowCalls), allowCalls);
  }

  function parseMaybeUnary(noIn) {
    if (tokType.prefix) {
      var node = startNode(), update = tokType.isUpdate;
      node.operator = tokVal;
      node.prefix = true;
      next();
      node.argument = parseMaybeUnary(noIn);
      if (update) checkLVal(node.argument);
      else if (strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        raise(node.start, "Deleting local variable in strict mode");
      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var expr = parseExprSubscripts(true);
    while (tokType.postfix && !canInsertSemicolon()) {
      var node = startNodeFrom(expr);
      node.operator = tokVal;
      node.prefix = false;
      node.argument = expr;
      checkLVal(expr);
      next();
      expr = finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  function parseExprOp(left, minPrec, noIn) {
    var prec = tokType.binop;
    if (prec != null && (!noIn || tokType !== _in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = tokVal;
        next();
        node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
        var node = finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
        return parseExprOp(node, minPrec, noIn);
      }
    }
    return left;
  }

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }

  function parseMaybeConditional(noIn) {
    var expr = parseExprOps(noIn);
    if (eat(_question)) {
      var node = startNodeFrom(expr);
      node.test = expr;
      node.consequent = parseExpression(true);
      expect(_colon);
      node.alternate = parseExpression(true, noIn);
      return finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  function parseMaybeAssign(noIn) {
    var left = parseMaybeConditional(noIn);
    if (tokType.isAssign) {
      var node = startNodeFrom(left);
      node.operator = tokVal;
      node.left = left;
      next();
      node.right = parseMaybeAssign(noIn);
      checkLVal(left);
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  function parseExpression(noComma, noIn) {
    var expr = parseMaybeAssign(noIn);
    if (!noComma && tokType === _comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  function checkLVal(expr) {
    if (!/^(?:Identifier|Member)/.test(expr.type))
      raise(expr.start, "Assigning to rvalue");
    if (strict && expr.type === "Identifier" && strictBadWords.test(expr.name))
      raise(expr.start, "Assigning to " + expr.name + " in strict mode");
  }

  // TOKENIZER DEFINITIONS

  // Token types
  var _name = {type: "name"}, _eof = {type: "eof"};
  var _num = {type: "num"}, _regexp = {type: "regexp"}, _string = {type: "string"};

  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true}, _catch = {keyword: "catch"};
  var _continue = {keyword: "continue"}, _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
  var _do = {keyword: "do", isLoop: true}, _else = {keyword: "else", beforeExpr: true};
  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true}, _function = {keyword: "function"};
  var _if = {keyword: "if"}, _return = {keyword: "return", beforeExpr: true}, _switch = {keyword: "switch"};
  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"}, _var = {keyword: "var"};
  var _while = {keyword: "while", isLoop: true}, _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
  var _null = {keyword: "null", atomValue: null}, _true = {keyword: "true", atomValue: true};
  var _false = {keyword: "false", atomValue: false}, _in = {keyword: "in", binop: 7, beforeExpr: true};
  var keywordTypes = {"break": _break, "case": _case, "catch": _catch,
                      "continue": _continue, "debugger": _debugger, "default": _default,
                      "do": _do, "else": _else, "finally": _finally, "for": _for,
                      "function": _function, "if": _if, "return": _return, "switch": _switch,
                      "throw": _throw, "try": _try, "var": _var, "while": _while, "with": _with,
                      "null": _null, "true": _true, "false": _false, "new": _new, "in": _in,
                      "instanceof": {keyword: "instanceof", binop: 7},
                      "typeof": {keyword: "typeof", prefix: true},
                      "void": {keyword: "void", prefix: true},
                      "delete": {keyword: "delete", prefix: true}};
  var keywords = /^(?:break|case|catch|const|continue|debugger|default|do|else|finally|for|function|if|return|switch|throw|try|var|while|with|null|true|false|instanceof|typeof|void|delete|new|in)$/;

  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true}, _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"}, _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true}, _colon = {type: ":", beforeExpr: true}, _dot = {type: "."}, _question = {type: "?", beforeExpr: true};
  var puncTypes = {"[": _bracketL, "]": _bracketR, "{": _braceL, "}": _braceR, "(": _parenL,
                   ")": _parenR, ",": _comma, ";": _semi, ":": _colon, ".": _dot, "?": _question};
  var puncChars = /[\[\]\{\}\(\),;:\.\?]/;

  var _slash = {binop: 10, beforeExpr: true}, _eq = {isAssign: true, beforeExpr: true};
  var opTypes = {"/": _slash, "=": _eq};
  opTypes["+"] = opTypes["-"] = {binop: 9, prefix: true, beforeExpr: true};
  opTypes["++"] = opTypes["--"] = {postfix: true, prefix: true, isUpdate: true};
  opTypes["~"] = opTypes["!"] = {prefix: true, beforeExpr: true};
  var binopPrecs = [1, "||", 2, "&&", 3, "|", 4, "^", 5, "&", 6, "==", "===", "!=", "!==",
                    7, "<", ">", "<=", ">=", 8, ">>", "<<", ">>>", 10, "*", "%"];
  for (var i = 0, curPrec; i < binopPrecs.length; ++i)
    if (typeof binopPrecs[i] === "number") curPrec = binopPrecs[i];
    else opTypes[binopPrecs[i]] = {binop: curPrec, beforeExpr: true};
  var assignOps = ["+=", "-=", "/=", "*=", "%=", ">>=", ">>>=", "<<=", "|=", "^=", "&="];
  for (var i = 0, typeObj = {isAssign: true, beforeExpr: true}; i < assignOps.length; ++i)
    opTypes[assignOps[i]] = typeObj;

  var reservedWords3 = /^(?:abstract|boolean|byte|char|class|double|enum|export|extends|final|float|goto|implements|import|int|interface|long|native|package|private|protected|public|short|static|super|synchronized|throws|transient|volatile)$/;
  var reservedWords5 = /^(?:class|enum|extends|super|const|export|import)$/;
  var strictReservedWords = /^(?:implements|interface|let|package|private|protected|public|static|yield)$/;
  var strictBadWords = /^(?:eval|arguments)$/;

  // CHARACTER CATEGORIES

  var operatorChar = /[+\-\*\/&%=<>!|~^]/;
  var reModifiers = /^[gmsiy]*$/;

  var nonASCIIwhitespace = /[\u1680\u180E\u2000-\u200A\u202F\u205F\u3000\uFEFF]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u0371-\u0374\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  var identifierStart = /[a-zA-Z_$]/, identifier = /[a-zA-Z_$0-9]+/, identifierG = /[a-zA-Z_$0-9]+/g
  var digit = /\d/, sign = /[-+]/;
  var newline = /[\n\r\u2028\u2029]/;
  var lineBreak = /\r\n?|[\n\r\u2028\u2029]/g;

  // TOKENIZER STATE

  var tokStart, tokEnd, tokType, tokVal, tokCommentsBefore, tokCommentsAfter;

  var tokPos, tokRegexpAllowed, tokComments;
  var tokCurLine, tokLineStart, tokLineStartNext;

  function nextLineStart() {
    lineBreak.lastIndex = tokLineStart;
    var match = lineBreak.exec(input);
    return match ? match.index + match[0].length : input.length + 1;
  }

  function curLinePos() {
    while (tokLineStartNext <= tokPos) {
      ++tokCurLine;
      tokLineStart = tokLineStartNext;
      tokLineStartNext = nextLineStart();
    }
    return {offset: tokPos, line: tokCurLine, column: tokPos - tokLineStart};
  }

  function initTokenState() {
    tokCurLine = 1;
    tokPos = tokLineStart = 0;
    tokLineStartNext = nextLineStart();
    tokRegexpAllowed = true;
    tokComments = null;
    skipSpace();
  }

  function finishToken(type, val) {
    tokEnd = options.linePositions ? curLinePos() : tokPos;
    tokType = type;
    skipSpace();
    tokVal = val;
    tokCommentsAfter = tokComments;
    tokRegexpAllowed = type.beforeExpr;
  }

  var getLineInfo = exports.getLineInfo = function(input, pos) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < pos) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return {line: line, column: pos - cur};
  };

  function readBlockComment() {
    var end = input.indexOf("*/", tokPos += 2);
    if (end === -1) raise(tokPos - 2, "Unterminated comment");
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(input.slice(tokPos, end));
    tokPos = end + 2;
  }

  function readLineComment() {
    var start = tokPos;
    tokPos += 2;
    while (tokPos < inputLen && !newline.test(input.charAt(tokPos))) ++tokPos;
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(input.slice(start, tokPos));
  }

  function skipSpace() {
    tokComments = null;
    while (tokPos < inputLen) {
      var ch = input.charAt(tokPos);
      if (ch === "/") {
        var nextCh = input.charAt(tokPos+1);
        if (nextCh === "*") {
          readBlockComment();
        } else if (nextCh === "/") {
          readLineComment();
        } else break;
      } else if (ch === " " || ch === '\t' || ch === "\n" || ch === "\r" || ch === "\f" ||
                 ch === "\xa0" || ch === "\x0b" || (ch >= "\u1680" && nonASCIIwhitespace.test(ch))) {
        ++tokPos;
      } else {
        break;
      }
    }
  }

  // TOKENIZER READING

  function readToken(forceRegexp) {
    tokStart = options.linePositions ? curLinePos() : tokPos;
    tokCommentsBefore = tokComments;
    if (forceRegexp) return readRegexp();
    if (tokPos >= inputLen) return finishToken(_eof);

    var ch = input.charAt(tokPos), next;
    if (identifierStart.test(ch)) return readWord();
    if (ch === "." && digit.test(input.charAt(tokPos+1))) return readNumber(ch);
    if (puncChars.test(ch)) {++tokPos; return finishToken(puncTypes[ch], null);}
    if (digit.test(ch)) {
      var nextCh = input.charAt(tokPos+1);
      if (ch === "0" && nextCh === "x" || nextCh === "X") return readHexNumber();
      else return readNumber(ch);
    }
    if (ch === '"' || ch === "'") return readString(ch);
    if (ch === "/" && tokRegexpAllowed) {++tokPos; return readRegexp();}
    if (operatorChar.test(ch)) return readOperator(ch);
    if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord(true);
    raise(tokPos, "Unexpected character '" + ch + "'");
  }

  function readRegexp() {
    var content = "", escaped, inClass, start = tokPos;
    for (;;) {
      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
      var ch = input.charAt(tokPos);
      if (newline.test(ch)) raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++tokPos;
    }
    var content = input.slice(start, tokPos);
    ++tokPos;
    var mods = readWord1(true);
    if (!reModifiers.test(mods)) raise(start, "Invalid regexp flag");
    return finishToken(_regexp, new RegExp(content, mods));
  }

  function readInt(radix, len) {
    var start = tokPos, total = 0;
    for (;;) {
      var code = input.charCodeAt(tokPos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++tokPos;
      total = total * radix + val;
    }
    if (tokPos === start || len != null && tokPos - start !== len) return null;

    return total;
  }

  function readHexNumber() {
    tokPos += 2; // 0x
    var val = readInt(16);
    if (val == null) raise(tokStart + 2, "Expected hexadecimal number");
    if (identifierStart.test(input.charAt(tokPos))) raise(tokPos, "Identifier directly after number");
    return finishToken(_num, val);
  }

  function readNumber(ch) {
    var start = tokPos, isFloat = ch === ".";
    if (!isFloat && readInt(10) == null) raise(start, "Invalid number");
    if (isFloat || input.charAt(tokPos) === ".") {
      if (sign.test(input.charAt(++tokPos))) ++tokPos;
      if (readInt(10) == null) raise(start, "Invalid number");
      isFloat = true;
    }
    if (/e/i.test(input.charAt(tokPos))) {
      if (sign.test(input.charAt(++tokPos))) ++tokPos;
      if (readInt(10) == null) raise(start, "Invalid number")
      isFloat = true;
    }
    if (identifierStart.test(input.charAt(tokPos))) raise(tokPos, "Identifier directly after number");

    var str = input.slice(start, tokPos), val;
    if (isFloat) val = parseFloat(str);
    else if (ch !== "0") val = parseInt(str, 10);
    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return finishToken(_num, val);
  }

  function readString(quote) {
    tokPos++;
    var escaped, str = "";
    for (;;) {
      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
      var ch = input.charAt(tokPos);
      if (ch === quote && !escaped) {
        ++tokPos;
        return finishToken(_string, str);
      }
      if (escaped) {
        var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
        if (octal) octal = octal[0];
        while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, octal.length - 1);
        if (octal) {
          if (strict) raise(tokPos - 1, "Octal literal in strict mode");
          str += String.fromCharCode(parseInt(octal, 8));
          tokPos += octal.length;
        } else if (ch === "x") {
          ++tokPos;
          str += readHexChar(2);
        } else if (ch === "u") {
          ++tokPos;
          str += readHexChar(4);
        } else if (ch === "U") {
          ++tokPos;
          str += readHexChar(8);
        } else {
          ++tokPos;
          switch (ch) {
          case "n" : str += "\n"; break;
          case "r" : str += "\r"; break;
          case "t" : str += "\t"; break;
          case "b" : str += "\b"; break;
          case "v" : str += "\u000b"; break;
          case "f" : str += "\f"; break;
          case "0" : str += "\0"; break;
          case "\r": if (input.charAt(tokPos) === "\n") ++tokPos;
          case "\n": break;
          default: str += ch; break;
          }
        }
        escaped = false;
      } else {
        if (newline.test(ch)) raise(tokStart, "Unterminated string constant");
        if (ch !== "\\") str += ch;
        ++tokPos;
        escaped = ch === "\\";
      }
    }
  }

  function readHexChar(len) {
    var n = readInt(16, len);
    if (n == null) raise(tokStart, "Bad character escape sequence");
    return String.fromCharCode(n);
  }

  function readOperator(op) {
    for (;;) {
      var ch = input.charAt(++tokPos), nextOp;
      if (!operatorChar.test(ch) || !opTypes.hasOwnProperty(nextOp = op + ch)) break;
      op = nextOp;
    }
    return finishToken(opTypes[op], op);
  }

  var containsEsc;
  function readWord1(startSpecial) {
    containsEsc = false;
    var word, first, escaped;
    if (startSpecial) {
      word = ""; first = true;
    } else {
      identifierG.lastIndex = tokPos;
      word = identifierG.exec(input)[0];
      tokPos += word.length;
      var code = input.charCodeAt(tokPos);
      if (code < 256 && code !== 92) return word;
    }
    for (;;) {
      var ch = input.charAt(tokPos);
      if (!escaped) {
        if (ch === "\\") {}
        else if ((ch <= "\xff" ? identifier : nonASCIIidentifier).test(ch)) word += ch;
        else break;
        ++tokPos;
      } else {
        if (ch !== "u") raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
        ++tokPos;
        var esc = readHexChar(4);
        if (!esc) raise(tokPos - 1, "Invalid Unicode escape");
        var re = esc <= "\xff" ? (first ? identifier : identifierStart)
                               : (first ? nonASCIIidentifier : nonASCIIidentifierStart);
        if (!re.test(esc)) raise(tokPos - 4, "Invalid Unicode escape");
        word += esc;
      }
      escaped = ch === "\\";
      if (escaped) containsEsc = true;
      first = false;
    }
    return word;
  }

  function readWord(startSpecial) {
    var word = readWord1(startSpecial);
    var type = _name;
    if (!containsEsc) {
      if (keywords.test(word)) type = keywordTypes[word];
      else if (options.forbidReserved &&
               (options.ecmaVersion === 3 ? reservedWords3 : reservedWords5).test(word) ||
               strict && strictReservedWords.test(word))
        raise(tokStart, "The keyword '" + word + "' is reserved");
    }
    return finishToken(type, word);
  }

  function raise(pos, message) {
    if (typeof pos == "number") pos = getLineInfo(input, pos);
    message += " (" + pos.line + ":" + pos.column + ")";
    throw new SyntaxError(message);
  }

})(typeof exports === "undefined" ? (window.acorn = {}) : exports);
