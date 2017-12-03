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

import {AnnotationsTransformer} from './AnnotationsTransformer.js';
import {AsyncToGeneratorTransformer} from './AsyncToGeneratorTransformer.js';
import {InlineES6ModuleTransformer} from './InlineES6ModuleTransformer.js';
import {JsxTransformer} from './JsxTransformer.js';
import {MemberVariableTransformer} from './MemberVariableTransformer.js';
import {MultiTransformer} from './MultiTransformer.js';
import {SpreadPropertiesTransformer} from './SpreadPropertiesTransformer.js';
import {TypeTransformer} from './TypeTransformer.js';
import {UniqueIdentifierGenerator} from './UniqueIdentifierGenerator.js';
import {validate as validateFreeVariables} from
    '../semantics/FreeVariableChecker.js';

/**
 * MultiTransformer that only transforms non ES6 features, such as:
 * - annotations
 * - types
 * - async functions
 *
 * This is used to transform ES6+ code into pure ES6.
 */
export class PureES6Transformer extends MultiTransformer {
  /**
   * @param {ErrorReporter} reporter
   * @param {Options} options
   * @param {Object} metadata Implementation defined loader data.
   */
  constructor(reporter, options, metadata) {
    super(reporter, options.validate);
    let idGenerator = new UniqueIdentifierGenerator();

    let append = (transformer) => {
      this.append((tree) => {
        return new transformer(idGenerator, reporter, options, metadata).
            transformAny(tree);
      });
    };

    // Issue errors for any unbound variables
    if (options.freeVariableChecker) {
      this.append((tree) => {
        validateFreeVariables(tree, reporter);
        return tree;
      });
    }

    if (options.jsx) {
      append(JsxTransformer);
    }

    if (options.spreadProperties) {
      append(SpreadPropertiesTransformer);
    }

    if (options.memberVariables) {
      append(MemberVariableTransformer);
    }
    append(AnnotationsTransformer);
    append(TypeTransformer);
    append(AsyncToGeneratorTransformer);

    if (options.modules === 'inline') {
      append(InlineES6ModuleTransformer);
    }
  }
}
