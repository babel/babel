import define, { assertValueType, assertNodeType } from "./index";

define("ArrayExpression", {
  fields: {
    elements: { validate: assertValueType("array") }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});

define("AssignmentExpression", {
  fields: {
    elements: {
      operator: { validate: assertValueType("string") },
      left: { validate: assertNodeType("LVal") },
      right: { validate: assertNodeType("Expression") }
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

define("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: { validate: assertValueType("string") },
    left: { validate: assertNodeType("Expression") },
    right: { validate: assertNodeType("Expression") }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

define("BlockStatement", {
  visitor: ["body"],
  fields: {
    body: { validate: assertValueType("array") }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

define("BreakStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("CallExpression", {
  visitor: ["callee", "arguments"],
  fields: {
    callee: { validate: assertNodeType("Expression") },
    arguments: { validate: assertValueType("array") }
  },
  aliases: ["Expression"]
});

define("CatchClause", {
  visitor: ["param", "body"],
  aliases: ["Scopable"]
});

define("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: { validate: assertNodeType("Expression") },
    consequent: { validate: assertNodeType("Expression") },
    alternate: { validate: assertNodeType("Expression") }
  },
  aliases: ["Expression"]
});

define("ContinueStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("DebuggerStatement", {
  aliases: ["Statement"]
});

define("DoWhileStatement", {
  visitor: ["body", "test"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

define("EmptyStatement", {
  aliases: ["Statement"]
});

define("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: { validate: assertNodeType("Expression") }
  },
  aliases: ["Statement"]
});

define("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: { validate: assertNodeType("Program") }
  }
});

define("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

define("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"]
});

define("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: {
    id: { validate: assertNodeType("Identifier") },
    params: { validate: assertValueType("array") },
    body: { validate: assertNodeType("BlockStatement") },
    generator: {
      default: false,
      validate: assertValueType("boolean")
    },
    async: {
      default: false,
      validate: assertValueType("boolean")
    }
  },
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Statement", "Pure", "Declaration"]
});

define("FunctionExpression", {
  builder: ["id", "params", "body", "generator", "async"],
  fields: {
    params: { validate: assertValueType("array") },
    body: { validate: assertNodeType("BlockStatement") },
    generator: {
      default: false,
      validate: assertValueType("boolean")
    },
    async: {
      default: false,
      validate: assertValueType("boolean")
    }
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

define("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression", "LVal"]
});

define("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement"]
});

define("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"]
});

define("StringLiteral", {
  builder: ["value"],
  fields: {
    value: { validate: assertValueType("string") }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("NumberLiteral", {
  builder: ["value"],
  fields: {
    value: { validate: assertValueType("number") }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("NullLiteral", {
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: { validate: assertValueType("boolean") }
  },
  aliases: ["Expression", "Pure", "Literal", "Immutable"]
});

define("RegexLiteral", {
  builder: ["pattern", "flags"],
  fields: {
    pattern: { validate: assertValueType("string") },
    flags: {
      validate: assertValueType("string"),
      default: ""
    }
  },
  aliases: ["Expression", "Literal"]
});

define("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

define("MemberExpression", {
  builder: ["object", "property", "computed"],
  fields: {
    computed: { default: false }
  },
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"]
});

define("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

define("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"]
});

define("Program", {
  visitor: ["body"],
  fields: {
    body: { validate: assertValueType("array") }
  },
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

define("Property", {
  builder: ["kind", "key", "value", "computed"],
  fields: {
    kind: { default: "init" },
    computed: { default: false }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable"]
});

define("RestElement", {
  visitor: ["argument", "typeAnnotation"]
});

define("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: { validate: assertValueType("array") }
  },
  aliases: ["Expression"]
});

define("SwitchCase", {
  visitor: ["test", "consequent"]
});

define("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"]
});

define("ThisExpression", {
  aliases: ["Expression"]
});

define("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("TryStatement", {
  builder: ["block", "handler", "finalizer"],
  visitor: ["block", "handlers", "handler", "guardedHandlers", "finalizer"],
  aliases: ["Statement"]
});

define("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: { default: false }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

define("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: { default: false }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

define("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"]
});

define("VariableDeclarator", {
  visitor: ["id", "init"]
});

define("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

define("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"]
});
