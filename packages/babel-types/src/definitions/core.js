/* eslint max-len: "off" */

import * as t from "../index";

import {
  BINARY_OPERATORS,
  LOGICAL_OPERATORS,
  UNARY_OPERATORS,
  UPDATE_OPERATORS,
  ASSIGNMENT_OPERATORS,
  NOT_LOCAL_BINDING,
  BLOCK_SCOPED_SYMBOL,
} from "../constants";

import defineType, {
  assertValueType,
  assertNodeType,
  assertNodeOrValueType,
  assertEach,
  chain,
  assertOneOf,
} from "./index";

defineType("ArrayExpression", {
  fields: {
    elements: {
      default: [],
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeOrValueType("null", "Expression", "SpreadElement"),
        ),
      ),
    },
  },
  visitor: ["elements"],
  aliases: ["Expression"],
});

defineType("AssignmentExpression", {
  fields: {
    operator: {
      validate: (function() {
        const identifier = assertOneOf(...ASSIGNMENT_OPERATORS);
        const pattern = assertOneOf("=");

        return function(node, key, val) {
          const validator = t.isPattern(node.left) ? pattern : identifier;
          validator(node, key, val);
        };
      })(),
    },
    left: {
      validate: assertNodeType(
        "Identifier",
        "MemberExpression",
        "ArrayPattern",
        "ObjectPattern",
      ),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"],
});

defineType("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: assertOneOf(...BINARY_OPERATORS),
    },
    left: {
      validate: assertNodeType("Expression"),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
});

defineType("Directive", {
  visitor: ["value"],
  fields: {
    value: {
      validate: assertNodeType("DirectiveLiteral"),
    },
  },
});

defineType("DirectiveLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string"),
    },
  },
});

defineType("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      default: [],
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Directive")),
      ),
    },
    body: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Statement")),
      ),
    },
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"],
});

defineType("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      optional: true,
      validate: assertNodeType("Identifier"),
    },
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
});

defineType("CallExpression", {
  aliases: ["Expression"],
  builder: ["callee", "arguments", "optional"],
  visitor: ["callee", "arguments", "typeParameters"],
  fields: {
    callee: {
      validate: assertNodeType("Expression"),
    },
    arguments: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Expression", "SpreadElement")),
      ),
    },
    optional: {
      default: false,
    },
    typeParameters: {
      validate: assertNodeType("TypeParameterInstantiation"),
      optional: true,
    },
  },
});

defineType("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: assertNodeType("Identifier", "ArrayPattern", "ObjectPattern"),
      optional: true,
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
  aliases: ["Scopable", "BlockParent"],
});

defineType("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: assertNodeType("Expression"),
    },
    consequent: {
      validate: assertNodeType("Expression"),
    },
    alternate: {
      validate: assertNodeType("Expression"),
    },
  },
  aliases: ["Expression", "Conditional"],
});

defineType("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      optional: true,
      validate: assertNodeType("Identifier"),
    },
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
});

defineType("DebuggerStatement", {
  aliases: ["Statement"],
});

defineType("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
});

defineType("EmptyStatement", {
  aliases: ["Statement"],
});

defineType("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
  aliases: ["Statement", "ExpressionWrapper"],
});

defineType("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: assertNodeType("Program"),
    },
  },
});

defineType("ForInStatement", {
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
  },
});

defineType("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: (function() {
        const declaration = assertNodeType("VariableDeclaration");
        const expression = assertNodeType("Expression");

        return function(node, key, val) {
          if (t.isVariableDeclaration(val)) {
            declaration(node, key, val);
          } else {
            expression(node, key, val);
          }
        };
      })(),
      optional: true,
    },
    test: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
    update: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
  },
});

export const functionCommon = {
  params: {
    validate: chain(
      assertValueType("array"),
      assertEach(assertNodeType("Identifier", "Pattern", "RestElement")),
    ),
  },
  generator: {
    default: false,
  },
  async: {
    default: false,
  },
  returnType: {
    validate: assertNodeType("TypeAnnotation", "Noop"),
    optional: true,
  },
  typeParameters: {
    validate: assertNodeType("TypeParameterDeclaration", "Noop"),
    optional: true,
  },
};

export const functionDeclarationCommon = {
  ...functionCommon,
  declare: {
    validate: assertValueType("boolean"),
    optional: true,
  },
  id: {
    validate: assertNodeType("Identifier"),
    optional: true, // May be null for `export default function`
  },
};

