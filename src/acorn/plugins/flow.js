var acorn = require("..")

var pp = acorn.Parser.prototype
var tt = acorn.tokTypes

pp.isRelational = function (op) {
  return this.type === tt.relational && this.value === op
}

pp.expectRelational = function (op) {
  if (this.isRelational(op)) {
    this.next()
  } else {
    this.unexpected()
  }
}

pp.flow_parseDeclareClass = function (node) {
  this.next()
  this.flow_parseInterfaceish(node, true)
  return this.finishNode(node, "DeclareClass")
}

pp.flow_parseDeclareFunction = function (node) {
  this.next()

  var id = node.id = this.parseIdent()

  var typeNode = this.startNode()
  var typeContainer = this.startNode()

  if (this.isRelational("<")) {
    typeNode.typeParameters = this.flow_parseTypeParameterDeclaration()
  } else {
    typeNode.typeParameters = null
  }

  this.expect(tt.parenL)
  var tmp = this.flow_parseFunctionTypeParams()
  typeNode.params = tmp.params
  typeNode.rest = tmp.rest
  this.expect(tt.parenR)

  this.expect(tt.colon)
  typeNode.returnType = this.flow_parseType()

  typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation")
  id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation")

  this.finishNode(id, id.type)

  this.semicolon()

  return this.finishNode(node, "DeclareFunction")
}

pp.flow_parseDeclare = function (node) {
  if (this.type === tt._class) {
    return this.flow_parseDeclareClass(node)
  } else if (this.type === tt._function) {
    return this.flow_parseDeclareFunction(node)
  } else if (this.type === tt._var) {
    return this.flow_parseDeclareVariable(node)
  } else if (this.isContextual("module")) {
    return this.flow_parseDeclareModule(node)
  } else {
    this.unexpected()
  }
}

pp.flow_parseDeclareVariable = function (node) {
  this.next()
  node.id = this.flow_parseTypeAnnotatableIdentifier()
  this.semicolon()
  return this.finishNode(node, "DeclareVariable")
}

pp.flow_parseDeclareModule = function (node) {
  this.next()

  if (this.type === tt.string) {
    node.id = this.parseExprAtom()
  } else {
    node.id = this.parseIdent()
  }

  var bodyNode = node.body = this.startNode()
  var body = bodyNode.body = []
  this.expect(tt.braceL)
  while (this.type !== tt.braceR) {
    var node2 = this.startNode()

    // todo: declare check
    this.next()

    body.push(this.flow_parseDeclare(node2))
  }
  this.expect(tt.braceR)

  this.finishNode(bodyNode, "BlockStatement")
  return this.finishNode(node, "DeclareModule")
}


// Interfaces

pp.flow_parseInterfaceish = function (node, allowStatic) {
  node.id = this.parseIdent()

  if (this.isRelational("<")) {
    node.typeParameters = this.flow_parseTypeParameterDeclaration()
  } else {
    node.typeParameters = null
  }

  node.extends = []

  if (this.eat(tt._extends)) {
    do {
      node.extends.push(this.flow_parseInterfaceExtends())
    } while(this.eat(tt.comma))
  }

  node.body = this.flow_parseObjectType(allowStatic)
}

pp.flow_parseInterfaceExtends = function () {
  var node = this.startNode()

  node.id = this.parseIdent()
  if (this.isRelational("<")) {
    node.typeParameters = this.flow_parseTypeParameterInstantiation()
  } else {
    node.typeParameters = null
  }

  return this.finishNode(node, "InterfaceExtends")
}

pp.flow_parseInterface = function (node) {
  this.flow_parseInterfaceish(node, false)
  return this.finishNode(node, "InterfaceDeclaration")
}

// Type aliases

pp.flow_parseTypeAlias = function (node) {
  node.id = this.parseIdent()

  if (this.isRelational("<")) {
    node.typeParameters = this.flow_parseTypeParameterDeclaration()
  } else {
    node.typeParameters = null
  }

  this.expect(tt.eq)

  node.right = this.flow_parseType()

  this.semicolon()

  return this.finishNode(node, "TypeAlias")
}

// Type annotations

pp.flow_parseTypeParameterDeclaration = function () {
  var node = this.startNode()
  node.params = []

  this.expectRelational("<")
  while (!this.isRelational(">")) {
    node.params.push(this.flow_parseTypeAnnotatableIdentifier())
    if (!this.isRelational(">")) {
      this.expect(tt.comma)
    }
  }
  this.expectRelational(">")

  return this.finishNode(node, "TypeParameterDeclaration")
}

