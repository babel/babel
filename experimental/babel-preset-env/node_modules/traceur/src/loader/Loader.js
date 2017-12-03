// Copyright 2012 Traceur Authors.
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

import {InternalLoader} from './InternalLoader.js';

export function throwAbstractMethod() {
  throw new Error('Unimplemented Loader function, see extended class');
}

export class Loader {
  /**
   * ES6 Loader Constructor
   * @param {!Object=} options
   */
  constructor(loaderCompiler) {
    this.internalLoader_ =
        new InternalLoader(this, loaderCompiler);
    this.loaderCompiler_ = loaderCompiler;
  }
  /**
   * import - Asynchronously load, link, and evaluate a module and any
   * dependencies it imports.
   * @param {string} name, ModuleSpecifier-like name, not normalized.
   * @return {Promise.<Module>}
   */
  import(name, {referrerName, address, metadata} = {}) {
    return this.internalLoader_.load(name, referrerName, address, metadata).
        then((codeUnit) => this.get(codeUnit.normalizedName));
  }

  /**
   * module - Asynchronously run the script src, first loading any imported
   * modules that aren't already loaded, with type="module" semantics (i.e.
   * all top level variables are local to the module).
   *
   * This is the same as import but without fetching the source.
   * @param {string} source code
   * @param {Object} properties referrerName and address passed to normalize.
   * @return {Promise.<Module>}
   */
  module(source, {referrerName, address, metadata} = {}) {
    return this.internalLoader_.module(source, referrerName, address, metadata);
  }

    /**
   * Asynchronously install a new module under `name` from the `source` code.
   * All dependencies are installed in the registry.
   * @param {string} normalizedName
   * @param {string} source, module code
   * @param {Object|undefined} May contain .address and .metadata. Pass to hooks
   * @return {Promise} fulfilled with undefined.
   */
  define(normalizedName, source, {address, metadata} = {}) {
    return this.internalLoader_.define(normalizedName, source, address,
                                       metadata);
  }

  get(normalizedName) {
    throwAbstractMethod();
  }

  set(normalizedName, module) {
    throwAbstractMethod();
  }

  normalize(name, referrerName, referrerAddress) {
    throwAbstractMethod();
  }

  locate(load) {
    throwAbstractMethod();
  }

  fetch(load) {
    throwAbstractMethod();
  }

  translate(load) {
    throwAbstractMethod();
  }

  instantiate(load) {
    throwAbstractMethod();
  }
}

export {LoaderCompiler};
