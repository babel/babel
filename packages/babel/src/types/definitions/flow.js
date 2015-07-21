import define from "./index";

define("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"]
});

define("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

define("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  aliases: ["Flow"]
});

define("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"]
});

define("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"]
});

define("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

define("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

define("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

define("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

define("NumberLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

define("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("StringLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

define("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

define("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"]
});

define("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

define("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

define("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow"]
});

define("TypeParameterDeclaration", {
  visitor: ["params"],
  aliases: ["Flow"]
});

define("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"]
});

define("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"]
});

define("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"]
});

define("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

define("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

define("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"]
});

define("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

define("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});
