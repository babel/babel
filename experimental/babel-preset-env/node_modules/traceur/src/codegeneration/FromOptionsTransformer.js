// Copyright 2013 Traceur Authors.
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

import {AmdTransformer} from './AmdTransformer.js';
import {AnnotationsTransformer} from './AnnotationsTransformer.js';
import {ArrayComprehensionTransformer} from './ArrayComprehensionTransformer.js';
import {ArrowFunctionTransformer} from './ArrowFunctionTransformer.js';
import {AsyncGeneratorTransformPass} from './AsyncGeneratorTransformPass.js';
import {AsyncToGeneratorTransformer} from './AsyncToGeneratorTransformer.js';
import {BlockBindingTransformer} from './BlockBindingTransformer.js';
import {ClassTransformer} from './ClassTransformer.js';
import {ClosureModuleTransformer} from './ClosureModuleTransformer.js';
import {CommonJsModuleTransformer} from './CommonJsModuleTransformer.js';
import {DefaultParametersTransformer} from './DefaultParametersTransformer.js';
import {DestructuringTransformer} from './DestructuringTransformer.js';
import {ExponentiationTransformer} from './ExponentiationTransformer.js';
import {ForOfTransformer} from './ForOfTransformer.js';
import {ForOnTransformer} from './ForOnTransformer.js';
import {GeneratorComprehensionTransformer} from './GeneratorComprehensionTransformer.js';
import {GeneratorTransformPass} from './GeneratorTransformPass.js';
import {InlineModuleTransformer} from './InlineModuleTransformer.js';
import {InstantiateModuleTransformer} from './InstantiateModuleTransformer.js';
import {JsxTransformer} from './JsxTransformer.js';
import {MemberVariableTransformer} from './MemberVariableTransformer.js';
import {ModuleTransformer} from './ModuleTransformer.js';
import {MultiTransformer} from './MultiTransformer.js';
import {NumericLiteralTransformer} from './NumericLiteralTransformer.js';
import {ObjectLiteralTransformer} from './ObjectLiteralTransformer.js';
import {ProperTailCallTransformer} from './ProperTailCallTransformer.js';
import {PropertyNameShorthandTransformer} from './PropertyNameShorthandTransformer.js';
import {RegularExpressionTransformer} from './RegularExpressionTransformer.js';
import {RestParameterTransformer} from './RestParameterTransformer.js';
import {SpreadPropertiesTransformer} from './SpreadPropertiesTransformer.js';
import {SpreadTransformer} from './SpreadTransformer.js';
import {SuperTransformer} from './SuperTransformer.js';
import {SymbolTransformer} from './SymbolTransformer.js';
import {TemplateLiteralTransformer} from './TemplateLiteralTransformer.js';
import {TypeToExpressionTransformer} from './TypeToExpressionTransformer.js';
import {TypeTransformer} from './TypeTransformer.js';
import {UnicodeEscapeSequenceTransformer} from './UnicodeEscapeSequenceTransformer.js';
import {UniqueIdentifierGenerator} from './UniqueIdentifierGenerator.js';
import {validate as validateConst} from '../semantics/ConstChecker.js';
import {validate as validateFreeVariables} from '../semantics/FreeVariableChecker.js';

/**
 * MultiTransformer built from global options settings
 */
