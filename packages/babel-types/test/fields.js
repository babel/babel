import * as t from "../lib/index.js";
import glob from "glob";
import path from "path";
import fs from "fs";
import { inspect } from "util";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packages = path.resolve(dirname, "..", "..");

function readJson(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function traverse(thing, visitor) {
  if (Array.isArray(thing)) {
    thing.forEach(elem => traverse(elem, visitor));
  } else if (thing instanceof Object && typeof thing.type === "string") {
    visitor(thing);
    for (const key in thing) {
      const value = thing[key];
      if (value instanceof Object) traverse(value, visitor);
    }
  }
}

const files = glob.sync(
  path.join("babel-parser", "test", "**", "output.json"),
  {
    cwd: packages,
    ignore: [
      path.join("**", "estree*", "**"),
      path.join("**", "is-expression-babel-parser", "**"),
    ],
  },
);

const ignoredFields = {
  ArrowFunctionExpression: { id: true, predicate: true },
  ClassMethod: { id: true, predicate: true },
  ClassPrivateMethod: { id: true, predicate: true },
  ClassPrivateProperty: { declare: true, optional: true },
  FunctionDeclaration: { predicate: true },
  FunctionExpression: { predicate: true },
  ImportDeclaration: { attributes: true },
  ObjectProperty: { method: true },
  ObjectMethod: { method: true, id: true, predicate: true },
  StaticBlock: { static: true },
  TSDeclareMethod: { id: true },
  ...(process.env.BABEL_8_BREAKING
    ? {
        TSFunctionType: { parameters: true, typeAnnotation: true },
        TSMethodSignature: { parameters: true, typeAnnotation: true },
        TSConstructorType: { parameters: true, typeAnnotation: true },
        TSCallSignatureDeclaration: { parameters: true, typeAnnotation: true },
        TSConstructSignatureDeclaration: {
          parameters: true,
          typeAnnotation: true,
        },
        TSMappedType: { typeParameter: true },
      }
    : {
        TSFunctionType: { params: true, returnType: true },
        TSMethodSignature: { params: true, returnType: true },
        TSConstructorType: { params: true, returnType: true },
        TSCallSignatureDeclaration: { params: true, returnType: true },
        TSConstructSignatureDeclaration: { params: true, returnType: true },
        TSMappedType: { key: true, constraint: true },
      }),
};

function isEmpty(obj) {
  for (const key in obj) return false;
  return true;
}

describe("NODE_FIELDS contains all fields, and the visitor order is correct, in", function () {
  const reportedVisitorOrders = new Set();

  it.each(files)("%s", async file => {
    const ast = await readJson(path.resolve(packages, file));
    if (ast.type === "File" && ast.errors && ast.errors.length) return;
    t[`assert${ast.type}`](ast);
    const missingFields = {};
    traverse(ast, node => {
      const { type } = node;
      switch (type) {
        case "File":
        case "CommentBlock":
        case "CommentLine":
          return;
      }
      if (ignoredFields[type] === true) return;
      const fields = t.NODE_FIELDS[type];
      if (!fields) {
        if (!missingFields[type]) {
          missingFields[type] = {
            MISSING_TYPE: true,
          };
        }
        return;
      }
      for (const field in node) {
        switch (field) {
          case "type":
          case "start":
          case "end":
          case "loc":
          case "range":
          case "leadingComments":
          case "innerComments":
          case "trailingComments":
          case "comments":
          case "extra":
            continue;
        }
        if (!fields[field]) {
          if (ignoredFields[type] && ignoredFields[type][field]) continue;
          if (!missingFields[type]) missingFields[type] = {};
          if (!missingFields[type][field]) {
            missingFields[type][field] = true;
          }
        }
      }

      if (type === "ObjectTypeInternalSlot" || type === "ObjectTypeProperty") {
        // We don't validate the visitor order of ObjectTypeInternalSlot and
        // ObjectTypeProperty because their fields' locations intersect. In
        //    interface { [[foo]](): X }
        // there is a field "key" covering `foo`, and a field "value" covering
        // `[[foo]](): X`. Same for `interface { get foo(): X }`.
        // The defined visitor order is that they key is visited first.
        return;
      }

      const keys = t.VISITOR_KEYS[type];
      for (let prev, i = 0; i < keys.length; i++) {
        if (!node[prev]) {
          prev = keys[i];
          continue;
        }
        const curr = keys[i];
        if (!node[curr]) continue;

        if (node[prev].start > node[curr].start) {
          const errorKey = `${type}-${prev}-${curr}`;
          if (!reportedVisitorOrders.has(errorKey)) {
            reportedVisitorOrders.add(errorKey);
            throw new Error(
              `The visitor order of ${type} is incorrect: ${prev}, ${curr}`,
            );
          }
        }
        prev = curr;
      }
    });
    if (!isEmpty(missingFields)) {
      throw new Error(
        `The following NODE_FIELDS were missing: ${inspect(missingFields)}`,
      );
    }
  });
});
