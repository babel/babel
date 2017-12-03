// Copyright 2015 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export {Compiler} from './Compiler.js';

import {Parser} from './syntax/Parser.js';
import {Script} from './syntax/trees/ParseTrees.js';
import {SourceFile} from './syntax/SourceFile.js';

export let syntax = {
  Parser,
  SourceFile,
  trees: {
    Script
  }
};

import {ParseTreeMapWriter} from './outputgeneration/ParseTreeMapWriter.js';
import {ParseTreeWriter} from './outputgeneration/ParseTreeWriter.js';
import {regexpuRewritePattern} from './outputgeneration/regexpuRewritePattern.js';
import {SourceMapConsumer} from './outputgeneration/SourceMapIntegration.js';
import {SourceMapGenerator} from './outputgeneration/SourceMapIntegration.js';
import {TreeWriter} from './outputgeneration/TreeWriter.js';

export let outputgeneration = {
  ParseTreeMapWriter,
  ParseTreeWriter,
  regexpuRewritePattern,
  SourceMapConsumer,
  SourceMapGenerator,
  TreeWriter
};

import {AttachModuleNameTransformer} from './codegeneration/module/AttachModuleNameTransformer.js';
import {CloneTreeTransformer} from './codegeneration/CloneTreeTransformer.js';
import {FromOptionsTransformer} from './codegeneration/FromOptionsTransformer.js';
import {PureES6Transformer} from './codegeneration/PureES6Transformer.js';
import {createModuleEvaluationStatement} from './codegeneration/module/createModuleEvaluationStatement.js';
import {parseExpression, parseModule, parseScript, parseStatement} from './codegeneration/PlaceholderParser.js';

export let codegeneration = {
  CloneTreeTransformer,
  FromOptionsTransformer,
  PureES6Transformer,
  parseExpression,
  parseModule,
  parseScript,
  parseStatement,
  module: {
    AttachModuleNameTransformer,
    createModuleEvaluationStatement
  }
};
