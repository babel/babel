import type NodePath from "babel-traverse";
import type Scope from "babel-traverse";
import type File from "../../../file";
import traverse from "babel-traverse";
import { visitor as tdzVisitor } from "./tdz";
import * as util from  "../../../../util";
import * as t from "babel-types";
import values from "lodash/object/values";
import extend from "lodash/object/extend";

function isLet(node, parent) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  // https://github.com/babel/babel/issues/255
  if (isLetInitable(node, parent)) {
    for (let i = 0; i < node.declarations.length; i++) {
      let declar = node.declarations[i];
      declar.init = declar.init || scope.buildUndefinedNode();
    }
  }

  node._let = true;
  node.kind = "var";
  return true;
}

function isLetInitable(node, parent) {
  return !t.isFor(parent) || !t.isFor(parent, { left: node });
}

function isVar(node, parent, scope) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node, parent, scope);
}

function standardizeLets(declars) {
  for (let declar of (declars: Array)) {
    delete declar._let;
  }
}

export let metadata = {
  group: "builtin-advanced"
};

export let visitor = {
  VariableDeclaration(node, parent, scope, file) {
    if (!isLet(node, parent, scope)) return;

    if (isLetInitable(node) && node._tdzThis) {
      let nodes = [node];

      for (let i = 0; i < node.declarations.length; i++) {
        let decl = node.declarations[i];
        if (decl.init) {
          let assign = t.assignmentExpression("=", decl.id, decl.init);
          assign._ignoreBlockScopingTDZ = true;
          nodes.push(t.expressionStatement(assign));
        }
        decl.init = file.addHelper("temporal-undefined");
      }

      node._blockHoist = 2;

      if (this.isCompletionRecord()) {
        // ensure we don't break completion record semantics by returning
        // the initialiser of the last declarator
        nodes.push(t.expressionStatement(scope.buildUndefinedNode()));
      }

      return nodes;
    }
  },

  Loop(node, parent, scope, file) {
    let init = node.left || node.init;
    if (isLet(init, node, scope)) {
      t.ensureBlock(node);
      node.body._letDeclarators = [init];
    }

    let blockScoping = new BlockScoping(this, this.get("body"), parent, scope, file);
    return blockScoping.run();
  },

  "BlockStatement|Program"(block, parent, scope, file) {
    if (!t.isLoop(parent)) {
      let blockScoping = new BlockScoping(null, this, parent, scope, file);
      blockScoping.run();
    }
  }
};

function replace(node, parent, scope, remaps) {
  let remap = remaps[node.name];
  if (!remap) return;

  let ownBinding = scope.getBindingIdentifier(node.name);
  if (ownBinding === remap.binding) {
    node.name = remap.uid;
  } else {
    // scope already has it's own binding that doesn't
    // match the one we have a stored replacement for
    if (this) this.skip();
  }
}

let replaceVisitor = {
  ReferencedIdentifier: replace,

  AssignmentExpression(node, parent, scope, remaps) {
    let ids = this.getBindingIdentifiers();
    for (let name in ids) {
      replace(ids[name], node, scope, remaps);
    }
  },
};

function traverseReplace(node, parent, scope, remaps) {
  if (t.isIdentifier(node)) {
    replace(node, parent, scope, remaps);
  }

  if (t.isAssignmentExpression(node)) {
    let ids = t.getBindingIdentifiers(node);
    for (let name in ids) {
      replace(ids[name], parent, scope, remaps);
    }
  }

  scope.traverse(node, replaceVisitor, remaps);
}

let letReferenceBlockVisitor = traverse.visitors.merge([{
  Function(node, parent, scope, state) {
    this.traverse(letReferenceFunctionVisitor, state);
    return this.skip();
  }
}, tdzVisitor]);

let letReferenceFunctionVisitor = traverse.visitors.merge([{
  ReferencedIdentifier(node, parent, scope, state) {
    let ref = state.letReferences[node.name];

    // not a part of our scope
    if (!ref) return;

    // this scope has a variable with the same name so it couldn't belong
    // to our let scope
    let localBinding = scope.getBindingIdentifier(node.name);
    if (localBinding && localBinding !== ref) return;

    state.closurify = true;
  }
}, tdzVisitor]);

let hoistVarDeclarationsVisitor = {
  enter(node, parent, scope, self) {
    if (this.isForStatement()) {
      if (isVar(node.init, node, scope)) {
        let nodes = self.pushDeclar(node.init);
        if (nodes.length === 1) {
          node.init = nodes[0];
        } else {
          node.init = t.sequenceExpression(nodes);
        }
      }
    } else if (this.isFor()) {
      if (isVar(node.left, node, scope)) {
        self.pushDeclar(node.left);
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent, scope)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (this.isFunction()) {
      return this.skip();
    }
  }
};

let loopLabelVisitor = {
  LabeledStatement(node, parent, scope, state) {
    state.innerLabels.push(node.label.name);
  }
};

let continuationVisitor = {
  enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      let bindings = this.getBindingIdentifiers();
      for (let name in bindings) {
        if (state.outsideReferences[name] !== scope.getBindingIdentifier(name)) continue;
        state.reassignments[name] = true;
      }
    }
  }
};

