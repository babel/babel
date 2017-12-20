/* Babel 7 transform */

const babylon = require("babylon");
const generate = require("@babel/generator").default;

function printNode(ast) {
  return generate(ast, {}).code;
}

function parse(code) {
  return babylon.parse(code, {
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
  }).program;
}

const transform = require("nodent-transform").transform;

function transformAsyncToPromises(api, options) {
  let requiresTranspilation = (options, false);

  return {
    visitor: {
      Program: {
        enter: function() {
          requiresTranspilation = false;
        },
        exit: function(path, state) {
          state;
          /*`runtime` Falsy for none (inline all the runtime calls), or a
           * string specifying the local identifier for the runtime
           */
          const runtime = "";

          // Check if there was an async or await keyword before bothering to process the AST
          if (!requiresTranspilation) return;

          const newAst = transform(
            {
              // Input: the ast and filename
              filename: "filename-goes-here",
              ast: path.node,
            },
            {
              // Code generation options
              es6target: false,
              babelTree: true,
              engine: false,
              generators: false,
              promises: true,
              lazyThenables: false,
              wrapAwait: true,
              noRuntime: !runtime,
              $runtime: runtime,
              generatedSymbolPrefix: "$",
              $return: "$return",
              $error: "$error",
              $arguments: "$args",
              $Promise: "Promise",
              $asyncspawn: "$asyncspawn",
              $asyncbind: "$asyncbind",
              $makeThenable: "$makeThenable",
            },
            {
              // Helpers for the transformer:
              parse: parse, // Parse a JS fragment into an AST
              printNode: printNode, // Print a node as JS source
              logger: console.log.bind(console), // Log a warning
            },
          ).ast;

          if (runtime) {
            newAst.body.splice(0, 0, {
              type: "ImportDeclaration",
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: {
                    type: "Identifier",
                    name: runtime,
                  },
                },
              ],
              importKind: "value",
              source: {
                type: "StringLiteral",
                value: "nodent-runtime/promise",
              },
            });
          }
        },
      },

      AwaitExpression: function Function() {
        requiresTranspilation = true;
      },

      Function: function Function(path) {
        if (path.node.async) {
          requiresTranspilation = true;
        }
      },
    },
  };
}

module.exports = transformAsyncToPromises;
