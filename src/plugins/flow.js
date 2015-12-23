import { types as tt } from "../tokenizer/types";
import Parser from "../parser";

let pp = Parser.prototype;

pp.flowParseTypeInitialiser = function (tok) {
  let oldInType = this.state.inType;
  this.state.inType = true;
  this.expect(tok || tt.colon);
  let type = this.flowParseType();
  this.state.inType = oldInType;
  return type;
};

pp.flowParseDeclareClass = function (node) {
  this.next();
  this.flowParseInterfaceish(node, true);
  return this.finishNode(node, "DeclareClass");
};

pp.flowParseDeclareFunction = function (node) {
  this.next();

  let id = node.id = this.parseIdentifier();

  let typeNode = this.startNode();
  let typeContainer = this.startNode();

  if (this.isRelational("<")) {
    typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }

  this.expect(tt.parenL);
  let tmp = this.flowParseFunctionTypeParams();
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
  if (this.match(tt._class)) {
    return this.flowParseDeclareClass(node);
  } else if (this.match(tt._function)) {
    return this.flowParseDeclareFunction(node);
  } else if (this.match(tt._var)) {
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

  if (this.match(tt.string)) {
    node.id = this.parseExprAtom();
  } else {
    node.id = this.parseIdentifier();
  }

  let bodyNode = node.body = this.startNode();
  let body = bodyNode.body = [];
  this.expect(tt.braceL);
  while (!this.match(tt.braceR)) {
    let node2 = this.startNode();

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
  node.id = this.parseIdentifier();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.extends = [];

  if (this.eat(tt._extends)) {
    do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (this.eat(tt.comma));
  }

  node.body = this.flowParseObjectType(allowStatic);
};

pp.flowParseInterfaceExtends = function () {
  let node = this.startNode();

  node.id = this.parseIdentifier();
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
  node.id = this.parseIdentifier();

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
  let node = this.startNode();
  node.params = [];

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseExistentialTypeParam() || this.flowParseTypeAnnotatableIdentifier());
    if (!this.isRelational(">")) {
      this.expect(tt.comma);
    }
  }
  this.expectRelational(">");

  return this.finishNode(node, "TypeParameterDeclaration");
};

pp.flowParseExistentialTypeParam = function () {
  if (this.match(tt.star)) {
    let node = this.startNode();
    this.next();
    return this.finishNode(node, "ExistentialTypeParam");
  }
};

pp.flowParseTypeParameterInstantiation = function () {
  let node = this.startNode(), oldInType = this.state.inType;
  node.params = [];

  this.state.inType = true;

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseExistentialTypeParam() || this.flowParseType());
    if (!this.isRelational(">")) {
      this.expect(tt.comma);
    }
  }
  this.expectRelational(">");

  this.state.inType = oldInType;

  return this.finishNode(node, "TypeParameterInstantiation");
};

pp.flowParseObjectPropertyKey = function () {
  return (this.match(tt.num) || this.match(tt.string)) ? this.parseExprAtom() : this.parseIdentifier(true);
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
  while (this.match(tt.name)) {
    node.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(tt.parenR)) {
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
  let node = this.startNodeAt(startPos, startLoc);
  node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(startPos, startLoc));
  node.static = isStatic;
  node.key = key;
  node.optional = false;
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeProperty");
};

pp.flowParseObjectTypeCallProperty = function (node, isStatic) {
  let valueNode = this.startNode();
  node.static = isStatic;
  node.value = this.flowParseObjectTypeMethodish(valueNode);
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeCallProperty");
};

