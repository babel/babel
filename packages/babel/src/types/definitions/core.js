import defineType from "./index";

defineType("ArrayExpression", {
  visitor: ["elements"],
  aliases: ["Expression"]
});

  defineType("AssignmentExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

defineType("BinaryExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

defineType("BlockStatement", {
  visitor: ["body"],
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

defineType("BreakStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

defineType("CallExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

defineType("CatchClause", {
  visitor: ["param", "body"],
  aliases: ["Scopable"]
});

defineType("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Expression"]
});

defineType("ContinueStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

defineType("DebuggerStatement", {
  aliases: ["Statement"]
});

defineType("DoWhileStatement", {
  visitor: ["body", "test"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

defineType("EmptyStatement", {
  aliases: ["Statement"]
});

defineType("ExpressionStatement", {
  visitor: ["expression"],
  aliases: ["Statement"]
});

defineType("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"]
});

defineType("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

defineType("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"]
});

defineType("FunctionDeclaration", {
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

defineType("FunctionExpression", {
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

defineType("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression"]
});

defineType("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement"]
});

defineType("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"]
});

defineType("Literal", {
  builder: ["value"],
  aliases: ["Expression", "Pure"]
});

defineType("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

defineType("MemberExpression", {
  builder: {
    object: null,
    property: null,
    computed: false
  },
  visitor: ["object", "property"],
  aliases: ["Expression"]
});

defineType("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

defineType("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"]
});

defineType("Program", {
  visitor: ["body"],
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

defineType("Property", {
  builder: {
    kind: "init",
    key: null,
    value: null,
    computed: false
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable"]
});

defineType("RestElement", {
  visitor: ["argument", "typeAnnotation"]
});

defineType("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

defineType("SequenceExpression", {
  visitor: ["expressions"],
  aliases: ["Expression"]
});

defineType("SwitchCase", {
  visitor: ["test", "consequent"]
});

defineType("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"]
});

defineType("ThisExpression", {
  aliases: ["Expression"]
});

defineType("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

defineType("TryStatement", {
  builder: ["block", "handler", "finalizer"],
  visitor: ["block", "handlers", "handler", "guardedHandlers", "finalizer"],
  aliases: ["Statement"]
});

defineType("UnaryExpression", {
  builder: {
    operator: null,
    argument: null,
    prefix: false
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

defineType("UpdateExpression", {
  builder: {
    operator: null,
    argument: null,
    prefix: false
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

defineType("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"]
});

defineType("VariableDeclarator", {
  visitor: ["id", "init"]
});

defineType("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

defineType("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"]
});
