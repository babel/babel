import type * as t from "../index.ts";
import {
  defineAliasedType,
  arrayOfType,
  assertEach,
  assertNodeType,
  assertOneOf,
  assertValueType,
  chain,
  validate,
  validateArrayOfType,
  validateOptional,
  validateOptionalType,
  validateType,
  type ValidatorImpl,
  type ValidatorOneOfNodeTypes,
} from "./utils.ts";
import {
  functionDeclarationCommon,
  classMethodOrDeclareMethodCommon,
  classMethodOrPropertyUnionShapeCommon,
} from "./core.ts";
import is from "../validators/is.ts";

const defineType = defineAliasedType("TypeScript");

const bool = assertValueType("boolean");

const tSFunctionTypeAnnotationCommon = () => ({
  returnType: {
    validate: assertNodeType("TSTypeAnnotation"),

    optional: true,
  },
  typeParameters: {
    validate: assertNodeType("TSTypeParameterDeclaration"),

    optional: true,
  },
});

defineType("TSParameterProperty", {
  aliases: [],
  visitor: ["parameter"],
  fields: {
    accessibility: {
      validate: assertOneOf("public", "private", "protected"),
      optional: true,
    },
    readonly: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    parameter: {
      validate: assertNodeType("Identifier", "AssignmentPattern"),
    },
    override: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    decorators: {
      validate: arrayOfType("Decorator"),
      optional: true,
    },
  },
});

defineType("TSDeclareFunction", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "params", "returnType"],
  fields: {
    ...functionDeclarationCommon(),
    ...tSFunctionTypeAnnotationCommon(),
  },
});

defineType("TSDeclareMethod", {
  visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
  ...classMethodOrPropertyUnionShapeCommon(),
  fields: {
    ...classMethodOrDeclareMethodCommon(),
    ...tSFunctionTypeAnnotationCommon(),
  },
});

defineType("TSQualifiedName", {
  aliases: ["TSEntityName"],
  visitor: ["left", "right"],
  fields: {
    left: validateType("TSEntityName"),
    right: validateType("Identifier"),
  },
});

const signatureDeclarationCommon = () => ({
  typeParameters: validateOptionalType("TSTypeParameterDeclaration"),
  ["params"]: validateArrayOfType(
    "ArrayPattern",
    "Identifier",
    "ObjectPattern",
    "RestElement",
  ),
  ["returnType"]: validateOptionalType("TSTypeAnnotation"),
});

const callConstructSignatureDeclaration = {
  aliases: ["TSTypeElement"],
  visitor: ["typeParameters", "params", "returnType"],
  fields: signatureDeclarationCommon(),
};

defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
defineType(
  "TSConstructSignatureDeclaration",
  callConstructSignatureDeclaration,
);

const namedTypeElementCommon = () => ({
  key: validateType("Expression"),
  computed: { default: false },
  optional: validateOptional(bool),
});

defineType("TSPropertySignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeAnnotation"],
  fields: {
    ...namedTypeElementCommon(),
    readonly: validateOptional(bool),
    typeAnnotation: validateOptionalType("TSTypeAnnotation"),
    kind: {
      optional: true,
      validate: assertOneOf("get", "set"),
    },
  },
});

defineType("TSMethodSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeParameters", "params", "returnType"],
  fields: {
    ...signatureDeclarationCommon(),
    ...namedTypeElementCommon(),
    kind: {
      validate: assertOneOf("method", "get", "set"),
    },
  },
});

defineType("TSIndexSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["parameters", "typeAnnotation"],
  fields: {
    readonly: validateOptional(bool),
    static: validateOptional(bool),
    parameters: validateArrayOfType("Identifier"), // Length must be 1
    typeAnnotation: validateOptionalType("TSTypeAnnotation"),
  },
});

const tsKeywordTypes = [
  "TSAnyKeyword",
  "TSBooleanKeyword",
  "TSBigIntKeyword",
  "TSIntrinsicKeyword",
  "TSNeverKeyword",
  "TSNullKeyword",
  "TSNumberKeyword",
  "TSObjectKeyword",
  "TSStringKeyword",
  "TSSymbolKeyword",
  "TSUndefinedKeyword",
  "TSUnknownKeyword",
  "TSVoidKeyword",
] as const;

