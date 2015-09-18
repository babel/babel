import type NodePath from "../../../../traversal/path";
import type File from "../../../file";
import memoiseDecorators from "../../../helpers/memoise-decorators";
import ReplaceSupers from "../../../helpers/replace-supers";
import * as nameMethod from "../../../helpers/name-method";
import * as defineMap from "../../../helpers/define-map";
import * as messages from "babel-messages";
import * as util from  "../../../../util";
import * as t from "babel-types";

const PROPERTY_COLLISION_METHOD_NAME = "__initializeProperties";

let collectPropertyReferencesVisitor = {
  Identifier: {
    enter(node, parent, scope, state) {
      if (this.parentPath.isClassProperty({ key: node })) {
        return;
      }

      if (this.isReferenced() && scope.getBinding(node.name) === state.scope.getBinding(node.name)) {
        state.references[node.name] = true;
      }
    }
  }
};

let verifyConstructorVisitor = {
  MethodDefinition() {
    this.skip();
  },

  Property(node) {
    if (node.method) this.skip();
  },

  CallExpression: {
    exit(node, parent, scope, state) {
      if (this.get("callee").isSuper()) {
        state.hasBareSuper = true;
        state.bareSuper = this;

        if (!state.isDerived) {
          throw this.errorWithNode("super call is only allowed in derived constructor");
        }
      }
    }
  },

  "FunctionDeclaration|FunctionExpression"() {
    this.skip();
  },

  ThisExpression(node, parent, scope, state) {
    if (state.isDerived && !state.hasBareSuper) {
      if (this.inShadow()) {
        // https://github.com/babel/babel/issues/1920
        let thisAlias = state.constructorPath.getData("this");

        if (!thisAlias) {
          thisAlias = state.constructorPath.setData(
            "this",
            state.constructorPath.scope.generateUidIdentifier("this")
          );
        }

        return thisAlias;
      } else {
        throw this.errorWithNode("'this' is not allowed before super()");
      }
    }
  },

  Super(node, parent, scope, state) {
    if (state.isDerived && !state.hasBareSuper && !this.parentPath.isCallExpression({ callee: node })) {
      throw this.errorWithNode("'super.*' is not allowed before super()");
    }
  }
};

export default class ClassTransformer {
  constructor(path: NodePath, file: File) {
    this.parent = path.parent;
    this.scope  = path.scope;
    this.node   = path.node;
    this.path   = path;
    this.file   = file;

    this.clearDescriptors();

    this.instancePropBody = [];
    this.instancePropRefs = {};
    this.staticPropBody   = [];
    this.body             = [];

    this.pushedConstructor = false;
    this.pushedInherits    = false;
    this.hasDecorators     = false;
    this.isLoose           = false;

    // class id
    this.classId = this.node.id;

    // this is the name of the binding that will **always** reference the class we've constructed
    this.classRef = this.node.id || this.scope.generateUidIdentifier("class");

    // this is a direct reference to the class we're building, class decorators can shadow the classRef
    this.directRef = null;

    this.superName = this.node.superClass || t.identifier("Function");
    this.isDerived = !!this.node.superClass;
  }

  run() {
    let superName = this.superName;
    let file      = this.file;
    let body      = this.body;

    //

    let constructorBody = this.constructorBody = t.blockStatement([]);
    this.constructor    = this.buildConstructor();

    //

    let closureParams = [];
    let closureArgs = [];

    //
    if (this.isDerived) {
      closureArgs.push(superName);

      superName = this.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(superName);

      this.superName = superName;
    }

    //
    let decorators = this.node.decorators;
    if (decorators) {
      // this is so super calls and the decorators have access to the raw function
      this.directRef = this.scope.generateUidIdentifier(this.classRef);
    } else {
      this.directRef = this.classRef;
    }

    //
    this.buildBody();

    // make sure this class isn't directly called
    constructorBody.body.unshift(t.expressionStatement(t.callExpression(file.addHelper("class-call-check"), [
      t.thisExpression(),
      this.directRef
    ])));

    //
    this.pushDecorators();

    body = body.concat(this.staticPropBody);

    if (this.classId) {
      // named class with only a constructor
      if (body.length === 1) return t.toExpression(body[0]);
    }

    //
    body.push(t.returnStatement(this.classRef));

    let container = t.functionExpression(null, closureParams, t.blockStatement(body));
    container.shadow = true;
    return t.callExpression(container, closureArgs);
  }

  buildConstructor() {
    let func = t.functionDeclaration(this.classRef, [], this.constructorBody);
    t.inherits(func, this.node);
    return func;
  }

  pushToMap(node, enumerable, kind = "value") {
    let mutatorMap;
    if (node.static) {
      this.hasStaticDescriptors = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceDescriptors = true;
      mutatorMap = this.instanceMutatorMap;
    }

    let map = defineMap.push(mutatorMap, node, kind, this.file);

    if (enumerable) {
      map.enumerable = t.booleanLiteral(true);
    }

    if (map.decorators) {
      this.hasDecorators = true;
    }
  }

  /**
   * [Please add a description.]
   * https://www.youtube.com/watch?v=fWNaR-rxAic
   */

