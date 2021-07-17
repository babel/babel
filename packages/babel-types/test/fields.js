import * as t from "../lib";
import glob from "glob";
import path from "path";
import fs from "fs";
import traverse from "@babel/traverse";

const packages = path.resolve(__dirname, "..", "..");

describe("NODE_FIELDS", function () {
  describe("includes all fields output by @babel/parser tests", function () {
    const files = glob.sync(
      path.join("babel-parser", "test", "**", "output.json"),
      {
        cwd: packages,
      },
    );
    files.forEach(file => {
      it(file, function () {
        const ast = JSON.parse(
          fs.readFileSync(path.resolve(packages, file), "utf8"),
        );
        traverse(ast, {
          Node({ node }) {
            const { type } = node;
            const fields = t.NODE_FIELDS[type];
            if (!fields) {
              throw new Error(`missing NODE_FIELDS[${JSON.stringify(type)}]`);
            }
            for (const field in node) {
              switch (field) {
                case "type":
                case "start":
                case "end":
                case "loc":
                  continue;
              }
              if (!fields[field]) {
                throw new Error(
                  `missing NODE_FIELDS[${JSON.stringify(
                    type,
                  )}][${JSON.stringify(
                    field,
                  )}], which was found in node: ${JSON.stringify(node)}`,
                );
              }
            }
          },
        });
      });
    });
  });
});
