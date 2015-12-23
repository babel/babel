import defineType from "./index";

defineType("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"]
});

defineType("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

defineType("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  aliases: ["Flow"]
});

defineType("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"]
});

defineType("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"]
});

defineType("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

defineType("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

defineType("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

defineType("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

defineType("NullLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

defineType("NumberLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

defineType("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("StringLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

defineType("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

defineType("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

defineType("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"]
});

defineType("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

defineType("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

defineType("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow"]
});

defineType("TypeParameterDeclaration", {
  visitor: ["params"],
  aliases: ["Flow"]
});

defineType("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"]
});

defineType("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"]
});

defineType("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"]
});

defineType("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

defineType("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

defineType("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"]
});

defineType("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

defineType("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});
