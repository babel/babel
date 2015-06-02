var acornToEsprima = require("./acorn-to-esprima");
var traverse       = require("babel-core").traverse;
var assign         = require("lodash.assign");
var pick           = require("lodash.pick");
var Module         = require("module");
var parse          = require("babel-core").parse;
var path           = require("path");
var t              = require("babel-core").types;

var estraverse;
var hasPatched = false;

function createModule(filename) {
  var mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  return mod;
}

function monkeypatch() {
  if (hasPatched) return;
  hasPatched = true;

  var eslintLoc;
  try {
    eslintLoc = Module._resolveFilename("eslint", module.parent);
  } catch (err) {
    throw new ReferenceError("couldn't resolve eslint");
  }

  // get modules relative to what eslint will load
  var eslintMod = createModule(eslintLoc);
  var escopeLoc = Module._resolveFilename("escope", eslintMod);
  var escopeMod = createModule(escopeLoc);

  // monkeypatch estraverse
  estraverse = escopeMod.require("estraverse");
  assign(estraverse.VisitorKeys, t.VISITOR_KEYS);

  // monkeypatch estraverse-fb
  var estraverseFb = eslintMod.require("estraverse-fb");
  assign(estraverseFb.VisitorKeys, t.VISITOR_KEYS);

  // monkeypatch escope
  var escope  = require(escopeLoc);
  var analyze = escope.analyze;
  escope.analyze = function (ast, opts) {
    opts.ecmaVersion = 6;
    opts.sourceType = "module";
    var results = analyze.call(this, ast, opts);
    return results;
  };

  // monkeypatch escope/referencer
  var referencerLoc;
  try {
    var referencerLoc = Module._resolveFilename("./referencer", escopeMod);
  } catch (err) {
    throw new ReferenceError("couldn't resolve escope/referencer");
  }
  var referencerMod = createModule(referencerLoc);
  var referencer = require(referencerLoc);

  // reference Definition
  var definitionLoc;
  try {
    var definitionLoc = Module._resolveFilename("./definition", referencerMod);
  } catch (err) {
    throw new ReferenceError("couldn't resolve escope/definition");
  }
  var Definition = require(definitionLoc).Definition;

  // if there are decotators, then visit each
  function visitDecorators(node) {
    if (!node.decorators) {
      return;
    }
    for (var i = 0; i < node.decorators.length; i++) {
      if (node.decorators[i].expression) {
        this.visit(node.decorators[i]);
      }
    }
  }

  // iterate through part of t.VISITOR_KEYS
  var visitorKeysMap = pick(t.VISITOR_KEYS, function(k) {
    return t.FLIPPED_ALIAS_KEYS.Flow.concat([
      "ArrayPattern",
      "ClassDeclaration",
      "ClassExpression",
      "FunctionDeclaration",
      "FunctionExpression",
      "Identifier",
      "ObjectPattern",
      "RestElement"
    ]).indexOf(k) === -1;
  });

  var propertyTypes = {
    // loops
    callProperties: { type: "loop", values: ["value"] },
    indexers: { type: "loop", values: ["key", "value"] },
    properties: { type: "loop", values: ["value"] },
    types: { type: "loop" },
    params: { type: "loop" },
    // single property
    argument: { type: "single" },
    elementType: { type: "single" },
    qualification: { type: "single" },
    rest: { type: "single" },
    returnType: { type: "single" },
    // others
    typeAnnotation: { type: "typeAnnotation" },
    typeParameters: { type: "typeParameters" },
    id: { type: "id" }
  };

  function visitTypeAnnotation(node) {
    // get property to check (params, id, etc...)
    var visitorValues = visitorKeysMap[node.type];
    if (!visitorValues) {
      return;
    }

    // can have multiple properties
    for (var i = 0; i < visitorValues.length; i++) {
      var visitorValue = visitorValues[i];
      var propertyType = propertyTypes[visitorValue];
      var nodeProperty = node[visitorValue];
      // check if property or type is defined
      if (propertyType == null || nodeProperty == null) {
        continue;
      }
      if (propertyType.type === "loop") {
        for (var j = 0; j < nodeProperty.length; j++) {
          if (Array.isArray(propertyType.values)) {
            for (var k = 0; k < propertyType.values.length; k++) {
              checkIdentifierOrVisit.call(this, nodeProperty[j][propertyType.values[k]]);
            }
          } else {
            checkIdentifierOrVisit.call(this, nodeProperty[j]);
          }
        }
      } else if (propertyType.type === "single") {
        checkIdentifierOrVisit.call(this, nodeProperty);
      } else if (propertyType.type === "typeAnnotation") {
        visitTypeAnnotation.call(this, node.typeAnnotation);
      } else if (propertyType.type === "typeParameters") {
        for (var j = 0; j < node.typeParameters.params.length; j++) {
          checkIdentifierOrVisit.call(this, node.typeParameters.params[j]);
        }
      } else if (propertyType.type === "id") {
        if (node.id.type === "Identifier") {
          checkIdentifierOrVisit.call(this, node.id);
        } else {
          visitTypeAnnotation.call(this, node.id);
        }
      }
    }
  }

  function checkIdentifierOrVisit(node) {
    if (node.typeAnnotation) {
      visitTypeAnnotation.call(this, node.typeAnnotation);
    } else if (node.type === "Identifier") {
      this.visit(node);
    } else {
      visitTypeAnnotation.call(this, node);
    }
  }

  // visit decorators that are in: ClassDeclaration / ClassExpression
  var visitClass = referencer.prototype.visitClass;
  referencer.prototype.visitClass = function(node) {
    visitDecorators.call(this, node);
    // visit class
    if (node.id) {
      this.visit(node.id);
    }
    // visit flow type: ClassImplements
    if (node.implements) {
      for (var i = 0; i < node.implements.length; i++) {
        checkIdentifierOrVisit.call(this, node.implements[i]);
      }
    }
    if (node.typeParameters) {
      for (var i = 0; i < node.typeParameters.params.length; i++) {
        checkIdentifierOrVisit.call(this, node.typeParameters.params[i]);
      }
    }
    if (node.superTypeParameters) {
      for (var i = 0; i < node.superTypeParameters.params.length; i++) {
        checkIdentifierOrVisit.call(this, node.superTypeParameters.params[i]);
      }
    }
    visitClass.call(this, node);
  };
    // visit decorators that are in: Property / MethodDefinition
  var visitProperty = referencer.prototype.visitProperty;
  referencer.prototype.visitProperty = function(node) {
    if (node.value.type === 'TypeCastExpression') {
      visitTypeAnnotation.call(this, node.value);
    }
    visitDecorators.call(this, node);
    visitProperty.call(this, node);
  };

  // visit flow type in FunctionDeclaration, FunctionExpression, ArrowFunctionExpression
  var visitFunction = referencer.prototype.visitFunction;
  referencer.prototype.visitFunction = function(node) {
    if (node.returnType) {
      checkIdentifierOrVisit.call(this, node.returnType);
    }
    // only visit if function parameters have types
    if (node.params) {
      for (var i = 0; i < node.params.length; i++) {
        if (node.params[i].typeAnnotation) {
          checkIdentifierOrVisit.call(this, node.params[i]);
        }
      }
    }
    if (node.typeParameters) {
      for (var i = 0; i < node.typeParameters.params.length; i++) {
        checkIdentifierOrVisit.call(this, node.typeParameters.params[i]);
      }
    }
    visitFunction.call(this, node);
  };

  // visit flow type in VariableDeclaration
  var variableDeclaration = referencer.prototype.VariableDeclaration;
  referencer.prototype.VariableDeclaration = function(node) {
    if (node.declarations) {
      for (var i = 0; i < node.declarations.length; i++) {
        checkIdentifierOrVisit.call(this, node.declarations[i].id);
      }
    }
    variableDeclaration.call(this, node);
  };

  referencer.prototype.TypeAlias = function(node) {
    this.currentScope().__define(
      node.id,
      new Definition(
          "Variable",
          node.id,
          node,
          null,
          null,
          null
      )
    );
    if (node.right) {
      visitTypeAnnotation.call(this, node.right);
    }
    if (node.typeParameters) {
      for (var i = 0; i < node.typeParameters.params.length; i++) {
        checkIdentifierOrVisit.call(this, node.typeParameters.params[i]);
      }
    }
  }
}