function loopNodeTo(node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
}

let loopVisitor = {
  Loop(node, parent, scope, state) {
    let oldIgnoreLabeless = state.ignoreLabeless;
    state.ignoreLabeless = true;
    this.traverse(loopVisitor, state);
    state.ignoreLabeless = oldIgnoreLabeless;
    this.skip();
  },

  Function() {
    this.skip();
  },

  SwitchCase(node, parent, scope, state) {
    let oldInSwitchCase = state.inSwitchCase;
    state.inSwitchCase = true;
    this.traverse(loopVisitor, state);
    state.inSwitchCase = oldInSwitchCase;
    this.skip();
  },

  "BreakStatement|ContinueStatement|ReturnStatement"(node, parent, scope, state) {
    let replace;
    let loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        // we shouldn't be transforming this because it exists somewhere inside
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = `${loopText}|${node.label.name}`;
      } else {
        // we shouldn't be transforming these statements because
        // they don't refer to the actual loop we're scopifying
        if (state.ignoreLabeless) return;

        //
        if (state.inSwitchCase) return;

        // break statements mean something different in this context
        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.stringLiteral(loopText);
    }

    if (this.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([
        t.property("init", t.identifier("v"), node.argument || scope.buildUndefinedNode())
      ]);
    }

    if (replace) {
      replace = t.returnStatement(replace);
      this.skip();
      return t.inherits(replace, node);
    }
  }
};

