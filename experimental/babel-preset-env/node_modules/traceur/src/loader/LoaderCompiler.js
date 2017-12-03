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

import {buildExportList} from '../codegeneration/module/ExportListBuilder.js';
import {CollectingErrorReporter} from '../util/CollectingErrorReporter.js';
import {Compiler} from '../Compiler.js';
import {ModuleSpecifierVisitor} from
    '../codegeneration/module/ModuleSpecifierVisitor.js';
import {ModuleSymbol} from '../codegeneration/module/ModuleSymbol.js';
import {Parser} from '../syntax/Parser.js';
import {SourceFile} from '../syntax/SourceFile.js';
import {systemjs} from './system-map.js';
import {UniqueIdentifierGenerator} from
    '../codegeneration/UniqueIdentifierGenerator.js';
import {isAbsolute, resolveUrl} from '../util/url.js';
import {assert} from '../util/assert.js';

// TODO These CodeUnit (aka Load) states are used by code in this file
// that belongs in Loader.
var NOT_STARTED = 0;
var LOADING = 1;
var LOADED = 2;
var PARSED = 3;
var TRANSFORMING = 4
var TRANSFORMED = 5;
var COMPLETE = 6;
var ERROR = 7;

var identifierGenerator = new UniqueIdentifierGenerator();
var anonymousSourcesSeen = 0;

export class LoaderCompiler {

  getModuleSpecifiers(codeUnit) {
    this.parse(codeUnit);

    // Analyze to find dependencies
    var moduleSpecifierVisitor =
        new ModuleSpecifierVisitor(codeUnit.metadata.traceurOptions);
    moduleSpecifierVisitor.visit(codeUnit.metadata.tree);
    return moduleSpecifierVisitor.moduleSpecifiers;
  }

  parse(codeUnit) {
    assert(!codeUnit.metadata.tree);
    var metadata = codeUnit.metadata;
    var options = metadata.traceurOptions;
    if (codeUnit.type === 'script')
      options.script = true;

    metadata.compiler = new Compiler(options);

    // The name used in sourceMaps and error messages
    var sourceName = codeUnit.metadata.sourceName = codeUnit.address ||
        codeUnit.normalizedName || '(unnamed)#' + String(++anonymousSourcesSeen);
    metadata.tree = metadata.compiler.parse(codeUnit.source, sourceName);
  }

  transform(codeUnit) {
    var metadata = codeUnit.metadata;
    metadata.transformedTree =
        metadata.compiler.transform(metadata.tree, codeUnit.normalizedName, metadata);
  }

  write(codeUnit) {
    var metadata = codeUnit.metadata;
    var outputName = metadata.outputName || metadata.sourceName ||
        '<loaderOutput>';
    var sourceRoot = metadata.sourceRoot;
    var sourceURL = metadata.sourceName
        || codeUnit.normalizedName
        || codeUnit.address;
    metadata.transcoded = metadata.compiler.write(metadata.transformedTree,
        outputName, undefined, sourceURL);
  }

  evaluateCodeUnit(codeUnit) {
    // Source for modules compile into calls to registerModule(url, fnc).
    //
    var result = ('global', eval)(codeUnit.metadata.transcoded);
    codeUnit.metadata.transformedTree = null;
    return result;
  }

  analyzeDependencies(dependencies, loader) {
    var deps = [];  // moduleSymbol for each dependency
    for (var i = 0; i < dependencies.length; i++) {
      var codeUnit = dependencies[i];

      // We should not have gotten here if unless all are PARSED
      assert(codeUnit.state >= PARSED);

      if (codeUnit.state == PARSED) {
        var symbol = codeUnit.metadata.moduleSymbol =
            new ModuleSymbol(codeUnit.metadata.tree, codeUnit.normalizedName);
        deps.push(symbol);
      }
    }

    this.checkForErrors((reporter) => buildExportList(deps, loader, reporter));
  }

  checkForErrors(fncOfReporter) {
    var reporter = new CollectingErrorReporter();
    var result = fncOfReporter(reporter);
    if (reporter.hadError())
      throw reporter.toError();
    return result;
  }

}