exports.attachComments = function (ast, comments, tokens) {
  estraverse.attachComments(ast, comments, tokens);

  if (comments.length) {
    var firstComment = comments[0];
    var lastComment = comments[comments.length - 1];
    // fixup program start
    if (!tokens.length) {
      // if no tokens, the program starts at the end of the last comment
      ast.range[0] = lastComment.range[1];
      ast.loc.start.line = lastComment.loc.end.line;
      ast.loc.start.column = lastComment.loc.end.column;
    } else if (firstComment.start < tokens[0].range[0]) {
      // if there are comments before the first token, the program starts at the first token
      var token = tokens[0];
      ast.range[0] = token.range[0];
      ast.loc.start.line = token.loc.start.line;
      ast.loc.start.column = token.loc.start.column;

      // estraverse do not put leading comments on first node when the comment
      // appear before the first token
      if (ast.body.length) {
        var node = ast.body[0];
        node.leadingComments = [];
        var firstTokenStart = token.range[0];
        var len = comments.length;
        for (var i = 0; i < len && comments[i].start < firstTokenStart; i++) {
          node.leadingComments.push(comments[i]);
        }
      }
    }
    // fixup program end
    if (tokens.length) {
      var lastToken = tokens[tokens.length - 1];
      if (lastComment.end > lastToken.range[1]) {
        // If there is a comment after the last token, the program ends at the
        // last token and not the comment
        ast.range[1] = lastToken.range[1];
        ast.loc.end.line = lastToken.loc.end.line;
        ast.loc.end.column = lastToken.loc.end.column;
      }
    }
  }
};

exports.parse = function (code) {
  try {
    monkeypatch();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }

  var opts = {
    locations: true,
    ranges: true,
  };

  var comments = opts.onComment = [];
  var tokens = opts.onToken = [];

  var ast;
  try {
    ast = parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;

      // remove trailing "(LINE:COLUMN)" acorn message and add in esprima syntax error message start
      err.message = "Line X: " + err.message.replace(/ \((\d+):(\d+)\)$/, "");
    }

    throw err;
  }

  // remove EOF token, eslint doesn't use this for anything and it interferes with some rules
  // see https://github.com/babel/babel-eslint/issues/2 for more info
  // todo: find a more elegant way to do this
  tokens.pop();

  // convert tokens
  ast.tokens = acornToEsprima.toTokens(tokens);

  // add comments
  ast.comments = comments;
  exports.attachComments(ast, comments, tokens);

  // transform esprima and acorn divergent nodes
  acornToEsprima.toAST(ast);

  return ast;
};
