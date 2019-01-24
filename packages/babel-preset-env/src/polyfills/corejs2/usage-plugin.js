import { definitions } from "./built-in-definitions";
import { logUsagePolyfills } from "../../debug";
import { createImport, isPolyfillSource, isRequire } from "../../utils";

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function getType(target) {
  if (Array.isArray(target)) return "array";
  return typeof target;
}

export default function({ types: t }) {
  function addImport(path, builtIn, builtIns) {
    if (builtIn && !builtIns.has(builtIn)) {
      builtIns.add(builtIn);
      createImport(path, builtIn);
    }
  }

  function addUnsupported(path, polyfills, builtIn, builtIns) {
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

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        console.warn(
          `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`import '@babel/polyfill'\` call or use \`useBuiltIns: 'entry'\` instead.`,
        );
        path.remove();
      }
    },
    Program: {
      enter(path) {
        path.get("body").forEach(bodyPath => {
          if (isRequire(t, bodyPath)) {
            console.warn(
              `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`require('@babel/polyfill')\` call or use \`useBuiltIns: 'entry'\` instead.`,
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
        let instanceType;
        let evaluatedPropType = obj.name;
        let propName = prop.name;
        if (node.computed) {
          if (t.isStringLiteral(prop)) {
            propName = prop.value;
          } else {
            const res = path.get("property").evaluate();
            if (res.confident && res.value) {
              propName = res.value;
            }
          }
        }
        if (path.scope.getBindingIdentifier(obj.name)) {
          const result = path.get("object").evaluate();
          if (result.value) {
            instanceType = getType(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }
        if (has(definitions.staticMethods, evaluatedPropType)) {
          const staticMethods = definitions.staticMethods[evaluatedPropType];
          if (has(staticMethods, propName)) {
            const builtIn = staticMethods[propName];
            addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
          }
        }

        if (has(definitions.instanceMethods, propName)) {
          let builtIn = definitions.instanceMethods[propName];
          if (instanceType) {
            builtIn = builtIn.filter(item => item.includes(instanceType));
          }
          addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
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
      if (!t.isReferenced(obj, node)) return;

      // doesn't reference the global
      if (obj && path.scope.getBindingIdentifier(obj.name)) return;

      for (let prop of node.id.properties) {
        prop = prop.key;
        if (
          !node.computed &&
          t.isIdentifier(prop) &&
          has(definitions.instanceMethods, prop.name)
        ) {
          const builtIn = definitions.instanceMethods[prop.name];
          addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
        }
      }
    },
  };

  return {
    name: "corejs2-usage",
    pre() {
      this.builtIns = new Set();
    },
    post() {
      const { debug, polyfillTargets, allBuiltInsList } = this.opts;

      if (debug) {
        logUsagePolyfills(
          this.builtIns,
          this.file.opts.filename,
          polyfillTargets,
          allBuiltInsList,
        );
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