pp.flow_parseTypeParameterInstantiation = function () {
  var node = this.startNode(), oldInType = this.inType
  node.params = []

  this.inType = true

  this.expectRelational("<")
  while (!this.isRelational(">")) {
    node.params.push(this.flow_parseType())
    if (!this.isRelational(">")) {
      this.expect(tt.comma)
    }
  }
  this.expectRelational(">")

  this.inType = oldInType

  return this.finishNode(node, "TypeParameterInstantiation")
}

pp.flow_parseObjectPropertyKey = function () {
  return (this.type === tt.num || this.type === tt.string) ? this.parseExprAtom() : this.parseIdent(true)
}

pp.flow_parseObjectTypeIndexer = function (node, isStatic) {
  node.static = isStatic

  this.expect(tt.bracketL)
  node.id = this.flow_parseObjectPropertyKey()
  this.expect(tt.colon)
  node.key = this.flow_parseType()
  this.expect(tt.bracketR)
  this.expect(tt.colon)
  node.value = this.flow_parseType()

  return this.finishNode(node, "ObjectTypeIndexer")
}

pp.flow_parseObjectTypeMethodish = function (node) {
  node.params = []
  node.rest = null
  node.typeParameters = null

  if (this.isRelational("<")) {
    node.typeParameters = this.flow_parseTypeParameterDeclaration()
  }

  this.expect(tt.parenL)
  while (this.type === tt.name) {
    node.params.push(this.flow_parseFunctionTypeParam())
    if (this.type !== tt.parenR) {
      this.expect(tt.comma)
    }
  }

  if (this.eat(tt.ellipsis)) {
    node.rest = this.flow_parseFunctionTypeParam()
  }
  this.expect(tt.parenR)
  this.expect(tt.colon)
  node.returnType = this.flow_parseType()

  return this.finishNode(node, "FunctionTypeAnnotation")
}

pp.flow_parseObjectTypeMethod = function (start, isStatic, key) {
  var node = this.startNodeAt(start)
  node.value = this.flow_parseObjectTypeMethodish(this.startNodeAt(start))
  node.static = isStatic
  node.key = key
  node.optional = false
  return this.finishNode(node, "ObjectTypeProperty")
}

pp.flow_parseObjectTypeCallProperty = function (node, isStatic) {
  var valueNode = this.startNode()
  node.static = isStatic
  node.value = this.flow_parseObjectTypeMethodish(valueNode)
  return this.finishNode(node, "ObjectTypeCallProperty")
}

pp.flow_parseObjectType = function (allowStatic) {
  var nodeStart = this.startNode()
  var node
  var optional = false
  var property
  var propertyKey
  var propertyTypeAnnotation
  var token
  var isStatic

  nodeStart.callProperties = []
  nodeStart.properties = []
  nodeStart.indexers = []

  this.expect(tt.braceL)

  while (this.type !== tt.braceR) {
    var start = this.markPosition()
    node = this.startNode()
    if (allowStatic && this.isContextual("static")) {
      this.next()
      isStatic = true
    }

    if (this.type === tt.bracketL) {
      nodeStart.indexers.push(this.flow_parseObjectTypeIndexer(node, isStatic))
    } else if (this.type === tt.parenL || this.isRelational("<")) {
      nodeStart.callProperties.push(this.flow_parseObjectTypeCallProperty(node, allowStatic))
    } else {
      if (isStatic && this.type === tt.colon) {
        propertyKey = this.parseIdent()
      } else {
        propertyKey = this.flow_parseObjectPropertyKey()
      }
      if (this.isRelational("<") || this.type === tt.parenL) {
        // This is a method property
        nodeStart.properties.push(this.flow_parseObjectTypeMethod(start, isStatic, propertyKey))
      } else {
        if (this.eat(tt.question)) {
          optional = true
        }
        this.expect(tt.colon)
        node.key = propertyKey
        node.value = this.flow_parseType()
        node.optional = optional
        node.static = isStatic
        nodeStart.properties.push(this.finishNode(node, "ObjectTypeProperty"))
      }
    }

    if (!this.eat(tt.semi) && this.type !== tt.braceR) {
      this.unexpected()
    }
  }

  this.expect(tt.braceR)

  return this.finishNode(nodeStart, "ObjectTypeAnnotation")
}

