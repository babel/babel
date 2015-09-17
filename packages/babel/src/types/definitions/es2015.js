import defineType from "./index";

defineType("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern"]
});

defineType("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern"]
});

defineType("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

defineType("ClassBody", {
  visitor: ["body"]
});

defineType("ClassDeclaration", {
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration"]
});

defineType("ClassExpression", {
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"]
});

defineType("ExportAllDeclaration", {
  visitor: ["source", "exported"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

defineType("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

defineType("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

defineType("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

defineType("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

defineType("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"]
});

defineType("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

defineType("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"]
});

defineType("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

defineType("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

defineType("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"]
});

defineType("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"]
});

defineType("MethodDefinition", {
  builder: {
    key: null,
    value: null,
    kind: "method",
    computed: false,
    static: false
  },
  visitor: ["key", "value", "decorators"]
});

defineType("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern"]
});

defineType("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});

defineType("Super", {
  aliases: ["Expression"]
});

defineType("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"]
});

defineType("TemplateElement");

defineType("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression"]
});

defineType("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});
