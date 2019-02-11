import corejs2Polyfills from "../../../data/corejs2-built-ins.json";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import { filterItems } from "../../env-filter";
import { definitions } from "./built-in-definitions";
import { logUsagePolyfills } from "../../debug";
import {
  createImport,
  has,
  isPolyfillSource,
  isPolyfillRequire,
} from "../../utils";

function getType(target) {
  if (Array.isArray(target)) return "array";
  return typeof target;
}

export default function(
  { types: t },
  { include, exclude, polyfillTargets, debug },
) {
  const polyfills = filterItems(
    corejs2Polyfills,
    include,
    exclude,
    polyfillTargets,
    getPlatformSpecificDefaultFor(polyfillTargets),
  );

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
      this.addUnsupported(builtIn);
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

      this.addImport("web.dom.iterable");
    },

    // Symbol.iterator in arr
    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      if (!path.get("left").matchesPattern("Symbol.iterator")) return;

      this.addImport("web.dom.iterable");
    },

    // yield*
    YieldExpression(path) {
      if (!path.node.delegate) return;

      this.addImport("web.dom.iterable");
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
            this.addUnsupported(builtIn);
          }
        }

        if (has(definitions.instanceMethods, propName)) {
          let builtIn = definitions.instanceMethods[propName];
          if (instanceType) {
            builtIn = builtIn.filter(item => item.includes(instanceType));
          }
          this.addUnsupported(builtIn);
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
        this.addUnsupported(builtIn);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path) {
      if (!path.isReferenced()) return;

      const { node } = path;
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
          this.addUnsupported(builtIn);
        }
      }
    },
  };

  return {
    name: "corejs2-usage",
    pre({ path }) {
      this.builtIns = new Set();

      this.addImport = function(builtIn) {
        if (builtIn && !this.builtIns.has(builtIn)) {
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
          corejs2Polyfills,
        );
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
