/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of the React source tree.
 */

const scriptTypes = new Set(["text/jsx", "text/babel"]);

import type { transform } from "./index.ts";
import type { InputOptions } from "@babel/core";

let headEl: HTMLHeadElement;
let inlineScriptCount = 0;

type CompilationResult = {
  async: boolean;
  type: string;
  error: boolean;
  loaded: boolean;
  content: string | null;
  executed: boolean;
  // nonce is undefined in browsers that don't support the nonce global attribute
  nonce: string | undefined;
  // todo: refine plugins/presets
  plugins: InputOptions["plugins"];
  presets: InputOptions["presets"];
  url: string | null;
};

/**
 * Actually transform the code.
 */
function transformCode(
  transformFn: typeof transform,
  script: CompilationResult,
) {
  let source;
  if (script.url != null) {
    source = script.url;
  } else {
    source = "Inline Babel script";
    inlineScriptCount++;
    if (inlineScriptCount > 1) {
      source += " (" + inlineScriptCount + ")";
    }
  }

  return transformFn(script.content, buildBabelOptions(script, source)).code;
}

/**
 * Builds the Babel options for transforming the specified script, using some
 * sensible default presets and plugins if none were explicitly provided.
 */
function buildBabelOptions(script: CompilationResult, filename: string) {
  let presets = script.presets;
  if (!presets) {
    if (script.type === "module") {
      presets = [
        "react",
        [
          "env",
          {
            targets: {
              esmodules: true,
            },
            modules: false,
          },
        ],
      ];
    } else {
      presets = ["react", "env"];
    }
  }

  return {
    filename,
    presets,
    plugins: script.plugins || [
      "transform-class-properties",
      "transform-object-rest-spread",
      "transform-flow-strip-types",
    ],
    sourceMaps: "inline" as const,
    sourceFileName: filename,
  };
}

/**
 * Appends a script element at the end of the <head> with the content of code,
 * after transforming it.
 */
function run(transformFn: typeof transform, script: CompilationResult) {
  const scriptEl = document.createElement("script");
  if (script.type) {
    scriptEl.setAttribute("type", script.type);
  }
  if (script.nonce) {
    scriptEl.nonce = script.nonce;
  }
  scriptEl.text = transformCode(transformFn, script);
  headEl.appendChild(scriptEl);
}

/**
 * Load script from the provided url and pass the content to the callback.
 */
function load(
  url: string,
  successCallback: (content: string) => void,
  errorCallback: () => void,
) {
  const xhr = new XMLHttpRequest();

  // async, however scripts will be executed in the order they are in the
  // DOM to mirror normal script loading.
  xhr.open("GET", url, true);
  if ("overrideMimeType" in xhr) {
    xhr.overrideMimeType("text/plain");
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 0 || xhr.status === 200) {
        successCallback(xhr.responseText);
      } else {
        errorCallback();
        throw new Error("Could not load " + url);
      }
    }
  };
  xhr.send(null);
}

/**
 * Converts a comma-separated data attribute string into an array of values. If
 * the string is empty, returns an empty array. If the string is not defined,
 * returns null.
 */
function getPluginsOrPresetsFromScript(
  script: HTMLScriptElement,
  attributeName: string,
) {
  const rawValue = script.getAttribute(attributeName);
  if (rawValue === "") {
    // Empty string means to not load ANY presets or plugins
    return [];
  }
  if (!rawValue) {
    // Any other falsy value (null, undefined) means we're not overriding this
    // setting, and should use the default.
    return null;
  }
  return rawValue.split(",").map(item => item.trim());
}

/**
 * Loop over provided script tags and get the content, via innerHTML if an
 * inline script, or by using XHR. Transforms are applied if needed. The scripts
 * are executed in the order they are found on the page.
 */
function loadScripts(
  transformFn: typeof transform,
  scripts: HTMLScriptElement[],
) {
  const results: CompilationResult[] = [];
  const count = scripts.length;

  function check() {
    for (let i = 0; i < count; i++) {
      const result = results[i];

      if (result.loaded && !result.executed) {
        result.executed = true;
        run(transformFn, result);
      } else if (!result.loaded && !result.error && !result.async) {
        break;
      }
    }
  }

  for (let i = 0; i < count; i++) {
    const script = scripts[i];
    const result: CompilationResult = {
      // script.async is always true for non-JavaScript script tags
      async: script.hasAttribute("async"),
      type: script.getAttribute("data-type"),
      nonce: script.nonce,
      error: false,
      executed: false,
      plugins: getPluginsOrPresetsFromScript(script, "data-plugins"),
      presets: getPluginsOrPresetsFromScript(script, "data-presets"),
      loaded: false,
      url: null,
      content: null,
    };
    results.push(result);

    if (script.src) {
      result.url = script.src;

      load(
        script.src,
        content => {
          result.loaded = true;
          result.content = content;
          check();
        },
        () => {
          result.error = true;
          check();
        },
      );
    } else {
      result.url = script.getAttribute("data-module") || null;
      result.loaded = true;
      result.content = script.innerHTML;
    }
  }

  check();
}

/**
 * Run script tags with type="text/jsx".
 * @param {Array} scriptTags specify script tags to run, run all in the <head> if not given
 */
export function runScripts(
  transformFn: typeof transform,
  scripts?: HTMLCollectionOf<HTMLScriptElement>,
) {
  headEl = document.getElementsByTagName("head")[0];
  if (!scripts) {
    scripts = document.getElementsByTagName("script");
  }

  // Array.prototype.slice cannot be used on NodeList on IE8
  const jsxScripts = [];
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);
    // Support the old type="text/jsx;harmony=true"
    const type = script.type.split(";")[0];
    if (scriptTypes.has(type)) {
      jsxScripts.push(script);
    }
  }

  if (jsxScripts.length === 0) {
    return;
  }

  console.warn(
    "You are using the in-browser Babel transformer. Be sure to precompile " +
      "your scripts for production - https://babeljs.io/docs/setup/",
  );

  loadScripts(transformFn, jsxScripts);
}
