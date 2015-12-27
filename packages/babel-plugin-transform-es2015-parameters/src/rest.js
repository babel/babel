import template from "babel-template";
import * as t from "babel-types";

let buildRest = template(`
  for (var LEN = ARGUMENTS.length,
           ARRAY = Array(ARRAY_LEN),
           KEY = START;
       KEY < LEN;
       KEY++) {
    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];
  }
`);

let loadRest = template(`
  ARGUMENTS.length <= INDEX ? undefined : ARGUMENTS[INDEX]
`);

let memberExpressionOptimisationVisitor = {
  Scope(path, state) {
    // check if this scope has a local binding that will shadow the rest parameter
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },

  Flow(path) {
    // don't touch reference in type annotations
    path.skip();
  },

  Function(path, state) {
    // skip over functions as whatever `arguments` we reference inside will refer
    // to the wrong function
    let oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    path.skip();
  },

  ReferencedIdentifier(path, state) {
    let { node } = path;

    // we can't guarantee the purity of arguments
    if (node.name === "arguments") {
      state.deopted = true;
    }

    // is this a referenced identifier and is it referencing the rest parameter?
    if (node.name !== state.name) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      let {parentPath} = path;

      // ex: args[0]
      if (parentPath.isMemberExpression({ computed: true, object: node })) {
        // if we know that this member expression is referencing a number then
        // we can safely optimise it
        let prop = parentPath.get("property");
        if (prop.isBaseType("number")) {
          state.candidates.push({cause: "indexGetter", path});
          return;
        }
      }

      // ex: args.length
      if (parentPath.isMemberExpression({ computed: false, object: node })) {
        let prop = parentPath.get("property");
        if (prop.node.name === "length") {
          state.candidates.push({cause: "lengthGetter", path});
          return;
        }
      }

      // we can only do these optimizations if the rest variable would match
      // the arguments exactly
      // optimise single spread args in calls
      // ex: fn(...args)
      if (state.offset === 0 && parentPath.isSpreadElement()) {
        let call = parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push({cause: "argSpread", path});
          return;
        }
      }

      state.references.push(path);
    }
  },

  /**
   * Deopt on use of a binding identifier with the same name as our rest param.
   *
   * See https://github.com/babel/babel/issues/2091
   */

  BindingIdentifier({ node }, state) {
    if (node.name === state.name) {
      state.deopted = true;
    }
  }
};
function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

function optimiseIndexGetter(path, argsId, offset) {
  path.parentPath.replaceWith(loadRest({
    ARGUMENTS: argsId,
    INDEX: t.numericLiteral(path.parent.property.value + offset)
  }));
}

function optimiseLengthGetter(path, argsLengthExpression, argsId, offset) {
  if (offset) {
    path.parentPath.replaceWith(
      t.binaryExpression(
        "-",
        argsLengthExpression,
        t.numericLiteral(offset),
      )
    );
  } else {
    path.replaceWith(argsId);
  }
}

export let visitor = {
  Function(path) {
    let { node, scope } = path;
    if (!hasRest(node)) return;

    let rest = node.params.pop().argument;

    let argsId = t.identifier("arguments");
    let argsLengthExpression = t.memberExpression(
      argsId,
      t.identifier("length"),
    );

    // otherwise `arguments` will be remapped in arrow functions
    argsId._shadowedFunctionLiteral = path;

    // check and optimise for extremely common cases
    let state = {
      references: [],
      offset:     node.params.length,

      argumentsNode: argsId,
      outerBinding:  scope.getBindingIdentifier(rest.name),

      // candidate member expressions we could optimise if there are no other references
      candidates: [],

      // local rest binding name
      name: rest.name,

      // whether any references to the rest parameter were made in a function
      deopted: false,
    };

    path.traverse(memberExpressionOptimisationVisitor, state);

    if (!state.deopted && !state.references.length) {
      // we only have shorthands and there are no other references
      if (state.candidates.length) {
        for (let {path, cause} of (state.candidates: Array)) {
          switch (cause) {
            case "indexGetter":
              optimiseIndexGetter(path, argsId, state.offset);
              break;
            case "lengthGetter":
              optimiseLengthGetter(path, argsLengthExpression, argsId, state.offset);
              break;
            default:
              path.replaceWith(argsId);
          }
        }
      }
      return;
    } else {
      state.references = state.references.concat(
        state.candidates.map(({path}) => path)
      );
    }

    // deopt shadowed functions as transforms like regenerator may try touch the allocation loop
    state.deopted = state.deopted || !!node.shadow;

    let start = t.numericLiteral(node.params.length);
    let key = scope.generateUidIdentifier("key");
    let len = scope.generateUidIdentifier("len");

    let arrKey = key;
    let arrLen = len;
    if (node.params.length) {
      // this method has additional params, so we need to subtract
      // the index of the current argument position from the
      // position in the array that we want to populate
      arrKey = t.binaryExpression("-", key, start);

      // we need to work out the size of the array that we're
      // going to store all the rest parameters
      //
      // we need to add a check to avoid constructing the array
      // with <0 if there are less arguments than params as it'll
      // cause an error
      arrLen = t.conditionalExpression(
        t.binaryExpression(">", len, start),
        t.binaryExpression("-", len, start),
        t.numericLiteral(0)
      );
    }

    let loop = buildRest({
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      ARRAY_LEN: arrLen,
      START:     start,
      ARRAY:     rest,
      KEY:       key,
      LEN:       len,
    });

    if (state.deopted) {
      loop._blockHoist = node.params.length + 1;
      node.body.body.unshift(loop);
    } else {
      // perform allocation at the lowest common ancestor of all references
      loop._blockHoist = 1;

      let target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();

      // don't perform the allocation inside a loop
      let highestLoop;
      target.findParent(function (path) {
        if (path.isLoop()) {
          highestLoop = path;
        } else if (path.isFunction()) {
          // stop crawling up for functions
          return true;
        }
      });
      if (highestLoop) target = highestLoop;

      target.insertBefore(loop);
    }
  }
};
