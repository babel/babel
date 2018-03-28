// @flow
import defineType, {
  arrayOfType,
  assertOneOf,
  assertValueType,
  validate,
  validateOptional,
  validateOptionalType,
  validateType,
} from "./utils";

defineType("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow", "FlowType"],
  fields: {
    elementType: validateType("FlowType"),
  },
});

defineType("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("boolean")),
  },
});

defineType("NullLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterInstantiation"),
  },
});

defineType("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterInstantiation"),
    extends: validateOptional(arrayOfType("InterfaceExtends")),
    mixins: validateOptional(arrayOfType("InterfaceExtends")),
    body: validateType("ObjectTypeAnnotation"),
  },
});

defineType("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    predicate: validateOptionalType("DeclaredPredicate"),
  },
});

defineType("DeclareInterface", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    extends: validateOptionalType("InterfaceExtends"),
    mixins: validateOptional(arrayOfType("Flow")),
    body: validateType("ObjectTypeAnnotation"),
  },
});

defineType("DeclareModule", {
  builder: ["id", "body", "kind"],
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType(["Identifier", "StringLiteral"]),
    body: validateType("BlockStatement"),
    kind: validateOptional(assertOneOf("CommonJS", "ES")),
  },
});

defineType("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    typeAnnotation: validateType("TypeAnnotation"),
  },
});

defineType("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    right: validateType("FlowType"),
  },
});

defineType("DeclareOpaqueType", {
  visitor: ["id", "typeParameters", "supertype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    supertype: validateOptionalType("FlowType"),
  },
});

defineType("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
  },
});

defineType("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    declaration: validateOptionalType("Flow"),
    specifiers: validateOptional(
      arrayOfType(["ExportSpecifier", "ExportNamespaceSpecifier"]),
    ),
    source: validateOptionalType("StringLiteral"),
    default: validateOptional(assertValueType("boolean")),
  },
});

defineType("DeclareExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    source: validateType("StringLiteral"),
    exportKind: validateOptional(assertOneOf(["type", "value"])),
  },
});

defineType("DeclaredPredicate", {
  visitor: ["value"],
  aliases: ["Flow", "FlowPredicate"],
  fields: {
    value: validateType("Flow"),
  },
});

defineType("ExistsTypeAnnotation", {
  aliases: ["Flow", "FlowType"],
});

defineType("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow", "FlowType"],
  fields: {
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    params: validate(arrayOfType("FunctionTypeParam")),
    rest: validateOptionalType("FunctionTypeParam"),
    returnType: validateType("FlowType"),
  },
});

defineType("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    name: validateOptionalType("Identifier"),
    typeAnnotation: validateType("FlowType"),
    optional: validateOptional(assertValueType("boolean")),
  },
});

defineType("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow", "FlowType"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterInstantiation"),
  },
});

defineType("InferredPredicate", {
  aliases: ["Flow", "FlowPredicate"],
});

defineType("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterInstantiation"),
  },
});

defineType("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    extends: validate(arrayOfType("InterfaceExtends")),
    mixins: validate(arrayOfType("InterfaceExtends")),
    body: validateType("ObjectTypeAnnotation"),
  },
});

defineType("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("EmptyTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowType"],
  fields: {
    typeAnnotation: validateType("FlowType"),
  },
});

defineType("NumberLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("number")),
  },
});

defineType("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow", "FlowType"],
  builder: ["properties", "indexers", "callProperties", "exact"],
  fields: {
    properties: validate(
      arrayOfType(["ObjectTypeProperty", "ObjectTypeSpreadProperty"]),
    ),
    indexers: validateOptional(arrayOfType("ObjectTypeIndexer")),
    callProperties: validateOptional(arrayOfType("ObjectTypeCallProperty")),
    exact: {
      validate: assertValueType("boolean"),
      default: false,
    },
  },
});

defineType("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    value: validateType("FlowType"),
    static: validate(assertValueType("boolean")),
  },
});

defineType("ObjectTypeIndexer", {
  visitor: ["id", "key", "value", "variance"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    id: validateOptionalType("Identifier"),
    key: validateType("FlowType"),
    value: validateType("FlowType"),
    static: validate(assertValueType("boolean")),
    variance: validateOptionalType("Variance"),
  },
});

defineType("ObjectTypeProperty", {
  visitor: ["key", "value", "variance"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    key: validateType(["Identifier", "StringLiteral"]),
    value: validateType("FlowType"),
    kind: validate(assertOneOf("init", "get", "set")),
    static: validate(assertValueType("boolean")),
    optional: validate(assertValueType("boolean")),
    variance: validateOptionalType("Variance"),
  },
});

defineType("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    argument: validateType("FlowType"),
  },
});

defineType("OpaqueType", {
  visitor: ["id", "typeParameters", "supertype", "impltype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    supertype: validateOptionalType("FlowType"),
    impltype: validateType("FlowType"),
  },
});

defineType("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"],
  fields: {
    id: validateType("Identifier"),
    qualification: validateType(["Identifier", "QualifiedTypeIdentifier"]),
  },
});

defineType("StringLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("string")),
  },
});

defineType("StringTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow", "FlowType"],
  fields: {
    argument: validateType("FlowType"),
  },
});

defineType("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TypeParameterDeclaration"),
    right: validateType("FlowType"),
  },
});

defineType("TypeAnnotation", {
  aliases: ["Flow"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: validateType("FlowType"),
  },
});

defineType("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow", "ExpressionWrapper", "Expression"],
  fields: {
    expression: validateType("Expression"),
    typeAnnotation: validateType("TypeAnnotation"),
  },
});

defineType("TypeParameter", {
  aliases: ["Flow"],
  visitor: ["bound", "default", "variance"],
  fields: {
    name: validate(assertValueType("string")),
    bound: validateOptionalType("TypeAnnotation"),
    default: validateOptionalType("FlowType"),
    variance: validateOptionalType("Variance"),
  },
});

defineType("TypeParameterDeclaration", {
  aliases: ["Flow"],
  visitor: ["params"],
  fields: {
    params: validate(arrayOfType("TypeParameter")),
  },
});

defineType("TypeParameterInstantiation", {
  aliases: ["Flow"],
  visitor: ["params"],
  fields: {
    params: validate(arrayOfType("FlowType")),
  },
});

defineType("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("Variance", {
  aliases: ["Flow"],
  builder: ["kind"],
  fields: {
    kind: validate(assertOneOf("minus", "plus")),
  },
});

defineType("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});