pp.flow_parseGenericType = function (start, id) {
  var node = this.startNodeAt(start)

  node.typeParameters = null
  node.id = id

  while (this.eat(tt.dot)) {
    var node2 = this.startNodeAt(start)
    node2.qualification = node.id
    node2.id = this.parseIdent()
    node.id = this.finishNode(node2, "QualifiedTypeIdentifier")
  }

  if (this.isRelational("<")) {
    node.typeParameters = this.flow_parseTypeParameterInstantiation()
  }

  return this.finishNode(node, "GenericTypeAnnotation")
}

pp.flow_parseVoidType = function () {
  var node = this.startNode()
  this.expect(tt._void)
  return this.finishNode(node, "VoidTypeAnnotation")
}

pp.flow_parseTypeofType = function () {
  var node = this.startNode()
  this.expect(tt._typeof)
  node.argument = this.flow_parsePrimaryType()
  return this.finishNode(node, "TypeofTypeAnnotation")
}

pp.flow_parseTupleType = function () {
  var node = this.startNode()
  node.types = []
  this.expect(tt.bracketL)
  // We allow trailing commas
  while (this.pos < this.input.length && this.type !== tt.bracketR) {
    node.types.push(this.flow_parseType())
    if (this.type === tt.bracketR) break
    this.expect(tt.comma)
  }
  this.expect(tt.bracketR)
  return this.finishNode(node, "TupleTypeAnnotation")
}

pp.flow_parseFunctionTypeParam = function () {
  var optional = false
  var node = this.startNode()
  node.name = this.parseIdent()
  if (this.eat(tt.question)) {
    optional = true
  }
  this.expect(tt.colon)
  node.optional = optional
  node.typeAnnotation = this.flow_parseType()
  return this.finishNode(node, "FunctionTypeParam")
}

pp.flow_parseFunctionTypeParams = function () {
  var ret = { params: [], rest: null }
  while (this.type === tt.name) {
    ret.params.push(this.flow_parseFunctionTypeParam())
    if (this.type !== tt.parenR) {
      this.expect(tt.comma)
    }
  }
  if (this.eat(tt.ellipsis)) {
    ret.rest = this.flow_parseFunctionTypeParam()
  }
  return ret
}

pp.flow_identToTypeAnnotation = function (start, node, id) {
  switch (id.name) {
    case "any":
      return this.finishNode(node, "AnyTypeAnnotation")

    case "bool":
    case "boolean":
      return this.finishNode(node, "BooleanTypeAnnotation")

    case "number":
      return this.finishNode(node, "NumberTypeAnnotation")

    case "string":
      return this.finishNode(node, "StringTypeAnnotation")

    default:
      return this.flow_parseGenericType(start, id)
  }
}

// The parsing of types roughly parallels the parsing of expressions, and
// primary types are kind of like primary expressions...they're the
// primitives with which other types are constructed.
pp.flow_parsePrimaryType = function () {
  var typeIdentifier = null
  var params = null
  var returnType = null
  var start = this.markPosition()
  var node = this.startNode()
  var rest = null
  var tmp
  var typeParameters
  var token
  var type
  var isGroupedType = false

  switch (this.type) {
    case tt.name:
      return this.flow_identToTypeAnnotation(start, node, this.parseIdent())

    case tt.braceL:
      return this.flow_parseObjectType()

    case tt.bracketL:
      return this.flow_parseTupleType()

    case tt.relational:
      if (this.value === "<") {
        node.typeParameters = this.flow_parseTypeParameterDeclaration()
        this.expect(tt.parenL)
        tmp = this.flow_parseFunctionTypeParams()
        node.params = tmp.params
        node.rest = tmp.rest
        this.expect(tt.parenR)

        this.expect(tt.arrow)

        node.returnType = this.flow_parseType()

        return this.finishNode(node, "FunctionTypeAnnotation")
      }

    case tt.parenL:
      this.next()

      // Check to see if this is actually a grouped type
      if (this.type !== tt.parenR && this.type !== tt.ellipsis) {
        if (this.type === tt.name) {
          var token = this.lookahead().type
          isGroupedType = token !== tt.question && token !== tt.colon
        } else {
          isGroupedType = true
        }
      }

      if (isGroupedType) {
        type = this.flow_parseType()
        this.expect(tt.parenR)

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
          )
        }

        return type
      }

      tmp = this.flow_parseFunctionTypeParams()
      node.params = tmp.params
      node.rest = tmp.rest

      this.expect(tt.parenR)

      this.expect(tt.arrow)

      node.returnType = this.flow_parseType()
      node.typeParameters = null

      return this.finishNode(node, "FunctionTypeAnnotation")

    case tt.string:
      node.value = this.value
      node.raw = this.input.slice(this.start, this.end)
      this.next()
      return this.finishNode(node, "StringLiteralTypeAnnotation")

    default:
      if (this.type.keyword) {
        switch (this.type.keyword) {
          case "void":
            return this.flow_parseVoidType()

          case "typeof":
            return this.flow_parseTypeofType()
        }
      }
  }

  this.unexpected()
}

