import template from "babel-template";

const buildDefine = template(`
  define(MODULE_NAME, [SOURCES], FACTORY);
`);

const buildFactory = template(`
  (function (PARAMS) {
    BODY;
  })
`);

export default function ({ types: t }) {
  function isValidRequireCall(path) {
    if (!path.isCallExpression()) return false;
    if (!path.get("callee").isIdentifier({ name: "require" })) return false;
    if (path.scope.getBinding("require")) return false;

    const args = path.get("arguments");
    if (args.length !== 1) return false;

    const arg = args[0];
    if (!arg.isStringLiteral()) return false;

    return true;
  }

  function isAlreadyCompiled(programNode) {
    return (
      programNode.body.length === 1 &&
      t.isExpressionStatement(programNode.body[0]) &&
      t.isCallExpression(programNode.body[0].expression) &&
      t.isIdentifier(programNode.body[0].expression.callee, { name: "define" })
    );
  }

  const amdVisitor = {
    ReferencedIdentifier({ node, scope }) {
      if (node.name === "exports" && !scope.getBinding("exports")) {
        this.hasExports = true;
      }

      if (node.name === "module" && !scope.getBinding("module")) {
        this.hasModule = true;
      }
    },

    CallExpression(path) {
      if (!isValidRequireCall(path)) return;
      this.bareSources.push(path.node.arguments[0]);
      path.remove();
    },

    VariableDeclarator(path) {
      const id = path.get("id");
      if (!id.isIdentifier()) return;

      const init = path.get("init");
      if (!isValidRequireCall(init)) return;

      const source = init.node.arguments[0];
      this.sourceNames[source.value] = true;
      this.sources.push([id.node, source]);

      path.remove();
    }
  };

  return {
    inherits: require("babel-plugin-transform-es2015-modules-commonjs"),

    pre() {
      // source strings
      this.sources = [];
      this.sourceNames = Object.create(null);

      // bare sources
      this.bareSources = [];

      this.hasExports = false;
      this.hasModule = false;
    },

    visitor: {
      Program: {
        exit(path, { opts }) {
          if (this.ran) return;
          this.ran = true;

          const { node } = path;
          if (opts.preventDoubleCompile && isAlreadyCompiled(node)) {
            return;
          }

          path.traverse(amdVisitor, this);

          const params = this.sources.map((source) => source[0]);
          let sources = this.sources.map((source) => source[1]);

          sources = sources.concat(this.bareSources.filter((str) => {
            return !this.sourceNames[str.value];
          }));

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          if (this.hasExports) {
            sources.unshift(t.stringLiteral("exports"));
            params.unshift(t.identifier("exports"));
          }

          if (this.hasModule) {
            sources.unshift(t.stringLiteral("module"));
            params.unshift(t.identifier("module"));
          }

          const factory = buildFactory({
            PARAMS: params,
            BODY: node.body
          });
          factory.expression.body.directives = node.directives;
          node.directives = [];

          node.body = [buildDefine({
            MODULE_NAME: moduleName,
            SOURCES: sources,
            FACTORY: factory
          })];
        }
      }
    }
  };
}