class BlockScoping {
  constructor(loopPath?: NodePath, blockPath: NodePath, parent: Object, scope: Scope, file: File) {
    this.parent = parent;
    this.scope  = scope;
    this.file   = file;

    this.blockPath = blockPath;
    this.block     = blockPath.node;

    this.outsideLetReferences = Object.create(null);
    this.hasLetReferences     = false;
    this.letReferences        = Object.create(null);
    this.body                 = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel  = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath   = loopPath;
      this.loop       = loopPath.node;
    }
  }

  /**
   * Start the ball rolling.
   */

  run() {
    let block = this.block;
    if (block._letDone) return;
    block._letDone = true;

    let needsClosure = this.getLetReferences();

    // this is a block within a `Function/Program` so we can safely leave it be
    if (t.isFunction(this.parent) || t.isProgram(this.block)) return;

    // we can skip everything
    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
      return t.labeledStatement(this.loopLabel, this.loop);
    }
  }

  remap() {
    let hasRemaps = false;
    let letRefs   = this.letReferences;
    let scope     = this.scope;

    // alright, so since we aren't wrapping this block in a closure
    // we have to check if any of our let variables collide with
    // those in upper scopes and then if they do, generate a uid
    // for them and replace all references with it
    let remaps = Object.create(null);

    for (let key in letRefs) {
      // just an Identifier node we collected in `getLetReferences`
      // this is the defining identifier of a declaration
      let ref = letRefs[key];

      // todo: could skip this if the colliding binding is in another function
      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        let uid = scope.generateUidIdentifier(ref.name).name;
        ref.name = uid;

        hasRemaps = true;
        remaps[key] = remaps[uid] = {
          binding: ref,
          uid: uid
        };
      }
    }

    if (!hasRemaps) return;

    //

    let loop = this.loop;
    if (loop) {
      traverseReplace(loop.right, loop, scope, remaps);
      traverseReplace(loop.test, loop, scope, remaps);
      traverseReplace(loop.update, loop, scope, remaps);
    }

    this.blockPath.traverse(replaceVisitor, remaps);
  }

  wrapClosure() {
    let block = this.block;

    let outsideRefs = this.outsideLetReferences;

    // remap loop heads with colliding variables
    if (this.loop) {
      for (let name in outsideRefs) {
        let id = outsideRefs[name];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];

          this.scope.rename(id.name);

          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    // if we're inside of a for loop then we search to see if there are any
    // `break`s, `continue`s, `return`s etc
    this.has = this.checkLoop();

    // hoist let references to retain scope
    this.hoistVarDeclarations();

    // turn outsideLetReferences into an array
    let params = values(outsideRefs);
    let args   = values(outsideRefs);

    // build the closure that we're going to wrap the block with
    let fn = t.functionExpression(null, params, t.blockStatement(block.body));
    fn.shadow = true;

    // continuation
    this.addContinuations(fn);

    // replace the current block body with the one we're going to build
    block.body = this.body;

    let ref = fn;

    if (this.loop) {
      ref = this.scope.generateUidIdentifier("loop");
      this.loopPath.insertBefore(t.variableDeclaration("var", [
        t.variableDeclarator(ref, fn)
      ]));
    }

    // build a call and a unique id that we can assign the return value to
    let call = t.callExpression(ref, args);
    let ret  = this.scope.generateUidIdentifier("ret");

    // handle generators
    let hasYield = traverse.hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }

    // handlers async functions
    let hasAsync = traverse.hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call);
    }

    this.buildClosure(ret, call);
  }

  /**
   * Push the closure to the body.
   */

  buildClosure(ret: { type: "Identifier" }, call: { type: "CallExpression" }) {
    let has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  }

  /**
   * If any of the outer let variables are reassigned then we need to rename them in
   * the closure so we can get direct access to the outer variable to continue the
   * iteration with bindings based on each iteration.
   *
   * Reference: https://github.com/babel/babel/issues/1078
   */

  addContinuations(fn) {
    let state = {
      reassignments: {},
      outsideReferences: this.outsideLetReferences
    };

    this.scope.traverse(fn, continuationVisitor, state);

    for (let i = 0; i < fn.params.length; i++) {
      let param = fn.params[i];
      if (!state.reassignments[param.name]) continue;

      let newParam = this.scope.generateUidIdentifier(param.name);
      fn.params[i] = newParam;

      this.scope.rename(param.name, newParam.name, fn);

      // assign outer reference as it's been modified internally and needs to be retained
      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
    }
  }

  getLetReferences() {
    let block = this.block;

    let declarators = block._letDeclarators || [];

    //
    for (let i = 0; i < declarators.length; i++) {
      let declar = declarators[i];
      extend(this.outsideLetReferences, t.getBindingIdentifiers(declar));
    }

    //
    if (block.body) {
      for (let i = 0; i < block.body.length; i++) {
        let declar = block.body[i];
        if (isLet(declar, block, this.scope)) {
          declarators = declarators.concat(declar.declarations);
        }
      }
    }

    //
    for (let i = 0; i < declarators.length; i++) {
      let declar = declarators[i];
      let keys = t.getBindingIdentifiers(declar);
      extend(this.letReferences, keys);
      this.hasLetReferences = true;
    }

    // no let references so we can just quit
    if (!this.hasLetReferences) return;

    // set let references to plain let references
    standardizeLets(declarators);

    let state = {
      letReferences: this.letReferences,
      closurify:     false,
      file:          this.file
    };

    // traverse through this block, stopping on functions and checking if they
    // contain any local let references
    this.blockPath.traverse(letReferenceBlockVisitor, state);

    return state.closurify;
  }

  /**
   * If we're inside of a loop then traverse it and check if it has one of
   * the following node types `ReturnStatement`, `BreakStatement`,
   * `ContinueStatement` and replace it with a return value that we can track
   * later on.
   */

  checkLoop(): Object {
    let state = {
      hasBreakContinue: false,
      ignoreLabeless:   false,
      inSwitchCase:     false,
      innerLabels:      [],
      hasReturn:        false,
      isLoop:           !!this.loop,
      map:              {}
    };

    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);

    return state;
  }

  /**
   * Hoist all let declarations in this block to before it so they retain scope
   * once we wrap everything in a closure.
   */

  hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  }

  /**
   * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
   * their declarations hoisted to before the closure wrapper.
   */

  pushDeclar(node: { type: "VariableDeclaration" }): Array<Object> {
    let declars = [];
    let names = t.getBindingIdentifiers(node);
    for (let name in names) {
      declars.push(t.variableDeclarator(names[name]));
    }

    this.body.push(t.variableDeclaration(node.kind, declars));

    let replace = [];

    for (let i = 0; i < node.declarations.length; i++) {
      let declar = node.declarations[i];
      if (!declar.init) continue;

      let expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }

    return replace;
  }

  buildHas(ret: { type: "Identifier" }, call: { type: "CallExpression" }) {
    let body = this.body;

    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(ret, call)
    ]));

    let retCheck;
    let has = this.has;
    let cases = [];

    if (has.hasReturn) {
      // typeof ret === "object"
      retCheck = util.template("let-scoping-return", {
        RETURN: ret
      });
    }

    if (has.hasBreakContinue) {
      for (let key in has.map) {
        cases.push(t.switchCase(t.stringLiteral(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        let single = cases[0];
        body.push(this.file.attachAuxiliaryComment(t.ifStatement(
          t.binaryExpression("===", ret, single.test),
          single.consequent[0]
        )));
      } else {
        // https://github.com/babel/babel/issues/998
        for (let i = 0; i < cases.length; i++) {
          let caseConsequent = cases[i].consequent[0];
          if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
            caseConsequent.label = this.loopLabel = this.loopLabel || this.file.scope.generateUidIdentifier("loop");
          }
        }

        body.push(this.file.attachAuxiliaryComment(t.switchStatement(ret, cases)));
      }
    } else {
      if (has.hasReturn) {
        body.push(this.file.attachAuxiliaryComment(retCheck));
      }
    }
  }
}
