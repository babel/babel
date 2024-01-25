import type * as t from "@babel/types";
import ESLINT_VERSION = require("../utils/eslint-version.cts");
import type { ParseResult } from "../types.d.cts";

function* it<T>(children: T | T[]) {
  if (Array.isArray(children)) yield* children;
  else yield children;
}

function traverse(
  node: t.Node,
  visitorKeys: Record<string, string[]>,
  visitor: typeof convertNodesVisitor,
) {
  const { type } = node;
  if (!type) return;
  const keys = visitorKeys[type];
  if (!keys) return;

  for (const key of keys) {
    for (const child of it(
      node[key as keyof t.Node] as unknown as t.Node | t.Node[],
    )) {
      if (child && typeof child === "object") {
        visitor.enter(child);
        traverse(child, visitorKeys, visitor);
        visitor.exit(child);
      }
    }
  }
}

const convertNodesVisitor = {
  enter(node: t.Node) {
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
  exit(node: t.Node) {
    // Used internally by @babel/parser.
    if (node.extra) {
      delete node.extra;
    }

    if (node.loc.identifierName) {
      delete node.loc.identifierName;
    }

    if (node.type === "TypeParameter") {
      // @ts-expect-error eslint
      node.type = "Identifier";
      // @ts-expect-error eslint
      node.typeAnnotation = node.bound;
      delete node.bound;
    }

    // flow: prevent "no-undef"
    // for "Component" in: "let x: React.Component"
    if (node.type === "QualifiedTypeIdentifier") {
      delete node.id;
    }
    // for "b" in: "var a: { b: Foo }"
    if (node.type === "ObjectTypeProperty") {
      delete node.key;
    }
    // for "indexer" in: "var a: {[indexer: string]: number}"
    if (node.type === "ObjectTypeIndexer") {
      delete node.id;
    }
    // for "param" in: "var a: { func(param: Foo): Bar };"
    if (node.type === "FunctionTypeParam") {
      delete node.name;
    }

    // modules
    if (node.type === "ImportDeclaration") {
      // @ts-expect-error legacy?
      delete node.isType;
    }

    // template string range fixes
    if (node.type === "TemplateLiteral") {
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

        if (ESLINT_VERSION >= 8) {
          q.start -= 1;
          if (q.tail) {
            q.end += 1;
          } else {
            q.end += 2;
          }
        }
      }
    }
  },
};

function convertNodes(ast: ParseResult, visitorKeys: Record<string, string[]>) {
  traverse(ast as unknown as t.Program, visitorKeys, convertNodesVisitor);
}

function convertProgramNode(ast: ParseResult) {
  const body = ast.program.body;
  Object.assign(ast, {
    type: "Program",
    sourceType: ast.program.sourceType,
    body,
  });
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

        if (ESLINT_VERSION >= 8) {
          ast.end = lastToken.end;
        }
      }
    }
  } else {
    if (!ast.tokens.length) {
      ast.loc.start.line = 1;
      ast.loc.end.line = 1;
    }
  }

  if (body?.length) {
    ast.loc.start.line = body[0].loc.start.line;
    ast.range[0] = body[0].start;

    if (ESLINT_VERSION >= 8) {
      ast.start = body[0].start;
    }
  }
}

export = function convertAST(
  ast: ParseResult,
  visitorKeys: Record<string, string[]>,
) {
  convertNodes(ast, visitorKeys);
  convertProgramNode(ast);
};
