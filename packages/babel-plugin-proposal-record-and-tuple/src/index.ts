/*
 ** Copyright 2020 Bloomberg Finance L.P.
 **
 ** Licensed under the MIT License (the "License");
 ** you may not use this file except in compliance with the License.
 ** You may obtain a copy of the License at
 **
 **     https://opensource.org/licenses/MIT
 **
 ** Unless required by applicable law or agreed to in writing, software
 ** distributed under the License is distributed on an "AS IS" BASIS,
 ** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ** See the License for the specific language governing permissions and
 ** limitations under the License.
 */

import { declare } from "@babel/helper-plugin-utils";
import syntaxRecordAndTuple from "@babel/plugin-syntax-record-and-tuple";
import type { Options as SyntaxOptions } from "@babel/plugin-syntax-record-and-tuple";
import { types as t, type NodePath } from "@babel/core";
import { addNamed, isModule } from "@babel/helper-module-imports";
import { OptionValidator } from "@babel/helper-validator-option";

const v = new OptionValidator(PACKAGE_JSON.name);

export interface Options extends SyntaxOptions {
  polyfillModuleName?: string;
  importPolyfill?: boolean;
}

type State = {
  programPath: NodePath<t.Program>;
};

// program -> cacheKey -> localBindingName
type Cache = Map<string, string>;
type ImportCache = WeakMap<t.Program, Cache>;

export default declare<State>((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const polyfillModuleName = v.validateStringOption(
    "polyfillModuleName",
    options.polyfillModuleName,
    "@bloomberg/record-tuple-polyfill",
  );
  const shouldImportPolyfill = v.validateBooleanOption(
    "importPolyfill",
    options.importPolyfill,
    !!options.polyfillModuleName,
  );

  const importCaches: ImportCache = new WeakMap();

  function getOr<K, V>(map: Map<K, V>, key: K, getDefault: () => V): V;
  function getOr<K extends object, V>(
    map: WeakMap<K, V>,
    key: K,
    getDefault: () => V,
  ): V;
  function getOr<K extends object, V>(
    map: WeakMap<K, V>,
    key: K,
    getDefault: () => V,
  ) {
    let value = map.get(key);
    if (!value) map.set(key, (value = getDefault()));
    return value;
  }

  function getBuiltIn(
    name: "Record" | "Tuple",
    programPath: NodePath<t.Program>,
  ) {
    if (!shouldImportPolyfill) return t.identifier(name);
    if (!programPath) {
      throw new Error("Internal error: unable to find the Program node.");
    }

    const cacheKey = `${name}:${isModule(programPath)}`;

    const cache = getOr(
      importCaches,
      programPath.node,
      () => new Map<string, string>(),
    );
    const localBindingName = getOr(cache, cacheKey, () => {
      return addNamed(programPath, name, polyfillModuleName, {
        importedInterop: "uncompiled",
      }).name;
    });

    return t.identifier(localBindingName);
  }

  return {
    name: "proposal-record-and-tuple",
    inherits: syntaxRecordAndTuple,
    visitor: {
      Program(path, state) {
        state.programPath = path;
      },
      RecordExpression(path, state) {
        const record = getBuiltIn("Record", state.programPath);

        const object = t.objectExpression(path.node.properties);
        const wrapped = t.callExpression(record, [object]);
        path.replaceWith(wrapped);
      },
      TupleExpression(path, state) {
        const tuple = getBuiltIn("Tuple", state.programPath);

        const wrapped = t.callExpression(tuple, path.node.elements);
        path.replaceWith(wrapped);
      },
    },
  };
});