for (const type of tsKeywordTypes) {
  defineType(type, {
    aliases: ["TSType", "TSBaseType"],
    visitor: [],
    fields: {},
  });
}

defineType("TSThisType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: [],
  fields: {},
});

const fnOrCtrBase = {
  aliases: ["TSType"],
  visitor: ["typeParameters", "params", "returnType"],
};

defineType("TSFunctionType", {
  ...fnOrCtrBase,
  fields: signatureDeclarationCommon(),
});
defineType("TSConstructorType", {
  ...fnOrCtrBase,
  fields: {
    ...signatureDeclarationCommon(),
    abstract: validateOptional(bool),
  },
});

defineType("TSTypeReference", {
  aliases: ["TSType"],
  visitor: ["typeName", "typeArguments"],
  fields: {
    typeName: validateType("TSEntityName"),
    ["typeArguments"]: validateOptionalType("TSTypeParameterInstantiation"),
  },
});

defineType("TSTypePredicate", {
  aliases: ["TSType"],
  visitor: ["parameterName", "typeAnnotation"],
  builder: ["parameterName", "typeAnnotation", "asserts"],
  fields: {
    parameterName: validateType("Identifier", "TSThisType"),
    typeAnnotation: validateOptionalType("TSTypeAnnotation"),
    asserts: validateOptional(bool),
  },
});

defineType("TSTypeQuery", {
  aliases: ["TSType"],
  visitor: ["exprName", "typeArguments"],
  fields: {
    exprName: validateType("TSEntityName", "TSImportType"),
    ["typeArguments"]: validateOptionalType("TSTypeParameterInstantiation"),
  },
});

defineType("TSTypeLiteral", {
  aliases: ["TSType"],
  visitor: ["members"],
  fields: {
    members: validateArrayOfType("TSTypeElement"),
  },
});

defineType("TSArrayType", {
  aliases: ["TSType"],
  visitor: ["elementType"],
  fields: {
    elementType: validateType("TSType"),
  },
});

defineType("TSTupleType", {
  aliases: ["TSType"],
  visitor: ["elementTypes"],
  fields: {
    elementTypes: validateArrayOfType("TSType", "TSNamedTupleMember"),
  },
});

defineType("TSOptionalType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: validateType("TSType"),
  },
});

defineType("TSRestType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: validateType("TSType"),
  },
});

defineType("TSNamedTupleMember", {
  visitor: ["label", "elementType"],
  builder: ["label", "elementType", "optional"],
  fields: {
    label: validateType("Identifier"),
    optional: {
      validate: bool,
      default: false,
    },
    elementType: validateType("TSType"),
  },
});

const unionOrIntersection = {
  aliases: ["TSType"],
  visitor: ["types"],
  fields: {
    types: validateArrayOfType("TSType"),
  },
};

defineType("TSUnionType", unionOrIntersection);
defineType("TSIntersectionType", unionOrIntersection);

defineType("TSConditionalType", {
  aliases: ["TSType"],
  visitor: ["checkType", "extendsType", "trueType", "falseType"],
  fields: {
    checkType: validateType("TSType"),
    extendsType: validateType("TSType"),
    trueType: validateType("TSType"),
    falseType: validateType("TSType"),
  },
});

defineType("TSInferType", {
  aliases: ["TSType"],
  visitor: ["typeParameter"],
  fields: {
    typeParameter: validateType("TSTypeParameter"),
  },
});

defineType("TSParenthesizedType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: validateType("TSType"),
  },
});

defineType("TSTypeOperator", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  builder: ["typeAnnotation", "operator"],
  fields: {
    operator: {
      validate: assertOneOf("keyof", "readonly", "unique"),
      // "keyof" is not a good default, but as this field is required better
      // pick one. We need it for backwards compatibility with older versions
      // of Babel 7.
      default: undefined,
    },
    typeAnnotation: validateType("TSType"),
  },
});

