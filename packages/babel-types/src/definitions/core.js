// @flow

import is from "../validators/is";
import isValidIdentifier from "../validators/isValidIdentifier";
import { isKeyword, isReservedWord } from "@babel/helper-validator-identifier";

import {
  BINARY_OPERATORS,
  LOGICAL_OPERATORS,
  ASSIGNMENT_OPERATORS,
  UNARY_OPERATORS,
  UPDATE_OPERATORS,
} from "../constants";

import defineType, {
  assertValueType,
  assertNodeType,
  assertNodeOrValueType,
  assertEach,
  chain,
  assertOneOf,
} from "./utils";

defineType("ArrayExpression", {
  fields: {
    elements: {
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
      validate: (function () {
        const identifier = assertOneOf(...ASSIGNMENT_OPERATORS);
        const pattern = assertOneOf("=");

        return function (node, key, val) {
          const validator = is("Pattern", node.left) ? pattern : identifier;
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
      validate: (function () {
        const expression = assertNodeType("Expression");
        const inOp = assertNodeType("Expression", "PrivateName");

        const validator = function (node, key, val) {
          const validator = node.operator === "in" ? inOp : expression;
          validator(node, key, val);
        };
        // todo(ts): can be discriminated union by `operator` property
        validator.oneOfNodeTypes = ["Expression", "PrivateName"];
        return validator;
      })(),
    },
    right: {
      validate: assertNodeType("Expression"),
    },
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
});

defineType("InterpreterDirective", {
  builder: ["value"],
  fields: {
    value: {
      validate: assertValueType("string"),
    },
  },
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
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Directive")),
      ),
      default: [],
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
      validate: assertNodeType("Identifier"),
      optional: true,
    },
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
});

defineType("CallExpression", {
  visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
  builder: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: assertNodeType("Expression", "V8IntrinsicIdentifier"),
    },
    arguments: {
      validate: chain(
        assertValueType("array"),
        assertEach(
          assertNodeType(
            "Expression",
            "SpreadElement",
            "JSXNamespacedName",
            "ArgumentPlaceholder",
          ),
        ),
      ),
    },
    typeArguments: {
      validate: assertNodeType("TypeParameterInstantiation"),
      optional: true,
    },
    typeParameters: {
      validate: assertNodeType("TSTypeParameterInstantiation"),
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
      validate: assertNodeType("Identifier"),
      optional: true,
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
    comments: {
      validate: assertEach(assertNodeType("Comment")),
      optional: true,
    },
    tokens: {
      // todo(ts): add Token type
      validate: assertEach(Object.assign(() => {}, { type: "any" })),
      optional: true,
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
      validate: assertNodeType(
        "VariableDeclaration",
        "Identifier",
        "MemberExpression",
        "ArrayPattern",
        "ObjectPattern",
      ),
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
      validate: assertNodeType("VariableDeclaration", "Expression"),
      optional: true,
    },
    test: {
      validate: assertNodeType("Expression"),
      optional: true,
    },
    update: {
      validate: assertNodeType("Expression"),
      optional: true,
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
      assertEach(
        assertNodeType(
          "Identifier",
          "Pattern",
          "RestElement",
          "TSParameterProperty",
        ),
      ),
    ),
  },
  generator: {
    default: false,
  },
  async: {
    default: false,
  },
};

export const functionTypeAnnotationCommon = {
  returnType: {
    validate: assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
    optional: true,
  },
  typeParameters: {
    validate: assertNodeType(
      "TypeParameterDeclaration",
      "TSTypeParameterDeclaration",
      "Noop",
    ),
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
    ...functionDeclarationCommon,
    ...functionTypeAnnotationCommon,
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
  validate: (function () {
    const identifier = assertNodeType("Identifier");

    return function (parent, key, node) {
      if (!is("ExportDefaultDeclaration", parent)) {
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
  fields: {
    ...functionCommon,
    ...functionTypeAnnotationCommon,
    id: {
      validate: assertNodeType("Identifier"),
      optional: true,
    },
    body: {
      validate: assertNodeType("BlockStatement"),
    },
  },
});

export const patternLikeCommon = {
  typeAnnotation: {
    // TODO: @babel/plugin-transform-flow-comments puts a Noop here, is there a better way?
    validate: assertNodeType("TypeAnnotation", "TSTypeAnnotation", "Noop"),
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
  visitor: ["typeAnnotation", "decorators" /* for legacy param decorators */],
  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
  fields: {
    ...patternLikeCommon,
    name: {
      validate: chain(
        assertValueType("string"),
        Object.assign(
          function (node, key, val) {
            if (!isValidIdentifier(val, false)) {
              throw new TypeError(`"${val}" is not a valid identifier name`);
            }
          },
          { type: "string" },
        ),
      ),
    },
    optional: {
      validate: assertValueType("boolean"),
      optional: true,
    },
  },
  validate(parent, key, node) {
    const match = /\.(\w+)$/.exec(key);
    if (!match) return;

    const [, parentKey] = match;
    const nonComp = { computed: false };

    // We can't check if `parent.property === node`, because nodes are validated
    // before replacing them in the AST.
    if (parentKey === "property") {
      if (is("MemberExpression", parent, nonComp)) return;
      if (is("OptionalMemberExpression", parent, nonComp)) return;
    } else if (parentKey === "key") {
      if (is("Property", parent, nonComp)) return;
      if (is("Method", parent, nonComp)) return;
    } else if (parentKey === "exported") {
      if (is("ExportSpecifier", parent)) return;
    } else if (parentKey === "imported") {
      if (is("ImportSpecifier", parent, { imported: node })) return;
    } else if (parentKey === "meta") {
      if (is("MetaProperty", parent, { meta: node })) return;
    }

    if (
      // Ideally we should call isStrictReservedWord if this node is a descendant
      // of a block in strict mode. Also, we should pass the inModule option so
      // we can disable "await" in module.
      (isKeyword(node.name) || isReservedWord(node.name)) &&
      // Even if "this" is a keyword, we are using the Identifier
      // node to represent it.
      node.name !== "this"
    ) {
      throw new TypeError(`"${node.name}" is not a valid identifier`);
    }
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
  aliases: ["Expression", "Pureish", "Literal"],
  fields: {
    pattern: {
      validate: assertValueType("string"),
    },
    flags: {
      validate: chain(
        assertValueType("string"),
        Object.assign(
          function (node, key, val) {
            const invalid = /[^gimsuy]/.exec(val);
            if (invalid) {
              throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
            }
          },
          { type: "string" },
        ),
      ),
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
      validate: (function () {
        const normal = assertNodeType("Identifier", "PrivateName");
        const computed = assertNodeType("Expression");

        const validator = function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
        // todo(ts): can be discriminated union by `computed` property
        validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
        return validator;
      })(),
    },
    computed: {
      default: false,
    },
  },
});

defineType("NewExpression", { inherits: "CallExpression" });

defineType("Program", {
  // Note: We explicitly leave 'interpreter' out here because it is
  // conceptually comment-like, and Babel does not traverse comments either.
  visitor: ["directives", "body"],
  builder: ["body", "directives", "sourceType", "interpreter"],
  fields: {
    sourceFile: {
      validate: assertValueType("string"),
    },
    sourceType: {
      validate: assertOneOf("script", "module"),
      default: "script",
    },
    interpreter: {
      validate: assertNodeType("InterpreterDirective"),
      default: null,
      optional: true,
    },
    directives: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Directive")),
      ),
      default: [],
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
    ...functionTypeAnnotationCommon,
    kind: {
      validate: assertOneOf("method", "get", "set"),
    },
    computed: {
      default: false,
    },
    key: {
      validate: (function () {
        const normal = assertNodeType(
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
        );
        const computed = assertNodeType("Expression");

        const validator = function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
        // todo(ts): can be discriminated union by `computed` property
        validator.oneOfNodeTypes = [
          "Expression",
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
        ];
        return validator;
      })(),
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
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
  builder: ["key", "value", "computed", "shorthand"],
  fields: {
    computed: {
      default: false,
    },
    key: {
      validate: (function () {
        const normal = assertNodeType(
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
        );
        const computed = assertNodeType("Expression");

        const validator = function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
        // todo(ts): can be discriminated union by `computed` property
        validator.oneOfNodeTypes = [
          "Expression",
          "Identifier",
          "StringLiteral",
          "NumericLiteral",
        ];
        return validator;
      })(),
    },
    value: {
      // Value may be PatternLike if this is an AssignmentProperty
      // https://github.com/babel/babylon/issues/434
      validate: assertNodeType("Expression", "PatternLike"),
    },
    shorthand: {
      validate: chain(
        assertValueType("boolean"),
        Object.assign(
          function (node, key, val) {
            if (val && node.computed) {
              throw new TypeError(
                "Property shorthand of ObjectProperty cannot be true if computed is true",
              );
            }
          },
          { type: "boolean" },
        ),
      ),
      default: false,
    },
    decorators: {
      validate: chain(
        assertValueType("array"),
        assertEach(assertNodeType("Decorator")),
      ),
      optional: true,
    },
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"],
  validate: (function () {
    const pattern = assertNodeType("Identifier", "Pattern");
    const expression = assertNodeType("Expression");

    return function (parent, key, node) {
      const validator = is("ObjectPattern", parent) ? pattern : expression;
      validator(node, "value", node.value);
    };
  })(),
});

defineType("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  builder: ["argument"],
  aliases: ["LVal", "PatternLike"],
  deprecatedAlias: "RestProperty",
  fields: {
    ...patternLikeCommon,
    argument: {
      validate: assertNodeType("Identifier", "Pattern", "MemberExpression"),
    },
  },
  validate(parent, key) {
    const match = /(\w+)\[(\d+)\]/.exec(key);
    if (!match) throw new Error("Internal Babel error: malformed key.");

    const [, listKey, index] = match;
    if (parent[listKey].length > index + 1) {
      throw new TypeError(`RestElement must be last element of ${listKey}`);
    }
  },
});

defineType("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: assertNodeType("Expression"),
      optional: true,
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

defineType("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: assertNodeType("Expression"),
    },
  },
});

defineType("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      validate: assertNodeType("Expression"),
      optional: true,
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

defineType("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    block: {
      validate: chain(
        assertNodeType("BlockStatement"),
        Object.assign(
          function (node) {
            // This validator isn't put at the top level because we can run it
            // even if this node doesn't have a parent.

            if (!node.handler && !node.finalizer) {
              throw new TypeError(
                "TryStatement expects either a handler or finalizer, or both",
              );
            }
          },
          {
            oneOfNodeTypes: ["BlockStatement"],
          },
        ),
      ),
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
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: true,
    },
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
      validate: assertNodeType("Identifier", "MemberExpression"),
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
  },
  validate(parent, key, node) {
    if (!is("ForXStatement", parent, { left: node })) return;
    if (node.declarations.length !== 1) {
      throw new TypeError(
        `Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`,
      );
    }
  },
});

defineType("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: (function () {
        const normal = assertNodeType(
          "Identifier",
          "ArrayPattern",
          "ObjectPattern",
        );
        const without = assertNodeType("Identifier");

        return function (node, key, val) {
          const validator = node.init ? normal : without;
          validator(node, key, val);
        };
      })(),
    },
    definite: {
      optional: true,
      validate: assertValueType("boolean"),
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
