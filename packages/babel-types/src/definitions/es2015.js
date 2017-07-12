/* eslint max-len: "off" */

import * as t from "../index";

import defineType, {
  assertNodeType,
  assertValueType,
  chain,
  assertEach,
  assertOneOf,
} from "./index";
import { functionCommon, patternLikeCommon } from "./core";

defineType("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern", "LVal"],
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
  builder: ["elements"],
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
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
<<<<<<< HEAD
    ...functionCommon,
    expression: {
      // https://github.com/babel/babylon/issues/505
      validate: assertValueType("boolean"),
      optional: true,
=======
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Identifier", "Pattern", "RestElement")),
      ),
>>>>>>> Lock down type system
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
<<<<<<< HEAD
    ...classCommon,
    declare: {
      validate: assertValueType("boolean"),
      optional: true,
=======
    id: {
      optional: true,
      validate: assertNodeType("Identifier"),
    },
    body: {
      validate: assertNodeType("ClassBody"),
>>>>>>> Lock down type system
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
      optional: true,
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
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
<<<<<<< HEAD
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
=======
>>>>>>> Add missing fields
});

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
    kind: {
      validate: assertOneOf("get", "set", "method", "constructor"),
    },
    computed: {
      default: false,
    },
    static: {
      default: false,
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
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Identifier", "Pattern", "RestElement")),
      ),
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
    generator: {
      default: false,
    },
    async: {
      default: false,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
  },
});

defineType("ClassProperty", {
  visitor: ["key", "value", "decorators", "typeAnnotation"],
  builder: ["key", "value", "computed", "decorators"],
  aliases: ["Property"],
  fields: {
    computed: {
      default: false,
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
    value: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
    decorators: {
      optional: true,
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
    variance: {
      validate: assertNodeType("Variance"),
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
      validate: chain(assertNodeType("Declaration"), function(node, key, val) {
        if (val && node.specifiers.length) {
          throw new TypeError(
            "Only declaration or specifiers is allowed on ExportNamedDeclaration",
          );
        }
      }),
      optional: true,
    },
    specifiers: {
      default: [],
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
      optional: true,
      validate: assertNodeType("StringLiteral"),
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
  visitor: ["left", "right", "body", "await"],
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

defineType("ObjectPattern", {
  builder: ["properties"],
  visitor: ["properties", "typeAnnotation"],
<<<<<<< HEAD
=======
  aliases: ["Pattern", "LVal"],
>>>>>>> Lock down type system
  fields: {
    properties: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("ObjectProperty", "RestElement")),
      ),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
<<<<<<< HEAD
    }
  }
=======
    },
  },
});

<<<<<<< HEAD
defineType("ObjectPatternProperty", {
  aliases: ["Property"],
  builder: ["key", "value", "shorthand"],
  fields: {
    key: {
      validate: assertNodeType("Identifier", "StringLiteral", "NumericLiteral"),
    },
    value: {
      validate: assertNodeType("Identifier", "Pattern"),
    },
    shorthand: {
      validate: chain(assertValueType("boolean"), function(node, key, val) {
        if (val && !t.isIdentifier(node.key)) {
          throw new TypeError(
            "Property shorthand of ObjectPatternProperty cannot be true if key is not an Identifier",
          );
        }
      }),
      default: false,
    },
  },
  visitor: ["key", "value"],
>>>>>>> Lock down type system
});

=======
>>>>>>> Remove ObjectPatternProperty
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
    // TODO: flatten `raw` into main node
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
      default: false,
      validate: chain(assertValueType("boolean"), function(node, key, val) {
        if (val && !node.argument) {
          throw new TypeError(
            "Property delegate of YieldExpression cannot be true if there is no argument",
          );
        }
      }),
    },
    argument: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});
