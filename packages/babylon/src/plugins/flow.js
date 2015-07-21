import { types as tt } from "../tokentype";
import { Parser } from "../state";

var pp = Parser.prototype;

pp.flowParseTypeInitialiser = function (tok) {
  var oldInType = this.inType;
  this.inType = true;
  this.expect(tok || tt.colon);
  var type = this.flowParseType();
  this.inType = oldInType;
  return type;
};

pp.flowParseDeclareClass = function (node) {
  this.next();
  this.flowParseInterfaceish(node, true);
  return this.finishNode(node, "DeclareClass");
};

pp.flowParseDeclareFunction = function (node) {
  this.next();

  var id = node.id = this.parseIdent();

  var typeNode = this.startNode();
  var typeContainer = this.startNode();

  if (this.isRelational("<")) {
    typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }

  this.expect(tt.parenL);
  var tmp = this.flowParseFunctionTypeParams();
  typeNode.params = tmp.params;
  typeNode.rest = tmp.rest;
  this.expect(tt.parenR);
  typeNode.returnType = this.flowParseTypeInitialiser();

  typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
  id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");

  this.finishNode(id, id.type);

  this.semicolon();

  return this.finishNode(node, "DeclareFunction");
};

pp.flowParseDeclare = function (node) {
  if (this.type === tt._class) {
    return this.flowParseDeclareClass(node);
  } else if (this.type === tt._function) {
    return this.flowParseDeclareFunction(node);
  } else if (this.type === tt._var) {
    return this.flowParseDeclareVariable(node);
  } else if (this.isContextual("module")) {
    return this.flowParseDeclareModule(node);
  } else {
    this.unexpected();
  }
};

pp.flowParseDeclareVariable = function (node) {
  this.next();
  node.id = this.flowParseTypeAnnotatableIdentifier();
  this.semicolon();
  return this.finishNode(node, "DeclareVariable");
};

pp.flowParseDeclareModule = function (node) {
  this.next();

  if (this.type === tt.string) {
    node.id = this.parseExprAtom();
  } else {
    node.id = this.parseIdent();
  }

  var bodyNode = node.body = this.startNode();
  var body = bodyNode.body = [];
  this.expect(tt.braceL);
  while (this.type !== tt.braceR) {
    var node2 = this.startNode();

    // todo: declare check
    this.next();

    body.push(this.flowParseDeclare(node2));
  }
  this.expect(tt.braceR);

  this.finishNode(bodyNode, "BlockStatement");
  return this.finishNode(node, "DeclareModule");
};


// Interfaces

pp.flowParseInterfaceish = function (node, allowStatic) {
  node.id = this.parseIdent();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.extends = [];

  if (this.eat(tt._extends)) {
    do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while(this.eat(tt.comma));
  }

  node.body = this.flowParseObjectType(allowStatic);
};

pp.flowParseInterfaceExtends = function () {
  var node = this.startNode();

  node.id = this.parseIdent();
  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  } else {
    node.typeParameters = null;
  }

  return this.finishNode(node, "InterfaceExtends");
};

pp.flowParseInterface = function (node) {
  this.flowParseInterfaceish(node, false);
  return this.finishNode(node, "InterfaceDeclaration");
};

// Type aliases

pp.flowParseTypeAlias = function (node) {
  node.id = this.parseIdent();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.right = this.flowParseTypeInitialiser(tt.eq);
  this.semicolon();

  return this.finishNode(node, "TypeAlias");
};

// Type annotations

pp.flowParseTypeParameterDeclaration = function () {
  var node = this.startNode();
  node.params = [];

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseTypeAnnotatableIdentifier());
    if (!this.isRelational(">")) {
      this.expect(tt.comma);
    }
  }
  this.expectRelational(">");

  return this.finishNode(node, "TypeParameterDeclaration");
};

pp.flowParseTypeParameterInstantiation = function () {
  var node = this.startNode(), oldInType = this.inType;
  node.params = [];

  this.inType = true;

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseType());
    if (!this.isRelational(">")) {
      this.expect(tt.comma);
    }
  }
  this.expectRelational(">");

  this.inType = oldInType;

  return this.finishNode(node, "TypeParameterInstantiation");
};

pp.flowParseObjectPropertyKey = function () {
  return (this.type === tt.num || this.type === tt.string) ? this.parseExprAtom() : this.parseIdent(true);
};

