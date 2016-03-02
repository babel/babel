var source;

module.exports = function (ast, traverse, code) {
  source = code;
  ast.range = [ast.start, ast.end];
  traverse(ast, astTransformVisitor);
};

function changeToLiteral(node) {
  node.type = "Literal";
  if (!node.raw) {
    if (node.extra && node.extra.raw) {
      node.raw = node.extra.raw;
    } else {
      node.raw = source.slice(node.start, node.end);
    }
  }
}

var astTransformVisitor = {
  noScope: true,
  enter: function (path) {
    var node = path.node;

    node.range = [node.start, node.end];

    // private var to track original node type
    node._babelType = node.type;

    if (node.innerComments) {
      node.trailingComments = node.innerComments;
      delete node.innerComments;
    }

    if (node.trailingComments) {
      for (var i = 0; i < node.trailingComments.length; i++) {
        var comment = node.trailingComments[i];
        if (comment.type === "CommentLine") {
          comment.type = "Line";
        } else if (comment.type === "CommentBlock") {
          comment.type = "Block";
        }
        comment.range = [comment.start, comment.end];
      }
    }

    if (node.leadingComments) {
      for (var i = 0; i < node.leadingComments.length; i++) {
        var comment = node.leadingComments[i];
        if (comment.type === "CommentLine") {
          comment.type = "Line";
        } else if (comment.type === "CommentBlock") {
          comment.type = "Block";
        }
        comment.range = [comment.start, comment.end];
      }
    }

    // make '_paths' non-enumerable (babel-eslint #200)
    Object.defineProperty(node, "_paths", { value: node._paths, writable: true });
  },
  exit: function (path) {
    var node = path.node;

    [
      fixDirectives,
    ].forEach(function (fixer) {
      fixer(path);
    });

    if (path.isJSXText()) {
      node.type = "Literal";
      node.raw = node.value;
    }

    if (path.isNumericLiteral() ||
        path.isStringLiteral()) {
      changeToLiteral(node);
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
      var code = source.slice(node.key.end, node.body.start);
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
      node.type = "Experimental" + node.type;
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

    // remove class property keys (or patch in escope)
    if (path.isClassProperty()) {
      delete node.key;
    }

    // async function as generator
    if (path.isFunction()) {
      if (node.async) node.generator = true;
    }

    // TODO: remove (old esprima)
    if (path.isFunction()) {
      if (!node.defaults) {
        node.defaults = [];
      }
    }

    // await transform to yield
    if (path.isAwaitExpression()) {
      node.type = "YieldExpression";
      node.delegate = node.all;
      delete node.all;
    }

    // template string range fixes
    if (path.isTemplateLiteral()) {
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


function fixDirectives (path) {
  if (!(path.isProgram() || path.isFunction())) return;

  var node = path.node;
  var directivesContainer = node;
  var body = node.body;

  if (node.type !== "Program") {
    directivesContainer = body;
    body = body.body;
  }

  if (!directivesContainer.directives) return;

  directivesContainer.directives.reverse().forEach(function (directive) {
    directive.type = "ExpressionStatement";
    directive.expression = directive.value;
    delete directive.value;
    directive.expression.type = "Literal";
    changeToLiteral(directive.expression);
    body.unshift(directive);
  });
  delete directivesContainer.directives;
}
// fixDirectives