defineType("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: {
<<<<<<< HEAD
    ...functionDeclarationCommon,
=======
    id: {
      optional: true,
      validate: assertNodeType("Identifier"),
    },
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Identifier", "Pattern", "RestElement")),
      ),
    },
>>>>>>> Lock down type system
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
  aliases: [
    "Scopable",
    "Function",
    "BlockParent",
    "FunctionParent",
    "Statement",
    "Pureish",
    "Declaration",
  ],
  validate: (function() {
    const identifier = assertNodeType("Identifier");

    return function(parent, key, node) {
      if (!t.isExportDefaultDeclaration(parent)) {
        identifier(node, "id", node.id);
      }
    };
  })(),
});

defineType("FunctionExpression", {
  inherits: "FunctionDeclaration",
  aliases: [
    "Scopable",
    "Function",
    "BlockParent",
    "FunctionParent",
    "Expression",
    "Pureish",
  ],
<<<<<<< HEAD
  fields: {
    ...functionCommon,
    id: {
      validate: assertNodeType("Identifier"),
      optional: true,
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
=======
>>>>>>> Add missing fields
});

export const patternLikeCommon = {
  typeAnnotation: {
    // TODO: babel-plugin-transform-flow-comments puts a Noop here, is there a better way?
    validate: assertNodeType("TypeAnnotation", "Noop"),
    optional: true,
  },
  decorators: {
    validate: chain(
      assertValueType("array"),
      assertEach(assertNodeType("Decorator")),
    ),
  },
};

defineType("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
  fields: {
    ...patternLikeCommon,
    name: {
      validate(node, key, val) {
        if (!t.isValidIdentifier(val, false)) {
          throw new TypeError(`"${val}" is not a valid identifer name`);
        }
      },
    },
    optional: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    [NOT_LOCAL_BINDING]: {
      default: false,
    },
  },
  validate(parent, key, node) {
    if (t.isMemberExpression(parent, { property: node })) return;
    if (t.isProperty(parent, { key: node })) return;
    if (t.isMethod(parent, { key: node })) return;
    if (t.isExportSpecifier(parent, { exported: node })) return;
    if (t.isImportSpecifier(parent, { imported: node })) return;
    if (t.isMetaProperty(parent, { meta: node })) return;
    if (t.isValidIdentifier(node.name)) return;
    throw new TypeError(`"${node.name}" is not a valid identifer name`);
  },
});

defineType("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement", "Conditional"],
  fields: {
    test: {
      validate: assertNodeType("Expression"),
    },
    consequent: {
      validate: assertNodeType("Statement"),
    },
    alternate: {
      optional: true,
      validate: assertNodeType("Statement"),
    },
  },
});

defineType("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: assertNodeType("Identifier"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
  },
});

defineType("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string"),
    },
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"],
});

defineType("NumericLiteral", {
  builder: ["value"],
  deprecatedAlias: "NumberLiteral",
  fields: {
    value: {
      validate: assertValueType("number"),
    },
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"],
});

defineType("NullLiteral", {
  aliases: ["Expression", "Pureish", "Literal", "Immutable"],
});

defineType("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("boolean"),
    },
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"],
});

defineType("RegExpLiteral", {
  builder: ["pattern", "flags"],
  deprecatedAlias: "RegexLiteral",
  aliases: ["Expression", "Literal"],
  fields: {
    pattern: {
      validate: assertValueType("string"),
    },
    flags: {
      default: "",
    },
  },
});

defineType("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      validate: assertOneOf(...LOGICAL_OPERATORS),
    },
    left: {
      validate: assertNodeType("Expression"),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("MemberExpression", {
  builder: ["object", "property", "computed", "optional"],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: {
    object: {
      validate: assertNodeType("Expression"),
    },
    property: {
      validate: (function() {
        const normal = assertNodeType("Identifier");
        const computed = assertNodeType("Expression");

        return function(node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
      })(),
    },
    computed: {
      default: false,
    },
    optional: {
      default: false,
    },
  },
});

defineType("NewExpression", { inherits: "CallExpression" });

defineType("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives"],
  fields: {
    sourceFile: {
      validate: assertValueType("string"),
    },
    sourceType: {
      validate: assertOneOf("script", "module"),
    },
    directives: {
      default: [],
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Directive")),
      ),
    },
    body: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Statement")),
      ),
    },
  },
  aliases: ["Scopable", "BlockParent", "Block"],
});

