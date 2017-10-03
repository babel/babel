//@flow

import { definitions } from "./built-in-definitions";
import { logUsagePolyfills } from "./debug";

type Plugin = {
  visitor: Object,
  pre: Function,
  name: string,
};

function isPolyfillSource(value: string): boolean {
  return value === "babel-polyfill";
}

// function warnOnInstanceMethod() {
// state.opts.debug &&
//   console.warn(
//     `Adding a polyfill: An instance method may have been used: ${details}`,
//   );
// }

function has(obj: Object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// function getObjectString(node: Object): string {
//   if (node.type === "Identifier") {
//     return node.name;
//   } else if (node.type === "MemberExpression") {
//     return `${getObjectString(node.object)}.${getObjectString(node.property)}`;
//   }
//   return node.name;
// }

const modulePathMap = {
  "regenerator-runtime": "babel-polyfill/lib/regenerator-runtime/runtime",
};

const getModulePath = module => {
  return (
    modulePathMap[module] || `babel-polyfill/lib/core-js/modules/${module}`
  );
};

export default function({ types: t }: { types: Object }): Plugin {
  function addImport(
    path: Object,
    builtIn: string,
    builtIns: Set<string>,
  ): void {
    if (builtIn && !builtIns.has(builtIn)) {
      builtIns.add(builtIn);

      const importDec = t.importDeclaration(
        [],
        t.stringLiteral(getModulePath(builtIn)),
      );

      importDec._blockHoist = 3;
      const programPath = path.find(path => path.isProgram());
      programPath.unshiftContainer("body", importDec);
    }
  }

  function addUnsupported(
    path: Object,
    polyfills: Set<string>,
    builtIn: Array<string> | string,
    builtIns: Set<string>,
  ): void {
    if (Array.isArray(builtIn)) {
      for (const i of builtIn) {
        if (polyfills.has(i)) {
          addImport(path, i, builtIns);
        }
      }
    } else {
      if (polyfills.has(builtIn)) {
        addImport(path, builtIn, builtIns);
      }
    }
  }

  function isRequire(path: Object): boolean {
    return (
      t.isExpressionStatement(path.node) &&
      t.isCallExpression(path.node.expression) &&
      t.isIdentifier(path.node.expression.callee) &&
      path.node.expression.callee.name === "require" &&
      path.node.expression.arguments.length === 1 &&
      t.isStringLiteral(path.node.expression.arguments[0]) &&
      isPolyfillSource(path.node.expression.arguments[0].value)
    );
  }

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        console.warn(
          `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`import 'babel-polyfill'\` call or use \`useBuiltIns: 'entry'\` instead.`,
        );
        path.remove();
      }
    },
    Program: {
      enter(path) {
        path.get("body").forEach(bodyPath => {
          if (isRequire(bodyPath)) {
            console.warn(
              `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`require('babel-polyfill')\` call or use \`useBuiltIns: 'entry'\` instead.`,
            );
            bodyPath.remove();
          }
        });
      },
    },

    // Symbol()
    // new Promise
    ReferencedIdentifier(path, state) {
      const { node, parent, scope } = path;

      if (t.isMemberExpression(parent)) return;
      if (!has(definitions.builtins, node.name)) return;
      if (scope.getBindingIdentifier(node.name)) return;

      const builtIn = definitions.builtins[node.name];
      addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
    },

    // arr[Symbol.iterator]()
    CallExpression(path) {
      // we can't compile this
      if (path.node.arguments.length) return;

      const callee = path.node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!callee.computed) return;
      if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
        return;
      }

      addImport(path, "web.dom.iterable", this.builtIns);
    },

    // Symbol.iterator in arr
    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      if (!path.get("left").matchesPattern("Symbol.iterator")) return;

      addImport(path, "web.dom.iterable", this.builtIns);
    },

    // yield*
    YieldExpression(path) {
      if (!path.node.delegate) return;

      addImport(path, "web.dom.iterable", this.builtIns);
    },

    // Array.from
    MemberExpression: {
      enter(path, state) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const obj = node.object;
        const prop = node.property;

        if (!t.isReferenced(obj, node)) return;

        // doesn't reference the global
        if (path.scope.getBindingIdentifier(obj.name)) return;

        if (has(definitions.staticMethods, obj.name)) {
          const staticMethods = definitions.staticMethods[obj.name];
          if (has(staticMethods, prop.name)) {
            const builtIn = staticMethods[prop.name];
            addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
            // if (obj.name === "Array" && prop.name === "from") {
            //   addImport(
            //     path,
            //     "babel-polyfill/lib/core-js/modules/web.dom.iterable",
            //     this.builtIns,
            //   );
            // }
          }
        }

        if (
          !node.computed &&
          t.isIdentifier(prop) &&
          has(definitions.instanceMethods, prop.name)
        ) {
          //warnOnInstanceMethod(state, getObjectString(node));
          const builtIn = definitions.instanceMethods[prop.name];
          addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
        } else if (node.computed) {
          if (
            t.isStringLiteral(prop) &&
            has(definitions.instanceMethods, prop.value)
          ) {
            const builtIn = definitions.instanceMethods[prop.value];
            //warnOnInstanceMethod(state, `${obj.name}['${prop.value}']`);
            addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
          } else {
            const res = path.get("property").evaluate();
            if (res.confident) {
              const builtIn = definitions.instanceMethods[res.value];
              //warnOnInstanceMethod(state, `${obj.name}['${res.value}']`);
              addUnsupported(
                path.get("property"),
                state.opts.polyfills,
                builtIn,
                this.builtIns,
              );
            }
          }
        }
      },

      // Symbol.match
      exit(path, state) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const obj = node.object;

        if (!has(definitions.builtins, obj.name)) return;
        if (path.scope.getBindingIdentifier(obj.name)) return;

        const builtIn = definitions.builtins[obj.name];
        addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path, state) {
      if (!path.isReferenced()) return;

      const { node } = path;
      const obj = node.init;

      if (!t.isObjectPattern(node.id)) return;
      const props = node.id.properties;

      if (!t.isReferenced(obj, node)) return;

      // doesn't reference the global
      if (path.scope.getBindingIdentifier(obj.name)) return;

      for (let prop of props) {
        prop = prop.key;
        if (
          !node.computed &&
          t.isIdentifier(prop) &&
          has(definitions.instanceMethods, prop.name)
        ) {
          // warnOnInstanceMethod(
          //   state,
          //   `${path.parentPath.node.kind} { ${prop.name} } = ${obj.name}`,
          // );

          const builtIn = definitions.instanceMethods[prop.name];
          addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
        }
      }
    },

    Function(path, state) {
      if (!this.usesRegenerator && (path.node.generator || path.node.async)) {
        this.usesRegenerator = true;
        if (state.opts.regenerator) {
          addImport(path, "regenerator-runtime", this.builtIns);
        }
      }
    },
  };

  return {
    name: "use-built-ins",
    pre() {
      this.builtIns = new Set();
      this.usesRegenerator = false;
    },
    post() {
      const { debug, onDebug } = this.opts;

      if (debug) {
        logUsagePolyfills(this.builtIns, this.file.opts.filename, onDebug);
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