pp.flow_parsePostfixType = function () {
  var node = this.startNode()
  var type = node.elementType = this.flow_parsePrimaryType()
  if (this.type === tt.bracketL) {
    this.expect(tt.bracketL)
    this.expect(tt.bracketR)
    return this.finishNode(node, "ArrayTypeAnnotation")
  }
  return type
}

pp.flow_parsePrefixType = function () {
  var node = this.startNode()
  if (this.eat(tt.question)) {
    node.typeAnnotation = this.flow_parsePrefixType()
    return this.finishNode(node, "NullableTypeAnnotation")
  }
  return this.flow_parsePostfixType()
}

pp.flow_parseIntersectionType = function () {
  var node = this.startNode()
  var type = this.flow_parsePrefixType()
  node.types = [type]
  while (this.eat(tt.bitwiseAND)) {
    node.types.push(this.flow_parsePrefixType())
  }
  return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation")
}

pp.flow_parseUnionType = function () {
  var node = this.startNode()
  var type = this.flow_parseIntersectionType()
  node.types = [type]
  while (this.eat(tt.bitwiseOR)) {
    node.types.push(this.flow_parseIntersectionType())
  }
  return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation")
}

pp.flow_parseType = function () {
  var oldInType = this.inType
  this.inType = true
  var type = this.flow_parseUnionType()
  this.inType = oldInType
  return type
}

pp.flow_parseTypeAnnotation = function () {
  var node = this.startNode()

  var oldInType = this.inType
  this.inType = true
  this.expect(tt.colon)
  node.typeAnnotation = this.flow_parseType()
  this.inType = oldInType

  return this.finishNode(node, "TypeAnnotation")
}

pp.flow_parseTypeAnnotatableIdentifier = function (requireTypeAnnotation, canBeOptionalParam) {
  var node = this.startNode()
  var ident = this.parseIdent()
  var isOptionalParam = false

  if (canBeOptionalParam && this.eat(tt.question)) {
    this.expect(tt.question)
    isOptionalParam = true
  }

  if (requireTypeAnnotation || this.type === tt.colon) {
    ident.typeAnnotation = this.flow_parseTypeAnnotation()
    this.finishNode(ident, ident.type)
  }

  if (isOptionalParam) {
    ident.optional = true
    this.finishNode(ident, ident.type)
  }

  return ident
}

