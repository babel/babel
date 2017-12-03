// Copyright 2016 Traceur Authors.
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

import {ParseTreeVisitor} from '../syntax/ParseTreeVisitor.js';
import {StringSet} from '../util/StringSet.js';

/**
 * Finds BindingIdentifiers in the a destructuring pattern.
 */
class BindingsInDestructuringPatternVisitor extends ParseTreeVisitor {
  constructor() {
    super();
    this.bindings = new StringSet();
  }

  visitBindingIdentifier(tree) {
    this.bindings.add(tree.getStringValue());
  }

  visitBindingElement(tree) {
    this.visitAny(tree.binding);
  }

  visitVariableDeclaration(tree) {
    this.visitAny(tree.lvalue);
  }
}

export default function bindingsInDestructuringPattern(tree) {
  const v = new BindingsInDestructuringPatternVisitor();
  v.visitAny(tree);
  return v.bindings;
}
