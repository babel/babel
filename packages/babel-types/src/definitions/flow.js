import define from "./index";

define("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  }
});

define("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  }
});

define("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

define("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("NumberLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  }
});

define("StringLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  }
});

define("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  }
});

define("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("TypeParameterDeclaration", {
  visitor: ["params"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  }
});

define("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  }
});

define("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  }
});

define("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  }
});

define("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  }
});
