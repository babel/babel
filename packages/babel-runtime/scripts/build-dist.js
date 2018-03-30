"use strict";

const outputFile = require("output-file-sync");
const coreDefinitions = require("@babel/plugin-transform-runtime").definitions;
const helpers = require("@babel/helpers");
const babel = require("@babel/core");
const t = require("@babel/types");

const paths = ["is-iterable", "get-iterator"];

Object.keys(coreDefinitions.builtins).forEach((key) => {
  const path = coreDefinitions.builtins[key];
  paths.push(path);
});

Object.keys(coreDefinitions.methods).forEach((key) => {
  const props = coreDefinitions.methods[key];
  Object.keys(props).forEach((key2) => {
    const path = props[key2];
    paths.push(path);
  });
});

paths.forEach(function(path) {
  writeFile(
    "core-js/" + path + ".js",
    defaultify(`require("core-js-pure/features/${path}")`)
  );
});

function relative(filename) {
  return `${__dirname}/../${filename}`;
}

function defaultify(name) {
  return `module.exports = ${name};`;
}

function writeRootFile(filename, content) {
  filename = relative(filename);
  outputFile(filename, content);
}

function writeFile(filename, content) {
  return writeRootFile(filename, content);
}

function makeTransformOpts(modules, useBuiltIns) {
  const opts = {
    presets: [[require("@babel/preset-env"), { modules: false }]],

    plugins: [
      [
        require("@babel/plugin-transform-runtime"),
        { useBuiltIns, useESModules: modules === false },
      ],
    ],
  };
  return opts;
}

function adjustImportPath(node, relativePath) {
  if (helpers.list.indexOf(node.value) >= 0) {
    node.value = `./${node.value}`;
  } else {
    node.value = node.value.replace(/^@babel\/runtime/, relativePath);
  }
}

function buildRuntimeRewritePlugin(relativePath, helperName, dependencies) {
  return {
    pre(file) {
      const original = file.get("helperGenerator");
      file.set("helperGenerator", (name) => {
        // make sure that helpers won't insert circular references to themselves
        if (name === helperName) return false;

        return original(name);
      });
    },
    visitor: {
      ImportDeclaration(path) {
        adjustImportPath(path.get("source").node, relativePath);
      },
      CallExpression(path) {
        if (
          !path.get("callee").isIdentifier({ name: "require" }) ||
          path.get("arguments").length !== 1 ||
          !path.get("arguments")[0].isStringLiteral()
        ) {
          return;
        }

        // replace any reference to @babel/runtime and other helpers
        // with a relative path
        adjustImportPath(path.get("arguments")[0].node, relativePath);
      },
    },
  };
}

function buildRequireCall(id, dep) {
  return t.variableDeclaration("var", [
    t.variableDeclarator(
      id,
      t.callExpression(t.identifier("require"), [t.stringLiteral(dep)])
    )
  ]);
}

function buildHelper(helperName, modules, useBuiltIns) {
  const id =
    modules === "commonjs"
      ? t.memberExpression(t.identifier("module"), t.identifier("exports"))
      : null;
  const sourceType = modules === "commonjs" ? "script" : "module";

  const tree = t.program([], [], sourceType);
  const dependencies = {};
  let bindings = null;

  if (modules === "commonjs") {
    bindings = [];
    for (const dep of helpers.getDependencies(helperName)) {
      const id = dependencies[dep] = t.identifier(t.toIdentifier(dep));
      tree.body.push(buildRequireCall(id, dep));
      bindings.push(id.name);
    }
  }

  const helper = helpers.get(
    helperName,
    dep => dependencies[dep],
    id,
    bindings
  );
  tree.body.push.apply(tree.body, helper.nodes);

  const transformOpts = makeTransformOpts(modules, useBuiltIns);

  const relative = useBuiltIns ? "../.." : "..";
  
  return babel.transformFromAst(tree, null, {
    presets: transformOpts.presets,
    plugins: transformOpts.plugins.concat([
      buildRuntimeRewritePlugin(
        modules === false ? `../${relative}` : relative,
        helperName
      ),
    ]),
  }).code;
}

for (const modules of ["commonjs", false]) {
  for (const builtin of [false, true]) {
    const dirname = `helpers/${builtin ? "builtin/" : ""}${!modules ? "es6/" : ""}`;

    for (const helperName of helpers.list) {
      writeFile(
        `${dirname}${helperName}.js`,
        buildHelper(helperName, modules, builtin)
      );
    }
  }
}
