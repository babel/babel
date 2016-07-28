/* eslint indent: 0 */
/* eslint max-len: 0 */

import { types as tt } from "../tokenizer/types";
import { types as ct } from "../tokenizer/context";
import Parser from "../parser";

let pp = Parser.prototype;

pp.flowParseTypeInitialiser = function (tok, allowLeadingPipeOrAnd) {
  let oldInType = this.state.inType;
  this.state.inType = true;
  this.expect(tok || tt.colon);
  if (allowLeadingPipeOrAnd) {
    if (this.match(tt.bitwiseAND) || this.match(tt.bitwiseOR)) {
      this.next();
    }
  }
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
    if (this.lookahead().type === tt.dot) {
      return this.flowParseDeclareModuleExports(node);
    } else {
      return this.flowParseDeclareModule(node);
    }
  } else if (this.isContextual("type")) {
    return this.flowParseDeclareTypeAlias(node);
  } else if (this.isContextual("interface")) {
    return this.flowParseDeclareInterface(node);
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

pp.flowParseDeclareModuleExports = function (node) {
  this.expectContextual("module");
  this.expect(tt.dot);
  this.expectContextual("exports");
  node.typeAnnotation = this.flowParseTypeAnnotation();
  return this.finishNode(node, "DeclareModuleExports");
};

pp.flowParseDeclareTypeAlias = function (node) {
  this.next();
  this.flowParseTypeAlias(node);
  return this.finishNode(node, "DeclareTypeAlias");
};

pp.flowParseDeclareInterface = function (node) {
  this.next();
  this.flowParseInterfaceish(node);
  return this.finishNode(node, "DeclareInterface");
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
  node.mixins = [];

  if (this.eat(tt._extends)) {
    do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (this.eat(tt.comma));
  }

  if (this.isContextual("mixins")) {
    this.next();
    do {
      node.mixins.push(this.flowParseInterfaceExtends());
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

  node.right = this.flowParseTypeInitialiser(
    tt.eq,
    /*allowLeadingPipeOrAnd*/ true
  );
  this.semicolon();

  return this.finishNode(node, "TypeAlias");
};

// Type annotations

pp.flowParseTypeParameter = function () {
  let node = this.startNode();

  let variance;
  if (this.match(tt.plusMin)) {
    if (this.state.value === "+") {
      variance = "plus";
    } else if (this.state.value === "-") {
      variance = "minus";
    }
    this.eat(tt.plusMin);
  }

  let ident = this.flowParseTypeAnnotatableIdentifier(false, false);
  node.name = ident.name;
  node.variance = variance;
  node.bound = ident.typeAnnotation;

  if (this.match(tt.eq)) {
    this.eat(tt.eq);
    node.default = this.flowParseType ();
  }

  return this.finishNode(node, "TypeParameter");
};

pp.flowParseTypeParameterDeclaration = function () {
  let node = this.startNode();
  node.params = [];

  if (this.isRelational("<") || this.match(tt.jsxTagStart)) {
    this.next();
  } else {
    this.unexpected();
  }

  do {
    node.params.push(this.flowParseTypeParameter());
    if (!this.isRelational(">")) {
      this.expect(tt.comma);
    }
  } while (!this.isRelational(">"));
  this.expectRelational(">");

  return this.finishNode(node, "TypeParameterDeclaration");
};

pp.flowParseTypeParameterInstantiation = function () {
  let node = this.startNode(), oldInType = this.state.inType;
  node.params = [];

  this.state.inType = true;

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseType());
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
      break;

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

    case tt.plusMin:
      if (this.state.value === "-") {
        this.next();
        if (!this.match(tt.num)) this.unexpected();

        node.value = -this.state.value;
        this.addExtra(node, "rawValue", node.value);
        this.addExtra(node, "raw", this.input.slice(this.state.start, this.state.end));
        this.next();
        return this.finishNode(node, "NumericLiteralTypeAnnotation");
      }

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

    case tt.star:
      this.next();
      return this.finishNode(node, "ExistentialTypeParam");

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
      return this.isContextual("type")
          || this.isContextual("interface")
          || inner.call(this);
    };
  });

  instance.extend("parseConditional", function (inner) {
    return function (expr, noIn, startPos, startLoc, refNeedsArrowPos) {
      // only do the expensive clone if there is a question mark
      // and if we come from inside parens
      if (refNeedsArrowPos && this.match(tt.question)) {
        const state = this.state.clone();
        try {
          return inner.call(this, expr, noIn, startPos, startLoc);
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
            refNeedsArrowPos.start = err.pos || this.state.start;
            return expr;
          } else {
            throw err;
          }
        }
      }

      return inner.call(this, expr, noIn, startPos, startLoc);
    };
  });

  instance.extend("parseParenItem", function (inner) {
    return function (node, startLoc, startPos) {
      node = inner.call(this, node, startLoc, startPos);
      if (this.eat(tt.question)) {
        node.optional = true;
      }

      if (this.match(tt.colon)) {
        let typeCastNode = this.startNodeAt(startLoc, startPos);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        return this.finishNode(typeCastNode, "TypeCastExpression");
      }

      return node;
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
      } else if (this.isContextual("interface")) {
        node.exportKind = "type";
        let declarationNode = this.startNode();
        this.next();
        return this.flowParseInterface(declarationNode);
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
        } while (this.eat(tt.comma));
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
      const oldInType = this.state.inType;
      this.state.inType = true;
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      this.state.inType = oldInType;
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

  // We need to support type parameter declarations for arrow functions. This
  // is tricky. There are three situations we need to handle
  //
  // 1. This is either JSX or an arrow function. We'll try JSX first. If that
  //    fails, we'll try an arrow function. If that fails, we'll throw the JSX
  //    error.
  // 2. This is an arrow function. We'll parse the type parameter declaration,
  //    parse the rest, make sure the rest is an arrow function, and go from
  //    there
  // 3. This is neither. Just call the inner function
  instance.extend("parseMaybeAssign", function (inner) {
    return function (...args) {
      let jsxError = null;
      if (tt.jsxTagStart && this.match(tt.jsxTagStart)) {
        const state = this.state.clone();
        try {
          return inner.apply(this, args);
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
            jsxError = err;
          } else {
            throw err;
          }
        }
      }

      // Need to push something onto the context to stop
      // the JSX plugin from messing with the tokens
      this.state.context.push(ct.parenExpression);
      if (jsxError != null || this.isRelational("<")) {
        let arrowExpression;
        let typeParameters;
        try {
          const oldInType = this.state.inType;
          this.state.inType = true;
          typeParameters = this.flowParseTypeParameterDeclaration();
          this.state.inType = oldInType;

          arrowExpression = inner.apply(this, args);
          arrowExpression.typeParameters = typeParameters;
        } catch (err) {
          throw jsxError || err;
        }

        if (arrowExpression.type === "ArrowFunctionExpression") {
          return arrowExpression;
        } else if (jsxError != null) {
          throw jsxError;
        } else {
          this.raise(
            typeParameters.start,
            "Expected an arrow function after this type parameter declaration",
          );
        }
      }
      this.state.context.pop();

      return inner.apply(this, args);
    };
  });

  // handle return types for arrow functions
  instance.extend("parseArrow", function (inner) {
    return function (node) {
      if (this.match(tt.colon)) {
        let state = this.state.clone();
        try {
          let returnType = this.flowParseTypeAnnotation();
          if (!this.match(tt.arrow)) this.unexpected();
          // assign after it is clear it is an arrow
          node.returnType = returnType;
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
          } else {
            throw err;
          }
        }
      }

      return inner.call(this, node);
    };
  });

  instance.extend("isClassMutatorStarter", function (inner) {
    return function () {
      if (this.isRelational("<")) {
        return true;
      } else {
        return inner.call(this);
      }
    };
  });
}
