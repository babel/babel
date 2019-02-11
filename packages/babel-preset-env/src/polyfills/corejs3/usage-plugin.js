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

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the direct import of \`core-js\` or use \`useBuiltIns: 'entry'\` instead.`;

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

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },
    Program: {
      enter(path) {
        path.get("body").forEach(bodyPath => {
          if (isPolyfillRequire(t, bodyPath)) {
            console.warn(NO_DIRECT_POLYFILL_IMPORT);
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
      this.addUnsupported(builtIn);
    },

    // for-of loop
    ForOfStatement() {
      this.addUnsupported(CommonIterators);
    },

    // spread
    ArrayExpression(path) {
      if (path.node.elements.some(el => el.type === "SpreadElement")) {
        this.addUnsupported(CommonIterators);
      }
    },

    // yield*
    YieldExpression(path) {
      if (!path.node.delegate) return;

      this.addUnsupported(CommonIterators);
    },

    // Array.from
    MemberExpression: {
      enter(path) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const { object, property } = node;

        if (!t.isReferenced(object, node)) return;
        let instanceType;
        let evaluatedPropType = object.name;
        let propertyName = property.name;
        if (node.computed) {
          if (t.isStringLiteral(property)) {
            propertyName = property.value;
          } else {
            const res = path.get("property").evaluate();
            if (res.confident && res.value) {
              propertyName = res.value;
            }
          }
        }
        if (path.scope.getBindingIdentifier(object.name)) {
          const result = path.get("object").evaluate();
          if (result.value) {
            instanceType = getType(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }
        if (has(definitions.staticMethods, evaluatedPropType)) {
          const staticMethods = definitions.staticMethods[evaluatedPropType];
          if (has(staticMethods, propertyName)) {
            const builtIn = staticMethods[propertyName];
            this.addUnsupported(builtIn);
          }
        }

        if (has(definitions.instanceMethods, propertyName)) {
          let builtIn = definitions.instanceMethods[propertyName];
          if (instanceType) {
            builtIn = builtIn.filter(item => item.includes(instanceType));
          }
          this.addUnsupported(builtIn);
        }
      },

      // Symbol.match
      exit(path) {
        if (!path.isReferenced()) return;

        const { name } = path.node.object;

        if (!has(definitions.builtins, name)) return;
        if (path.scope.getBindingIdentifier(name)) return;

        const builtIn = definitions.builtins[name];
        this.addUnsupported(builtIn);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path) {
      const { node } = path;

      const { id, init } = node;

      // destructuring
      if (id.type === "ArrayPattern") {
        this.addUnsupported(CommonIterators);
      }

      if (!path.isReferenced()) return;

      if (!t.isObjectPattern(id)) return;
      if (!t.isReferenced(init, node)) return;

      // doesn't reference the global
      if (init && path.scope.getBindingIdentifier(init.name)) return;

      for (const { key } of id.properties) {
        if (
          !node.computed &&
          t.isIdentifier(key) &&
          has(definitions.instanceMethods, key.name)
        ) {
          const builtIn = definitions.instanceMethods[key.name];
          this.addUnsupported(builtIn);
        }
      }
    },

    // destructuring
    AssignmentExpression(path) {
      if (path.node.left.type === "ArrayPattern") {
        this.addUnsupported(CommonIterators);
      }
    },
    // destructuring
    CatchClause(path) {
      const { param } = path.node;
      if (param && param.type === "ArrayPattern") {
        this.addUnsupported(CommonIterators);
      }
    },
    // destructuring
    ForXStatement(path) {
      if (path.node.left.type === "ArrayPattern") {
        this.addUnsupported(CommonIterators);
      }
    },

    Function(path) {
      const { node } = path;

      // destructuring
      if (node.params.some(param => param.type === "ArrayPattern")) {
        this.addUnsupported(CommonIterators);
      }

      if (node.async) {
        this.addUnsupported(PromiseDependencies);
      }
    },
  };

  return {
    name: "corejs3-usage",
    pre({ path }) {
      this.builtIns = new Set();

      this.addImport = function(builtIn) {
        if (builtIn && !this.builtIns.has(builtIn) && available.has(builtIn)) {
          this.builtIns.add(builtIn);
          createImport(path, builtIn);
        }
      };

      this.addUnsupported = function(builtIn) {
        const list = Array.isArray(builtIn) ? builtIn : [builtIn];
        for (const mod of list) {
          if (polyfills.has(mod)) {
            this.addImport(mod);
          }
        }
      };
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
