/* eslint max-len: "off" */

import * as t from "../index";

import defineType, {
  assertNodeOrValueType,
  assertNodeType,
  assertValueType,
  chain,
  assertEach,
  assertOneOf,
} from "./index";
import { functionCommon, patternLikeCommon } from "./core";

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
      default: [],
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
        assertEach(assertNodeOrValueType("null", "PatternLike")),
      ),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      default: [],
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
    validate: assertNodeType("TypeParameterDeclaration", "Noop"),
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
    validate: assertNodeType("TypeParameterInstantiation"),
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
      default: [],
    },
  },
  validate: (function() {
    const identifier = assertNodeType("Identifier");

    return function(parent, key, node) {
      if (!t.isExportDefaultDeclaration(parent)) {
        identifier(node, "id", node.id);
      }
    };
  })(),
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
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      default: [],
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
      validate: chain(
        assertNodeType("Declaration"),
        function(node, key, val) {
          if (val && node.specifiers.length) {
            throw new TypeError(
              "Only declaration or specifiers is allowed on ExportNamedDeclaration",
            );
          }
        },
        function(node, key, val) {
          if (val && node.source) {
            throw new TypeError("Cannot export a declaration from a source");
          }
        },
      ),
      optional: true,
    },
    specifiers: {
      default: [],
      validate: chain(
        assertValueType("array"),
        assertEach(
          (function() {
            const sourced = assertNodeType(
              "ExportSpecifier",
              "ExportDefaultSpecifier",
              "ExportNamespaceSpecifier",
            );
            const sourceless = assertNodeType("ExportSpecifier");

            return function(node, key, val) {
              const validator = node.source ? sourced : sourceless;
              validator(node, key, val);
            };
          })(),
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
  builder: ["left", "right", "body", "await"],
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
      validate: (function() {
        const declaration = assertNodeType("VariableDeclaration");
        const lval = assertNodeType(
          "Identifier",
          "MemberExpression",
          "ArrayPattern",
          "ObjectPattern",
        );

        return function(node, key, val) {
          if (t.isVariableDeclaration(val)) {
            declaration(node, key, val);
          } else {
            lval(node, key, val);
          }
        };
      })(),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
    await: {
      default: false,
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
    meta: {
      validate: chain(assertNodeType("Identifier"), function(node, key, val) {
        let property;
        switch (val.name) {
          case "function":
            property = "sent";
            break;
          case "new":
            property = "target";
            break;
          case "import":
            property = "meta";
            break;
        }
        if (!t.isIdentifier(node.property, { name: property })) {
          throw new TypeError("Unrecognised MetaProperty");
        }
      }),
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
    validate: assertOneOf("public", "private", "protected"),
    optional: true,
  },
  static: {
    default: false,
  },
  computed: {
    default: false,
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

      return function(node, key, val) {
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
    validate: assertOneOf("get", "set", "method", "constructor"),
  },
  access: {
    validate: assertOneOf("public", "private", "protected"),
    optional: true,
  },
  decorators: {
    validate: chain(
      assertValueType("array"),
      assertEach(assertNodeType("Decorator")),
    ),
    default: [],
  },
};

defineType("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: [
    "kind",
    "key",
    "params",
    "body",
    "computed",
    "static",
    "generator",
    "async",
  ],
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
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "computed", "static"],
  aliases: ["Property"],
  fields: {
    ...classMethodOrPropertyCommon,
    value: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    typeAnnotation: {
      validate: assertNodeType("TypeAnnotation", "Noop"),
      optional: true,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      default: [],
    },
    readonly: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    // todo: Has optional "variance" property for flow plugin
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
      validate: (function() {
        const string = assertValueType("string");

        return function(node, params, val) {
          const { cooked, raw } = val;
          string(node, "cooked", cooked);
          string(node, "raw", raw);
        };
      })(),
    },
    tail: {
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
      validate: chain(assertValueType("boolean"), function(node, key, val) {
        if (val && !node.argument) {
          throw new TypeError(
            "Property delegate of YieldExpression cannot be true if there is no argument",
          );
        }
      }),
      default: false,
    },
    argument: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});
