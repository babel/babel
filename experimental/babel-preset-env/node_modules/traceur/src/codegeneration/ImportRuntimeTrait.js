// Copyright 2016 Traceur Authors.
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

import {CONST, VAR} from '../syntax/TokenType.js';
import {
  ImportDeclaration,
  ImportedBinding,
  ImportSpecifier,
  ImportSpecifierSet,
  Module,
  ModuleSpecifier,
  Script,
} from '../syntax/trees/ParseTrees.js';
import {StringSet} from '../util/StringSet.js';
import {
  createBindingIdentifier,
  createIdentifierToken,
  createIdentifierExpression,
  createMemberExpression,
  createStringLiteral,
  createStringLiteralToken,
  createVariableStatement,
} from './ParseTreeFactory.js';
import {parseExpression} from './PlaceholderParser.js';
import {prependStatements} from './PrependStatements.js';

function toTempName(name) {
  return `$__${name}`;
}

function getDeclarationType(options) {
  return options.parseOptions.blockBinding &&
      !options.transformOptions.blockBinding ? CONST : VAR;
}

export default function ImportRuntimeTrait(ParseTreeTransformerClass) {
  return class extends ParseTreeTransformerClass {
    constructor(...args) {
      super(...args);
      this.importedNames = new StringSet();
      this._existingImports = new StringSet();
    }

    getRuntimeExpression(name) {
      if (this.options.importRuntime) {
        this.addImportedName(name);
        return createIdentifierExpression(toTempName(name));
      }
      return createMemberExpression('$traceurRuntime', name);
    }

    get requiredNames() {
      return this.importedNames;
    }

    addImportedName(name) {
      this.importedNames.add(name);
    }

    transformScript(tree) {
      let transformed = super.transformScript(tree);
      if (tree === transformed) {
        return tree;
      }

      if (!this.options.importRuntime) {
        return transformed;
      }

      let scriptItemList = this.addRuntimeImports(transformed.scriptItemList);
      return new Script(tree.location, scriptItemList, tree.moduleName);
    }

    transformModule(tree) {
      let transformed = super.transformModule(tree);
      if (tree === transformed) {
        return tree;
      }

      if (!this.options.importRuntime) {
        return transformed;
      }

      let scriptItemList = this.addRuntimeImports(transformed.scriptItemList);
      return new Module(tree.location, scriptItemList, tree.moduleName);
    }

    transformImportedBinding(tree) {
      // Add seen imports so that we do not add them twice.
      this._existingImports.add(tree.binding.getStringValue());
      return super.transformImportedBinding(tree);
    }

    _getModuleSpecifier(name) {
      let base = 'traceur/dist/commonjs';
      if (this.options.modules === 'parse') {
        base = 'traceur/src';
      }
      const moduleId = createStringLiteralToken(
          `${base}/runtime/modules/${name}.js`);
      return new ModuleSpecifier(null, moduleId);
    }

    getRuntimeImports() {
      return this.importedNames.valuesAsArray().filter(
          name => !this._existingImports.has(toTempName(name))).map(name => {
        // import {default as $__name} from '.../name.js'
        const def = createIdentifierToken('default');
        const binding = new ImportedBinding(null,
            createBindingIdentifier(toTempName(name)));
        const specifier = new ImportSpecifier(null, binding, def);
        return new ImportDeclaration(null,
            new ImportSpecifierSet(null, [specifier]),
            this._getModuleSpecifier(name));
      });
    }

    addRuntimeImports(scriptItemList) {
      let runtimeImports = this.getRuntimeImports();
      return prependStatements(scriptItemList, ...runtimeImports);
    }
  }
}
