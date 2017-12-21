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

/* Polyfill for Object.assign(...) from: 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
function assign(target) {
  // .length of function is 2
  "use strict";
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];

    if (nextSource != null) {
      for (const nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
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
        exit: function(path) {
          const runtime = options.runtime ? options.runtime : null;

          // Check if there was an async or await keyword before bothering to process the AST
          if (!requiresTranspilation) return;

          const newAst = transform(
            {
              // Input: the ast and filename
              filename: "filename-goes-here",
              ast: path.node,
            },
            assign(
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
              options.codeGenerationOptions,
            ),
            {
              // Helpers for the transformer:
              parse: parse, // Parse a JS fragment into an AST
              printNode: printNode, // Print a node as JS source
              logger: false /* console.log.bind(console)*/, // Log a warning
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