defineType("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType("ObjectMethod", "ObjectProperty", "SpreadElement"),
        ),
      ),
    },
  },
});

defineType("ObjectMethod", {
  builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
  fields: {
    ...functionCommon,
    kind: {
      validate: assertOneOf("method", "get", "set"),
    },
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
    params: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Identifier", "Pattern", "RestElement")),
      ),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
  visitor: [
    "key",
    "params",
    "body",
    "decorators",
    "returnType",
    "typeParameters",
  ],
  aliases: [
    "UserWhitespacable",
    "Function",
    "Scopable",
    "BlockParent",
    "FunctionParent",
    "Method",
    "ObjectMember",
  ],
});

defineType("ObjectProperty", {
  builder: ["key", "value", "computed", "shorthand", "decorators"],
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
    value: {},
    shorthand: {
      validate: chain(
        assertValueType("boolean"),
        function(node, key, val) {
          if (val && node.computed) {
            throw new TypeError(
              "Property shorthand of ObjectProperty cannot be true if computed is true",
            );
          }
        },
        function(node, key, val) {
          if (val && !t.isIdentifier(node.key)) {
            throw new TypeError(
              "Property shorthand of ObjectProperty cannot be true if key is not an Identifier",
            );
          }
        },
      ),
      default: false,
    },
    decorators: {
      optional: true,
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
    },
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"],
  validate: (function() {
    const pattern = assertNodeType("Identifier", "Pattern");
    const expression = assertNodeType("Expression");

    return function(parent, key, node) {
      const validator = t.isObjectPattern(parent) ? pattern : expression;
      validator(node, "value", node.value);
    };
  })(),
});

defineType("RestElement", {
  builder: ["argument"],
  visitor: ["argument", "typeAnnotation"],
  fields: {
    ...patternLikeCommon,
    argument: {
      validate: assertNodeType("Identifier"),
    },
  },
  validate(parent, key) {
    const [, listKey, index] = /(\w+)\[(\d+)\]/.exec(key);
    if (parent[listKey].length > index + 1) {
      throw new TypeError(`RestElement must be last element of ${key}`);
    }
  },
});

defineType("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Expression")),
      ),
    },
  },
  aliases: ["Expression"],
});

defineType("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
    consequent: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Statement")),
      ),
    },
  },
});

defineType("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    discriminant: {
      validate: assertNodeType("Expression"),
    },
    cases: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("SwitchCase")),
      ),
    },
  },
});

defineType("ThisExpression", {
  aliases: ["Expression"],
});

defineType("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
    },
  },
});

// todo: at least handler or finalizer should be set to be valid
defineType("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    block: {
      validate: chain(assertNodeType("BlockStatement"), function(node) {
        if (!node.handler && !node.finalizer) {
          throw new TypeError(
            "TryStatement expects either a handler or finalizer, or both",
          );
        }
      }),
    },
    handler: {
      optional: true,
      validate: assertNodeType("CatchClause"),
    },
    finalizer: {
      optional: true,
      validate: assertNodeType("BlockStatement"),
    },
  },
});

defineType("UnaryExpression", {
  builder: ["operator", "argument"],
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
    },
    operator: {
      validate: assertOneOf(...UNARY_OPERATORS),
    },
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"],
});

defineType("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false,
    },
    argument: {
      validate: assertNodeType("LVal"),
    },
    operator: {
      validate: assertOneOf(...UPDATE_OPERATORS),
    },
  },
  visitor: ["argument"],
  aliases: ["Expression"],
});

defineType("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    declare: {
      validate: assertValueType("boolean"),
      optional: true,
    },
    kind: {
      validate: assertOneOf("var", "let", "const"),
    },
    declarations: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("VariableDeclarator")),
      ),
    },
    [BLOCK_SCOPED_SYMBOL]: {
      default: false,
    },
  },
  validate(parent, key, node) {
    if (!t.isForXStatement(parent, { left: node })) return;
    if (node.declarations.length === 1) return;
    throw new TypeError(
      `Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`,
    );
  },
});

defineType("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: (function() {
        const normal = assertNodeType(
          "Identifier",
          "ArrayPattern",
          "ObjectPattern",
        );
        const without = assertNodeType("Identifier");

        return function(node, key, val) {
          const validator = node.init ? normal : without;
          validator(node, key, val);
        };
      })(),
    },
    init: {
      optional: true,
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
  },
});

defineType("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      validate: assertNodeType("Expression"),
    },
    body: {
      validate: assertNodeType("Statement"),
    },
  },
});
