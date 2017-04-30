import { default as pathMod } from "path";

export default function ({ types }) {
  function setDisplayNameAfter(path, nameNodeId, displayName) {
    if (!displayName) {
      displayName = nameNodeId.name;
    }

    let blockLevelStmnt;
    path.find(function (path) {
      if (path.parentPath.isBlock()) {
        blockLevelStmnt = path;
        return true;
      }
    });

    if (blockLevelStmnt) {
      // Put our `displayName` on the right side of trailing comments
      delete blockLevelStmnt.node.trailingComments;

      const setDisplayNameStmn = types.expressionStatement(types.assignmentExpression(
        "=",
        types.memberExpression(nameNodeId, types.identifier("displayName")),
        types.stringLiteral(displayName)
      ));

      blockLevelStmnt.insertAfter(setDisplayNameStmn);
    }
  }

  function addDisplayNameProperty(id, call) {
    const props = call.arguments[0].properties;
    let safe = true;

    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      const key = types.toComputedKey(prop);
      if (types.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(types.objectProperty(types.identifier("displayName"), types.stringLiteral(id)));
    }
  }

  const isCreateClassCallExpression = types.buildMatchMemberExpression("React.createClass");

  function isCreateClass(node) {
    if (!node || !types.isCallExpression(node)) return false;

    // not React.createClass call member object
    if (!isCreateClassCallExpression(node.callee)) return false;

    // no call arguments
    const args = node.arguments;
    if (args.length !== 1) return false;

    // first node arg is not an object
    const first = args[0];
    if (!types.isObjectExpression(first)) return false;

    return true;
  }

  return {
    visitor: {
      ExportDefaultDeclaration({ node }, state) {
        if (isCreateClass(node.declaration)) {
          const extname = pathMod.extname(state.file.opts.filename);
          let displayName = pathMod.basename(state.file.opts.filename, extname);

          // ./{module name}/index.js
          if (displayName === "index") {
            displayName = pathMod.basename(pathMod.dirname(state.file.opts.filename));
          }

          addDisplayNameProperty(displayName, node.declaration);
        }
      },
      CallExpression(path) {
        const { node } = path;
        if (!isCreateClass(node)) return;

        let id = findCandidateNameForExpression(path, true);

        // ensure that we have an identifier we can inherit from
        if (!id) return;

        // foo.bar -> bar
        if (types.isMemberExpression(id)) {
          id = id.property;
        }

        // identifiers are the only thing we can reliably get a name from
        if (types.isIdentifier(id)) {
          addDisplayNameProperty(id.name, node);
        }
      },
      ClassDeclaration: function (path) {
        if (classHasRenderMethod(path)) {
          setDisplayNameAfter(path, path.node.id);
        }
      },
      FunctionDeclaration: function (path, state) {
        if (doesReturnJSX(path.node.body)) {
          let displayName;
          if (path.parentPath.node.type === "ExportDefaultDeclaration") {
            if (path.node.id == null) {
              // An anonymous function declaration in export default declaration.
              // Transform `export default function () { ... }`
              // to `var _uid1 = function () { .. }; export default __uid;`
              // then add displayName to _uid1
              const extension = pathMod.extname(state.file.opts.filename);
              const name = pathMod.basename(state.file.opts.filename, extension);

              const id = path.scope.generateUidIdentifier("uid");
              path.node.id = id;
              displayName = name;
            }
            setDisplayNameAfter(path, path.node.id, displayName);
          } else if (path.parentPath.node.type === "Program"
                     || path.parentPath.node.type == "ExportNamedDeclaration") {
            setDisplayNameAfter(path, path.node.id, displayName);
          }
        }
      },
      FunctionExpression: function (path) {
        if (shouldSetDisplayNameForFuncExpr(path)) {
          const id = findCandidateNameForExpression(path);
          if (id) {
            setDisplayNameAfter(path, id);
          }
        }
      },
      ArrowFunctionExpression: function (path) {
        if (shouldSetDisplayNameForFuncExpr(path)) {
          const id = findCandidateNameForExpression(path);
          if (id) {
            setDisplayNameAfter(path, id);
          }
        }
      },
    },
  };
}

function shouldSetDisplayNameForFuncExpr(path) {
  // Parent must be either 'AssignmentExpression' or
  // 'VariableDeclarator' or 'CallExpression' with a parent of 'VariableDeclarator'
  if (path.parentPath.node.type === "AssignmentExpression" &&
      path.parentPath.node.left.type !== "MemberExpression" && // skip static members
      path.parentPath.parentPath.node.type == "ExpressionStatement" &&
      path.parentPath.parentPath.parentPath.node.type == "Program") {
    return doesReturnJSX(path.node.body);
  } else {
    // if parent is a call expression, we have something like (function () { .. })()
    // move up, past the call expression and run the rest of the checks as usual
    if (path.parentPath.node.type === "CallExpression") {
      path = path.parentPath;
    }

    if (path.parentPath.node.type === "VariableDeclarator") {
      if (path.parentPath.parentPath.parentPath.node.type === "ExportNamedDeclaration" ||
          path.parentPath.parentPath.parentPath.node.type === "Program") {
        return doesReturnJSX(path.node.body);
      }
    }
  }

  return false;
}

function classHasRenderMethod(node) {
  if (!node.node.body) {
    return false;
  }
  const members = node.node.body.body;
  for (let i = 0; i < members.length; i++) {
    if (members[i].type == "ClassMethod" && members[i].key.name == "render") {
      return true;
    }
  }

  return false;
}

// crawl up the ancestry looking for possible candidates for displayName inference
// optionally look for object properties
function findCandidateNameForExpression(path, inclObjProp) {
  let id;
  path.find(function (path) {
    if (path.isAssignmentExpression()) {
      id = path.node.left;
    } else if (inclObjProp && path.isObjectProperty()) {
      id = path.node.key;
    } else if (path.isVariableDeclarator()) {
      id = path.node.id;
    } else if (path.isStatement()) {
      // we've hit a statement, we should stop crawling up
      return true;
    }

    // we've got an id! no need to continue
    if (id) return true;
  });
  return id;
}

function doesReturnJSX (body) {
  if (!body) return false;
  if (body.type === "JSXElement") {
    return true;
  }

  const block = body.body;
  if (block && block.length) {
    const lastBlock = block.slice(0).pop();

    if (lastBlock.type === "ReturnStatement") {
      return lastBlock.argument.type === "JSXElement";
    }
  }

  return false;
}

