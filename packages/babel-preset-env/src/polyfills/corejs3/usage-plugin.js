import corejs3Polyfills from "core-js-compat/data";
import corejs3ShippedProposalsList from "./shipped-proposals";
import getModulesListForTargetVersion from "./get-modules-list-for-target-version";
import filterItems from "../../filter-items";
import {
  BuiltIns,
  StaticProperties,
  InstanceProperties,
  CommonIterators,
  CommonInstanceDependencies,
  PromiseDependencies,
} from "./built-in-definitions";
import {
  createImport,
  getType,
  has,
  intersection,
  isPolyfillSource,
  isPolyfillRequire,
} from "../../utils";
import { logUsagePolyfills } from "../../debug";

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

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillRequire(t, bodyPath)) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    CallExpression({ node }) {
      if (t.isImport(node.callee)) {
        this.addUnsupported(PromiseDependencies);
      }
    },

    // Symbol()
    // new Promise
    ReferencedIdentifier({ node: { name }, parent, scope }) {
      if (t.isMemberExpression(parent)) return;
      if (!has(BuiltIns, name)) return;
      if (scope.getBindingIdentifier(name)) return;

      const BuiltInDependencies = BuiltIns[name];
      this.addUnsupported(BuiltInDependencies);
    },

    // for-of loop
    ForOfStatement() {
      this.addUnsupported(CommonIterators);
    },

    // spread
    ArrayExpression({ node }) {
      if (node.elements.some(el => t.isSpreadElement(el))) {
        this.addUnsupported(CommonIterators);
      }
    },

    // yield*
    YieldExpression({ node }) {
      if (node.delegate) {
        this.addUnsupported(CommonIterators);
      }
    },

    // Array.from
    MemberExpression: {
      enter(path) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const { object, property } = node;

        if (!t.isReferenced(object, node)) return;

        let evaluatedPropType = object.name;
        let propertyName = property.name;
        let instanceType;

        if (node.computed) {
          if (t.isStringLiteral(property)) {
            propertyName = property.value;
          } else {
            const result = path.get("property").evaluate();
            if (result.confident && result.value) {
              propertyName = result.value;
            }
          }
        }

        if (
          !t.isIdentifier(object) ||
          path.scope.getBindingIdentifier(object.name)
        ) {
          const result = path.get("object").evaluate();
          if (result.value !== undefined) {
            instanceType = getType(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }

        if (has(StaticProperties, evaluatedPropType)) {
          const BuiltInProperties = StaticProperties[evaluatedPropType];
          if (has(BuiltInProperties, propertyName)) {
            const StaticPropertyDependencies = BuiltInProperties[propertyName];
            this.addUnsupported(StaticPropertyDependencies);
          }
        }

        if (has(InstanceProperties, propertyName)) {
          let InstancePropertyDependencies = InstanceProperties[propertyName];
          if (instanceType) {
            InstancePropertyDependencies = InstancePropertyDependencies.filter(
              module =>
                module.includes(instanceType) ||
                CommonInstanceDependencies.has(module),
            );
          }
          this.addUnsupported(InstancePropertyDependencies);
        }
      },

      // Symbol.match
      exit(path) {
        if (!path.isReferenced()) return;

        const { name } = path.node.object;

        if (!has(BuiltIns, name)) return;
        if (path.scope.getBindingIdentifier(name)) return;

        const BuiltInDependencies = BuiltIns[name];
        this.addUnsupported(BuiltInDependencies);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path) {
      const { node } = path;

      const { id, init } = node;

      // destructuring
      if (t.isArrayPattern(id)) {
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
          has(InstanceProperties, key.name)
        ) {
          const InstancePropertyDependencies = InstanceProperties[key.name];
          this.addUnsupported(InstancePropertyDependencies);
        }
      }
    },

    // destructuring
    AssignmentExpression({ node }) {
      if (t.isArrayPattern(node.left)) {
        this.addUnsupported(CommonIterators);
      }
    },

    // destructuring
    CatchClause({ node }) {
      if (t.isArrayPattern(node.param)) {
        this.addUnsupported(CommonIterators);
      }
    },

    // destructuring
    ForXStatement({ node }) {
      if (t.isArrayPattern(node.left)) {
        this.addUnsupported(CommonIterators);
      }
    },

    Function({ node }) {
      // destructuring
      if (node.params.some(param => t.isArrayPattern(param))) {
        this.addUnsupported(CommonIterators);
      }

      if (node.async) {
        this.addUnsupported(PromiseDependencies);
      }
    },
  };

  return {
    name: "corejs3-usage",
    pre() {
      this.polyfillsSet = new Set();

      this.addUnsupported = function(builtIn) {
        const modules = Array.isArray(builtIn) ? builtIn : [builtIn];

        for (const module of modules) {
          this.polyfillsSet.add(module);
        }
      };
    },
    post({ path }) {
      const filtered = intersection(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        createImport(path, module);
      }

      if (debug) {
        logUsagePolyfills(
          filtered,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
