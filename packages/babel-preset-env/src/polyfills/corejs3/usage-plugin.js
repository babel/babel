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
    // import 'babel-polyfill'
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },

    // require('babel-polyfill')
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillRequire(t, bodyPath)) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    // import('something').then(...)
    CallExpression({ node }) {
      if (t.isImport(node.callee)) {
        this.addUnsupported(PromiseDependencies);
      }
    },

    // for-of loop
    ForOfStatement() {
      this.addUnsupported(CommonIterators);
    },

    ArrayPattern() {
      // const [a, b] = c
      this.addUnsupported(CommonIterators);
    },

    ObjectPattern({ node, parent, scope }) {
      let canBeStatic, builtIn, right;
      if (t.isVariableDeclarator(parent)) {
        right = parent.init;
      } else if (t.isAssignmentExpression(parent)) {
        right = parent.right;
      }
      if (right) {
        builtIn = right.name;
        canBeStatic =
          has(StaticProperties, builtIn) &&
          !scope.getBindingIdentifier(builtIn);
      }

      for (const { key } of node.properties) {
        const name = t.isIdentifier(key)
          ? key.name
          : t.isStringLiteral(key)
          ? key.value
          : null;
        if (name) {
          (canBeStatic &&
            // const { keys, values } = Object
            this.addStaticPropertyDependencies(builtIn, name)) ||
            // const { keys, values } = [1, 2, 3]
            this.addInstancePropertyDependencies(name);
        }
      }
    },

    // [...spread]
    SpreadElement() {
      this.addUnsupported(CommonIterators);
    },

    // yield*
    YieldExpression({ node }) {
      if (node.delegate) {
        this.addUnsupported(CommonIterators);
      }
    },

    // Symbol(), new Promise
    ReferencedIdentifier({ node: { name }, scope }) {
      if (scope.getBindingIdentifier(name)) return;

      this.addBuiltInDependencies(name);
    },

    MemberExpression(path) {
      const { node, scope } = path;
      const { object, property } = node;
      let { name } = object;
      const bindingIdentifier = scope.getBindingIdentifier(name);
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

      if (!t.isIdentifier(object) || bindingIdentifier) {
        const result = path.get("object").evaluate();
        if (result.value !== undefined) {
          instanceType = getType(result.value);
        } else if (result.deopt && result.deopt.isIdentifier()) {
          name = result.deopt.node.name;
        }
      }

      // Array.from
      this.addStaticPropertyDependencies(name, propertyName) ||
        // string.includes
        this.addInstancePropertyDependencies(propertyName, instanceType);
    },

    Function({ node }) {
      // (async function () { }).finally(...)
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
        return true;
      };

      this.addBuiltInDependencies = function(builtIn) {
        if (!has(BuiltIns, builtIn)) return false;
        const BuiltInDependencies = BuiltIns[builtIn];
        return this.addUnsupported(BuiltInDependencies);
      };

      this.addStaticPropertyDependencies = function(builtIn, property) {
        if (!has(StaticProperties, builtIn)) return false;
        const BuiltInProperties = StaticProperties[builtIn];
        if (!has(BuiltInProperties, property)) return false;
        const StaticPropertyDependencies = BuiltInProperties[property];
        return this.addUnsupported(StaticPropertyDependencies);
      };

      this.addInstancePropertyDependencies = function(property, instanceType) {
        if (!has(InstanceProperties, property)) return false;
        let InstancePropertyDependencies = InstanceProperties[property];
        if (instanceType) {
          InstancePropertyDependencies = InstancePropertyDependencies.filter(
            module =>
              module.includes(instanceType) ||
              CommonInstanceDependencies.has(module),
          );
        }
        return this.addUnsupported(InstancePropertyDependencies);
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
