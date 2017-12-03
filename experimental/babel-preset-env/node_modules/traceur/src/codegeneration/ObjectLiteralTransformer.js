// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {FindVisitor} from './FindVisitor.js';
import {
  FunctionExpression,
  IdentifierExpression,
  LiteralExpression
} from '../syntax/trees/ParseTrees.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {IDENTIFIER} from '../syntax/TokenType.js';
import {
  COMPUTED_PROPERTY_NAME,
  LITERAL_PROPERTY_NAME
} from '../syntax/trees/ParseTreeType.js';
import {StringMap} from '../util/StringMap.js';
import {
  createAssignmentExpression,
  createCommaExpression,
  createDefineProperty,
  createEmptyParameterList,
  createFunctionExpression,
  createIdentifierExpression,
  createObjectCreate,
  createObjectLiteral,
  createParenExpression,
  createPropertyNameAssignment,
  createStringLiteral
} from './ParseTreeFactory.js';
import {propName} from '../staticsemantics/PropName.js';

/**
 * FindAdvancedProperty class that finds if an object literal contains a
 * computed property name, an at name or a __proto__ property.
 */
class FindAdvancedProperty extends FindVisitor {
  constructor(transformOptions) {
    super(true);
    this.transformOptions_ = transformOptions;
    this.protoExpression = null;
  }

  visitPropertyNameAssignment(tree) {
    if (isProtoName(tree.name))
      this.protoExpression = tree.value;
    else
      this.visitAny(tree.name);
      // We do not want to visit object literals in the property's value.
  }

  visitMethod(tree) {
    this.visitAny(tree.name);
    // We do not want to visit object literals in the method's body.
  }

  visitGetAccessor(tree) {
    if (this.transformOptions_.properTailCalls) {
      // TODO(mnieper): This could first check whether there are any calls in
      // tail position in the method's body.
      this.found = true;
    } else {
      this.visitAny(tree.name);
      // We do not want to visit object literals in the accessor's body.
    }
  }

  visitSetAccessor(tree) {
    if (this.transformOptions_.properTailCalls) {
      // TODO(mnieper): This could first check whether there are any calls in
      // tail position in the method's body.
      this.found = true;
    } else {
      this.visitAny(tree.name);
      // We do not want to visit object literals in the accessor's body.
    }
  }

  visitComputedPropertyName(tree) {
    if (this.transformOptions_.computedPropertyNames)
      this.found = true;
  }
}

function isProtoName(tree) {
  return propName(tree) === '__proto__';
}

/**
 * Transforms object literals for the propertyMethods pass.
 *
 * If the object liteal contains an at name then we need to use a temporary
 * object and then use Object.defineProperty.
 *
 * If there is a method but no at names we use Object.create/defineProperties.
 */
