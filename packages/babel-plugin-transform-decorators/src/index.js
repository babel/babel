import explodeClass from "babel-helper-explode-class";

export default function ({ template, types: t }) {
  let buildClassDecorator = template(`
    CLASS_REF = DECORATOR(CLASS_REF) || CLASS_REF;
  `);

  function cleanDecorators(decorators) {
    return decorators.reverse().map((dec) => dec.expression);
  }

  function transformClass(path, ref, state) {
    let nodes = [];

    state;

    let classDecorators = path.node.decorators;
    if (classDecorators) {
      path.node.decorators = null;
      classDecorators = cleanDecorators(classDecorators);

      for (let decorator of classDecorators) {
        nodes.push(buildClassDecorator({
          CLASS_REF: ref,
          DECORATOR: decorator
        }));
      }
    }

    let map = Object.create(null);

    for (let method of path.get("body.body")) {
      let decorators = method.node.decorators;
      if (!decorators) continue;

      let alias = t.toKeyAlias(method.node);
      map[alias] = map[alias] || [];
      map[alias].push(method.node);

      method.remove();
    }

    for (let alias in map) {
      let items = map[alias];

      items;
    }

    return nodes;
  }

  function hasDecorators(path) {
    if (path.isClass()) {
      if (path.node.decorators) return true;

      for (let method of (path.node.body.body: Array<Object>)) {
        if (method.decorators) {
          return true;
        }
      }
    } else if (path.isObjectExpression()) {
      for (let prop of (path.node.properties: Array<Object>)) {
        if (prop.decorators) {
          return true;
        }
      }
    }

    return false;
  }

  function doError(path) {
    throw path.buildCodeFrameError(
`Decorators are not officially supported yet in 6.x pending a proposal update.
However, if you need to use them you can install the legacy decorators transform with:

npm install babel-plugin-transform-decorators-legacy --save-dev

and add the following line to your .babelrc file:

{
  "plugins": ["transform-decorators-legacy"]
}

The repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.
    `);
  }

  return {
    inherits: require("babel-plugin-syntax-decorators"),

    visitor: {
      ClassExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);

        explodeClass(path);

        let ref = path.scope.generateDeclaredUidIdentifier("ref");
        let nodes = [];

        nodes.push(t.assignmentExpression("=", ref, path.node));

        nodes = nodes.concat(transformClass(path, ref, this));

        nodes.push(ref);

        path.replaceWith(t.sequenceExpression(nodes));
      },

      ClassDeclaration(path) {
        if (!hasDecorators(path)) return;
        doError(path);
        explodeClass(path);

        let ref = path.node.id;
        let nodes = [];

        nodes = nodes.concat(transformClass(path, ref, this).map((expr) => t.expressionStatement(expr)));
        nodes.push(t.expressionStatement(ref));

        path.insertAfter(nodes);
      },

      ObjectExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);
      }
    }
  };
}
