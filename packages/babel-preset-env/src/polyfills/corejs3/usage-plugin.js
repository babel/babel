import corejs3Polyfills from "core-js-compat/data";
import corejs3ShippedProposalsList from "./shipped-proposals";
import { filterItems } from "../../env-filter";
import {
  CommonIterators,
  PromiseDependencies,
  definitions,
} from "./built-in-definitions";
import { logUsagePolyfills } from "../../debug";
import {
  createImport,
  has,
  isPolyfillSource,
  isPolyfillRequire,
} from "../../utils";
import getModulesListForTargetVersion from "./get-modules-list-for-target-version";

const corejs3PolyfillsWithoutProposals = Object.keys(corejs3Polyfills)
  .filter(name => !name.startsWith("esnext."))
  .reduce((memo, key) => {
    memo[key] = corejs3Polyfills[key];
    return memo;
  }, {});

const corejs3PolyfillsWithShippedProposals = corejs3ShippedProposalsList.reduce(
  (memo, key) => {
    memo[key] = corejs3Polyfills[key];
    return memo;
  },
  { ...corejs3PolyfillsWithoutProposals },
);

function getType(target) {
  if (Array.isArray(target)) return "array";
  return typeof target;
}

export default function(
  { types: t },
  {
    corejs,
    include,
    exclude,
    polyfillTargets,
    proposals,
    shippedProposals,
    debug,
  },
) {
  const polyfills = filterItems(
    proposals
      ? corejs3Polyfills
      : shippedProposals
      ? corejs3PolyfillsWithShippedProposals
      : corejs3PolyfillsWithoutProposals,
    include,
    exclude,
    polyfillTargets,
  );

  const available = getModulesListForTargetVersion(corejs);

  function addImport(path, builtIn, builtIns) {
    if (builtIn && !builtIns.has(builtIn) && available.has(builtIn)) {
      builtIns.add(builtIn);
      createImport(path, builtIn);
    }
  }

  function addCommonIterators(path, builtIns) {
    addUnsupported(path, CommonIterators, builtIns);
  }

  function addUnsupported(path, builtIn, builtIns) {
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
    ReferencedIdentifier(path) {
      const { node, parent, scope } = path;

      if (t.isMemberExpression(parent)) return;
      if (!has(definitions.builtins, node.name)) return;
      if (scope.getBindingIdentifier(node.name)) return;

      const builtIn = definitions.builtins[node.name];
      addUnsupported(path, builtIn, this.builtIns);
    },

    // for-of loop
    ForOfStatement(path) {
      addCommonIterators(path, this.builtIns);
    },

    // spread
    ArrayExpression(path) {
      if (path.node.elements.some(el => el.type === "SpreadElement")) {
        addCommonIterators(path, this.builtIns);
      }
    },

    // yield*
    YieldExpression(path) {
      if (!path.node.delegate) return;

      addCommonIterators(path, this.builtIns);
    },

    // Array.from
    MemberExpression: {
      enter(path) {
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
            addUnsupported(path, builtIn, this.builtIns);
          }
        }

        if (has(definitions.instanceMethods, propName)) {
          let builtIn = definitions.instanceMethods[propName];
          if (instanceType) {
            builtIn = builtIn.filter(item => item.includes(instanceType));
          }
          addUnsupported(path, builtIn, this.builtIns);
        }
      },

      // Symbol.match
      exit(path) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const obj = node.object;

        if (!has(definitions.builtins, obj.name)) return;
        if (path.scope.getBindingIdentifier(obj.name)) return;

        const builtIn = definitions.builtins[obj.name];
        addUnsupported(path, builtIn, this.builtIns);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path) {
      const { node } = path;

      // destructuring
      if (node.id.type === "ArrayPattern") {
        addCommonIterators(path, this.builtIns);
      }

      if (!path.isReferenced()) return;

      const { init } = node;

      if (!t.isObjectPattern(node.id)) return;
      if (!t.isReferenced(init, node)) return;

      // doesn't reference the global
      if (init && path.scope.getBindingIdentifier(init.name)) return;

      for (const { key } of node.id.properties) {
        if (
          !node.computed &&
          t.isIdentifier(key) &&
          has(definitions.instanceMethods, key.name)
        ) {
          const builtIn = definitions.instanceMethods[key.name];
          addUnsupported(path, builtIn, this.builtIns);
        }
      }
    },

    // destructuring
    AssignmentExpression(path) {
      if (path.node.left.type === "ArrayPattern") {
        addCommonIterators(path, this.builtIns);
      }
    },
    // destructuring
    CatchClause(path) {
      const { node } = path;
      if (node.param && node.param.type === "ArrayPattern") {
        addCommonIterators(path, this.builtIns);
      }
    },
    // destructuring
    ForXStatement(path) {
      if (path.node.left.type === "ArrayPattern") {
        addCommonIterators(path, this.builtIns);
      }
    },

    Function(path) {
      const { node } = path;

      // destructuring
      if (node.params.some(param => param.type === "ArrayPattern")) {
        addCommonIterators(path, this.builtIns);
      }

      if (node.async) {
        addUnsupported(path, PromiseDependencies, this.builtIns);
      }
    },
  };

  return {
    name: "corejs3-usage",
    pre() {
      this.builtIns = new Set();
    },
    post() {
      if (debug) {
        logUsagePolyfills(
          this.builtIns,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
