var traverse = require("babel-core").traverse;
var tt       = require("babel-core").acorn.tokTypes;
var t        = require("babel-core").types;

exports.toToken = function (token) {
  var type = token.type;

  if (type === tt.name) {
    token.type = "Identifier";
  } else if (type === tt.semi || type === tt.comma ||
             type === tt.parenL || type === tt.parenR ||
             type === tt.braceL || type === tt.braceR ||
             type === tt.slash || type === tt.dot ||
             type === tt.bracketL || type === tt.bracketR ||
             type === tt.ellipsis || type === tt.arrow ||
             type === tt.star || type === tt.incDec ||
             type === tt.colon || type === tt.question ||
             type === tt.template || type === tt.backQuote ||
             type === tt.dollarBraceL || type === tt.at ||
             type === tt.logicalOR || type === tt.logicalAND ||
             type === tt.bitwiseOR || type === tt.bitwiseXOR ||
             type === tt.bitwiseAND || type === tt.equality ||
             type === tt.relational || type === tt.bitShift ||
             type === tt.plusMin || type === tt.modulo ||
             type === tt.exponent || type === tt.prefix ||
             type === tt.doubleColon ||
             type.isAssign) {
    token.type = "Punctuator";
    if (!token.value) token.value = type.label;
  } else if (type === tt.jsxTagStart) {
    token.type = "Punctuator";
    token.value = "<";
  } else if (type === tt.jsxTagEnd) {
    token.type = "Punctuator";
    token.value = ">";
  } else if (type === tt.jsxName) {
    token.type = "JSXIdentifier";
  } else if (type === tt.jsxText) {
    token.type = "JSXText";
  } else if (type.keyword === "null") {
    token.type = "Null";
  } else if (type.keyword === "false" || type.keyword === "true") {
    token.type = "Boolean";
  } else if (type.keyword) {
    token.type = "Keyword";
  } else if (type === tt.num) {
    token.type = "Numeric";
    token.value = String(token.value);
  } else if (type === tt.string) {
    token.type = "String";
    token.value = JSON.stringify(token.value);
  } else if (type === tt.regexp) {
    token.type = "RegularExpression";
    token.regex = {
      pattern: token.value.pattern,
      flags: token.value.flags
    };
    token.value = String(token.value.value);
  }

  return token;
};

exports.toAST = function (ast) {
  ast.sourceType = "module";
  traverse(ast, astTransformVisitor);
};

exports.toTokens = function (tokens) {
  // transform tokens to type "Template"
  convertTemplateType(tokens);

  return tokens.map(exports.toToken);
};

function isCompatTag(tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
}

function convertTemplateType(tokens) {
  var startingToken    = 0;
  var currentToken     = 0;
  var numBraces        = 0;
  var hasTemplateEnded = true;

  function isBackQuote(token) {
    return tokens[token].type === tt.backQuote;
  }

  function isTemplateStarter(token) {
    return isBackQuote(token) ||
           tokens[token].type === tt.braceR;
  }

  function isTemplateEnder(token) {
    return isBackQuote(token) ||
           tokens[token].type === tt.dollarBraceL;
  }

  // append the values between start and end
  function createTemplateValue(start, end) {
    var value = "";
    while (start <= end) {
      if (tokens[start].value) {
        value += tokens[start].value;
      } else if (tokens[start].type !== tt.template) {
        value += tokens[start].type.label;
      }
      start++;
    }
    return value;
  }

  // create Template token
  function replaceWithTemplateType(start, end) {
    var templateToken = {
      type: 'Template',
      value: createTemplateValue(start, end),
      range: [tokens[start].start, tokens[end].end],
      loc: {
        start: tokens[start].loc.start,
        end: tokens[end].loc.end
      }
    }

    // put new token in place of old tokens
    tokens.splice(start, end - start + 1, templateToken);
  }

  function trackNumBraces(token) {
    if (tokens[token].type === tt.braceL) {
      numBraces++;
    } else if (tokens[token].type === tt.braceR) {
      numBraces--;
    }
  }

  while (startingToken < tokens.length) {
    // template start: check if ` or }
    if (isTemplateStarter(startingToken) && numBraces === 0) {
      currentToken = startingToken + 1;

      // check if token after template start is "template"
      if (currentToken >= tokens.length - 1 || tokens[currentToken].type !== tt.template) {
        break;
      }

      // template end: find ` or ${
      while (!isTemplateEnder(currentToken)) {
        if (currentToken >= tokens.length - 1) {
          break;
        }
        currentToken++;
      }

      hasTemplateEnded = isBackQuote(currentToken);
      // template start and end found: create new token
      replaceWithTemplateType(startingToken, currentToken);
    } else if (!hasTemplateEnded) {
      trackNumBraces(startingToken);
    }
    startingToken++;
  }
}

var astTransformVisitor = {
  noScope: true,
  exit: function (node, parent) {
    if (t.isSpreadProperty(node)) {
      node.type = "Property";
      node.kind = "init";
      node.computed = true;
      node.key = node.value = node.argument;
      delete node.argument;
    }

    if (t.isTypeCastExpression(node)) {
      return node.expression;
    }

    if (t.isFlow(node)) {
      return this.remove();
    }

    if (t.isRestElement(node)) {
      return node.argument;
    }

    // modules

    if (t.isImportDeclaration(node)) {
      delete node.isType;
    }

    if (t.isExportDeclaration(node)) {
      if (t.isClassExpression(node.declaration)) {
        node.declaration.type = "ClassDeclaration";
      } else if (t.isFunctionExpression(node.declaration)) {
        node.declaration.type = "FunctionDeclaration";
      }
    }

    // classes

    if (t.isReferencedIdentifier(node, parent, { name: "super" })) {
      return t.inherits(t.thisExpression(), node);
    }

    if (t.isClassProperty(node)) {
      delete node.key;
    }

    // functions

    if (t.isFunction(node)) {
      if (node.async) node.generator = true;
      delete node.async;
    }

    if (t.isAwaitExpression(node)) {
      node.type = "YieldExpression";
      node.delegate = node.all;
      delete node.all;
    }

    // template strings

    if (t.isTemplateLiteral(node)) {
      node.quasis.forEach(function (q) {
        q.range[0] -= 1;
        if (q.tail) {
          q.range[1] += 1;
        } else {
          q.range[1] += 2;
        }
        q.loc.start.column -= 1;
        if (q.tail) {
          q.loc.end.column += 1;
        } else {
          q.loc.end.column += 2;
        }
      });
    }
  }
};