pp.flowParseObjectTypeIndexer = function (node, isStatic) {
  node.static = isStatic;

  this.expect(tt.bracketL);
  node.id = this.flowParseObjectPropertyKey();
  node.key = this.flowParseTypeInitialiser();
  this.expect(tt.bracketR);
  node.value = this.flowParseTypeInitialiser();

  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeIndexer");
};

pp.flowParseObjectTypeMethodish = function (node) {
  node.params = [];
  node.rest = null;
  node.typeParameters = null;

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  }

  this.expect(tt.parenL);
  while (this.type === tt.name) {
    node.params.push(this.flowParseFunctionTypeParam());
    if (this.type !== tt.parenR) {
      this.expect(tt.comma);
    }
  }

  if (this.eat(tt.ellipsis)) {
    node.rest = this.flowParseFunctionTypeParam();
  }
  this.expect(tt.parenR);
  node.returnType = this.flowParseTypeInitialiser();

  return this.finishNode(node, "FunctionTypeAnnotation");
};

pp.flowParseObjectTypeMethod = function (startPos, startLoc, isStatic, key) {
  var node = this.startNodeAt(startPos, startLoc);
  node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(startPos, startLoc));
  node.static = isStatic;
  node.key = key;
  node.optional = false;
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeProperty");
};

pp.flowParseObjectTypeCallProperty = function (node, isStatic) {
  var valueNode = this.startNode();
  node.static = isStatic;
  node.value = this.flowParseObjectTypeMethodish(valueNode);
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeCallProperty");
};

pp.flowParseObjectType = function (allowStatic) {
  var nodeStart = this.startNode();
  var node;
  var optional = false;
  var propertyKey;
  var isStatic;

  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];

  this.expect(tt.braceL);

  while (this.type !== tt.braceR) {
    var startPos = this.start, startLoc = this.startLoc;
    node = this.startNode();
    if (allowStatic && this.isContextual("static")) {
      this.next();
      isStatic = true;
    }

    if (this.type === tt.bracketL) {
      nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic));
    } else if (this.type === tt.parenL || this.isRelational("<")) {
      nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, allowStatic));
    } else {
      if (isStatic && this.type === tt.colon) {
        propertyKey = this.parseIdent();
      } else {
        propertyKey = this.flowParseObjectPropertyKey();
      }
      if (this.isRelational("<") || this.type === tt.parenL) {
        // This is a method property
        nodeStart.properties.push(this.flowParseObjectTypeMethod(startPos, startLoc, isStatic, propertyKey));
      } else {
        if (this.eat(tt.question)) {
          optional = true;
        }
        node.key = propertyKey;
        node.value = this.flowParseTypeInitialiser();
        node.optional = optional;
        node.static = isStatic;
        this.flowObjectTypeSemicolon();
        nodeStart.properties.push(this.finishNode(node, "ObjectTypeProperty"));
      }
    }
  }

  this.expect(tt.braceR);

  return this.finishNode(nodeStart, "ObjectTypeAnnotation");
};

pp.flowObjectTypeSemicolon = function () {
  if (!this.eat(tt.semi) && !this.eat(tt.comma) && this.type !== tt.braceR) {
    this.unexpected();
  }
};

pp.flowParseGenericType = function (startPos, startLoc, id) {
  var node = this.startNodeAt(startPos, startLoc);

  node.typeParameters = null;
  node.id = id;

  while (this.eat(tt.dot)) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.qualification = node.id;
    node2.id = this.parseIdent();
    node.id = this.finishNode(node2, "QualifiedTypeIdentifier");
  }

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  }

  return this.finishNode(node, "GenericTypeAnnotation");
};

pp.flowParseTypeofType = function () {
  var node = this.startNode();
  this.expect(tt._typeof);
  node.argument = this.flowParsePrimaryType();
  return this.finishNode(node, "TypeofTypeAnnotation");
};

pp.flowParseTupleType = function () {
  var node = this.startNode();
  node.types = [];
  this.expect(tt.bracketL);
  // We allow trailing commas
  while (this.pos < this.input.length && this.type !== tt.bracketR) {
    node.types.push(this.flowParseType());
    if (this.type === tt.bracketR) break;
    this.expect(tt.comma);
  }
  this.expect(tt.bracketR);
  return this.finishNode(node, "TupleTypeAnnotation");
};

pp.flowParseFunctionTypeParam = function () {
  var optional = false;
  var node = this.startNode();
  node.name = this.parseIdent();
  if (this.eat(tt.question)) {
    optional = true;
  }
  node.optional = optional;
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "FunctionTypeParam");
};

