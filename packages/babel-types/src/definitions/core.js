import define from "./index";

define("ArrayExpression", {
  visitor: ["elements"],
  aliases: ["Expression"]
});

define("AssignmentExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

define("BinaryExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

define("BlockStatement", {
  visitor: ["body"],
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

define("BreakStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

define("CallExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

define("CatchClause", {
  visitor: ["param", "body"],
  aliases: ["Scopable"]
});

define("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
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
  aliases: ["Statement"]
});

define("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"]
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
  builder: {
    id: null,
    params: null,
    body: null,
    generator: false,
    async: false
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Statement", "Pure", "Declaration"]
});

define("FunctionExpression", {
  builder: {
    id: null,
    params: null,
    body: null,
    generator: false,
    async: false
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

define("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression"]
});

define("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement"]
});

define("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"]
});

define("Literal", {
  builder: ["value"],
  aliases: ["Expression", "Pure"]
});

define("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

define("MemberExpression", {
  builder: {
    object: null,
    property: null,
    computed: false
  },
  visitor: ["object", "property"],
  aliases: ["Expression"]
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
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

define("Property", {
  builder: {
    kind: "init",
    key: null,
    value: null,
    computed: false
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
  builder: {
    operator: null,
    argument: null,
    prefix: false
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

define("UpdateExpression", {
  builder: {
    operator: null,
    argument: null,
    prefix: false
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
