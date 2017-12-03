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

import {FormalParameterList} from '../syntax/trees/ParseTrees.js';
import {ParameterTransformer} from './ParameterTransformer.js';
import {createIdentifierToken} from './ParseTreeFactory.js';
import {parseStatement} from './PlaceholderParser.js';

function hasRestParameter(parameterList) {
  let parameters = parameterList.parameters;
  return parameters.length > 0 &&
      parameters[parameters.length - 1].isRestParameter();
}

function getRestParameterLiteralToken(parameterList) {
  let parameters = parameterList.parameters;
  return parameters[parameters.length - 1].parameter.identifier.identifierToken;
}

/**
 * Desugars rest parameters.
 *
 * @see <a href="http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters">harmony:rest_parameters</a>
 */
export class RestParameterTransformer extends ParameterTransformer {

  transformFormalParameterList(tree) {
    let transformed = super.transformFormalParameterList(tree);
    if (hasRestParameter(transformed)) {
      let parametersWithoutRestParam = new FormalParameterList(
          transformed.location,
          transformed.parameters.slice(0, -1));

      let startIndex = transformed.parameters.length - 1;
      let i = createIdentifierToken(this.getTempIdentifier());
      let name = getRestParameterLiteralToken(transformed);
      let loop;
      if (startIndex) {
        // If startIndex is 0 we can generate slightly cleaner code.
        loop = parseStatement `
            for (var ${name} = [], ${i} = ${startIndex};
                 ${i} < arguments.length; ${i}++)
              ${name}[${i} - ${startIndex}] = arguments[${i}];`;
      } else {
        loop = parseStatement `
            for (var ${name} = [], ${i} = 0;
                 ${i} < arguments.length; ${i}++)
              ${name}[${i}] = arguments[${i}];`;
      }
      this.parameterStatements.push(loop);
      return parametersWithoutRestParam;
    }

    return transformed;
  }
}
