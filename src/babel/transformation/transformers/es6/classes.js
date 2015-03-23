import ReplaceSupers from "../../helpers/replace-supers";
import * as nameMethod from "../../helpers/name-method";
import * as defineMap from "../../helpers/define-map";
import * as messages from "../../../messages";
import * as util from  "../../../util";
import traverse from "../../../traversal";
import each from "lodash/collection/each";
import has from "lodash/object/has";
import * as t from "../../../types";

export var check = t.isClass;

export function ClassDeclaration(node, parent, scope, file) {
  return t.variableDeclaration("let", [
    t.variableDeclarator(node.id, t.toExpression(node))
  ]);
}

export function ClassExpression(node, parent, scope, file) {
  return new ClassTransformer(this, file).run();
}

var verifyConstructorVisitor = traverse.explode({
  MethodDefinition: {
    enter() {
      this.skip();
    }
  },

  Property: {
    enter(node) {
      if (node.method) this.skip();
    }
  },

  CallExpression: {
    enter(node, parent, scope, state) {
      if (this.get("callee").isSuper()) {
        state.hasBareSuper = true;
        state.bareSuper = this;

        if (!state.hasSuper) {
          throw this.errorWithNode("super call is only allowed in derived constructor");
        }
      }
    }
  },

  ThisExpression: {
    enter(node, parent, scope, state) {
      if (state.hasSuper && !state.hasBareSuper) {
        throw this.errorWithNode("'this' is not allowed before super()");
      }
    }
  }
});

class ClassTransformer {

  /**
   * Description
   */

  constructor(path: TraversalPath, file: File) {
    this.parent = path.parent;
    this.scope  = path.scope;
    this.node   = path.node;
    this.path   = path;
    this.file   = file;

    this.hasInstanceDescriptors = false;
    this.hasStaticDescriptors   = false;

    this.instanceMutatorMap = {};
    this.staticMutatorMap   = {};

    this.instancePropBody = [];
    this.staticPropBody   = [];
    this.body             = [];

    this.hasConstructor = false;
    this.hasDecorators  = false;
    this.className      = this.node.id;
    this.classRef       = this.node.id || this.scope.generateUidIdentifier("class");

    this.superName = this.node.superClass || t.identifier("Function");
    this.hasSuper  = !!this.node.superClass;

    this.isLoose = file.isLoose("es6.classes");
  }

  /**
   * Description
   *
   * @returns {Array}
   */