defineType("TSIndexedAccessType", {
  aliases: ["TSType"],
  visitor: ["objectType", "indexType"],
  fields: {
    objectType: validateType("TSType"),
    indexType: validateType("TSType"),
  },
});

defineType("TSMappedType", {
  aliases: ["TSType"],
  visitor: ["key", "constraint", "nameType", "typeAnnotation"],
  builder: ["key", "constraint", "nameType", "typeAnnotation"],
  fields: {
    key: validateType("Identifier"),
    constraint: validateType("TSType"),

    readonly: validateOptional(assertOneOf(true, false, "+", "-")),
    optional: validateOptional(assertOneOf(true, false, "+", "-")),
    typeAnnotation: validateOptionalType("TSType"),
    nameType: validateOptionalType("TSType"),
  },
});

defineType("TSTemplateLiteralType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: ["quasis", "types"],
  fields: {
    quasis: validateArrayOfType("TemplateElement"),
    types: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("TSType")),
        function (node: t.TSTemplateLiteralType, key, val) {
          if (node.quasis.length !== val.length + 1) {
            throw new TypeError(
              `Number of ${
                node.type
              } quasis should be exactly one more than the number of types.\nExpected ${
                val.length + 1
              } quasis but got ${node.quasis.length}`,
            );
          }
        } satisfies ValidatorImpl,
      ),
    },
  },
});

defineType("TSLiteralType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: ["literal"],
  fields: {
    literal: {
      validate: (function () {
        const unaryExpression = assertNodeType(
          "NumericLiteral",
          "BigIntLiteral",
        );
        const unaryOperator = assertOneOf("-");

        const literal = assertNodeType(
          "NumericLiteral",
          "StringLiteral",
          "BooleanLiteral",
          "BigIntLiteral",
          "TemplateLiteral",
        );
        const validator: ValidatorOneOfNodeTypes = function validator(
          parent: t.Node,
          key: string,
          node: t.Node,
        ) {
          // type A = -1 | 1;
          if (is("UnaryExpression", node)) {
            // check operator first
            unaryOperator(node, "operator", node.operator);
            unaryExpression(node, "argument", node.argument);
          } else {
            // type A = 'foo' | 'bar' | false | 1;
            literal(parent, key, node);
          }
        };

        validator.oneOfNodeTypes = [
          "NumericLiteral",
          "StringLiteral",
          "BooleanLiteral",
          "BigIntLiteral",
          "TemplateLiteral",
          "UnaryExpression",
        ];

        return validator;
      })(),
    },
  },
});

defineType("TSClassImplements", {
  aliases: ["TSType"],
  visitor: ["expression", "typeArguments"],
  fields: {
    expression: validateType("Expression"),
    typeArguments: validateOptionalType("TSTypeParameterInstantiation"),
  },
});
defineType("TSInterfaceHeritage", {
  aliases: ["TSType"],
  visitor: ["expression", "typeArguments"],
  fields: {
    expression: validateType("Expression"),
    typeArguments: validateOptionalType("TSTypeParameterInstantiation"),
  },
});

defineType("TSInterfaceDeclaration", {
  // "Statement" alias prevents a semicolon from appearing after it in an export declaration.
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "extends", "body"],
  fields: {
    declare: validateOptional(bool),
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TSTypeParameterDeclaration"),
    extends: validateOptional(arrayOfType("TSClassImplements")),
    body: validateType("TSInterfaceBody"),
  },
});

defineType("TSInterfaceBody", {
  visitor: ["body"],
  fields: {
    body: validateArrayOfType("TSTypeElement"),
  },
});

defineType("TSTypeAliasDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "typeAnnotation"],
  fields: {
    declare: validateOptional(bool),
    id: validateType("Identifier"),
    typeParameters: validateOptionalType("TSTypeParameterDeclaration"),
    typeAnnotation: validateType("TSType"),
  },
});

