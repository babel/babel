import { types as t, traverse } from "@babel/core";

function convertNodes(ast, code) {
  const astTransformVisitor = {
    noScope: true,
    enter(path) {
      const { node } = path;

      if (node.innerComments) {
        delete node.innerComments;
      }

      if (node.trailingComments) {
        delete node.trailingComments;
      }

      if (node.leadingComments) {
        delete node.leadingComments;
      }
    },
    exit(path) {
      const { node } = path;

      if (Object.hasOwnProperty.call(node, "extra")) {
        delete node.extra;
      }

      if (node.loc && Object.hasOwnProperty.call(node.loc, "identifierName")) {
        delete node.loc.identifierName;
      }

      if (path.isTypeParameter()) {
        node.type = "Identifier";
        node.typeAnnotation = node.bound;
        delete node.bound;
      }

      // flow: prevent "no-undef"
      // for "Component" in: "let x: React.Component"
      if (path.isQualifiedTypeIdentifier()) {
        delete node.id;
      }
      // for "b" in: "var a: { b: Foo }"
      if (path.isObjectTypeProperty()) {
        delete node.key;
      }
      // for "indexer" in: "var a: {[indexer: string]: number}"
      if (path.isObjectTypeIndexer()) {
        delete node.id;
      }
      // for "param" in: "var a: { func(param: Foo): Bar };"
      if (path.isFunctionTypeParam()) {
        delete node.name;
      }

      // modules
      if (path.isImportDeclaration()) {
        delete node.isType;
      }

      // template string range fixes
      if (path.isTemplateLiteral()) {
        for (let i = 0; i < node.quasis.length; i++) {
          const q = node.quasis[i];
          q.range[0] -= 1;
          if (q.tail) {
            q.range[1] += 1;
          } else {
            q.range[1] += 2;
          }
          q.loc.start.column -= 1;
          if (q.tail) {
            q.loc.end.column += 1;
          } else {
            q.loc.end.column += 2;
          }
        }
      }
    },
  };
  const state = { source: code };

  // Monkey patch visitor keys in order to be able to traverse the estree nodes
  t.VISITOR_KEYS.Property = t.VISITOR_KEYS.ObjectProperty;
  t.VISITOR_KEYS.MethodDefinition = [
    "key",
    "value",
    "decorators",
    "returnType",
    "typeParameters",
  ];

  traverse(ast, astTransformVisitor, null, state);

  // These can be safely deleted because they are not defined in the original visitor keys.
  delete t.VISITOR_KEYS.Property;
  delete t.VISITOR_KEYS.MethodDefinition;
}

function convertProgramNode(ast) {
  ast.type = "Program";
  ast.sourceType = ast.program.sourceType;
  ast.body = ast.program.body;
  delete ast.program;
  delete ast.errors;

  if (ast.comments.length) {
    const lastComment = ast.comments[ast.comments.length - 1];

    if (ast.tokens.length) {
      const lastToken = ast.tokens[ast.tokens.length - 1];

      if (lastComment.end > lastToken.end) {
        // If there is a comment after the last token, the program ends at the
        // last token and not the comment
        ast.range[1] = lastToken.end;
        ast.loc.end.line = lastToken.loc.end.line;
        ast.loc.end.column = lastToken.loc.end.column;
      }
    }
  } else {
    if (!ast.tokens.length) {
      ast.loc.start.line = 1;
      ast.loc.end.line = 1;
    }
  }

  if (ast.body && ast.body.length > 0) {
    ast.loc.start.line = ast.body[0].loc.start.line;
    ast.range[0] = ast.body[0].start;
  }
}

export default function convertAST(ast, code) {
  convertNodes(ast, code);
  convertProgramNode(ast);
}