  run() {
    var superName = this.superName;
    var className = this.className;
    var classBody = this.node.body.body;
    var classRef  = this.classRef;
    var file      = this.file;

    //

    var body = this.body;

    //

    var constructorBody = this.constructorBody = t.blockStatement([]);
    var constructor;

    if (this.className) {
      constructor = t.functionDeclaration(this.className, [], constructorBody);
      body.push(constructor);
    } else {
      constructor = t.functionExpression(null, [], constructorBody);
    }

    this.constructor = constructor;

    //

    var closureParams = [];
    var closureArgs = [];

    //

    if (this.hasSuper) {
      closureArgs.push(superName);

      superName = this.scope.generateUidBasedOnNode(superName, this.file);
      closureParams.push(superName);

      this.superName = superName;
      body.push(t.expressionStatement(t.callExpression(file.addHelper("inherits"), [classRef, superName])));
    }

    //

    this.buildBody();

    constructorBody.body.unshift(t.expressionStatement(t.callExpression(file.addHelper("class-call-check"), [
      t.thisExpression(),
      classRef
    ])));

    //

    var decorators = this.node.decorators;
    if (decorators) {
      for (var i = 0; i < decorators.length; i++) {
        var decorator = decorators[i];
        body.push(util.template("class-decorator", {
          DECORATOR: decorator.expression,
          CLASS_REF: classRef
        }, true));
      }
    }

    if (this.className) {
      // named class with only a constructor
      if (body.length === 1) return t.toExpression(body[0]);
    } else {
      // infer class name if this is a nameless class expression
      constructor = nameMethod.bare(constructor, this.parent, this.scope);

      body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(classRef, constructor)
      ]));

      t.inheritsComments(body[0], this.node);
    }

    body = body.concat(this.staticPropBody);

    //

    body.push(t.returnStatement(classRef));

    return t.callExpression(
      t.functionExpression(null, closureParams, t.blockStatement(body)),
      closureArgs
    );
  }

  /**
   * Description
   */

  pushToMap(node, enumerable, kind = "value") {
    var mutatorMap;
    if (node.static) {
      this.hasStaticDescriptors = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceDescriptors = true;
      mutatorMap = this.instanceMutatorMap;
    }

    var alias = t.toKeyAlias(node);

    //

    var map = {};
    if (has(mutatorMap, alias)) map = mutatorMap[alias];
    mutatorMap[alias] = map;

    //

    map._inherits ||= [];
    map._inherits.push(node);

    map._key = node.key;

    if (enumerable) {
      map.enumerable = t.literal(true)
    }

    if (node.computed) {
      map._computed = true;
    }

    if (node.decorators) {
      this.hasDecorators = true;
      var decorators = map.decorators ||= t.arrayExpression([]);
      decorators.elements = decorators.elements.concat(node.decorators.map(dec => dec.expression));
    }

    if (map.value || map.initializer) {
      throw this.file.errorWithNode(node, "Key conflict with sibling node");
    }

    if (node.kind === "get") kind = "get";
    if (node.kind === "set") kind = "set";
    map[kind] = node.value;
  }

  /**
   * Description
   */

  buildBody() {
    var constructorBody = this.constructorBody;
    var constructor     = this.constructor;
    var className       = this.className;
    var superName       = this.superName;
    var classBody       = this.node.body.body;
    var body            = this.body;

    var classBodyPaths = this.path.get("body").get("body");

    for (var i = 0; i < classBody.length; i++) {
      var node = classBody[i];
      if (t.isMethodDefinition(node)) {
        var isConstructor = node.kind === "constructor";
        if (isConstructor) this.verifyConstructor(classBodyPaths[i]);

        var replaceSupers = new ReplaceSupers({
          methodNode: node,
          objectRef:  this.classRef,
          superRef:   this.superName,
          isStatic:   node.static,
          isLoose:    this.isLoose,
          scope:      this.scope,
          file:       this.file
        }, true);

        replaceSupers.replace();

        if (isConstructor) {
          this.pushConstructor(node);
        } else {
          this.pushMethod(node);
        }
      } else if (t.isClassProperty(node)) {
        this.pushProperty(node);
      }
    }

    // we have no constructor, but we're a derived class
    if (!this.hasConstructor && this.hasSuper) {
      var helperName = "class-super-constructor-call";
      if (this.isLoose) helperName += "-loose";
      constructorBody.body.push(util.template(helperName, {
        CLASS_NAME: className,
        SUPER_NAME: this.superName
      }, true));
    }

    //
    this.placePropertyInitializers();

    //
    if (this.userConstructor) {
      constructorBody.body = constructorBody.body.concat(this.userConstructor.body.body);
    }

    var instanceProps;
    var staticProps;
    var classHelper = "create-class";
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

      var nullNode = t.literal(null);

      // (Constructor, instanceDescriptors, staticDescriptors, instanceInitializers, staticInitializers)
      var args = [this.classRef, nullNode, nullNode, nullNode, nullNode];

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

      var lastNonNullIndex = 0;
      for (var i = 0; i < args.length; i++) {
        if (args[i] !== nullNode) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);


      body.push(t.expressionStatement(
        t.callExpression(this.file.addHelper(classHelper), args)
      ));
    }
  }

  buildObjectAssignment(id) {
    return t.variableDeclaration("var", [
      t.variableDeclarator(id, t.objectExpression([]))
    ]);
  }

  /**
   * Description
   */

  placePropertyInitializers() {
    var body = this.instancePropBody;
    if (body.length) {
      // todo: check for scope conflicts and shift into a method
      if (this.hasSuper) {
        if (this.bareSuper) {
          this.bareSuper.insertAfter(body);
        } else {
          this.constructorBody.body = this.constructorBody.body.concat(body);
        }
      } else {
        this.constructorBody.body = body.concat(this.constructorBody.body);
      }
    }
  }

  /**
   * Description
   */

   verifyConstructor(path: TraversalPath) {
    var state = {
      hasBareSuper: false,
      bareSuper:    null,
      hasSuper:     this.hasSuper,
      file:         this.file
    };

    path.traverse(verifyConstructorVisitor, state);

    this.bareSuper = state.bareSuper;

    if (!state.hasBareSuper && this.hasSuper) {
      throw path.errorWithNode("Derived constructor must call super()");
    }
   }

  /**
   * Push a method to its respective mutatorMap.
   */

  pushMethod(node: { type: "MethodDefinition" }) {
    if (node.kind === "method") {
      nameMethod.property(node, this.file, this.scope);

      if (this.isLoose) {
        // use assignments instead of define properties for loose classes

        var classRef = this.classRef;
        if (!node.static) classRef = t.memberExpression(classRef, t.identifier("prototype"));
        var methodName = t.memberExpression(classRef, node.key, node.computed);

        var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
        t.inheritsComments(expr, node);
        this.body.push(expr);
        return;
      }
    }

    this.pushToMap(node);
  }

  /**
   * Description
   */

  pushProperty(node: { type: "ClassProperty" }) {
    if (!node.value && !node.decorators) return;

    var key;

    if (node.decorators) {
      var body = [];
      if (node.value) body.push(t.returnStatement(node.value));
      node.value = t.functionExpression(null, [], t.blockStatement(body));
      this.pushToMap(node, true, "initializer");

      if (node.static) {
        this.staticPropBody.push(util.template("call-static-decorator", {
          INITIALIZERS: this.staticInitializersId ||= this.scope.generateUidIdentifier("staticInitializers"),
          CONSTRUCTOR:  this.classRef,
          KEY:          node.key,
        }, true));
      } else {
        this.instancePropBody.push(util.template("call-instance-decorator", {
          INITIALIZERS: this.instanceInitializersId ||= this.scope.generateUidIdentifier("instanceInitializers"),
          KEY:          node.key
        }, true));
      }
    } else {
      if (node.static) {
        // can just be added to the static map
        this.pushToMap(node, true);
      } else {
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

  pushConstructor(method: { type: "MethodDefinition" }) {
    var construct = this.constructor;
    var fn        = method.value;

    this.userConstructor = fn;
    this.hasConstructor  = true;

    t.inherits(construct, fn);
    t.inheritsComments(construct, method);

    construct._ignoreUserWhitespace = true;
    construct.params                = fn.params;

    t.inherits(construct.body, fn.body);
  }
}
