// Copyright 2013 Traceur Authors.
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

import {ModuleTransformer} from './ModuleTransformer.js';
import {NAMED_EXPORT} from '../syntax/trees/ParseTreeType.js';
import {AnonBlock} from '../syntax/trees/ParseTrees.js';
import {
  parseExpression,
  parsePropertyDefinition,
  parseStatement,
} from './PlaceholderParser.js';
import {
  createExpressionStatement,
  createObjectLiteral,
  createObjectLiteralForDescriptor,
  createPropertyNameAssignment,
} from './ParseTreeFactory.js';
import {prependStatements} from './PrependStatements.js';
import {FindVisitor} from './FindVisitor.js';

export class CommonJsModuleTransformer extends ModuleTransformer {
  constructor(identifierGenerator, reporter, options = undefined) {
    super(identifierGenerator, reporter, options);
    this.anonymousModule =
        options && !options.bundle && options.moduleName !== true;
    this.namedExportsWithModuleSpecifiers_ = [];
    this.isImportingDefault_ = false;
    this.needsInteropRequire_ = false;
  }

  getModuleName(tree) {
    if (this.anonymousModule)
      return null;
    return tree.moduleName;
  }

  wrapModule(statements) {
    if (this.needsInteropRequire_) {
      const req = parseStatement `function $__interopRequire(id) {
        id = require(id);
        return id && id.__esModule && id || {default: id};
      }`;
      return prependStatements(statements, req);
    }
    return statements;
  }

  addExportStatement(statements) {
    if (!this.hasExports()) {
      return statements;
    }

    const descr = this.getExportDescriptors();
    let exportObject = parseExpression
        `Object.defineProperties(module.exports, ${descr})`;
    if (this.hasStarExports()) {
      exportObject = this.getExportStar(exportObject);
    }

    // Mutate module.exports immediately after all the export star are
    // imported, before any module code is executed, to allow some cyclic
    // dependencies to work.
    return prependStatements(statements,
        ...this.namedExportsWithModuleSpecifiers_,
        createExpressionStatement(exportObject));
  }

  getExportDescriptors() {
    // {
    //   x: {
    //     enumerable: true,
    //     get: function() { ... },
    //   },
    //   ...
    // }

    const properties = this.exportVisitor.getNonTypeNamedExports().map(exp => {
      const f = parseExpression `function() { return ${
        this.getGetterExportReturnExpression(exp)
      }; }`;
      return createPropertyNameAssignment(exp.name,
          createObjectLiteralForDescriptor({enumerable: true, get: f}));
    });
    properties.unshift(parsePropertyDefinition `__esModule: {value: true}`);
    return createObjectLiteral(properties);
  }

  transformExportDeclaration(tree) {
    this.checkForDefaultImport_(tree);
    this.exportVisitor.visitAny(tree);
    const transformed = this.transformAny(tree.declaration);

    // Need to output the require for export ? from moduleSpecifier before
    // the call to exportStar.
    if (tree.declaration.type == NAMED_EXPORT &&
        tree.declaration.moduleSpecifier !== null) {
      this.namedExportsWithModuleSpecifiers_.push(transformed);
      return new AnonBlock(null, []);
    }

    return transformed;
  }

  transformImportDeclaration(tree) {
    this.checkForDefaultImport_(tree);
    return super.transformImportDeclaration(tree);
  }

  checkForDefaultImport_(tree) {
    const finder = new FindDefault();
    finder.visitAny(tree);
    this.isImportingDefault_ = finder.found;
  }

  transformModuleSpecifier(tree) {
    let moduleName = tree.token.processedValue;
    if (this.isImportingDefault_) {
      this.needsInteropRequire_ = true;
      return parseExpression `$__interopRequire(${moduleName})`;
    }
    return parseExpression `require(${moduleName})`;
  }
}

class FindDefault extends FindVisitor {
  visitImportSpecifier(tree) {
    this.found = tree.name !== null && tree.name.value === 'default';
  }
  visitNameSpaceImport(tree) {
    this.found = true;
  }
  visitNameSpaceExport(tree) {
    this.found = true;
  }
  visitExportSpecifier(tree) {
    this.found = tree.lhs !== null && tree.lhs.value === 'default';
  }
}
