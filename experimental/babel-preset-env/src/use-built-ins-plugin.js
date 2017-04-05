import { definitions } from "./built-in-definitions";

function isPolyfillSource(value) {
  return value === "babel-polyfill";
}

function warnOnInstanceMethod(details) {
  console.warn(
    `Adding a polyfill: An instance method may have been used: ${details}`,
  );
}

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function getObjectString(node) {
  if (node.type === "Identifier") {
    return node.name;
  } else if (node.type === "MemberExpression") {
    return `${getObjectString(node.object)}.${getObjectString(node.property)}`;
  } else {
    return "";
  }
}

export default function({ types: t }) {
  function addImport(path, builtIn) {
    if (builtIn) {
      const importDec = t.importDeclaration([], t.stringLiteral(builtIn));
      importDec._blockHoist = 3;
      path.unshiftContainer("body", importDec);
    }
  }

  function isRequire(path) {
    return t.isExpressionStatement(path.node) &&
      t.isCallExpression(path.node.expression) &&
      t.isIdentifier(path.node.expression.callee) &&
      path.node.expression.callee.name === "require" &&
      path.node.expression.arguments.length === 1 &&
      t.isStringLiteral(path.node.expression.arguments[0]) &&
      isPolyfillSource(path.node.expression.arguments[0].value);
  }

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        console.warn(
          `
Adding "import 'babel-polyfill'" isn't necessary with the useBuiltIns option anymore.
Please remove the call.
`,
        );
        path.remove();
      }
    },
    Program: {
      enter(path, state) {
        if (!state.opts.polyfills) {
          throw path.buildCodeFrameError(
            `
There was an issue in "babel-preset-env" such that
the "polyfills" option was not correctly passed
to the "transform-polyfill-require" plugin
`,
          );
        }
        path.get("body").forEach(bodyPath => {
          if (isRequire(bodyPath)) {
            console.warn(
              `
Adding "require('babel-polyfill')" isn't necessary with the useBuiltIns option anymore.
Please remove the call.
`,
            );
            path.remove();
          }
        });
      },
      // add polyfills
      exit(path, state) {
        for (const builtIn of Array.from(this.builtIns.keys()).reverse()) {
          if (Array.isArray(builtIn)) {
            for (const i of builtIn) {
              // console.warn(i);
              if (state.opts.polyfills.indexOf(i) !== -1) {
                addImport(path, `core-js/modules/${i}`);
              }
            }
          } else {
            // console.warn(builtIn);
            if (state.opts.polyfills.indexOf(builtIn) !== -1) {
              addImport(path, `core-js/modules/${builtIn}`);
            }
          }
        }
        if (state.opts.regenerator && this.usesRegenerator) {
          addImport(path, "babel-polyfill/regenerator-runtime/runtime");
        }
      },
    },

    // Symbol() -> _core.Symbol();
    // new Promise -> new _core.Promise
    ReferencedIdentifier(path) {
      const { node, parent, scope } = path;

      if (t.isMemberExpression(parent)) return;
      if (!has(definitions.builtins, node.name)) return;
      if (scope.getBindingIdentifier(node.name)) return;

      this.builtIns.add(definitions.builtins[node.name]);
    },

    // Array.from -> _core.Array.from
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
            this.builtIns.add(`${staticMethods[prop.name]}`);
          }
        }

        if (
          !node.computed &&
          t.isIdentifier(prop) &&
          has(definitions.instanceMethods, prop.name)
        ) {
          state.opts.debug && warnOnInstanceMethod(getObjectString(node));
          this.builtIns.add(definitions.instanceMethods[prop.name]);
        } else if (
          node.computed &&
          t.isStringLiteral(prop) &&
          has(definitions.instanceMethods, prop.value)
        ) {
          state.opts.debug &&
            warnOnInstanceMethod(`${obj.name}['${prop.value}']`);
          this.builtIns.add(definitions.instanceMethods[prop.value]);
        }
      },

      // Symbol.match
      exit(path) {
        if (!path.isReferenced()) return;

        const { node } = path;
        const obj = node.object;

        if (!has(definitions.builtins, obj.name)) return;
        if (path.scope.getBindingIdentifier(obj.name)) return;

        this.builtIns.add(definitions.builtins[obj.name]);
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
          state.opts.debug &&
            warnOnInstanceMethod(
              `${path.parentPath.node.kind} { ${prop.name} } = ${obj.name}`,
            );

          this.builtIns.add(definitions.instanceMethods[prop.name]);
        }
      }
    },

    Function(path) {
      if (path.node.generator || path.node.async) {
        this.usesRegenerator = true;
      }
    },
  };

  return {
    name: "use-built-ins",
    pre() {
      this.builtIns = new Set();
      this.usesRegenerator = false;
    },
    visitor: addAndRemovePolyfillImports,
  };
}
