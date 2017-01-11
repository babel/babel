/* eslint max-len: 0 */
/* eslint no-new-func: 0 */

import { transform } from "./node";
export {
  File,
  options,
  buildExternalHelpers,
  template,
  version,
  util,
  messages,
  types,
  traverse,
  OptionManager,
  Plugin,
  Pipeline,
  analyse,
  transform,
  transformFromAst,
  transformFile,
  transformFileSync
} from "./node";

export function run(code: string, opts: Object = {}): any {
  return new Function(transform(code, opts).code)();
}

export function load(url: string, callback: Function, opts: Object = {}, hold?: boolean) {
  opts.filename = opts.filename || url;

  let xhr = global.ActiveXObject ? new global.ActiveXObject("Microsoft.XMLHTTP") : new global.XMLHttpRequest();
  xhr.open("GET", url, true);
  if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    let status = xhr.status;
    if (status === 0 || status === 200) {
      let param = [xhr.responseText, opts];
      if (!hold) run(param);
      if (callback) callback(param);
    } else {
      throw new Error(`Could not load ${url}`);
    }
  };

  xhr.send(null);
}

/**
 * <script> tags may be children of documents other than window.document,
 * e.g. inside imported documents via <link rel="import" ...>.
 * currentDocument points to the document to which this script is attached.
 */
let currentScript = global.document._currentScript || global.document.currentScript;
let currentDocument = currentScript ? currentScript.ownerDocument : global.document;

function runScripts() {
  let scripts: Array<Array<any> | Object> = [];
  let types   = ["text/ecmascript-6", "text/6to5", "text/babel", "module"];
  let index   = 0;

  /**
   * Transform and execute script. Ensures correct load order.
   */

  function exec() {
    let param = scripts[index];
    if (param instanceof Array) {
      run(param, index);
      index++;
      exec();
    }
  }

  /**
   * Load, transform, and execute all scripts.
   */

  function run(script: Object, i: number) {
    let opts = {};

    if (script.src) {
      load(script.src, function (param) {
        scripts[i] = param;
        exec();
      }, opts, true);
    } else {
      opts.filename = "embedded";
      scripts[i] = [script.innerHTML, opts];
    }
  }

  // Collect scripts with Babel `types`.

  let _scripts = currentDocument.getElementsByTagName("script");

  for (let i = 0; i < _scripts.length; ++i) {
    let _script = _scripts[i];
    if (types.indexOf(_script.type) >= 0) scripts.push(_script);
  }

  for (let i = 0; i < scripts.length; i++) {
    run(scripts[i], i);
  }

  exec();
}

/**
 * Register load event to transform and execute scripts.
 */
let ifNativeHtmlImports = ("import" in global.document.createElement("link"));
let ifInsideHtmlImport  = currentDocument !== global.document;

let documentLoadedEvent = "DOMContentLoaded";
let eventSource = currentDocument;

if ( ifInsideHtmlImport && !ifNativeHtmlImports ) {
  // Assume webcomponents.js is the polyfill in use.
  eventSource = global.document;
  documentLoadedEvent = "HTMLImportsLoaded"; // webcomponents.js polyfill emits this event.
}

if (currentDocument.addEventListener) {
  eventSource.addEventListener( documentLoadedEvent, runScripts, false );
} else if (currentDocument.attachEvent) {
  eventSource.attachEvent("onload", runScripts);
}
