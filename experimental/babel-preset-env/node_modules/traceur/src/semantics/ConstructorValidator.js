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

import {SUPER_EXPRESSION} from '../syntax/trees/ParseTreeType.js';
import {FindVisitor} from '../codegeneration/FindVisitor.js';

class ConstructorValidator extends FindVisitor {
  /**
   * @param {ErrorReporter} reporter
   */
  constructor(reporter) {
    super();
    this.reporter_ = reporter;
    this.hasError = false;
  }

  // Do not let inner classes initialize this.
  visitClassExpression(tree) {
    this.visitAny(tree.superClass);
  }

  visitClassDeclaration(tree) {
    this.visitAny(tree.superClass);
  }

  visitThisExpression(tree) {
    this.reportError_(tree.location, 'this');
  }

  visitCallExpression(tree) {
    if (tree.operand.type === SUPER_EXPRESSION) {
      // Visit arguments first.
      this.visitAny(tree.args);
      this.found = true;
      return;
    }
    super.visitCallExpression(tree);
  }

  visitSuperExpression(tree) {
    this.reportError_(tree.location, 'super property');
  }

  reportError_(location, kind) {
    this.reporter_.reportError(location,
        `'${kind}' is not allowed before super()`);
    this.hasError = true;
    this.found = true;
  }
}

export function validateConstructor(tree, reporter) {
  let visitor = new ConstructorValidator(reporter);
  visitor.visitAny(tree);
  if (visitor.hasError) return false;
  if (visitor.found) return true;

  reporter.reportError(tree.location,
                       'Derived constructor must call super()');
  return false;
}
