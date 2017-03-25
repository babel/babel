"use strict";

var convertComments = require("./convertComments");

module.exports = function (ast, traverse, code) {
  var state = { source: code };
  ast.range = [ast.start, ast.end];
  traverse(ast, astTransformVisitor, null, state);
};

function changeToLiteral(node, state) {
  node.type = "Literal";
  if (!node.raw) {
    if (node.extra && node.extra.raw) {
      node.raw = node.extra.raw;
    } else {
      node.raw = state.source.slice(node.start, node.end);
    }
  }
}

var astTransformVisitor = {
  noScope: true,
  enter (path) {
    var node = path.node;

    node.range = [node.start, node.end];

    // private var to track original node type
    node._babelType = node.type;

    if (node.innerComments) {
      node.trailingComments = node.innerComments;
      delete node.innerComments;
    }

    if (node.trailingComments) {
      convertComments(node.trailingComments);
    }

    if (node.leadingComments) {
      convertComments(node.leadingComments);
    }

    // make '_paths' non-enumerable (babel-eslint #200)
    Object.defineProperty(node, "_paths", { value: node._paths, writable: true });
  },
  exit (path, state) {
    var node = path.node;

    // fixDirectives
    if (path.isFunction() || path.isProgram()) {
      var directivesContainer = node;
      var body = node.body;
      if (node.type !== "Program") {
        directivesContainer = body;
        body = body.body;
      }
      if (directivesContainer.directives) {
        for (var i = directivesContainer.directives.length - 1; i >= 0; i--) {
          var directive = directivesContainer.directives[i];
          directive.type = "ExpressionStatement";
          directive.expression = directive.value;
          delete directive.value;
          directive.expression.type = "Literal";
          changeToLiteral(directive.expression, state);
          body.unshift(directive);
        }
        delete directivesContainer.directives;
      }
    }

    if (path.isJSXText()) {
      node.type = "Literal";
      node.raw = node.value;
    }

    if (path.isNumericLiteral() ||
        path.isStringLiteral()) {
      changeToLiteral(node, state);
    }

    if (path.isBooleanLiteral()) {
      node.type = "Literal";
      node.raw = String(node.value);
    }

    if (path.isNullLiteral()) {
      node.type = "Literal";
      node.raw = "null";
      node.value = null;
    }

    if (path.isRegExpLiteral()) {
      node.type = "Literal";
      node.raw = node.extra.raw;
      node.value = {};
      node.regex = {
        pattern: node.pattern,
        flags: node.flags
      };
      delete node.extra;
      delete node.pattern;
      delete node.flags;
    }

    if (path.isObjectProperty()) {
      node.type = "Property";
      node.kind = "init";
    }

    if (path.isClassMethod() || path.isObjectMethod()) {
      var code = state.source.slice(node.key.end, node.body.start);
      var offset = code.indexOf("(");

      node.value = {
        type: "FunctionExpression",
        id: node.id,
        params: node.params,
        body: node.body,
        async: node.async,
        generator: node.generator,
        expression: node.expression,
        defaults: [], // basic support - TODO: remove (old esprima)
        loc: {
          start: {
            line: node.key.loc.start.line,
            column: node.key.loc.end.column + offset // a[() {]
          },
          end: node.body.loc.end
        }
      };
      // [asdf]() {
      node.value.range = [node.key.end + offset, node.body.end];

      node.value.start = node.value.range && node.value.range[0] || node.value.loc.start.column;
      node.value.end = node.value.range && node.value.range[1] || node.value.loc.end.column;

      if (node.returnType) {
        node.value.returnType = node.returnType;
      }

      if (node.typeParameters) {
        node.value.typeParameters = node.typeParameters;
      }

      if (path.isClassMethod()) {
        node.type = "MethodDefinition";
      }

      if (path.isObjectMethod()) {
        node.type = "Property";
        if (node.kind === "method") {
          node.kind = "init";
        }
      }

      delete node.body;
      delete node.id;
      delete node.async;
      delete node.generator;
      delete node.expression;
      delete node.params;
      delete node.returnType;
      delete node.typeParameters;
    }

    if (path.isRestProperty() || path.isSpreadProperty()) {
      node.type = `Experimental${node.type}`;
    }

    if (path.isTypeParameter && path.isTypeParameter()) {
      node.type = "Identifier";
      node.typeAnnotation = node.bound;
      delete node.bound;
    }

    // flow: prevent "no-undef"
    // for "Component" in: "let x: React.Component"
    if (path.isQualifiedTypeIdentifier()) {
      delete node.id;
    }
    // for "b" in: "var a: { b: Foo }"
    if (path.isObjectTypeProperty()) {
      delete node.key;
    }
    // for "indexer" in: "var a: {[indexer: string]: number}"
    if (path.isObjectTypeIndexer()) {
      delete node.id;
    }
    // for "param" in: "var a: { func(param: Foo): Bar };"
    if (path.isFunctionTypeParam()) {
      delete node.name;
    }

    // modules

    if (path.isImportDeclaration()) {
      delete node.isType;
    }

    if (path.isExportDeclaration()) {
      var declar = path.get("declaration");
      if (declar.isClassExpression()) {
        node.declaration.type = "ClassDeclaration";
      } else if (declar.isFunctionExpression()) {
        node.declaration.type = "FunctionDeclaration";
      }
    }

    // TODO: remove (old esprima)
    if (path.isFunction()) {
      if (!node.defaults) {
        node.defaults = [];
      }
    }

    // template string range fixes
    if (path.isTemplateLiteral()) {
      for (var j = 0; j < node.quasis.length; j++) {
        var q = node.quasis[j];
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
      }
    }
  }
};