acorn.plugins.flow = function (instance) {
  // function name(): string {}
  instance.extend("parseFunctionBody", function (inner) {
    return function (node, allowExpression) {
      if (this.type === tt.colon) {
        node.returnType = this.flow_parseTypeAnnotation()
      }

      return inner.call(this, node, allowExpression)
    }
  })

  instance.extend("parseStatement", function (inner) {
    return function(declaration, topLevel) {
      // strict mode handling of `interface` since it's a reserved word
      if (this.strict && this.type === tt.name && this.value === "interface") {
        var node = this.startNode()
        this.next()
        return this.flow_parseInterface(node)
      } else {
        return inner.call(this, declaration, topLevel)
      }
    }
  })

  instance.extend("parseExpressionStatement", function (inner) {
    return function (node, expr) {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (this.type === tt._class || this.type === tt.name || this.type === tt._function || this.type === tt._var) {
            return this.flow_parseDeclare(node)
          }
        } else if (this.type === tt.name) {
          if (expr.name === "interface") {
            return this.flow_parseInterface(node)
          } else if (expr.name === "type") {
            return this.flow_parseTypeAlias(node)
          }
        }
      }

      return inner.call(this, node, expr)
    }
  })

  instance.extend("shouldParseExportDeclaration", function (inner) {
    return function () {
      return this.isContextual("type") || inner.call(this)
    }
  })

  instance.extend("parseParenItem", function (inner) {
    return function (node, start) {
      if (this.type === tt.colon) {
        var typeCastNode = this.startNodeAt(start)
        typeCastNode.expression = node
        typeCastNode.typeAnnotation = this.flow_parseTypeAnnotation()
        return this.finishNode(typeCastNode, "TypeCastExpression")
      } else {
        return node
      }
    }
  })

  instance.extend("parseClassId", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement)
      if (this.isRelational("<")) {
        node.typeParameters = this.flow_parseTypeParameterDeclaration()
      }
    }
  })

  instance.extend("readToken", function (inner) {
    return function(code) {
      if (this.inType && (code === 62 || code === 60)) {
        return this.finishOp(tt.relational, 1)
      } else {
        return inner.call(this, code)
      }
    }
  })

  instance.extend("jsx_readToken", function (inner) {
    return function () {
      if (!this.inType) return inner.call(this)
    }
  })

  instance.extend("parseParenArrowList", function (inner) {
    return function (start, exprList, isAsync) {
      for (var i = 0; i < exprList.length; i++) {
        var listItem = exprList[i]
        if (listItem.type === "TypeCastExpression") {
          var expr = listItem.expression
          expr.typeAnnotation = listItem.typeAnnotation
          exprList[i] = expr
        }
      }
      return inner.call(this, start, exprList, isAsync)
    }
  })

  instance.extend("parseClassProperty", function (inner) {
    return function (node) {
      if (this.type === tt.colon) {
        node.typeAnnotation = this.flow_parseTypeAnnotation()
      }
      return inner.call(this, node)
    }
  })
  instance.extend("isClassProperty", function (inner) {
    return function () {
      return this.type === tt.colon || inner.call(this)
    }
  })

  instance.extend("parseClassMethod", function (inner) {
    return function (classBody, method, isGenerator, isAsync) {
      var typeParameters
      if (this.isRelational("<")) {
        typeParameters = this.flow_parseTypeParameterDeclaration()
      }
      method.value = this.parseMethod(isGenerator, isAsync)
      method.value.typeParameters = typeParameters
      classBody.body.push(this.finishNode(method, "MethodDefinition"))
    }
  })

  instance.extend("parseClassSuper", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement)
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flow_parseTypeParameterInstantiation()
      }
      if (this.isContextual("implements")) {
        this.next()
        var implemented = node.implements = []
        do {
          var node = this.startNode()
          node.id = this.parseIdent()
          if (this.isRelational("<")) {
              node.typeParameters = this.flow_parseTypeParameterInstantiation()
          } else {
              node.typeParameters = null
          }
          implemented.push(this.finishNode(node, "ClassImplements"))
        } while(this.eat(tt.comma))
      }
    }
  })

  instance.extend("parseObjPropValue", function (inner) {
    return function (prop) {
      var typeParameters
      if (this.isRelational("<")) {
        typeParameters = this.flow_parseTypeParameterDeclaration()
        if (this.type !== tt.parenL) this.unexpected()
      }
      inner.apply(this, arguments)
      prop.value.typeParameters = typeParameters
    }
  })

  instance.extend("parseAssignableListItemTypes", function (inner) {
    return function (param) {
      if (this.eat(tt.question)) {
        param.optional = true
      }
      if (this.type === tt.colon) {
        param.typeAnnotation = this.flow_parseTypeAnnotation()
      }
      this.finishNode(param, param.type)
      return param
    }
  })

  instance.extend("parseImportSpecifiers", function (inner) {
    return function (node) {
      node.isType = false
      if (this.isContextual("type")) {
        var start = this.markPosition()
        var typeId = this.parseIdent()
        if ((this.type === tt.name && this.value !== "from") || this.type === tt.braceL || this.type === tt.star) {
          node.isType = true
        } else {
          node.specifiers.push(this.parseImportSpecifierDefault(typeId, start))
          if (this.isContextual("from")) return
          this.eat(tt.comma)
        }
      }
      inner.call(this, node)
    }
  })

  // function foo<T>() {}
  instance.extend("parseFunctionParams", function (inner) {
    return function (node) {
      if (this.isRelational("<")) {
        node.typeParameters = this.flow_parseTypeParameterDeclaration()
      }
      inner.call(this, node)
    }
  })

  // var foo: string = bar
  instance.extend("parseVarHead", function (inner) {
    return function (decl) {
      inner.call(this, decl)
      if (this.type === tt.colon) {
        decl.id.typeAnnotation = this.flow_parseTypeAnnotation()
        this.finishNode(decl.id, decl.id.type)
      }
    }
  })
}
