// @flow
import defineType, {
  assertNodeType,
  assertValueType,
  chain,
  assertEach,
  assertOneOf,
} from "./utils";
import {
  functionCommon,
  functionTypeAnnotationCommon,
  patternLikeCommon,
} from "./core";

defineType("AssignmentPattern", {
  visitor: ["left", "right"],
  builder: ["left", "right"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: {
    ...patternLikeCommon,
    left: {
      validate: assertNodeType("Identifier", "ObjectPattern", "ArrayPattern"),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
  },
});

defineType("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  builder: ["elements"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: {
    ...patternLikeCommon,
    elements: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("PatternLike")),
      ),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
  },
});

defineType("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType", "typeParameters"],
  aliases: [
    "Scopable",
    "Function",
    "BlockParent",
    "FunctionParent",
    "Expression",
    "Pureish",
  ],
  fields: {
    ...functionCommon,
    ...functionTypeAnnotationCommon,
    expression: {
      // https://github.com/babel/babylon/issues/505
      validate: assertValueType("boolean"),
    },
    body: {
      validate: assertNodeType("BlockStatement", "Expression"),
    },
  },
});

defineType("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType(
            "ClassMethod",
            "ClassProperty",
            "TSDeclareMethod",
            "TSIndexSignature",
          ),
        ),
      ),
    },
  },
});

const classCommon = {
  typeParameters: {
    validate: assertNodeType(
      "TypeParameterDeclaration",
      "TSTypeParameterDeclaration",
      "Noop",
    ),
    optional: true,
  },
  body: {
    validate: assertNodeType("ClassBody"),
  },
  superClass: {
    optional: true,
    validate: assertNodeType("Expression"),
  },
  superTypeParameters: {
    validate: assertNodeType(
      "TypeParameterInstantiation",
      "TSTypeParameterInstantiation",
    ),
    optional: true,
  },
  implements: {
    validate: chain(
      assertValueType("array"),
      assertEach(
        assertNodeType("TSExpressionWithTypeArguments", "FlowClassImplements"),
      ),
    ),
    optional: true,
  },
};

defineType("ClassDeclaration", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: [
    "id",
    "body",
    "superClass",
    "mixins",
    "typeParameters",
    "superTypeParameters",
    "implements",
    "decorators",
  ],
  aliases: ["Scopable", "Class", "Statement", "Declaration", "Pureish"],
  fields: {
    ...classCommon,
    declare: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    abstract: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    id: {
      validate: assertNodeType("Identifier"),
      optional: true, // Missing if this is the child of an ExportDefaultDeclaration.
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
  },
});

defineType("ClassExpression", {
  inherits: "ClassDeclaration",
  aliases: ["Scopable", "Class", "Expression", "Pureish"],
  fields: {
    ...classCommon,
    id: {
      optional: true,
      validate: assertNodeType("Identifier"),
    },
    body: {
      validate: assertNodeType("ClassBody"),
    },
    superClass: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
  },
});

defineType("ExportAllDeclaration", {
  visitor: ["source"],
  aliases: [
    "Statement",
    "Declaration",
    "ModuleDeclaration",
    "ExportDeclaration",
  ],
  fields: {
    source: {
      validate: assertNodeType("StringLiteral"),
    },
  },
});

defineType("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: [
    "Statement",
    "Declaration",
    "ModuleDeclaration",
    "ExportDeclaration",
  ],
  fields: {
    declaration: {
      validate: assertNodeType(
        "FunctionDeclaration",
        "TSDeclareFunction",
        "ClassDeclaration",
        "Expression",
      ),
    },
  },
});

defineType("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: [
    "Statement",
    "Declaration",
    "ModuleDeclaration",
    "ExportDeclaration",
  ],
  fields: {
    declaration: {
      validate: assertNodeType("Declaration"),
      optional: true,
    },
    specifiers: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType(
            "ExportSpecifier",
            "ExportDefaultSpecifier",
            "ExportNamespaceSpecifier",
          ),
        ),
      ),
    },
    source: {
      validate: assertNodeType("StringLiteral"),
      optional: true,
    },
  },
});

defineType("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier"),
    },
    exported: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: [
    "Scopable",
    "Statement",
    "For",
    "BlockParent",
    "Loop",
    "ForXStatement",
  ],
  fields: {
    left: {
      validate: assertNodeType("VariableDeclaration", "LVal"),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
    await: {
      default: false,
      validate: assertValueType("boolean"),
    },
  },
});

defineType("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"],
  fields: {
    specifiers: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType(
            "ImportSpecifier",
            "ImportDefaultSpecifier",
            "ImportNamespaceSpecifier",
          ),
        ),
      ),
    },
    source: {
      validate: assertNodeType("StringLiteral"),
    },
  },
});

defineType("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier"),
    },
  },
});

defineType("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: assertNodeType("Identifier"),
    },
    imported: {
      validate: assertNodeType("Identifier"),
    },
    importKind: {
      // Handle Flowtype's extension "import {typeof foo} from"
      validate: assertOneOf(null, "type", "typeof"),
    },
  },
});

defineType("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    // todo: limit to new.target
    meta: {
      validate: assertNodeType("Identifier"),
    },
    property: {
      validate: assertNodeType("Identifier"),
    },
  },
});

export const classMethodOrPropertyCommon = {
  abstract: {
    validate: assertValueType("boolean"),
    optional: true,
  },
  accessibility: {
    validate: chain(
      assertValueType("string"),
      assertOneOf("public", "private", "protected"),
    ),
    optional: true,
  },
  static: {
    validate: assertValueType("boolean"),
    optional: true,
  },
  computed: {
    default: false,
    validate: assertValueType("boolean"),
  },
  optional: {
    validate: assertValueType("boolean"),
    optional: true,
  },
  key: {
    validate: (function() {
      const normal = assertNodeType(
        "Identifier",
        "StringLiteral",
        "NumericLiteral",
      );
      const computed = assertNodeType("Expression");

      return function(node: Object, key: string, val: any) {
        const validator = node.computed ? computed : normal;
        validator(node, key, val);
      };
    })(),
  },
};

export const classMethodOrDeclareMethodCommon = {
  ...functionCommon,
  ...classMethodOrPropertyCommon,
  kind: {
    validate: chain(
      assertValueType("string"),
      assertOneOf("get", "set", "method", "constructor"),
    ),
    default: "method",
  },
  access: {
    validate: chain(
      assertValueType("string"),
      assertOneOf("public", "private", "protected"),
    ),
    optional: true,
  },
  decorators: {
    validate: chain(
      assertValueType("array"),
      assertEach(assertNodeType("Decorator")),
    ),
    optional: true,
  },
};

defineType("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "computed", "static"],
  visitor: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  fields: {
    ...classMethodOrDeclareMethodCommon,
    ...functionTypeAnnotationCommon,
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  builder: ["properties"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: {
    ...patternLikeCommon,
    properties: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("RestElement", "ObjectProperty")),
      ),
    },
  },
});

defineType("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  deprecatedAlias: "SpreadProperty",
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("Super", {
  aliases: ["Expression"],
});

defineType("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: assertNodeType("Expression"),
    },
    quasi: {
      validate: assertNodeType("TemplateLiteral"),
    },
  },
});

defineType("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {
      // todo: flatten `raw` into main node
    },
    tail: {
      validate: assertValueType("boolean"),
      default: false,
    },
  },
});

defineType("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    quasis: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("TemplateElement")),
      ),
    },
    expressions: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Expression")),
      ),
    },
  },
});

defineType("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: assertValueType("boolean"),
      default: false,
    },
    argument: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});
