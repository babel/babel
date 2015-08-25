var acornToEsprima = require("acorn-to-esprima");
var assign         = require("lodash.assign");
var pick           = require("lodash.pick");
var Module         = require("module");
var path           = require("path");
var parse          = require("babel-core").parse;
var t              = require("babel-core").types;
var tt             = require("babel-core").acorn.tokTypes;
var traverse       = require("babel-core").traverse;

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
    // avoid importing a local copy of eslint, try to find a peer dependency
    eslintLoc = Module._resolveFilename("eslint", module.parent);
  } catch (err) {
    try {
      // avoids breaking in jest where module.parent is undefined
      eslintLoc = require.resolve("eslint");
    } catch (err) {
      throw new ReferenceError("couldn't resolve eslint");
    }
  }

  // get modules relative to what eslint will load
  var eslintMod = createModule(eslintLoc);
  var escopeLoc = Module._resolveFilename("escope", eslintMod);
  var escopeMod = createModule(escopeLoc);

  // npm 3: monkeypatch estraverse if it's in escope
  var estraverseRelative = escopeMod;
  try {
    var esrecurseLoc = Module._resolveFilename("esrecurse", eslintMod);
    estraverseRelative = createModule(esrecurseLoc);
  } catch (err) {}

  // monkeypatch estraverse
  estraverse = estraverseRelative.require("estraverse");
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
    referencerLoc = Module._resolveFilename("./referencer", escopeMod);
  } catch (err) {
    throw new ReferenceError("couldn't resolve escope/referencer");
  }
  var referencerMod = createModule(referencerLoc);
  var referencer = require(referencerLoc);

  // reference Definition
  var definitionLoc;
  try {
    definitionLoc = Module._resolveFilename("./definition", referencerMod);
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
        for (var l = 0; l < node.typeParameters.params.length; l++) {
          checkIdentifierOrVisit.call(this, node.typeParameters.params[l]);
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

  function nestTypeParamScope(manager, node) {
    var parentScope = manager.__currentScope;
    var scope = new escope.Scope(manager, "type-parameters", parentScope, node, false);
    manager.__nestScope(scope);
    for (var j = 0; j < node.typeParameters.params.length; j++) {
      var name = node.typeParameters.params[j];
      scope.__define(name, new Definition("TypeParameter", name, name));
    }
    scope.__define = function() {
      return parentScope.__define.apply(parentScope, arguments);
    };
    return scope;
  }

  // visit decorators that are in: ClassDeclaration / ClassExpression
  var visitClass = referencer.prototype.visitClass;
  referencer.prototype.visitClass = function(node) {
    visitDecorators.call(this, node);
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope(this.scopeManager, node);
    }
    // visit flow type: ClassImplements
    if (node.implements) {
      for (var i = 0; i < node.implements.length; i++) {
        checkIdentifierOrVisit.call(this, node.implements[i]);
      }
    }
    if (node.superTypeParameters) {
      for (var k = 0; k < node.superTypeParameters.params.length; k++) {
        checkIdentifierOrVisit.call(this, node.superTypeParameters.params[k]);
      }
    }
    visitClass.call(this, node);
    if (typeParamScope) {
      this.close(node);
    }
  };
    // visit decorators that are in: Property / MethodDefinition
  var visitProperty = referencer.prototype.visitProperty;
  referencer.prototype.visitProperty = function(node) {
    if (node.value.type === "TypeCastExpression") {
      visitTypeAnnotation.call(this, node.value);
    }
    visitDecorators.call(this, node);
    visitProperty.call(this, node);
  };

  // visit flow type in FunctionDeclaration, FunctionExpression, ArrowFunctionExpression
  var visitFunction = referencer.prototype.visitFunction;
  referencer.prototype.visitFunction = function(node) {
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope(this.scopeManager, node);
    }
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
    visitFunction.call(this, node);
    if (typeParamScope) {
      this.close(node);
    }
  };

  // visit flow type in VariableDeclaration
  var variableDeclaration = referencer.prototype.VariableDeclaration;
  referencer.prototype.VariableDeclaration = function(node) {
    if (node.declarations) {
      for (var i = 0; i < node.declarations.length; i++) {
        var id = node.declarations[i].id;
        var typeAnnotation = id.typeAnnotation;
        if (typeAnnotation) {
          checkIdentifierOrVisit.call(this, typeAnnotation);
        }
        if (id.type === "ObjectPattern") {
          // check if object destructuring has a spread
          var hasSpread = id.properties.filter(function(p) {
            return p._babelType === "SpreadProperty";
          });
          // visit properties if so
          if (hasSpread.length > 0) {
            for (var j = 0; j < id.properties.length; j++) {
              this.visit(id.properties[j]);
            }
          }
        }
      }
    }
    variableDeclaration.call(this, node);
  };

  function createScopeVariable (node, name) {
    this.currentScope().variableScope.__define(name,
      new Definition(
        "Variable",
        name,
        node,
        null,
        null,
        null
      )
    );
  }

  referencer.prototype.TypeAlias = function(node) {
    createScopeVariable.call(this, node, node.id);
    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope(this.scopeManager, node);
    }
    if (node.right) {
      visitTypeAnnotation.call(this, node.right);
    }
    if (typeParamScope) {
      this.close(node);
    }
  };

  referencer.prototype.ComprehensionExpression = function(node) {
    for (var i = 0; i < node.blocks.length; i++) {
      var block = node.blocks[i];
      if (block.left) {
        var scope = new escope.Scope(this.scopeManager, "comprehensions", this.currentScope(), node, false);
        this.scopeManager.__nestScope(scope);

        var left = block.left;
        if (left.type === "Identifier") {
          scope.__define(left, new Definition("ComprehensionElement", left, left));
        } else if (left.type === "ArrayPattern") {
          for (var i = 0; i < left.elements.length; i++) {
            var name = left.elements[i];
            if (name) {
              scope.__define(name, new Definition("ComprehensionElement", name, name));
            }
          }
        } else if (left.type === "ObjectPattern") {
          for (var i = 0; i < left.properties.length; i++) {
            var name = left.properties[i];
            if (name && name.key && name.key.type === "Identifier") {
              scope.__define(name.key, new Definition("ComprehensionElement", name.key, name.key));
            }
          }
        }
      }
      if (block.right) {
        this.visit(block.right);
      }
    }
    if (node.filter) {
      this.visit(node.filter);
    }
    this.visit(node.body);
    this.close(node);
  };

  referencer.prototype.DeclareModule =
  referencer.prototype.DeclareFunction =
  referencer.prototype.DeclareVariable =
  referencer.prototype.DeclareClass = function(node) {
    if (node.id) {
      createScopeVariable.call(this, node, node.id);
    }

    var typeParamScope;
    if (node.typeParameters) {
      typeParamScope = nestTypeParamScope(this.scopeManager, node);
    }
    if (typeParamScope) {
      this.close(node);
    }
  };
}

exports.parse = function (code) {
  try {
    monkeypatch();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }

  return exports.parseNoPatch(code);
}

exports.parseNoPatch = function (code) {
  var opts = {
    locations: true,
    ranges: true
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
      err.message = "Line " + err.lineNumber + ": " + err.message.replace(/ \((\d+):(\d+)\)$/, "");
    }

    throw err;
  }

  // remove EOF token, eslint doesn't use this for anything and it interferes with some rules
  // see https://github.com/babel/babel-eslint/issues/2 for more info
  // todo: find a more elegant way to do this
  tokens.pop();

  // convert tokens
  ast.tokens = acornToEsprima.toTokens(tokens, tt);

  // add comments
  acornToEsprima.convertComments(comments);
  ast.comments = comments;
  acornToEsprima.attachComments(ast, comments, ast.tokens);

  // transform esprima and acorn divergent nodes
  acornToEsprima.toAST(ast, traverse);

  return ast;
}