pp.flowParseFunctionTypeParams = function () {
  var ret = { params: [], rest: null };
  while (this.type === tt.name) {
    ret.params.push(this.flowParseFunctionTypeParam());
    if (this.type !== tt.parenR) {
      this.expect(tt.comma);
    }
  }
  if (this.eat(tt.ellipsis)) {
    ret.rest = this.flowParseFunctionTypeParam();
  }
  return ret;
};

pp.flowIdentToTypeAnnotation = function (startPos, startLoc, node, id) {
  switch (id.name) {
    case "any":
      return this.finishNode(node, "AnyTypeAnnotation");

    case "void":
      return this.finishNode(node, "VoidTypeAnnotation");

    case "bool":
    case "boolean":
      return this.finishNode(node, "BooleanTypeAnnotation");

    case "mixed":
      return this.finishNode(node, "MixedTypeAnnotation");

    case "number":
      return this.finishNode(node, "NumberTypeAnnotation");

    case "string":
      return this.finishNode(node, "StringTypeAnnotation");

    default:
      return this.flowParseGenericType(startPos, startLoc, id);
  }
};

// The parsing of types roughly parallels the parsing of expressions, and
// primary types are kind of like primary expressions...they're the
// primitives with which other types are constructed.
pp.flowParsePrimaryType = function () {
  var startPos = this.start, startLoc = this.startLoc;
  var node = this.startNode();
  var tmp;
  var type;
  var isGroupedType = false;

  switch (this.type) {
    case tt.name:
      return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdent());

    case tt.braceL:
      return this.flowParseObjectType();

    case tt.bracketL:
      return this.flowParseTupleType();

    case tt.relational:
      if (this.value === "<") {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
        this.expect(tt.parenL);
        tmp = this.flowParseFunctionTypeParams();
        node.params = tmp.params;
        node.rest = tmp.rest;
        this.expect(tt.parenR);

        this.expect(tt.arrow);

        node.returnType = this.flowParseType();

        return this.finishNode(node, "FunctionTypeAnnotation");
      }

    case tt.parenL:
      this.next();

      // Check to see if this is actually a grouped type
      if (this.type !== tt.parenR && this.type !== tt.ellipsis) {
        if (this.type === tt.name) {
          var token = this.lookahead().type;
          isGroupedType = token !== tt.question && token !== tt.colon;
        } else {
          isGroupedType = true;
        }
      }

      if (isGroupedType) {
        type = this.flowParseType();
        this.expect(tt.parenR);

        // If we see a => next then someone was probably confused about
        // function types, so we can provide a better error message
        if (this.eat(tt.arrow)) {
          this.raise(node,
            "Unexpected token =>. It looks like " +
            "you are trying to write a function type, but you ended up " +
            "writing a grouped type followed by an =>, which is a syntax " +
            "error. Remember, function type parameters are named so function " +
            "types look like (name1: type1, name2: type2) => returnType. You " +
            "probably wrote (type1) => returnType"
          );
        }

        return type;
      }

      tmp = this.flowParseFunctionTypeParams();
      node.params = tmp.params;
      node.rest = tmp.rest;

      this.expect(tt.parenR);

      this.expect(tt.arrow);

      node.returnType = this.flowParseType();
      node.typeParameters = null;

      return this.finishNode(node, "FunctionTypeAnnotation");

    case tt.string:
      node.rawValue = node.value = this.value;
      node.raw = this.input.slice(this.start, this.end);
      this.next();
      return this.finishNode(node, "StringLiteralTypeAnnotation");

    case tt.num:
      node.rawValue = node.value = this.value;
      node.raw = this.input.slice(this.start, this.end);
      this.next();
      return this.finishNode(node, "NumberLiteralTypeAnnotation");

    default:
      if (this.type.keyword === "typeof") {
        return this.flowParseTypeofType();
      }
  }

  this.unexpected();
};

pp.flowParsePostfixType = function () {
  var node = this.startNode();
  var type = node.elementType = this.flowParsePrimaryType();
  if (this.type === tt.bracketL) {
    this.expect(tt.bracketL);
    this.expect(tt.bracketR);
    return this.finishNode(node, "ArrayTypeAnnotation");
  } else {
    return type;
  }
};

pp.flowParsePrefixType = function () {
  var node = this.startNode();
  if (this.eat(tt.question)) {
    node.typeAnnotation = this.flowParsePrefixType();
    return this.finishNode(node, "NullableTypeAnnotation");
  } else {
    return this.flowParsePostfixType();
  }
};

