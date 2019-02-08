import { definitions } from "./built-in-definitions";
import { logUsagePolyfills } from "../../debug";
import { createImport, isPolyfillSource, isPolyfillRequire } from "../../utils";
import getModulesListForTargetCoreJSVersion from "./get-modules-list-for-target-core-js-version";

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function getType(target) {
  if (Array.isArray(target)) return "array";
  return typeof target;
}

export default function({ types: t }, { corejs }) {
  const available = getModulesListForTargetCoreJSVersion(corejs);

  function addImport(path, builtIn, builtIns) {
    if (builtIn && !builtIns.has(builtIn) && available.has(builtIn)) {
      builtIns.add(builtIn);
      createImport(path, builtIn);
    }
  }

  function addCommonIterators(path, polyfills, builtIns) {
    addUnsupported(
      path,
      polyfills,
      [
        "es.array.iterator",
        "es.string.iterator",
        "web.dom-collections.iterator",
      ],
      builtIns,
    );
  }

  function addUnsupported(path, polyfills, builtIn, builtIns) {
    if (Array.isArray(builtIn)) {
      for (const mod of builtIn) {
        if (polyfills.has(mod)) {
          addImport(path, mod, builtIns);
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
          if (isPolyfillRequire(t, bodyPath)) {
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

    // for-of loop
    ForOfStatement(path, state) {
      addCommonIterators(path, state.opts.polyfills, this.builtIns);
    },

    // spread
    ArrayExpression(path, state) {
      if (path.node.elements.some(el => el.type === "SpreadElement")) {
        addCommonIterators(path, state.opts.polyfills, this.builtIns);
      }
    },

    // yield*
    YieldExpression(path, state) {
      if (!path.node.delegate) return;

      addCommonIterators(path, state.opts.polyfills, this.builtIns);
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
          //warnOnInstanceMethod(state, getObjectString(node));
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
      const { node } = path;

      // destructuring
      if (node.id.type === "ArrayPattern") {
        addCommonIterators(path, state.opts.polyfills, this.builtIns);
      }

      if (!path.isReferenced()) return;

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

    // destructuring
    AssignmentExpression(path, state) {
      if (path.node.left.type === "ArrayPattern") {
        addCommonIterators(path, state.opts.polyfills, this.builtIns);
      }
    },
    // destructuring
    CatchClause(path, state) {
      const { node } = path;
      if (node.param && node.param.type === "ArrayPattern") {
        addCommonIterators(path, state.opts.polyfills, this.builtIns);
      }
    },
    // destructuring
    ForXStatement(path, state) {
      if (path.node.left.type === "ArrayPattern") {
        addCommonIterators(path, state.opts.polyfills, this.builtIns);
      }
    },

    Function(path, state) {
      const { node } = path;
      const { polyfills } = state.opts;

      // destructuring
      if (node.params.some(param => param.type === "ArrayPattern")) {
        addCommonIterators(path, polyfills, this.builtIns);
      }

      if (node.async) {
        addUnsupported(
          path,
          polyfills,
          ["es.promise.finally", "es.promise"],
          this.builtIns,
        );
      }
    },
  };

  return {
    name: "corejs3-usage",
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