pp.flowParseObjectType = function (allowStatic) {
  let nodeStart = this.startNode();
  let node;
  let propertyKey;
  let isStatic;

  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];

  this.expect(tt.braceL);

  while (!this.match(tt.braceR)) {
    let optional = false;
    let startPos = this.state.start, startLoc = this.state.startLoc;
    node = this.startNode();
    if (allowStatic && this.isContextual("static")) {
      this.next();
      isStatic = true;
    }

    if (this.match(tt.bracketL)) {
      nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic));
    } else if (this.match(tt.parenL) || this.isRelational("<")) {
      nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, allowStatic));
    } else {
      if (isStatic && this.match(tt.colon)) {
        propertyKey = this.parseIdentifier();
      } else {
        propertyKey = this.flowParseObjectPropertyKey();
      }
      if (this.isRelational("<") || this.match(tt.parenL)) {
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
  if (!this.eat(tt.semi) && !this.eat(tt.comma) && !this.match(tt.braceR)) {
    this.unexpected();
  }
};

pp.flowParseGenericType = function (startPos, startLoc, id) {
  let node = this.startNodeAt(startPos, startLoc);

  node.typeParameters = null;
  node.id = id;

  while (this.eat(tt.dot)) {
    let node2 = this.startNodeAt(startPos, startLoc);
    node2.qualification = node.id;
    node2.id = this.parseIdentifier();
    node.id = this.finishNode(node2, "QualifiedTypeIdentifier");
  }

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  }

  return this.finishNode(node, "GenericTypeAnnotation");
};

pp.flowParseTypeofType = function () {
  let node = this.startNode();
  this.expect(tt._typeof);
  node.argument = this.flowParsePrimaryType();
  return this.finishNode(node, "TypeofTypeAnnotation");
};

pp.flowParseTupleType = function () {
  let node = this.startNode();
  node.types = [];
  this.expect(tt.bracketL);
  // We allow trailing commas
  while (this.state.pos < this.input.length && !this.match(tt.bracketR)) {
    node.types.push(this.flowParseType());
    if (this.match(tt.bracketR)) break;
    this.expect(tt.comma);
  }
  this.expect(tt.bracketR);
  return this.finishNode(node, "TupleTypeAnnotation");
};

pp.flowParseFunctionTypeParam = function () {
  let optional = false;
  let node = this.startNode();
  node.name = this.parseIdentifier();
  if (this.eat(tt.question)) {
    optional = true;
  }
  node.optional = optional;
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "FunctionTypeParam");
};

