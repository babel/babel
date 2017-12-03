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

import {ModuleSpecifierVisitor} from '../codegeneration/module/ModuleSpecifierVisitor.js';
import {Parser} from '../syntax/Parser.js';
import {SourceFile} from '../syntax/SourceFile.js';

const {normalize, resolve, dirname} = require('path');
const {readFileSync} = require('fs');

function addDependencies(deps, path) {
  path = resolve(path);
  if (deps.has(path)) return;

  let content = readFileSync(path, 'utf-8');
  let sourceFile = new SourceFile(path, content);
  let parser = new Parser(sourceFile);
  let tree = parser.parseModule();
  let options = {};
  let visitor = new ModuleSpecifierVisitor(options);
  visitor.visitAny(tree);

  deps.add(path);
  for (let spec of visitor.moduleSpecifiers) {
    let resolved = resolve(dirname(path), spec);
    addDependencies(deps, resolved);
  }
}

export default function getDependencies(...paths) {
  let deps = new Set();
  for (let path of paths) {
    addDependencies(deps, path);
  }
  return deps;
}