  constructorMeMaybe() {
    let hasConstructor = false;
    let paths = this.path.get("body.body");
    for (let path of (paths: Array)) {
      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }
    if (hasConstructor) return;

    let constructor;
    if (this.isDerived) {
      constructor = util.template("class-derived-default-constructor");
    } else {
      constructor = t.functionExpression(null, [], t.blockStatement([]));
    }

    this.path.get("body").unshiftContainer("body", t.methodDefinition(
      t.identifier("constructor"),
      constructor,
      "constructor"
    ));
  }

  buildBody() {
    this.constructorMeMaybe();
    this.pushBody();
    this.placePropertyInitializers();

    if (this.userConstructor) {
      let constructorBody = this.constructorBody;
      constructorBody.body = constructorBody.body.concat(this.userConstructor.body.body);
      t.inherits(this.constructor, this.userConstructor);
      t.inherits(constructorBody, this.userConstructor.body);
    }

    this.pushDescriptors();
  }

  pushBody() {
    let classBodyPaths = this.path.get("body.body");

    for (let path of (classBodyPaths: Array)) {
      let node = path.node;

      if (node.decorators) {
        memoiseDecorators(node.decorators, this.scope);
      }

      if (t.isMethodDefinition(node)) {
        let isConstructor = node.kind === "constructor";
        if (isConstructor) this.verifyConstructor(path);

        let replaceSupers = new ReplaceSupers({
          methodPath: path,
          methodNode: node,
          objectRef:  this.directRef,
          superRef:   this.superName,
          isStatic:   node.static,
          isLoose:    this.isLoose,
          scope:      this.scope,
          file:       this.file
        }, true);

        replaceSupers.replace();

        if (isConstructor) {
          this.pushConstructor(node, path);
        } else {
          this.pushMethod(node, path);
        }
      } else if (t.isClassProperty(node)) {
        this.pushProperty(node, path);
      }
    }
  }

  clearDescriptors() {
    this.hasInstanceDescriptors = false;
    this.hasStaticDescriptors   = false;

    this.instanceMutatorMap = {};
    this.staticMutatorMap   = {};
  }

