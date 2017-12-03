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

// Applies Traceur to HTML Import scripts related to a Web page.
import {StringMap} from './util/StringMap.js';
import {WebPageTranscoder, scriptSelector} from './WebPageTranscoder.js';

const importSelector = 'link[rel=import][href]';

export class HTMLImportTranscoder {

  constructor() {
    this.importsToProcess_ = [];
  }

  findAllChildrenHTMLImports_(parentImportNodes) {
    let foundImportNodes = [];

    // process any import children
    for (let parentIndex = 0; parentIndex < parentImportNodes.length; parentIndex++) {
      let parentLink = parentImportNodes[parentIndex];
      let childImportNodes = parentLink.import.querySelectorAll(importSelector);
      if (childImportNodes.length > 0)
        this.findAllChildrenHTMLImports_(childImportNodes);

      this.importsToProcess_.push(parentLink);
    }
  }

  filterHTMLImports_(importNodes) {
    // process any import children
    this.findAllChildrenHTMLImports_(importNodes);

    // find all scripts to import
    let importsToParse = [];
    let dupFilterMap = new StringMap();
    for (let index = 0; index < this.importsToProcess_.length; index++) {
      let processLink = this.importsToProcess_[index];
      if (!dupFilterMap.has(processLink.href)) {
        dupFilterMap.set(processLink.href, 0);
        let scripts = processLink.import.querySelectorAll(scriptSelector);
        if (scripts.length > 0)
          importsToParse.push({href: processLink.href, scripts: scripts});
      }
    }

    this.importsToProcess_ = [];
    return importsToParse;
  }

  selectAndProcessHTMLImports(importNodes, done) {
    // extract all imports and their child imports
    let importInfoList = this.filterHTMLImports_(importNodes);
    if (importInfoList.length === 0)
      done();

    // creates a transcoder for each HTMLImport and parse their script elements
    let processCount = importInfoList.length;
    importInfoList.forEach((importInfo) => {
      let transcoder = new WebPageTranscoder(importInfo.href);
      transcoder.addFilesFromScriptElements(importInfo.scripts, () => {
        processCount--;
        if (processCount === 0 && done)
          done();
      });
    });
  }

  run(done = () => {}) {
    let ready = document.readyState;
    if (ready === 'complete' || ready === 'loaded') {
      let importNodes = document.querySelectorAll(importSelector);
      if (importNodes.length > 0)
        this.selectAndProcessHTMLImports(importNodes, done);
    } else {
      document.addEventListener('HTMLImportsLoaded',
        (event) => {
          let importNodes = event.detail && event.detail.allImports ? event.detail.allImports : document.querySelectorAll(importSelector);
          if (importNodes.length > 0)
            this.selectAndProcessHTMLImports(importNodes, done);
        });
    }
  }
}
