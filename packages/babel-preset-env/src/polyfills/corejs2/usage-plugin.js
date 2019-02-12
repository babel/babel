import corejs2Polyfills from "../../../data/corejs2-built-ins.json";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import { filterItems } from "../../env-filter";
import {
  BuiltIns,
  StaticProperties,
  InstanceProperties,
} from "./built-in-definitions";
import { logUsagePolyfills } from "../../debug";
import {
  createImport,
  getType,
  has,
  isPolyfillSource,
  isPolyfillRequire,
} from "../../utils";

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`import '@babel/polyfill'\` call or use \`useBuiltIns: 'entry'\` instead.`;

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
      const {
        node: { name },
        parent,
        scope,
      } = path;

      if (t.isMemberExpression(parent)) return;
      if (!has(BuiltIns, name)) return;
      if (scope.getBindingIdentifier(name)) return;

      const builtIn = BuiltIns[name];
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
        const { object, property } = node;

        if (!t.isReferenced(object, node)) return;

        let evaluatedPropType = object.name;
        let propName = property.name;
        let instanceType;

        if (node.computed) {
          if (t.isStringLiteral(property)) {
            propName = property.value;
          } else {
            const res = path.get("property").evaluate();
            if (res.confident && res.value) {
              propName = res.value;
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

        if (has(StaticProperties, evaluatedPropType)) {
          const properties = StaticProperties[evaluatedPropType];
          if (has(properties, propName)) {
            const builtIn = properties[propName];
            this.addUnsupported(builtIn);
          }
        }

        if (has(InstanceProperties, propName)) {
          let builtIn = InstanceProperties[propName];
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

        if (!has(BuiltIns, name)) return;
        if (path.scope.getBindingIdentifier(name)) return;

        const builtIn = BuiltIns[name];
        this.addUnsupported(builtIn);
      },
    },

    // var { repeat, startsWith } = String
    VariableDeclarator(path) {
      if (!path.isReferenced()) return;

      const { node } = path;
      const { id, init } = node;

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
          const builtIn = InstanceProperties[key.name];
          this.addUnsupported(builtIn);
        }
      }
    },
  };

  return {
    name: "corejs2-usage",
    pre({ path }) {
      this.polyfillsSet = new Set();

      this.addImport = function(builtIn) {
        if (builtIn && !this.polyfillsSet.has(builtIn)) {
          this.polyfillsSet.add(builtIn);
          createImport(path, builtIn);
        }
      };

      this.addUnsupported = function(builtIn) {
        const list = Array.isArray(builtIn) ? builtIn : [builtIn];
        for (const module of list) {
          if (polyfills.has(module)) {
            this.addImport(module);
          }
        }
      };
    },
    post() {
      if (debug) {
        logUsagePolyfills(
          this.polyfillsSet,
          this.file.opts.filename,
          polyfillTargets,
          corejs2Polyfills,
        );
      }
    },
    visitor: addAndRemovePolyfillImports,
  };
}
