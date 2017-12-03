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

import {
  AnonBlock,
  ImportDeclaration,
  ImportSpecifier,
  ImportSpecifierSet,
  Module,
} from '../syntax/trees/ParseTrees.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  ANON_BLOCK,
  IMPORT_CLAUSE_PAIR,
  IMPORT_DECLARATION,
  IMPORT_SPECIFIER_SET,
  IMPORTED_BINDING,
  NAME_SPACE_IMPORT,
} from '../syntax/trees/ParseTreeType.js';
import {createIdentifierToken} from './ParseTreeFactory.js';

/**
 * Normalizes import declarations to a simpler form. This is so that the
 * ModuleTransformer only has to handle the basic import declarations.
 */
export class ImportSimplifyingTransformer extends ParseTreeTransformer {
  transformModule(tree) {
    let statements = [];
    for (let i = 0; i < tree.scriptItemList.length; i++) {
      let item = tree.scriptItemList[i];
      switch (item.type) {
        case IMPORT_DECLARATION: {
          let transformed = this.transformAny(item);
          if (transformed.type === ANON_BLOCK) {
            statements.push(...transformed.statements);
          } else {
            statements.push(transformed);
          }
          break;
        }

        default:
          statements.push(item);
      }
    }
    return new Module(tree.location, statements, tree.moduleName);
  }

  transformImportDeclaration(tree) {
    let importClause = tree.importClause;
    if (importClause === null) {
      // import 'mod';
      // =>
      // import {} from 'mod';
      let set = new ImportSpecifierSet(null, []);
      return new ImportDeclaration(tree.location, set, tree.moduleSpecifier);
    }

    if (importClause.type === NAME_SPACE_IMPORT) {
      return tree;
    }

    if (importClause.type === IMPORTED_BINDING) {
      // import x from 'mod';
      // =>
      // import {default as x} from 'mod';
      let specifier = this.transformAny(importClause);
      let set = new ImportSpecifierSet(null, [specifier]);
      return new ImportDeclaration(tree.location, set, tree.moduleSpecifier);
    }

    if (importClause.type === IMPORT_CLAUSE_PAIR) {
      let {first, second} = importClause;
      if (second.type === IMPORT_SPECIFIER_SET) {
        // import x, {a as b} from 'mod';
        // =>
        // import {default as x, a as b} from 'mod';
        let defaultSpecifier = this.transformAny(first);
        let specifiers = [
          defaultSpecifier,
          ...second.specifiers
        ];
        let set = new ImportSpecifierSet(first.location, specifiers);
        return new ImportDeclaration(tree.location, set, tree.moduleSpecifier);
      }

      // import x, * as m from 'mod';
      // =>
      // import {default as x} from 'mod';
      // import * as m from 'mod';
      let firstImport =
          new ImportDeclaration(tree.location, first, tree.moduleSpecifier);
      // Transform the default import again.
      firstImport = this.transformAny(firstImport);
      let secondImport =
          new ImportDeclaration(tree.location, second, tree.moduleSpecifier);
      return new AnonBlock(null, [firstImport, secondImport]);
    }

    return super.transformImportDeclaration(tree);
  }

  transformImportSpecifier(tree) {
    // Keep shorthands since we want clean destructuring output.
    return tree;
  }

  transformImportedBinding(tree) {
    // x
    // =>
    // default as x
    let name = createIdentifierToken('default');
    return new ImportSpecifier(tree.location, tree, name);
  }
}
