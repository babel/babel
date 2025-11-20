import * as t from "../lib/index.js";
import { multiple as getFixtures } from "@babel/helper-fixtures";
import { readFileSync } from "node:fs";
import { inspect } from "node:util";
import { commonJS } from "$repo-utils";
import path from "node:path";

const { __dirname } = commonJS(import.meta.url);

const ignoredFields = {
  ArrowFunctionExpression: { id: true },
  ClassMethod: { id: true, predicate: true },
  ClassPrivateMethod: { id: true, predicate: true },
  ClassPrivateProperty: { declare: true, optional: true },
  ObjectProperty: { method: true },
  ObjectMethod: { method: true, id: true, predicate: true },
  TSDeclareMethod: { id: true },
};

const ignoredVisitorKeysCheckTypes = {
  Placeholder: true,
  // See the Program's definition for why `interpreter` is excluded
  Program: { interpreter: true },
};

describe("NODE_FIELDS contains all fields, VISITOR_KEYS contains all AST nodes, and the visitor order is correct, in", function () {
  const reportedVisitorOrders = new Set();
  const { traverseFast, VISITOR_KEYS } = t;

  const projectRoot = path.resolve(__dirname, "../../..");
  const parserTestFixtureRoot = path.resolve(
    projectRoot,
    "./packages/babel-parser/test/fixtures",
  );
  const fixtures = getFixtures(parserTestFixtureRoot);
  for (const name in fixtures) {
    const testSuites = fixtures[name];
    for (const { tests } of testSuites) {
      for (const test of tests) {
        const testFn = test.disabled ? it.skip : it;
        const options = test.options;
        if (
          options.throws ||
          // Ignore test with estree plugins
          (options.plugins || []).some(plugin =>
            Array.isArray(plugin)
              ? ["estree"].includes(plugin[0])
              : ["estree"].includes(plugin),
          )
        ) {
          continue;
        }

        testFn(test.actual.loc, () => {
          const ast = JSON.parse(readFileSync(test.expect.loc, "utf-8"));
          if (ast.type === "File" && ast.errors && ast.errors.length) return;
          t[`assert${ast.type}`](ast);
          let missingFields = null;
          traverseFast(ast, node => {
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
              if (missingFields === null) missingFields = {};
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
                if (missingFields === null) missingFields = {};
                if (!missingFields[type]) missingFields[type] = {};
                if (!missingFields[type][field]) {
                  missingFields[type][field] = true;
                }
              }

              if (
                !VISITOR_KEYS[type].includes(field) &&
                node[field] != null &&
                typeof node[field] === "object" &&
                node[field].type &&
                !(
                  ignoredVisitorKeysCheckTypes[type] === true ||
                  (ignoredVisitorKeysCheckTypes[type] !== undefined &&
                    ignoredVisitorKeysCheckTypes[type][field] === true)
                )
              ) {
                throw new Error(
                  `${type}.${field} is an AST node (type=${node[field].type}), but "${field}" is missing in "${type}"'s current visitors definition: ${inspect(VISITOR_KEYS[type])}`,
                );
              }
            }

            if (missingFields !== null) {
              throw new Error(
                `The following NODE_FIELDS were missing: ${inspect(missingFields)}`,
              );
            }

            if (
              type === "ObjectTypeInternalSlot" ||
              type === "ObjectTypeProperty" ||
              type === "ObjectTypeAnnotation"
            ) {
              // We don't validate the visitor order of ObjectTypeInternalSlot and
              // ObjectTypeProperty because their fields' locations intersect. In
              //    interface { [[foo]](): X }
              // there is a field "key" covering `foo`, and a field "value" covering
              // `[[foo]](): X`. Same for `interface { get foo(): X }`.
              // The defined visitor order is that they key is visited first.

              // We don't validate the visitor order of ObjectTypeAnnotation because `indexers` and `properties` locations can intersect. In
              // var a: { [key: string]: number; foo: string; [bar: number]: number; };
              // the `indexers` field covers `[key: string]: number;` and `[bar: number]: number;`, and the `properties` field covers `foo: string;`.
              // The defined visitor order is "properties", "indexers" and "callProperties"
              return;
            }

            const keys = VISITOR_KEYS[type];
            const isNullOrEmptyArray = node => {
              return node == null || (Array.isArray(node) && node.length === 0);
            };
            const getNodeStart = node => {
              return Array.isArray(node) ? node[0].start : node.start;
            };

            for (let prev, i = 0; i < keys.length; i++) {
              if (isNullOrEmptyArray(node[prev])) {
                prev = keys[i];
                continue;
              }
              const curr = keys[i];
              if (isNullOrEmptyArray(node[curr])) continue;

              const prevStart = getNodeStart(node[prev]);
              const currStart = getNodeStart(node[curr]);
              if (prevStart == null) {
                throw new Error(
                  `Invalid AST: can not get start of ${prev} in ${type}`,
                );
              }
              if (currStart == null) {
                throw new Error(
                  `Invalid AST: can not get start of ${curr} in ${type}`,
                );
              }

              if (prevStart > currStart) {
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
        });
      }
    }
  }
});
