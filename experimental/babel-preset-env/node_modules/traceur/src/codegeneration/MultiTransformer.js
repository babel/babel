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

import {ParseTreeValidator} from '../syntax/ParseTreeValidator.js';

/**
 * Applies an ordered series of transforms
 */
export class MultiTransformer {
  /**
   * @param {ErrorReporter} reporter
   * @param {boolean} validate ParseTreeValidator after every transform
   */
  constructor(reporter, validate) {
    this.reporter_ = reporter;
    this.validate_ = validate;
    this.treeTransformers_ = [];
  }

  /**
   * Appends a function that transforms a tree.
   * @param {function(ParseTree) : ParseTree} treeTransformer
   * @return {void}
   */
  append(treeTransformer) {
    this.treeTransformers_.push(treeTransformer);
  }

  /**
   * This is the root of the code generation pass.
   * Each pass translates one contruct from Traceur to standard JS constructs.
   * The order of the passes matters.
   *
   * @param {ParseTree} tree
   * @return {ParseTree}
   */
  transform(tree) {
    let reporter = this.reporter_;
    let validate = this.validate_;

    this.treeTransformers_.every((transformTree) => {
      tree = transformTree(tree);
      if (reporter.hadError())
        return false;
      if (validate)
        ParseTreeValidator.validate(tree);
      return true;
    })

    return tree;
  }

}
