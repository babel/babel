import template from 'babel-template';
import syntaxDecorators2 from "babel-plugin-syntax-decorators-2";

//TODO: will have to check for dot (.) access to reserved keywords in decorator members
//NOTE: convention is 'descriptor' is used for element descriptors, while 'propertyDescriptor' is used for property descriptor

/** manual testing code
class A { method() {console.log("method exec hua");} static estatic() {console.log("estatic hua");}}
function methDec(descriptor) {console.log("methDec hua", arguments); return {descriptor, extras: [], finishers: []}}
function methDec2(descriptor) {console.log("methDec2 hua", arguments); return {descriptor, extras: [], finishers: []}}
function classDec(constructor, heritage, memberDescriptors) {console.log("class hua", arguments); return {constructor, elements: memberDescriptors, finishers: []}}
decorate(A, [], [["method", [methDec, methDec2]], ["estatic", [methDec], true]])([classDec])
**/
export default function({ types: t }) {

  // injected
  function makeElementDescriptor(kind, key, isStatic, descriptor, finisher) {
    return {kind, key, isStatic, descriptor, finisher};
  }

  // injected
  function decorateElement(descriptor, decorators) { //spec uses the param "element" instead of "descriptor" and finds descriptor from it
    let extras = [];
    let finishers = [];

    let previousDescriptor = descriptor;

    for (let i = decorators.length - 1; i >= 0; i--) {
      let decorator = decorators[i];
      let result = decorator(previousDescriptor);
      let currentDescriptor = result.descriptor;

      if (result.finisher) {
        finishers.push(current.finisher);
        result.finisher = undefined;
      }

      previousDescriptor = currentDescriptor;

      let extrasObject = result.extras;

      if (extrasObject) {
        for (let extra of extrasObject) {
          extras.push(extra);
        }
      }
    }

    extras = mergeDuplicateElements(extras);

    return {descriptor: previousDescriptor, extras, finishers}
  }

  // injected
  function mergeDuplicateElements(elements) { return elements; /*TODO*/}

  // injected
  function decorateClass(constructor, decorators, heritage, elementDescriptors) {
    let elements = [];
    let finishers = [];

    let previousConstructor = constructor;
    let previousDescriptors = elementDescriptors;

    for (let i = decorators.length - 1; i >= 0; i--) {
      let decorator = decorators[i];
      let result = decorator(previousConstructor, heritage, previousDescriptors);

      previousConstructor = result.constructor;
      if (result.finishers) {// result.finishers is called 'finisher' in the spec
        finishers = finishers.concat(result.finishers);
      }

      if (result.elements) {
        for (let element of result.elements) {
          elements.push(element);
        }
      }

      elements = mergeDuplicateElements(elements);
    }

    return {constructor: previousConstructor, elements, finishers};
  }

  function decorate(constructor, undecorated, memberDecorators, heritage) {
    const prototype = constructor.prototype;
    let finishers = [];
    const elementDescriptors = {}; // elementDescriptors is meant to be an array, so this will be converted later
    //TODO: merging of elementDescriptors

    for (let [key, isStatic] of undecorated) {
      const target = isStatic? constructor : prototype;
      let propertyDescriptor = Object.getOwnPropertyDescriptor(target, key);
      elementDescriptors[key] = makeElementDescriptor("property", key, isStatic, propertyDescriptor);
    }

    for (let [key, decorators, isStatic] of memberDecorators) {
      let target = isStatic? constructor : prototype;
      let propertyDescriptor = elementDescriptors[key] || Object.getOwnPropertyDescriptor(target, key);
      let elementDescriptor = makeElementDescriptor("property", key, isStatic, propertyDescriptor);
      let decorated = decorateElement(elementDescriptor, decorators);

      elementDescriptors[key] = decorated.descriptor;

      for (let extra of decorated.extras) { // extras is an array of element descriptors
        elementDescriptors[extra.key] = extra;
      }

      finishers = finishers.concat(decorated.finishers);
    }

    return function (classDecorators) {
      let result = decorateClass(constructor, classDecorators, heritage, Object.values(elementDescriptors));
      finishers = finishers.concat(result.finishers);
      //TODO: heritage hacks so result.constructor has the correct prototype and instanceof results
      //TODO: step 38 and 39, what do they mean "initialize"?

      for (let elementDescriptor of result.elements) {
        let target = elementDescriptor.isStatic? constructor : prototype;  
        Object.defineOwnProperty(target, elementDescriptor.key, elementDescriptor.descriptor);
      }

      return result.constructor;
    }
  }


  function classDefintionEvaluation(path) {
    // step 20, 21
    for (const method of body) {
      const { node } = method;
      if (!method.isClassMethod()) continue;
      if (!node.decorators || !method.node.decorators.length) continue;
      if (node.kind === "constructor") continue;
    }
  }

  // goes over the methods of current class and prepares decorators
  // expects path of a ClassExpression
  function takeMethodDecorators(path) {
    const body = path.get("body.body");

    // a collection of [decoratedKey, decorators] or [decoratedKey, decorators, true] for static properties
    const entries = [];

    for (const method of body) {
      const { node } = method;
      if (!method.isClassMethod()) continue;
      if (!node.decorators || !method.node.decorators.length) continue;

      const decorators = method.node.decorators
        .map(d => d.expression)
        .reverse(); // reverse for correct evaluation order
      node.decorators = []; //TODO: should we remove from path? method.get("decorators") doesn't work

      const entry = [];
      if (node.computed) {
        // if it is computed, we need an identifier to refer to it later
        // so we can avoid evaluating the expression twice
        if (t.isAssignmentExpression(node.key)) {
          entry.push(node.key.left);
        } else {
          const parent = path.findParent(p => p.parentPath.isBlock());
          const ref = method.scope.generateUidIdentifier("key");
          parent.insertBefore(
            t.variableDeclaration("let", [t.variableDeclarator(ref)]),
          );
          const replacement = t.sequenceExpression([
            t.assignmentExpression("=", ref, node.key),
          ]);
          //method.get("key").replaceWith(); FIXME: this should work
          node.key = replacement;
          entry.push(ref);
        }
      } else {
        entry.push(t.stringLiteral(node.key.name));
      }

      entry.push(t.arrayExpression(decorators));

      if (node.static) {
        entry.push(t.booleanLiteral(true));
      }

      entries.push(t.arrayExpression(entry));
    }

    return t.arrayExpression(entries);
  }

  // expects path of a ClassExpression
  function takeClassDecorators(path) {
    // reverse for correct decorator evaluation order
    const decorators = path.node.decorators.map(d => d.expression).reverse();
    path.node.decorators = [];
    return t.arrayExpression(decorators);
  }

  return {
    inherits: syntaxDecorators2,
    visitor: {
      // export default is a special case since it expects and expression rather than a declaration
      ExportDefaultDeclaration(path) {
        const classPath = path.get("declaration");
        if (!classPath.isClassDeclaration()) return;

        if (classPath.node.id) {
          const ref = classPath.node.id;
          path.insertBefore(
            t.variableDeclaration("let", [t.variableDeclarator(ref)]),
          );
          classPath.replaceWith(
            t.assignmentExpression("=", ref, t.toExpression(classPath.node)),
          );
        } else {
          classPath.replaceWith(t.toExpression(classPath));
        }
      },

      // replace declaration with a let declaration
      ClassDeclaration(path) {
        const { node } = path;
        const ref = node.id || path.scope.generateUidIdentifier("class");

        path.replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(ref, t.toExpression(node)),
          ]),
        );
      },

      ClassExpression(path) {
        const methodDecorators = takeMethodDecorators(path);
        const classDecorators = takeClassDecorators(path);
        if (
          methodDecorators.elements.length == 0 &&
          classDecorators.elements.length == 0
        ) {
          return;
        }
        path.replaceWith(
          t.callExpression(t.identifier("decorate"), [
            path.node,
            methodDecorators,
            classDecorators,
          ]),
        );
      },

      ClassMethod(path) {
        if (path.get("decorators")) {
          path.get("decorators").forEach(p => p.remove());
          path.get("body").unshiftContainer("body", t.identifier("yo"));
        }
      },
    },
  };
}
