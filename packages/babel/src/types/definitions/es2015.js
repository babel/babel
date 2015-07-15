import define from "./index";

define("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern"]
});

define("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern"]
});

define("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

define("ClassBody", {
  visitor: ["body"]
});

define("ClassDeclaration", {
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration"]
});

define("ClassExpression", {
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"]
});

define("ExportAllDeclaration", {
  visitor: ["source", "exported"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

define("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

define("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

define("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

define("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

define("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"]
});

define("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

define("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"]
});

define("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

define("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

define("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"]
});

define("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"]
});

define("MethodDefinition", {
  builder: {
    key: null,
    value: null,
    kind: "method",
    computed: false,
    static: false
  },
  visitor: ["key", "value", "decorators"]
});

define("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern"]
});

define("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});

define("Super", {
  aliases: ["Expression"]
});

define("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"]
});

define("TemplateElement");

define("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression"]
});

define("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});
