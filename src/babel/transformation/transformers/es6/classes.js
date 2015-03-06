import ReplaceSupers from "../../helpers/replace-supers";
import * as nameMethod from "../../helpers/name-method";
import * as defineMap from "../../helpers/define-map";
import * as messages from "../../../messages";
import * as util from  "../../../util";
import traverse from "../../../traversal";
import t from "../../../types";

export var check = t.isClass;

export function ClassDeclaration(node, parent, scope, file) {
  return new ClassTransformer(node, parent, scope, file, true).run();
}

export function ClassExpression(node, parent, scope, file) {
  return new ClassTransformer(node, parent, scope, file, false).run();
}

var verifyConstructorVisitor = {
  CallExpression: {
    enter(node, parent, scope, state) {
      if (t.isIdentifier(node.callee, { name: "super" })) {
        state.hasBareSuper = true;

        if (!state.hasSuper) {
          throw state.file.errorWithNode(node, "super call is only allowed in derived constructor");
        }
      }
    }
  },

  ThisExpression: {
    enter(node, parent, scope, state) {
      if (state.hasSuper && !state.hasBareSuper) {
        throw state.file.errorWithNode(node, "'this' is not allowed before super()");
      }
    }
  }
};

class ClassTransformer {

  /**
   * Description
   *
   * @param {Node} node
   * @param {Node} parent
   * @param {Scope} scope
   * @param {File} file
   * @param {Boolean} isStatement
   */

  constructor(node, parent, scope, file, isStatement) {
    this.isStatement = isStatement;
    this.parent      = parent;
    this.scope       = scope;
    this.node        = node;
    this.file        = file;

    this.hasInstanceMutators = false;
    this.hasStaticMutators   = false;

    this.instanceMutatorMap = {};
    this.staticMutatorMap   = {};

    this.hasConstructor = false;
    this.className      = node.id;
    this.classRef       = scope.generateUidIdentifier(node.id ? node.id.name : "class");

    this.superName = node.superClass || t.identifier("Function");
    this.hasSuper  = !!node.superClass;

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

    var body = this.body = [];

    //

    var useFunctionDeclaration = false;

    // class expressions have their class id lexically bound

    if (!this.isStatement && this.className) {
      useFunctionDeclaration = true;
      classRef = this.classRef = this.className || this.classRef;
    }

    //

    var constructorBody = t.blockStatement([
      t.expressionStatement(t.callExpression(file.addHelper("class-call-check"), [
        t.thisExpression(),
        classRef
      ]))
    ]);

    var constructor;

    if (useFunctionDeclaration) {
      constructor = t.functionDeclaration(classRef, [], constructorBody);
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

    if (!useFunctionDeclaration) {
      if (this.isStatement) {
        constructor = nameMethod.custom(constructor, this.className, this.scope);
      } else if (!this.className) {
        // infer class name if this is a nameless class expression
        constructor = nameMethod.bare(constructor, this.parent, this.scope);
      }

      body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(classRef, constructor)
      ]));

      t.inheritsComments(body[0], this.node);
    }

    //

    body.push(t.returnStatement(classRef));

    var init = t.callExpression(
      t.functionExpression(null, closureParams, t.blockStatement(body)),
      closureArgs
    );

    if (this.isStatement) {
      return t.variableDeclaration("let", [
        t.variableDeclarator(this.className, init)
      ]);
    } else {
      return init;
    }
  }

  /**
   * Description
   */

  buildBody() {
    var constructor = this.constructor;
    var className   = this.className;
    var superName   = this.superName;
    var classBody   = this.node.body.body;
    var body        = this.body;

    for (var i = 0; i < classBody.length; i++) {
      var node = classBody[i];
      if (t.isMethodDefinition(node)) {
        var isConstructor = (!node.computed && t.isIdentifier(node.key, { name: "constructor" })) || t.isLiteral(node.key, { value: "constructor" });
        if (isConstructor) this.verifyConstructor(node);

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
      } else if (t.isPrivateDeclaration(node)) {
        this.closure = true;
        body.unshift(node);
      } else if (t.isClassProperty(node)) {
        this.pushProperty(node);
      }
    }

    // we have no constructor, we have a super, and the super doesn't appear to be falsy
    if (!this.hasConstructor && this.hasSuper && t.evaluateTruthy(superName, this.scope) !== false) {
      var helperName = "class-super-constructor-call";
      if (this.isLoose) helperName += "-loose";
      constructor.body.body.push(util.template(helperName, {
        CLASS_NAME: className,
        SUPER_NAME: this.superName
      }, true));
    }

    var instanceProps;
    var staticProps;

    if (this.hasInstanceMutators) {
      instanceProps = defineMap.toClassObject(this.instanceMutatorMap);
    }

    if (this.hasStaticMutators) {
      staticProps = defineMap.toClassObject(this.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      instanceProps ||= t.literal(null);

      var args = [this.classRef, instanceProps];
      if (staticProps) args.push(staticProps);

      body.push(t.expressionStatement(
        t.callExpression(this.file.addHelper("create-class"), args)
      ));
    }
  }

  /**
   * Description
   *
   * @param {Node} node
   */

   verifyConstructor(node) {
    var state = {
      hasBareSuper: false,
      hasSuper:     this.hasSuper,
      file:         this.file
    };

    traverse(node, verifyConstructorVisitor, this.scope, state);

    if (!state.hasBareSuper && this.hasSuper) {
      throw this.file.errorWithNode(node, "Derived constructor must call super()");
    }
   }

  /**
   * Push a method to its respective mutatorMap.
   *
   * @param {Node} node MethodDefinition
   */

  pushMethod(node) {
    var methodName = node.key;

    var kind = node.kind;

    if (kind === "") {
      nameMethod.property(node, this.file, this.scope);

      if (this.isLoose) {
        // use assignments instead of define properties for loose classes

        var classRef = this.classRef;
        if (!node.static) classRef = t.memberExpression(classRef, t.identifier("prototype"));
        methodName = t.memberExpression(classRef, methodName, node.computed);

        var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
        t.inheritsComments(expr, node);
        this.body.push(expr);
        return;
      }

      kind = "value";
    }

    var mutatorMap = this.instanceMutatorMap;
    if (node.static) {
      this.hasStaticMutators = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceMutators = true;
    }

    defineMap.push(mutatorMap, methodName, kind, node.computed, node);
  }

  /**
   * Description
   *
   * @param {Node} node
   */

  pushProperty(node) {
    if (!node.value) return;

    var key;

    if (node.static) {
      key = t.memberExpression(this.classRef, node.key);
      this.body.push(
        t.expressionStatement(t.assignmentExpression("=", key, node.value))
      );
    } else {
      key = t.memberExpression(t.thisExpression(), node.key);
      this.constructor.body.body.unshift(
        t.expressionStatement(t.assignmentExpression("=", key, node.value))
      );
    }
  }

  /**
   * Replace the constructor body of our class.
   *
   * @param {Node} method MethodDefinition
   */

  pushConstructor(method) {
    if (method.kind) {
      throw this.file.errorWithNode(method, messages.get("classesIllegalConstructorKind"));
    }

    var construct = this.constructor;
    var fn        = method.value;

    this.hasConstructor = true;

    t.inherits(construct, fn);
    t.inheritsComments(construct, method);

    construct._ignoreUserWhitespace = true;
    construct.params                = fn.params;

    t.inherits(construct.body, fn.body);
    construct.body.body = construct.body.body.concat(fn.body.body);
  }
}