pp.flowParseFunctionTypeParams = function () {
  let ret = { params: [], rest: null };
  while (this.match(tt.name)) {
    ret.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(tt.parenR)) {
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
  let startPos = this.state.start, startLoc = this.state.startLoc;
  let node = this.startNode();
  let tmp;
  let type;
  let isGroupedType = false;

  switch (this.state.type) {
    case tt.name:
      return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());

    case tt.braceL:
      return this.flowParseObjectType();

    case tt.bracketL:
      return this.flowParseTupleType();

    case tt.relational:
      if (this.state.value === "<") {
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
      if (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
        if (this.match(tt.name)) {
          let token = this.lookahead().type;
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
      node.value = this.state.value;
      this.addExtra(node, "rawValue", node.value);
      this.addExtra(node, "raw", this.input.slice(this.state.start, this.state.end));
      this.next();
      return this.finishNode(node, "StringLiteralTypeAnnotation");

    case tt._true: case tt._false:
      node.value = this.match(tt._true);
      this.next();
      return this.finishNode(node, "BooleanLiteralTypeAnnotation");

    case tt.num:
      node.value = this.state.value;
      this.addExtra(node, "rawValue", node.value);
      this.addExtra(node, "raw", this.input.slice(this.state.start, this.state.end));
      this.next();
      return this.finishNode(node, "NumericLiteralTypeAnnotation");

    case tt._null:
      node.value = this.match(tt._null);
      this.next();
      return this.finishNode(node, "NullLiteralTypeAnnotation");

    case tt._this:
      node.value = this.match(tt._this);
      this.next();
      return this.finishNode(node, "ThisTypeAnnotation");

    default:
      if (this.state.type.keyword === "typeof") {
        return this.flowParseTypeofType();
      }
  }

  this.unexpected();
};

pp.flowParsePostfixType = function () {
  let node = this.startNode();
  let type = node.elementType = this.flowParsePrimaryType();
  if (this.match(tt.bracketL)) {
    this.expect(tt.bracketL);
    this.expect(tt.bracketR);
    return this.finishNode(node, "ArrayTypeAnnotation");
  } else {
    return type;
  }
};

pp.flowParsePrefixType = function () {
  let node = this.startNode();
  if (this.eat(tt.question)) {
    node.typeAnnotation = this.flowParsePrefixType();
    return this.finishNode(node, "NullableTypeAnnotation");
  } else {
    return this.flowParsePostfixType();
  }
};

pp.flowParseIntersectionType = function () {
  let node = this.startNode();
  let type = this.flowParsePrefixType();
  node.types = [type];
  while (this.eat(tt.bitwiseAND)) {
    node.types.push(this.flowParsePrefixType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
};

pp.flowParseUnionType = function () {
  let node = this.startNode();
  let type = this.flowParseIntersectionType();
  node.types = [type];
  while (this.eat(tt.bitwiseOR)) {
    node.types.push(this.flowParseIntersectionType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
};

pp.flowParseType = function () {
  let oldInType = this.state.inType;
  this.state.inType = true;
  let type = this.flowParseUnionType();
  this.state.inType = oldInType;
  return type;
};

pp.flowParseTypeAnnotation = function () {
  let node = this.startNode();
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "TypeAnnotation");
};

pp.flowParseTypeAnnotatableIdentifier = function (requireTypeAnnotation, canBeOptionalParam) {
  let ident = this.parseIdentifier();
  let isOptionalParam = false;

  if (canBeOptionalParam && this.eat(tt.question)) {
    this.expect(tt.question);
    isOptionalParam = true;
  }

  if (requireTypeAnnotation || this.match(tt.colon)) {
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
  // plain function return types: function name(): string {}
  instance.extend("parseFunctionBody", function (inner) {
    return function (node, allowExpression) {
      if (this.match(tt.colon) && !allowExpression) {
        // if allowExpression is true then we're parsing an arrow function and if
        // there's a return type then it's been handled elsewhere
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, allowExpression);
    };
  });

  // interfaces
  instance.extend("parseStatement", function (inner) {
    return function (declaration, topLevel) {
      // strict mode handling of `interface` since it's a reserved word
      if (this.state.strict && this.match(tt.name) && this.state.value === "interface") {
        let node = this.startNode();
        this.next();
        return this.flowParseInterface(node);
      } else {
        return inner.call(this, declaration, topLevel);
      }
    };
  });

  // declares, interfaces and type aliases
  instance.extend("parseExpressionStatement", function (inner) {
    return function (node, expr) {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (this.match(tt._class) || this.match(tt.name) || this.match(tt._function) || this.match(tt._var)) {
            return this.flowParseDeclare(node);
          }
        } else if (this.match(tt.name)) {
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

  // export type
  instance.extend("shouldParseExportDeclaration", function (inner) {
    return function () {
      return this.isContextual("type") || inner.call(this);
    };
  });

  instance.extend("parseParenItem", function () {
    return function (node, startLoc, startPos, forceArrow?) {
      let canBeArrow = this.state.potentialArrowAt = startPos;
      if (this.match(tt.colon)) {
        let typeCastNode = this.startNodeAt(startLoc, startPos);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        if (forceArrow && !this.match(tt.arrow)) {
          this.unexpected();
        }

        if (canBeArrow && this.eat(tt.arrow)) {
          // ((lol): number => {});
          let params = node.type === "SequenceExpression" ? node.expressions : [node];
          let func = this.parseArrowExpression(this.startNodeAt(startLoc, startPos), params);
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

  instance.extend("parseExport", function (inner) {
    return function (node) {
      node = inner.call(this, node);
      if (node.type === "ExportNamedDeclaration") {
        node.exportKind = node.exportKind || "value";
      }
      return node;
    };
  });

  instance.extend("parseExportDeclaration", function (inner) {
    return function (node) {
      if (this.isContextual("type")) {
        node.exportKind = "type";

        let declarationNode = this.startNode();
        this.next();

        if (this.match(tt.braceL)) {
          // export type { foo, bar };
          node.specifiers = this.parseExportSpecifiers();
          this.parseExportFrom(node);
          return null;
        } else {
          // export type Foo = Bar;
          return this.flowParseTypeAlias(declarationNode);
        }
      } else {
        return inner.call(this, node);
      }
    };
  });

  instance.extend("parseClassId", function (inner) {
    return function (node) {
      inner.apply(this, arguments);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    };
  });

  // don't consider `void` to be a keyword as then it'll use the void token type
  // and set startExpr
  instance.extend("isKeyword", function (inner) {
    return function (name) {
      if (this.state.inType && name === "void") {
        return false;
      } else {
        return inner.call(this, name);
      }
    };
  });

  // ensure that inside flow types, we bypass the jsx parser plugin
  instance.extend("readToken", function (inner) {
    return function (code) {
      if (this.state.inType && (code === 62 || code === 60)) {
        return this.finishOp(tt.relational, 1);
      } else {
        return inner.call(this, code);
      }
    };
  });

  // don't lex any token as a jsx one inside a flow type
  instance.extend("jsx_readToken", function (inner) {
    return function () {
      if (!this.state.inType) return inner.call(this);
    };
  });

  function typeCastToParameter(node) {
    node.expression.typeAnnotation = node.typeAnnotation;
    return node.expression;
  }

  instance.extend("toAssignable", function (inner) {
    return function (node) {
      if (node.type === "TypeCastExpression") {
        return typeCastToParameter(node);
      } else {
        return inner.apply(this, arguments);
      }
    };
  });

  // turn type casts that we found in function parameter head into type annotated params
  instance.extend("toAssignableList", function (inner) {
    return function (exprList, isBinding) {
      for (let i = 0; i < exprList.length; i++) {
        let expr = exprList[i];
        if (expr && expr.type === "TypeCastExpression") {
          exprList[i] = typeCastToParameter(expr);
        }
      }
      return inner.call(this, exprList, isBinding);
    };
  });

  // this is a list of nodes, from something like a call expression, we need to filter the
  // type casts that we've found that are illegal in this context
  instance.extend("toReferencedList", function () {
    return function (exprList) {
      for (let i = 0; i < exprList.length; i++) {
        let expr = exprList[i];
        if (expr && expr._exprListItem && expr.type === "TypeCastExpression") {
          this.raise(expr.start, "Unexpected type cast");
        }
      }

      return exprList;
    };
  });

  // parse an item inside a expression list eg. `(NODE, NODE)` where NODE represents
  // the position where this function is cal;ed
  instance.extend("parseExprListItem", function (inner) {
    return function (allowEmpty, refShorthandDefaultPos) {
      let container = this.startNode();
      let node = inner.call(this, allowEmpty, refShorthandDefaultPos);
      if (this.match(tt.colon)) {
        container._exprListItem = true;
        container.expression = node;
        container.typeAnnotation = this.flowParseTypeAnnotation();
        return this.finishNode(container, "TypeCastExpression");
      } else {
        return node;
      }
    };
  });

  instance.extend("checkLVal", function (inner) {
    return function (node) {
      if (node.type !== "TypeCastExpression") {
        return inner.apply(this, arguments);
      }
    };
  });

  // parse class property type annotations
  instance.extend("parseClassProperty", function (inner) {
    return function (node) {
      if (this.match(tt.colon)) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return inner.call(this, node);
    };
  });

  // determine whether or not we're currently in the position where a class property would appear
  instance.extend("isClassProperty", function (inner) {
    return function () {
      return this.match(tt.colon) || inner.call(this);
    };
  });

  // parse type parameters for class methods
  instance.extend("parseClassMethod", function () {
    return function (classBody, method, isGenerator, isAsync) {
      if (this.isRelational("<")) {
        method.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      this.parseMethod(method, isGenerator, isAsync);
      classBody.body.push(this.finishNode(method, "ClassMethod"));
    };
  });

  // parse a the super class type parameters and implements
  instance.extend("parseClassSuper", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual("implements")) {
        this.next();
        let implemented = node.implements = [];
        do {
          let node = this.startNode();
          node.id = this.parseIdentifier();
          if (this.isRelational("<")) {
              node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
              node.typeParameters = null;
          }
          implemented.push(this.finishNode(node, "ClassImplements"));
        } while (this.eat(tt.comma))
      }
    };
  });

    // parse type parameters for object method shorthand
  instance.extend("parseObjPropValue", function (inner) {
    return function (prop) {
      let typeParameters;

      // method shorthand
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
        if (!this.match(tt.parenL)) this.unexpected();
      }

      inner.apply(this, arguments);

      // add typeParameters if we found them
      if (typeParameters) {
        (prop.value || prop).typeParameters = typeParameters;
      }
    };
  });

  instance.extend("parseAssignableListItemTypes", function () {
    return function (param) {
      if (this.eat(tt.question)) {
        param.optional = true;
      }
      if (this.match(tt.colon)) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      }
      this.finishNode(param, param.type);
      return param;
    };
  });


  // parse typeof and type imports
  instance.extend("parseImportSpecifiers", function (inner) {
    return function (node) {
      node.importKind = "value";

      let kind = null;
      if (this.match(tt._typeof)) {
        kind = "typeof";
      } else if (this.isContextual("type")) {
        kind = "type";
      }
      if (kind) {
        let lh = this.lookahead();
        if ((lh.type === tt.name && lh.value !== "from") || lh.type === tt.braceL || lh.type === tt.star) {
          this.next();
          node.importKind = kind;
        }
      }

      inner.call(this, node);
    };
  });

  // parse function type parameters - function foo<T>() {}
  instance.extend("parseFunctionParams", function (inner) {
    return function (node) {
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      inner.call(this, node);
    };
  });

  // parse flow type annotations on variable declarator heads - let foo: string = bar
  instance.extend("parseVarHead", function (inner) {
    return function (decl) {
      inner.call(this, decl);
      if (this.match(tt.colon)) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(decl.id, decl.id.type);
      }
    };
  });

  // parse the return type of an async arrow function - let foo = (async (): number => {});
  instance.extend("parseAsyncArrowFromCallExpression", function (inner) {
    return function (node, call) {
      if (this.match(tt.colon)) {
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, call);
    };
  });

  // todo description
  instance.extend("shouldParseAsyncArrow", function (inner) {
    return function () {
      return this.match(tt.colon) || inner.call(this);
    };
  });

  // handle return types for arrow functions
  instance.extend("parseParenAndDistinguishExpression", function (inner) {
    return function (startPos, startLoc, canBeArrow, isAsync) {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;

      if (canBeArrow && this.lookahead().type === tt.parenR) {
        // let foo = (): number => {};
        this.expect(tt.parenL);
        this.expect(tt.parenR);

        let node = this.startNodeAt(startPos, startLoc);
        if (this.match(tt.colon)) node.returnType = this.flowParseTypeAnnotation();
        this.expect(tt.arrow);
        return this.parseArrowExpression(node, [], isAsync);
      } else {
        // let foo = (foo): number => {};
        let node = inner.call(this, startPos, startLoc, canBeArrow, isAsync);

        if (this.match(tt.colon)) {
          let state = this.state.clone();
          try {
            return this.parseParenItem(node, startPos, startLoc, true);
          } catch (err) {
            if (err instanceof SyntaxError) {
              this.state = state;
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