export class FromOptionsTransformer extends MultiTransformer {
  /**
   * @param {ErrorReporter} reporter
   * @param {Options} options
   */
  constructor(reporter, options) {
    super(reporter, options.validate);
    let transformOptions = options.transformOptions;
    let idGenerator = new UniqueIdentifierGenerator();

    let append = (transformer) => {
      this.append((tree) => {
        return new transformer(idGenerator, reporter, options).
            transformAny(tree);
      });
    };

    if (transformOptions.blockBinding) {
      this.append((tree) => {
        validateConst(tree, reporter);
        return tree;
      });
    }

    // Issue errors for any unbound variables
    if (options.freeVariableChecker) {
      this.append((tree) => {
        validateFreeVariables(tree, reporter);
        return tree;
      });
    }

    // TODO: many of these simple, local transforms could happen in the same
    // tree pass
    if (transformOptions.exponentiation)
      append(ExponentiationTransformer);

    if (transformOptions.numericLiterals)
      append(NumericLiteralTransformer);

    if (transformOptions.unicodeExpressions)
      append(RegularExpressionTransformer);

    if (transformOptions.jsx) {
      append(JsxTransformer);
    }

    if (transformOptions.templateLiterals)
      append(TemplateLiteralTransformer);

    if (transformOptions.types && transformOptions.annotations) {
      append(TypeToExpressionTransformer);
    }

    if (transformOptions.unicodeEscapeSequences)
      append(UnicodeEscapeSequenceTransformer);

    if (transformOptions.annotations)
      append(AnnotationsTransformer);

    // PropertyNameShorthandTransformer needs to come before
    // module transformers. See #1120 or
    // test/node-instantiate-test.js test "Shorthand syntax with import"
    // for detailed info.
    if (transformOptions.propertyNameShorthand)
      append(PropertyNameShorthandTransformer);

    // MemberVariableTransformer needs to be done before SuperTransformer.
    if (transformOptions.memberVariables) {
      append(MemberVariableTransformer);
    }

    if (transformOptions.classes) {
      append(SuperTransformer);
    }

    // ArrowFunctionTransformer needs to be done after SuperTransformer.
    if (transformOptions.arrowFunctions) {
      append(ArrowFunctionTransformer);
    }

    // ClassTransformer needs to come before ObjectLiteralTransformer.
    if (transformOptions.classes) {
      append(ClassTransformer);
    }

    if (transformOptions.spreadProperties) {
      append(SpreadPropertiesTransformer);
    }

    if (transformOptions.propertyMethods ||
        transformOptions.computedPropertyNames ||
        transformOptions.properTailCalls) {
      append(ObjectLiteralTransformer);
    }

    // Generator/ArrayComprehensionTransformer must come before for-of and
    // destructuring.
    if (transformOptions.generatorComprehension)
      append(GeneratorComprehensionTransformer);
    if (transformOptions.arrayComprehension)
      append(ArrayComprehensionTransformer);

    // for of must come before destructuring and generator, or anything
    // that wants to use VariableBinder
    if (transformOptions.forOf)
      append(ForOfTransformer);

    // async generators must come before async functions
    if (transformOptions.asyncGenerators) {
      append(AsyncGeneratorTransformPass);
    }

    // for on must come before async functions
    if (transformOptions.forOn)
      append(ForOnTransformer);

    // rest parameters must come before generator
    if (transformOptions.restParameters)
      append(RestParameterTransformer);

    // default parameters should come after rest parameter to get the
    // expected order in the transformed code.
    if (transformOptions.defaultParameters)
      append(DefaultParametersTransformer);

    // destructuring must come after for of and before block binding and
    // generator
    if (transformOptions.destructuring)
      append(DestructuringTransformer);

      if (transformOptions.types)
        append(TypeTransformer);

    if (transformOptions.spread)
      append(SpreadTransformer);

    if (transformOptions.blockBinding) {
      this.append((tree) => {
        // this transformer need to be aware of the tree it will be working on
        let transformer = new BlockBindingTransformer(idGenerator, reporter, tree);
        return transformer.transformAny(tree);
      });
    }

    // Async functions must come after all the parameter transformers.
    if (transformOptions.asyncFunctions && options.generators === 'parse') {
      append(AsyncToGeneratorTransformer);
    } else if (transformOptions.generators ||
               transformOptions.asyncFunctions) {
      // generator must come after for of, for on and rest parameters
      append(GeneratorTransformPass);
    }

    if (transformOptions.symbols)
      append(SymbolTransformer);

    if (transformOptions.properTailCalls) {
      append(ProperTailCallTransformer);
    }

    // The module transformer comes last so that other transformers
    // can output import statements.
    if (transformOptions.modules) {
      switch (transformOptions.modules) {
        case 'commonjs':
          append(CommonJsModuleTransformer);
          break;
        case 'amd':
          append(AmdTransformer);
          break;
        case 'closure':
          append(ClosureModuleTransformer);
          break;
        case 'inline':
          append(InlineModuleTransformer);
          break;
        case 'instantiate':
          append(InstantiateModuleTransformer);
          break;
        case 'bootstrap':
          append(ModuleTransformer);
          break;
        case 'parse':
          break;
        default:
          // The options processing should prevent us from getting here.
          throw new Error('Invalid modules transform option');
      }
    }
  }
}
