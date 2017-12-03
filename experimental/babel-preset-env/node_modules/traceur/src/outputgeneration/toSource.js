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

import {ParseTreeMapWriter} from './ParseTreeMapWriter.js';
import {ParseTreeWriter} from './ParseTreeWriter.js';
import {SourceMapGenerator} from './SourceMapIntegration.js';

/**
 * Create a ParseTreeWriter configured with options, apply it to tree
 * @param {ParseTree} tree
 * @param {Object=} options:
 *     prettyPrint: {boolean}
 *     sourceMapGenerator: {SourceMapGenerator} see third-party/source-maps
 * @param {string} outputName the sourcemap file value.
 * @param {string} sourceRoot the sourcemap sourceroot.
 * @return source code; optional side-effect options.sourceMaps set
 */
export function toSource(tree, options = undefined,
    outputName = '<toSourceOutput>', sourceRoot = undefined) {
  let sourceMapGenerator = options && options.sourceMapGenerator;
  let sourcemaps = options && options.sourceMaps;
  if (!sourceMapGenerator && sourcemaps)  {
    sourceMapGenerator = new SourceMapGenerator({
      file: outputName,
      sourceRoot: sourceRoot,
      skipValidation: true
    });
  }

  let sourceMapConfiguration = {
    sourceMapGenerator: sourceMapGenerator,
    sourceRoot: sourceRoot,
    lowResolution: options && options.lowResolutionSourceMap
  };

  let writer;
  if (sourceMapGenerator)
    writer = new ParseTreeMapWriter(sourceMapConfiguration, options);
  else
    writer = new ParseTreeWriter(options);

  writer.visitAny(tree);

  return [writer.toString(),
      sourceMapGenerator && sourceMapGenerator.toString()];
}

