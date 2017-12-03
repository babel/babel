// Copyright 2011 Traceur Authors.
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

// Applies Traceur to all scripts in a Web page.

import {ErrorReporter} from './util/ErrorReporter.js';
import {CommandOptions} from './Options.js';
import {webLoader} from './loader/webLoader.js';

export const scriptSelector = 'script[type="module"],script[type="text/traceur"]';

export class WebPageTranscoder {
  constructor(url = document.location.href,
      traceurOptions = new Options()) {
    this.url = url;
    this.numPending_ = 0;
    this.numberInlined_ = 0;
    this.traceurOptions_ = traceurOptions;
  }

  asyncLoad_(url, fncOfContent, onScriptsReady) {
    this.numPending_++;
    webLoader.load(url, (content) => {
      if (content)
        fncOfContent(content);
      else
        console.warn('Failed to load', url);

      if (--this.numPending_ <= 0)
        onScriptsReady();
    }, (error) => {
      console.error('WebPageTranscoder FAILED to load ' +
          url, error.stack || error);
    });
  }

  addFileFromScriptElement(scriptElement, name, content) {
    let options = this.traceurOptions_;
    let elementOptionString = scriptElement.getAttribute('traceurOptions');
    if (elementOptionString) {
      options = CommandOptions.fromString(elementOptionString);
    }
    let nameInfo = {
      address: name,
      referrerName: window.location.href,
      name: name,
      metadata: {traceurOptions: options}
    };
    let loadingResult;
    if (scriptElement.type === 'module')
      loadingResult = System.module(content, nameInfo);
    else
      loadingResult = System.script(content, nameInfo);
    loadingResult.catch(function(error) {
      console.error(error.stack || error);
    });
  }

  /**
   * Invent a name for inline script tags:
   * @return {string} the page URL, drop .html, add eg "_1.js"
   */
  nextInlineScriptName_() {
    this.numberInlined_ += 1;
    if (!this.inlineScriptNameBase_) {
      let segments = this.url.split('.');
      segments.pop();
      this.inlineScriptNameBase_ = segments.join('.');
    }
    return this.inlineScriptNameBase_ + '_inline_script_' +
        this.numberInlined_ + '.js';
  }

  addFilesFromScriptElements(scriptElements, onScriptsReady) {
    for (let i = 0, length = scriptElements.length; i < length; i++) {
      let scriptElement = scriptElements[i];
      if (!scriptElement.src) {
        let name = this.nextInlineScriptName_();
        let content =  scriptElement.textContent;
        this.addFileFromScriptElement(scriptElement, name, content);
      } else {
        let name = scriptElement.src;
        this.asyncLoad_(
            name,
            this.addFileFromScriptElement.bind(this, scriptElement, name),
            onScriptsReady
        );
      }
    }
    // in case we did not load any scripts async
    if (this.numPending_ <= 0)
      onScriptsReady();
  }

  get reporter() {
    if (!this.reporter_) {
      this.reporter_ =  new ErrorReporter();
    }
    return this.reporter_;
  }

  putFile(file) {
    let scriptElement = document.createElement('script');
    scriptElement.setAttribute('data-traceur-src-url', file.name);
    scriptElement.textContent = file.generatedSource;

    let parent = file.scriptElement.parentNode;
    parent.insertBefore(scriptElement, file.scriptElement || null);
  }

  selectAndProcessScripts(done) {
    let selector = scriptSelector;
    let scripts = document.querySelectorAll(selector);

    if (!scripts.length) {
      done();
      return;  // nothing to do
    }

    this.addFilesFromScriptElements(scripts, () => {
      done();
    });
  }

  run(done = () => {}) {
    let ready = document.readyState;
    if (ready === 'complete' || ready === 'loaded') {
      this.selectAndProcessScripts(done);
    } else {
      document.addEventListener('DOMContentLoaded',
        () => this.selectAndProcessScripts(done), false);
    }
  }
}