defineType("TSInstantiationExpression", {
  aliases: ["Expression"],
  visitor: ["expression", "typeArguments"],
  fields: {
    expression: validateType("Expression"),
    ["typeArguments"]: validateOptionalType("TSTypeParameterInstantiation"),
  },
});

const TSTypeExpression = {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["expression", "typeAnnotation"],
  fields: {
    expression: validateType("Expression"),
    typeAnnotation: validateType("TSType"),
  },
};

defineType("TSAsExpression", TSTypeExpression);
defineType("TSSatisfiesExpression", TSTypeExpression);

defineType("TSTypeAssertion", {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["typeAnnotation", "expression"],
  fields: {
    typeAnnotation: validateType("TSType"),
    expression: validateType("Expression"),
  },
});

defineType("TSEnumBody", {
  visitor: ["members"],
  fields: {
    members: validateArrayOfType("TSEnumMember"),
  },
});

defineType("TSEnumDeclaration", {
  // "Statement" alias prevents a semicolon from appearing after it in an export declaration.
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    declare: validateOptional(bool),
    const: validateOptional(bool),
    id: validateType("Identifier"),

    body: validateType("TSEnumBody"),
  },
});

defineType("TSEnumMember", {
  visitor: ["id", "initializer"],
  fields: {
    id: validateType("Identifier", "StringLiteral"),
    initializer: validateOptionalType("Expression"),
  },
});

defineType("TSModuleDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    kind: {
      validate: assertOneOf("global", "module", "namespace"),
    },
    declare: validateOptional(bool),
    ...false,
    id: validateType("TSEntityName", "StringLiteral"),
    body: validateType("TSModuleBlock"),
  },
});

defineType("TSModuleBlock", {
  aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
  visitor: ["body"],
  fields: {
    body: validateArrayOfType("Statement"),
  },
});

defineType("TSImportType", {
  aliases: ["TSType"],
  builder: ["source", "qualifier", "typeArguments"],
  visitor: ["source", "options", "qualifier", "typeArguments"],
  fields: {
    source: validateType("StringLiteral"),
    qualifier: validateOptionalType("TSEntityName"),

    typeArguments: validateOptionalType("TSTypeParameterInstantiation"),

    options: {
      validate: assertNodeType("ObjectExpression"),
      optional: true,
    },
  },
});

defineType("TSImportEqualsDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "moduleReference"],
  fields: {
    id: validateType("Identifier"),
    moduleReference: validateType("TSEntityName", "TSExternalModuleReference"),
    importKind: {
      validate: assertOneOf("type", "value"),
      optional: true,
    },
  },
});

defineType("TSExternalModuleReference", {
  visitor: ["expression"],
  fields: {
    expression: validateType("StringLiteral"),
  },
});

defineType("TSNonNullExpression", {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["expression"],
  fields: {
    expression: validateType("Expression"),
  },
});

defineType("TSExportAssignment", {
  aliases: ["Statement"],
  visitor: ["expression"],
  fields: {
    expression: validateType("Expression"),
  },
});

defineType("TSNamespaceExportDeclaration", {
  aliases: ["Statement"],
  visitor: ["id"],
  fields: {
    id: validateType("Identifier"),
  },
});

defineType("TSTypeAnnotation", {
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: {
      validate: assertNodeType("TSType"),
    },
  },
});

defineType("TSTypeParameterInstantiation", {
  visitor: ["params"],
  fields: {
    params: validateArrayOfType("TSType"),
  },
});

defineType("TSTypeParameterDeclaration", {
  visitor: ["params"],
  fields: {
    params: validateArrayOfType("TSTypeParameter"),
  },
});

defineType("TSTypeParameter", {
  builder: ["constraint", "default", "name"],
  visitor: ["name", "constraint", "default"],
  fields: {
    name: {
      validate: assertNodeType("Identifier"),
    },
    in: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    out: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    const: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    constraint: {
      validate: assertNodeType("TSType"),
      optional: true,
    },
    default: {
      validate: assertNodeType("TSType"),
      optional: true,
    },
  },
});