export class ObjectLiteralTransformer extends TempVarTransformer {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Options} options
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.transformOptions_ = options.transformOptions;
    this.protoExpression = null;
    this.needsAdvancedTransform = false;
    this.seenAccessors = null;
  }

  findSeenAccessor_(name) {
    if (name.type === COMPUTED_PROPERTY_NAME)
      return null;
    let s = propName(name);
    return this.seenAccessors.get(s);
  }

  removeSeenAccessor_(name) {
    if (name.type === COMPUTED_PROPERTY_NAME)
      return;
    let s = propName(name);
    this.seenAccessors.delete(s);
  }

  addSeenAccessor_(name, descr) {
    if (name.type === COMPUTED_PROPERTY_NAME)
      return;
    let s = propName(name);
    this.seenAccessors.set(s, descr);
  }

  /**
   * Creates an intermediate data structure (Array) which is later used to
   * assemble the properties in the transformObjectLiteral.
   *
   * @private
   * @param {ParseTree} name
   * @param {Object} descr Descriptor where get, set and value are parse
   *     trees.
   * @return {Array} This returns null when we are completing an existing
   *     accessor.
   */
  createProperty_(name, descr) {
    let expression;

    if (name.type === LITERAL_PROPERTY_NAME) {
      if (this.needsAdvancedTransform)
        expression = this.getPropertyName_(name);
      else
        expression = name;
    } else {
      expression = name.expression;
    }

    if (descr.get || descr.set) {
      let oldAccessor = this.findSeenAccessor_(name);
      if (oldAccessor) {
        oldAccessor.get = descr.get || oldAccessor.get;
        oldAccessor.set = descr.set || oldAccessor.set;
        this.removeSeenAccessor_(name);
        return null;
      } else {
        this.addSeenAccessor_(name, descr);
      }
    }
    return [expression, descr];
  }

  /**
   * Creates the expression to use as the name for:
   *
   *   Object.defineProperty(object, name, descr)
   *
   * @private
   * @param {Token} token
   * @return {ParseTree}
   */
  getPropertyName_(nameTree) {
    let token = nameTree.literalToken;
    switch (token.type) {
      case IDENTIFIER:
        return createStringLiteral(token.value);
      default:
        if (token.isKeyword())
          return createStringLiteral(token.type);
        return new LiteralExpression(token.location, token);
    }
  }

  // Don't traverse into classes, let the class transformer handle classes.
  // Traversing into a class will transform the methods into:
  //     method: function () {...}.
  transformClassDeclaration(tree) { return tree; }
  transformClassExpression(tree) { return tree; }

  transformObjectLiteral(tree) {
    // If the object literal needs to be transformed this calls the
    // transformation of the individual transformations of the property names
    // and values and then assembles the result of those into either a call
    // to Object.create or a temporary object that we call defineProperty/ies
    // on.

    let oldNeedsTransform = this.needsAdvancedTransform;
    let oldSeenAccessors = this.seenAccessors;

    let transformed = this.transformObjectLiteralInner_(tree);

    this.needsAdvancedTransform = oldNeedsTransform;
    this.seenAccessors = oldSeenAccessors;

    return transformed;
  }

  transformObjectLiteralInner_(tree) {
    let finder = new FindAdvancedProperty(this.transformOptions_);
    finder.visitAny(tree);
    if (!finder.found) {
      this.needsAdvancedTransform = false;
      return super.transformObjectLiteral(tree);
    }

    this.needsAdvancedTransform = true;
    this.seenAccessors = new StringMap();

    let properties = this.transformList(tree.propertyNameAndValues);
    // Filter out the __proto__ here which is represented as a null value.
    properties = properties.filter((tree) => tree);

    // (tmp = ..., Object.defineProperty(...), ..., tmp)
    let tempVar = this.addTempVar();
    let tempVarIdentifierExpression = createIdentifierExpression(tempVar);

    let expressions = properties.map((property) => {
      let expression = property[0];
      let descr = property[1];
      return createDefineProperty(
          tempVarIdentifierExpression,
          expression,
          descr);
    });

    let protoExpression = this.transformAny(finder.protoExpression);
    let objectExpression;
    if (protoExpression)
      objectExpression = createObjectCreate(protoExpression);
    else
      objectExpression = createObjectLiteral([]);

    expressions.unshift(
        createAssignmentExpression(
            tempVarIdentifierExpression,
            objectExpression));
    expressions.push(tempVarIdentifierExpression);
    return createParenExpression(createCommaExpression(expressions));
  }

  transformPropertyNameAssignment(tree) {
    if (!this.needsAdvancedTransform)
      return super.transformPropertyNameAssignment(tree);

    // __proto__ is handled separately.
    if (isProtoName(tree.name))
      return null;

    return this.createProperty_(tree.name,
        {
          value: this.transformAny(tree.value),
          configurable: true,
          enumerable: true,
          writable: true
        });
  }
  transformGetAccessor(tree) {
    if (!this.needsAdvancedTransform)
      return super.transformGetAccessor(tree);

    let body = this.transformAny(tree.body);
    let func = createFunctionExpression(createEmptyParameterList(), body);
    return this.createProperty_(tree.name,
        {
          get: func,
          configurable: true,
          enumerable: true
        });
  }
  transformSetAccessor(tree) {
    if (!this.needsAdvancedTransform)
      return super.transformSetAccessor(tree);

    let body = this.transformAny(tree.body);
    let parameterList = this.transformAny(tree.parameterList);
    let func = createFunctionExpression(parameterList, body);
    return this.createProperty_(tree.name,
        {
          set: func,
          configurable: true,
          enumerable: true
        });
  }

  transformMethod(tree) {
    let func = new FunctionExpression(tree.location, tree.debugName, tree.functionKind,
        this.transformAny(tree.parameterList), tree.typeAnnotation, [],
        this.transformAny(tree.body));
    if (!this.needsAdvancedTransform) {
      // m() { }
      //  =>
      // m: function() { }
      return createPropertyNameAssignment(tree.name, func);
    }

    let expression = this.transformAny(tree.name);
    return this.createProperty_(tree.name,
        {
          value: func,
          configurable: true,
          enumerable: true,
          writable: true
        });
  }

  transformPropertyNameShorthand(tree) {
    if (!this.needsAdvancedTransform)
      return super.transformPropertyNameShorthand(tree);

    let expression = this.transformAny(tree.name);
    return this.createProperty_(tree.name,
        {
          value: new IdentifierExpression(tree.location, tree.name.identifierToken),
          configurable: true,
          enumerable: false,
          writable: true
        });
  }
}