pp.flowParseIntersectionType = function () {
  var node = this.startNode();
  var type = this.flowParsePrefixType();
  node.types = [type];
  while (this.eat(tt.bitwiseAND)) {
    node.types.push(this.flowParsePrefixType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
};

pp.flowParseUnionType = function () {
  var node = this.startNode();
  var type = this.flowParseIntersectionType();
  node.types = [type];
  while (this.eat(tt.bitwiseOR)) {
    node.types.push(this.flowParseIntersectionType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
};

pp.flowParseType = function () {
  var oldInType = this.inType;
  this.inType = true;
  var type = this.flowParseUnionType();
  this.inType = oldInType;
  return type;
};

pp.flowParseTypeAnnotation = function () {
  var node = this.startNode();
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "TypeAnnotation");
};

pp.flowParseTypeAnnotatableIdentifier = function (requireTypeAnnotation, canBeOptionalParam) {
  var ident = this.parseIdent();
  var isOptionalParam = false;

  if (canBeOptionalParam && this.eat(tt.question)) {
    this.expect(tt.question);
    isOptionalParam = true;
  }

  if (requireTypeAnnotation || this.type === tt.colon) {
    ident.typeAnnotation = this.flowParseTypeAnnotation();
    this.finishNode(ident, ident.type);
  }

  if (isOptionalParam) {
    ident.optional = true;
    this.finishNode(ident, ident.type);
  }

  return ident;
};

export default function (instance) {
  // function name(): string {}
  instance.extend("parseFunctionBody", function (inner) {
    return function (node, allowExpression) {
      if (this.type === tt.colon && !allowExpression) {
        // if allowExpression is true then we're parsing an arrow function and if
        // there's a return type then it's been handled elsewhere
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, allowExpression);
    };
  });

  instance.extend("parseStatement", function (inner) {
    return function (declaration, topLevel) {
      // strict mode handling of `interface` since it's a reserved word
      if (this.strict && this.type === tt.name && this.value === "interface") {
        var node = this.startNode();
        this.next();
        return this.flowParseInterface(node);
      } else {
        return inner.call(this, declaration, topLevel);
      }
    };
  });

  instance.extend("parseExpressionStatement", function (inner) {
    return function (node, expr) {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (this.type === tt._class || this.type === tt.name || this.type === tt._function || this.type === tt._var) {
            return this.flowParseDeclare(node);
          }
        } else if (this.type === tt.name) {
          if (expr.name === "interface") {
            return this.flowParseInterface(node);
          } else if (expr.name === "type") {
            return this.flowParseTypeAlias(node);
          }
        }
      }

      return inner.call(this, node, expr);
    };
  });

  instance.extend("shouldParseExportDeclaration", function (inner) {
    return function () {
      return this.isContextual("type") || inner.call(this);
    };
  });

  instance.extend("parseParenItem", function () {
    return function (node, startLoc, startPos, forceArrow?) {
      if (this.type === tt.colon) {
        var typeCastNode = this.startNodeAt(startLoc, startPos);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        if (forceArrow && this.type !== tt.arrow) {
          this.unexpected();
        }

        if (this.eat(tt.arrow)) {
          // ((lol): number => {});
          var func = this.parseArrowExpression(this.startNodeAt(startLoc, startPos), [node]);
          func.returnType = typeCastNode.typeAnnotation;
          return func;
        } else {
          return this.finishNode(typeCastNode, "TypeCastExpression");
        }
      } else {
        return node;
      }
    };
  });

  instance.extend("parseClassId", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    };
  });

  // don't consider `void` to be a keyword as then it'll use the void token type
  // and set startExpr
  instance.extend("isKeyword", function (inner) {
    return function (name) {
      if (this.inType && name === "void") {
        return false;
      } else {
        return inner.call(this, name);
      }
    };
  });

  instance.extend("readToken", function (inner) {
    return function (code) {
      if (this.inType && (code === 62 || code === 60)) {
        return this.finishOp(tt.relational, 1);
      } else {
        return inner.call(this, code);
      }
    };
  });

  instance.extend("jsx_readToken", function (inner) {
    return function () {
      if (!this.inType) return inner.call(this);
    };
  });

  function typeCastToParameter(node) {
    node.expression.typeAnnotation = node.typeAnnotation;
    return node.expression;
  }

  instance.extend("toAssignableList", function (inner) {
    return function (exprList, isBinding) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr.type === "TypeCastExpression") {
          exprList[i] = typeCastToParameter(expr);
        }
      }
      return inner.call(this, exprList, isBinding);
    };
  });

  instance.extend("toReferencedList", function () {
    return function (exprList) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr._exprListItem && expr.type === "TypeCastExpression") {
          this.raise(expr.start, "Unexpected type cast");
        }
      }

      return exprList;
    };
  });

  instance.extend("parseExprListItem", function (inner) {
    return function (allowEmpty, refShorthandDefaultPos) {
      var container = this.startNode();
      var node = inner.call(this, allowEmpty, refShorthandDefaultPos);
      if (this.type === tt.colon) {
        container._exprListItem = true;
        container.expression = node;
        container.typeAnnotation = this.flowParseTypeAnnotation();
        return this.finishNode(container, "TypeCastExpression");
      } else {
        return node;
      }
    };
  });

  instance.extend("parseClassProperty", function (inner) {
    return function (node) {
      if (this.type === tt.colon) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return inner.call(this, node);
    };
  });

  instance.extend("isClassProperty", function (inner) {
    return function () {
      return this.type === tt.colon || inner.call(this);
    };
  });

  instance.extend("parseClassMethod", function () {
    return function (classBody, method, isGenerator, isAsync) {
      var typeParameters;
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
      }
      method.value = this.parseMethod(isGenerator, isAsync);
      method.value.typeParameters = typeParameters;
      classBody.body.push(this.finishNode(method, "MethodDefinition"));
    };
  });

  instance.extend("parseClassSuper", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual("implements")) {
        this.next();
        var implemented = node.implements = [];
        do {
          let node = this.startNode();
          node.id = this.parseIdent();
          if (this.isRelational("<")) {
              node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
              node.typeParameters = null;
          }
          implemented.push(this.finishNode(node, "ClassImplements"));
        } while(this.eat(tt.comma))
      }
    };
  });

  instance.extend("parseObjPropValue", function (inner) {
    return function (prop) {
      var typeParameters;
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
        if (this.type !== tt.parenL) this.unexpected();
      }
      inner.apply(this, arguments);
      prop.value.typeParameters = typeParameters;
    };
  });

  instance.extend("parseAssignableListItemTypes", function () {
    return function (param) {
      if (this.eat(tt.question)) {
        param.optional = true;
      }
      if (this.type === tt.colon) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      }
      this.finishNode(param, param.type);
      return param;
    };
  });

  instance.extend("parseImportSpecifiers", function (inner) {
    return function (node) {
      node.importKind = "value";

      var kind = (this.type === tt._typeof ? "typeof" : (this.isContextual("type") ? "type" : null));
      if (kind) {
        var lh = this.lookahead();
        if ((lh.type === tt.name && lh.value !== "from") || lh.type === tt.braceL || lh.type === tt.star) {
          this.next();
          node.importKind = kind;
        }
      }

      inner.call(this, node);
    };
  });

  // function foo<T>() {}
  instance.extend("parseFunctionParams", function (inner) {
    return function (node) {
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      inner.call(this, node);
    };
  });

  // var foo: string = bar
  instance.extend("parseVarHead", function (inner) {
    return function (decl) {
      inner.call(this, decl);
      if (this.type === tt.colon) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(decl.id, decl.id.type);
      }
    };
  });

  // var foo = (async (): number => {});
  instance.extend("parseAsyncArrowFromCallExpression", function (inner) {
    return function (node, call) {
      if (this.type === tt.colon) {
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, call);
    };
  });

  instance.extend("parseParenAndDistinguishExpression", function (inner) {
    return function (startPos, startLoc, canBeArrow, isAsync) {
      startPos = startPos || this.start;
      startLoc = startLoc || this.startLoc;

      if (this.lookahead().type === tt.parenR) {
        // var foo = (): number => {};
        this.expect(tt.parenL);
        this.expect(tt.parenR);

        let node = this.startNodeAt(startPos, startLoc);
        if (this.type === tt.colon) node.returnType = this.flowParseTypeAnnotation();
        this.expect(tt.arrow);
        return this.parseArrowExpression(node, [], isAsync);
      } else {
        // var foo = (foo): number => {};
        let node = inner.call(this, startPos, startLoc, canBeArrow, isAsync);

        var state = this.getState();

        if (this.type === tt.colon) {
          try {
            return this.parseParenItem(node, startPos, startLoc, true);
          } catch (err) {
            if (err instanceof SyntaxError) {
              this.setState(state);
              return node;
            } else {
              throw err;
            }
          }
        } else {
          return node;
        }
      }
    };
  });
}