  pushDescriptors() {
    this.pushInherits();

    let body = this.body;

    let instanceProps;
    let staticProps;
    let classHelper = "create-class";
    if (this.hasDecorators) classHelper = "create-decorated-class";

    if (this.hasInstanceDescriptors) {
      instanceProps = defineMap.toClassObject(this.instanceMutatorMap);
    }

    if (this.hasStaticDescriptors) {
      staticProps = defineMap.toClassObject(this.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      if (instanceProps) instanceProps = defineMap.toComputedObjectFromClass(instanceProps);
      if (staticProps) staticProps = defineMap.toComputedObjectFromClass(staticProps);

      let nullNode = t.nullLiteral();

      // (Constructor, instanceDescriptors, staticDescriptors, instanceInitializers, staticInitializers)
      let args = [this.classRef, nullNode, nullNode, nullNode, nullNode];

      if (instanceProps) args[1] = instanceProps;
      if (staticProps) args[2] = staticProps;

      if (this.instanceInitializersId) {
        args[3] = this.instanceInitializersId;
        body.unshift(this.buildObjectAssignment(this.instanceInitializersId));
      }

      if (this.staticInitializersId) {
        args[4] = this.staticInitializersId;
        body.unshift(this.buildObjectAssignment(this.staticInitializersId));
      }

      let lastNonNullIndex = 0;
      for (let i = 0; i < args.length; i++) {
        if (args[i] !== nullNode) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);


      body.push(t.expressionStatement(
        t.callExpression(this.file.addHelper(classHelper), args)
      ));
    }

    this.clearDescriptors();
  }

  buildObjectAssignment(id) {
    return t.variableDeclaration("var", [
      t.variableDeclarator(id, t.objectExpression([]))
    ]);
  }

  placePropertyInitializers() {
    let body = this.instancePropBody;
    if (!body.length) return;

    if (this.hasPropertyCollision()) {
      let call = t.expressionStatement(t.callExpression(
        t.memberExpression(t.thisExpression(), t.identifier(PROPERTY_COLLISION_METHOD_NAME)),
        []
      ));

      this.pushMethod(t.methodDefinition(
        t.identifier(PROPERTY_COLLISION_METHOD_NAME),
        t.functionExpression(null, [], t.blockStatement(body))
      ), null, true);

      if (this.isDerived) {
        this.bareSuper.insertAfter(call);
      } else {
        this.constructorBody.body.unshift(call);
      }
    } else {
      if (this.isDerived) {
        this.bareSuper.insertAfter(body);
      } else {
        this.constructorBody.body = body.concat(this.constructorBody.body);
      }
    }
  }

   hasPropertyCollision(): boolean {
    if (this.userConstructorPath) {
      for (let name in this.instancePropRefs) {
        if (this.userConstructorPath.scope.hasOwnBinding(name)) {
          return true;
        }
      }
    }

    return false;
  }

   verifyConstructor(path: NodePath) {
    let state = {
      constructorPath: path.get("value"),
      hasBareSuper:    false,
      bareSuper:       null,
      isDerived:       this.isDerived,
      file:            this.file,
    };

    state.constructorPath.traverse(verifyConstructorVisitor, state);

    let thisAlias = state.constructorPath.getData("this");
    if (thisAlias && state.bareSuper) {
      state.bareSuper.insertAfter(t.variableDeclaration("var", [
        t.variableDeclarator(thisAlias, t.thisExpression())
      ]));
    }

    this.bareSuper = state.bareSuper;

    if (!state.hasBareSuper && this.isDerived) {
      throw path.errorWithNode("Derived constructor must call super()");
    }
  }

  /**
   * Push a method to its respective mutatorMap.
   */

  pushMethod(node: { type: "MethodDefinition" }, path?: NodePath, allowedIllegal?) {
    if (!allowedIllegal && t.isLiteral(t.toComputedKey(node), { value: PROPERTY_COLLISION_METHOD_NAME })) {
      throw this.file.errorWithNode(node, messages.get("illegalMethodName", PROPERTY_COLLISION_METHOD_NAME));
    }

    if (node.kind === "method") {
      nameMethod.property(node, this.file, path ? path.get("value").scope : this.scope);
      if (this._processMethod(node)) return;
    }

    this.pushToMap(node);
  }

  _processMethod() {
    return false;
  }

  pushProperty(node: { type: "ClassProperty" }, path: NodePath) {
    path.traverse(collectPropertyReferencesVisitor, {
      references: this.instancePropRefs,
      scope:      this.scope
    });

    if (node.decorators) {
      let body = [];
      if (node.value) {
        body.push(t.returnStatement(node.value));
        node.value = t.functionExpression(null, [], t.blockStatement(body));
      } else {
        node.value = t.nullLiteral();
      }
      this.pushToMap(node, true, "initializer");

      let initializers;
      let target;
      if (node.static) {
        initializers = this.staticInitializersId = this.staticInitializersId || this.scope.generateUidIdentifier("staticInitializers");
        body = this.staticPropBody;
        target = this.classRef;
      } else {
        initializers = this.instanceInitializersId = this.instanceInitializersId || this.scope.generateUidIdentifier("instanceInitializers");
        body = this.instancePropBody;
        target = t.thisExpression();
      }

      body.push(t.expressionStatement(
        t.callExpression(this.file.addHelper("define-decorated-property-descriptor"), [
          target,
          t.literal(node.key.name),
          initializers
        ])
      ));
    } else {
      if (!node.value && !node.decorators) return;

      if (node.static) {
        // can just be added to the static map
        this.pushToMap(node, true);
      } else if (node.value) {
        // add this to the instancePropBody which will be added after the super call in a derived constructor
        // or at the start of a constructor for a non-derived constructor
        this.instancePropBody.push(t.expressionStatement(
          t.assignmentExpression("=", t.memberExpression(t.thisExpression(), node.key), node.value)
        ));
      }
    }
  }

  /**
   * Replace the constructor body of our class.
   */

  pushConstructor(method: { type: "MethodDefinition" }, path: NodePath) {
    // https://github.com/babel/babel/issues/1077
    let fnPath = path.get("value");
    if (fnPath.scope.hasOwnBinding(this.classRef.name)) {
      fnPath.scope.rename(this.classRef.name);
    }

    let construct = this.constructor;
    let fn        = method.value;

    this.userConstructorPath = fnPath;
    this.userConstructor     = fn;
    this.hasConstructor      = true;

    t.inheritsComments(construct, method);

    construct._ignoreUserWhitespace = true;
    construct.params                = fn.params;

    t.inherits(construct.body, fn.body);

    // push constructor to body
    this._pushConstructor();
  }

  _pushConstructor() {
    if (this.pushedConstructor) return;
    this.pushedConstructor = true;

    // we haven't pushed any descriptors yet
    if (this.hasInstanceDescriptors || this.hasStaticDescriptors) {
      this.pushDescriptors();
    }

    this.body.push(this.constructor);

    this.pushInherits();
  }

  /**
   * Push inherits helper to body.
   */

  pushInherits() {
    if (!this.isDerived || this.pushedInherits) return;

    // Unshift to ensure that the constructor inheritance is set up before
    // any properties can be assigned to the prototype.
    this.pushedInherits = true;
    this.body.unshift(t.expressionStatement(t.callExpression(
      this.file.addHelper("inherits"),
      [this.classRef, this.superName]
    )));
  }

  /**
   * Push decorators to body.
   */

  pushDecorators() {
    let decorators = this.node.decorators;
    if (!decorators) return;

    this.body.push(t.variableDeclaration("var", [
      t.variableDeclarator(this.directRef, this.classRef)
    ]));

    // reverse the decorators so we execute them in the right order
    decorators = decorators.reverse();

    for (let decorator of (decorators: Array)) {
      let decoratorNode = util.template("class-decorator", {
        DECORATOR: decorator.expression,
        CLASS_REF: this.classRef
      }, true);
      decoratorNode.expression._ignoreModulesRemap = true;
      this.body.push(decoratorNode);
    }
  }
}
