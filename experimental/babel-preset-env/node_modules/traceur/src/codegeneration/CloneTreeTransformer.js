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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';

import {
  BindingIdentifier,
  BreakStatement,
  ContinueStatement,
  DebuggerStatement,
  EmptyStatement,
  ExportSpecifier,
  ExportStar,
  IdentifierExpression,
  LiteralExpression,
  ModuleSpecifier,
  PredefinedType,
  PropertyNameShorthand,
  TemplateLiteralPortion,
  SuperExpression,
  ThisExpression
} from '../syntax/trees/ParseTrees.js';

/**
 * Duplicates a ParseTree. Simply creates new leaf nodes so the
 * ParseTreeTransformer branch methods all see changes values and
 * thus create new branch nodes.
 */
export class CloneTreeTransformer extends ParseTreeTransformer {

  /**
   * @param {BindingIdentifier} tree
   * @return {ParseTree}
   */
  transformBindingIdentifier(tree) {
    return new BindingIdentifier(tree.location, tree.identifierToken);
  }

  /**
   * @param {BreakStatement} tree
   * @return {ParseTree}
   */
  transformBreakStatement(tree) {
    return new BreakStatement(tree.location, tree.name);
  }

  /**
   * @param {ContinueStatement} tree
   * @return {ParseTree}
   */
  transformContinueStatement(tree) {
    return new ContinueStatement(tree.location, tree.name);
  }

  /**
   * @param {DebuggerStatement} tree
   * @return {ParseTree}
   */
  transformDebuggerStatement(tree) {
    return new DebuggerStatement(tree.location);
  }

  /**
   * @param {EmptyStatement} tree
   * @return {ParseTree}
   */
  transformEmptyStatement(tree) {
    return new EmptyStatement(tree.location);
  }

  /**
   * @param {ExportSpecifier} tree
   * @return {ParseTree}
   */
  transformExportSpecifier(tree) {
    return new ExportSpecifier(tree.location, tree.lhs, tree.rhs);
  }

  /**
   * @param {ExportStar} tree
   * @return {ParseTree}
   */
  transformExportStar(tree) {
    return new ExportStar(tree.location);
  }

  /**
   * @param {IdentifierExpression} tree
   * @return {ParseTree}
   */
  transformIdentifierExpression(tree) {
    return new IdentifierExpression(tree.location, tree.identifierToken);
  }

  /**
   * @param {Array.<ParseTree>} list
   * @return {Array.<ParseTree>}
   */
  transformList(list) {
    if (!list) {
      return null;
    } else if (list.length === 0) {
      return [];
    } else {
      return super.transformList(list);
    }
  }

  /**
   * @param {LiteralExpression} tree
   * @return {ParseTree}
   */
  transformLiteralExpression(tree) {
    return new LiteralExpression(tree.location, tree.literalToken);
  }

  /**
   * @param {ModuleSpecifier} tree
   * @return {ParseTree}
   */
  transformModuleSpecifier(tree) {
    return new ModuleSpecifier(tree.location, tree.token);
  }

  /**
   * @param {PredefinedType} tree
   * @return {ParseTree}
   */
  transformPredefinedType(tree) {
    return new PredefinedType(tree.location, tree.typeToken);
  }

  /**
   * @param {PropertyNameShorthand} tree
   * @return {ParseTree}
   */
  transformPropertyNameShorthand(tree) {
    return new PropertyNameShorthand(tree.location, tree.name);
  }

  /**
   * @param {TemplateLiteralPortion} tree
   * @return {ParseTree}
   */
  transformTemplateLiteralPortion(tree) {
    return new TemplateLiteralPortion(tree.location, tree.value);
  }

  /**
   * @param {SuperExpression} tree
   * @return {ParseTree}
   */
  transformSuperExpression(tree) {
    return new SuperExpression(tree.location);
  }

  /**
   * @param {ThisExpression} tree
   * @return {ParseTree}
   */
  transformThisExpression(tree) {
    return new ThisExpression(tree.location);
  }
}

CloneTreeTransformer.cloneTree = function(tree) {
  return new CloneTreeTransformer().transformAny(tree);
};
