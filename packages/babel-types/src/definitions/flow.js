// @flow
import defineType, {
  assertEach,
  assertNodeType,
  assertValueType,
  chain,
} from "./index";

defineType("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  },
});

defineType("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  },
});

defineType("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {},
});

defineType("NullLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {},
});

defineType("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareInterface", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareOpaqueType", {
  visitor: ["id", "typeParameters", "supertype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclareExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("DeclaredPredicate", {
  visitor: ["value"],
  aliases: ["Flow", "FlowPredicate"],
  fields: {
    // todo
  },
});

defineType("ExistsTypeAnnotation", {
  aliases: ["Flow"],
});

defineType("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("InferredPredicate", {
  aliases: ["Flow", "FlowPredicate"],
  fields: {
    // todo
  },
});

defineType("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
});

defineType("EmptyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
});

defineType("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("NumberLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  },
});

defineType("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  },
});

defineType("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  },
});

defineType("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  },
});

defineType("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    // todo
  },
});

defineType("OpaqueType", {
  visitor: ["id", "typeParameters", "supertype", "impltype"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("StringLiteralTypeAnnotation", {
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  },
});

defineType("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {},
});

defineType("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    // todo
  },
});

defineType("TypeAnnotation", {
  aliases: ["Flow"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: {
      validate: assertNodeType("Flow"),
    },
  },
});

defineType("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow", "ExpressionWrapper", "Expression"],
  fields: {
    // todo
  },
});

defineType("TypeParameter", {
  aliases: ["Flow"],
  visitor: ["bound", "default"],
  fields: {
    name: {
      validate: assertValueType("string"),
    },
    bound: {
      validate: assertNodeType("TypeAnnotation"),
      optional: true,
    },
    default: {
      validate: assertNodeType("Flow"),
      optional: true,
    },
  },
});

defineType("TypeParameterDeclaration", {
  aliases: ["Flow"],
  visitor: ["params"],
  fields: {
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("TypeParameter")),
      ),
    },
  },
});

defineType("TypeParameterInstantiation", {
  aliases: ["Flow"],
  visitor: ["params"],
  fields: {
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Flow")),
      ),
    },
  },
});

defineType("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"],
  fields: {
    // todo
  },
});

defineType("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"],
  fields: {
    // todo
  },
});
