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

import {toSource} from './toSource.js';

/**
 * Create a ParseTreeWriter configured with options, apply it to tree
 * @param {ParseTree} tree
 * @param {Object=} options:
 *     prettyPrint: {boolean}
 *     sourceMapGenerator: {SourceMapGenerator} see third-party/source-maps
 * @param {string} outputName output filename.
 * @param {string} sourceRoot the sourcemap sourceroot.
 * @return source code; optional side-effect options.generatedSourceMap set
 */
export function write(tree, options = undefined,
		outputName = '<TreeWriter-output>', sourceRoot = undefined) {
  let [result, sourceMap] = toSource(tree, options, outputName, sourceRoot);
  if (sourceMap)
    options.generatedSourceMap = sourceMap;
  return result;
}

// TODO(arv): This should just export the static function instead.
export class TreeWriter {}
TreeWriter.write = write;
