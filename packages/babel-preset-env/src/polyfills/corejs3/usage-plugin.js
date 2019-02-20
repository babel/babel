import corejs3Polyfills from "core-js-compat/data";
import corejs3ShippedProposalsList from "./shipped-proposals";
import getModulesListForTargetVersion from "core-js-compat/get-modules-list-for-target-version";
import filterItems from "../../filter-items";
import {
  BuiltIns,
  StaticProperties,
  InstanceProperties,
  CommonIterators,
  CommonInstanceDependencies,
  PromiseDependencies,
  PossibleGlobalObjects,
} from "./built-in-definitions";
import {
  createImport,
  getType,
  has,
  intersection,
  isPolyfillSource,
  getImportSource,
  getRequireSource,
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

  const available = new Set(getModulesListForTargetVersion(corejs.version));

  function resolveKey(path, computed) {
    const { node, parent, scope } = path;
    if (path.isStringLiteral()) return node.value;
    const { name } = node;
    const isIdentifier = path.isIdentifier();
    if (isIdentifier && !(computed || parent.computed)) return name;
    if (!isIdentifier || scope.getBindingIdentifier(name)) {
      const { value } = path.evaluate();
      if (typeof value === "string") return value;
    }
  }

  function resolveSource(path) {
    const { node, scope } = path;
    let builtIn, instanceType;
    if (node) {
      builtIn = node.name;
      if (!path.isIdentifier() || scope.getBindingIdentifier(builtIn)) {
        const { deopt, value } = path.evaluate();
        if (value !== undefined) {
          instanceType = getType(value);
        } else if (deopt && deopt.isIdentifier()) {
          builtIn = deopt.node.name;
        }
      }
    }
    return { builtIn, instanceType };
  }

  const addAndRemovePolyfillImports = {
    // import 'core-js'
    ImportDeclaration(path) {
      if (isPolyfillSource(getImportSource(path))) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },

    // require('core-js')
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillSource(getRequireSource(bodyPath))) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    CallExpression({ node }) {
      // import('something').then(...)
      if (t.isImport(node.callee)) {
        this.addUnsupported(PromiseDependencies);
      }
    },

    Function({ node }) {
      // (async function () { }).finally(...)
      if (node.async) {
        this.addUnsupported(PromiseDependencies);
      }
    },

    // for-of, [a, b] = c, [...spread]
    "ForOfStatement|ArrayPattern|SpreadElement"() {
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
      const source = resolveSource(path.get("object"));
      const key = resolveKey(path.get("property"));

      // Object.entries
      // [1, 2, 3].entries
      this.addPropertyDependencies(source, key);
    },

    ObjectPattern(path) {
      const { parentPath, parent, key } = path;
      let source;

      // const { keys, values } = Object
      if (parentPath.isVariableDeclarator()) {
        source = resolveSource(parentPath.get("init"));
        // ({ keys, values } = Object)
      } else if (parentPath.isAssignmentExpression()) {
        source = resolveSource(parentPath.get("right"));
        // !function ({ keys, values }) {...} (Object)
        // resolution does not work after properties transform :-(
      } else if (parentPath.isFunctionExpression()) {
        const grand = parentPath.parentPath;
        if (grand.isCallExpression() || grand.isNewExpression()) {
          if (grand.node.callee === parent) {
            source = resolveSource(grand.get("arguments")[key]);
          }
        }
      }

      for (const property of path.get("properties")) {
        const key = resolveKey(property.get("key"));
        // const { keys, values } = Object
        // const { keys, values } = [1, 2, 3]
        this.addPropertyDependencies(source, key);
      }
    },

    BinaryExpression(path) {
      if (path.node.operator !== "in") return;

      const source = resolveSource(path.get("right"));
      const key = resolveKey(path.get("left"), true);

      // 'entries' in Object
      // 'entries' in [1, 2, 3]
      this.addPropertyDependencies(source, key);
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

      this.addBuiltInDependencies = function(builtIn) {
        if (has(BuiltIns, builtIn)) {
          const BuiltInDependencies = BuiltIns[builtIn];
          this.addUnsupported(BuiltInDependencies);
        }
      };

      this.addPropertyDependencies = function(source = {}, key) {
        const { builtIn, instanceType } = source;
        if (PossibleGlobalObjects.has(builtIn)) {
          this.addBuiltInDependencies(key);
        }
        if (has(StaticProperties, builtIn)) {
          const BuiltInProperties = StaticProperties[builtIn];
          if (has(BuiltInProperties, key)) {
            const StaticPropertyDependencies = BuiltInProperties[key];
            return this.addUnsupported(StaticPropertyDependencies);
          }
        }
        if (!has(InstanceProperties, key)) return;
        let InstancePropertyDependencies = InstanceProperties[key];
        if (instanceType) {
          InstancePropertyDependencies = InstancePropertyDependencies.filter(
            m => m.includes(instanceType) || CommonInstanceDependencies.has(m),
          );
        }
        this.addUnsupported(InstancePropertyDependencies);
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
