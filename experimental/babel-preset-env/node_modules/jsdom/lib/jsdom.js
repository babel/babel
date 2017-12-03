"use strict";
/* eslint-disable no-unused-expressions */
() => `jsdom 7.x onward only works on Node.js 4 or newer: https://github.com/tmpvar/jsdom#install`;
/* eslint-enable no-unused-expressions */

const fs = require("fs");
const path = require("path");
const CookieJar = require("tough-cookie").CookieJar;

const toFileUrl = require("./jsdom/utils").toFileUrl;
const defineGetter = require("./jsdom/utils").defineGetter;
const defineSetter = require("./jsdom/utils").defineSetter;
const documentFeatures = require("./jsdom/browser/documentfeatures");
const domToHtml = require("./jsdom/browser/domtohtml").domToHtml;
const Window = require("./jsdom/browser/Window");
const resourceLoader = require("./jsdom/browser/resource-loader");
const VirtualConsole = require("./jsdom/virtual-console");
const locationInfo = require("./jsdom/living/helpers/internal-constants").locationInfo;

require("./jsdom/living"); // Enable living standard features

/* eslint-disable no-restricted-modules */
// TODO: stop using the built-in URL in favor of the spec-compliant whatwg-url package
// This legacy usage is in the process of being purged.
const URL = require("url");
/* eslint-enable no-restricted-modules */

const canReadFilesFromFS = Boolean(fs.readFile); // in a browserify environment, this isn't present

exports.createVirtualConsole = function (options) {
  return new VirtualConsole(options);
};

exports.getVirtualConsole = function (window) {
  return window._virtualConsole;
};

exports.createCookieJar = function () {
  return new CookieJar(null, { looseMode: true });
};

exports.nodeLocation = function (node) {
  return node[locationInfo];
};

exports.reconfigureWindow = function (window, newProps) {
  if ("top" in newProps) {
    window._top = newProps.top;
  }
};

exports.debugMode = false;

// Proxy feature functions to features module.
for (const propName of ["availableDocumentFeatures", "defaultDocumentFeatures", "applyDocumentFeatures"]) {
  defineGetter(exports, propName, () => documentFeatures[propName]);
  defineSetter(exports, propName, val => documentFeatures[propName] = val);
}

exports.jsdom = function (html, options) {
  if (options === undefined) {
    options = {};
  }
  if (options.parsingMode === undefined || options.parsingMode === "auto") {
    options.parsingMode = "html";
  }

  if (options.parsingMode !== "html" && options.parsingMode !== "xml") {
    throw new RangeError(`Invalid parsingMode option ${JSON.stringify(options.parsingMode)}; must be either "html", ` +
      `"xml", "auto", or undefined`);
  }

  setGlobalDefaultConfig(options);

  // Back-compat hack: we have previously suggested nesting these under document, for jsdom.env at least.
  // So we need to support that.
  if (options.document) {
    if (options.document.cookie !== undefined) {
      options.cookie = options.document.cookie;
    }
    if (options.document.referrer !== undefined) {
      options.referrer = options.document.referrer;
    }
  }

  // List options explicitly to be clear which are passed through
  const window = new Window({
    parsingMode: options.parsingMode,
    contentType: options.contentType,
    parser: options.parser,
    url: options.url,
    referrer: options.referrer,
    cookieJar: options.cookieJar,
    cookie: options.cookie,
    resourceLoader: options.resourceLoader,
    deferClose: options.deferClose,
    concurrentNodeIterators: options.concurrentNodeIterators,
    virtualConsole: options.virtualConsole,
    pool: options.pool,
    agentOptions: options.agentOptions,
    userAgent: options.userAgent
  });

  documentFeatures.applyDocumentFeatures(window.document, options.features);

  if (options.created) {
    options.created(null, window.document.defaultView);
  }

  if (options.parsingMode === "html") {
    if (html === undefined || html === "") {
      html = "<html><head></head><body></body></html>";
    }

    window.document.write(html);
  }
  if (options.parsingMode === "xml") {
    if (html !== undefined) {
      window.document._htmlToDom.appendHtmlToDocument(html, window.document);
    }
  }

  if (window.document.close && !options.deferClose) {
    window.document.close();
  }

  return window.document;
};

exports.jQueryify = exports.jsdom.jQueryify = function (window, jqueryUrl, callback) {
  if (!window || !window.document) {
    return;
  }

  const features = window.document.implementation._features;
  window.document.implementation._addFeature("FetchExternalResources", ["script"]);
  window.document.implementation._addFeature("ProcessExternalResources", ["script"]);
  window.document.implementation._addFeature("MutationEvents", ["2.0"]);

  const scriptEl = window.document.createElement("script");
  scriptEl.className = "jsdom";
  scriptEl.src = jqueryUrl;
  scriptEl.onload = scriptEl.onerror = () => {
    window.document.implementation._features = features;

    if (callback) {
      callback(window, window.jQuery);
    }
  };

  window.document.body.appendChild(scriptEl);
};

exports.env = exports.jsdom.env = function () {
  const config = getConfigFromArguments(arguments);
  let req = null;

  if (config.file && canReadFilesFromFS) {
    req = resourceLoader.readFile(config.file, (err, text) => {
      if (err) {
        reportInitError(err, config);
        return;
      }

      setParsingModeFromExtension(config, config.file);

      config.html = text;
      processHTML(config);
    });
  } else if (config.html !== undefined) {
    processHTML(config);
  } else if (config.url) {
    req = handleUrl(config);
  } else if (config.somethingToAutodetect !== undefined) {
    const url = URL.parse(config.somethingToAutodetect);
    if (url.protocol && url.hostname) {
      config.url = config.somethingToAutodetect;
      req = handleUrl(config.somethingToAutodetect);
    } else if (canReadFilesFromFS) {
      req = resourceLoader.readFile(config.somethingToAutodetect, (err, text) => {
        if (err) {
          if (err.code === "ENOENT" || err.code === "ENAMETOOLONG") {
            config.html = config.somethingToAutodetect;
            processHTML(config);
          } else {
            reportInitError(err, config);
          }
        } else {
          setParsingModeFromExtension(config, config.somethingToAutodetect);

          config.html = text;
          config.url = toFileUrl(config.somethingToAutodetect);
          processHTML(config);
        }
      });
    } else {
      config.html = config.somethingToAutodetect;
      processHTML(config);
    }
  }

  function handleUrl() {
    const options = {
      encoding: config.encoding || "utf8",
      headers: config.headers || {},
      pool: config.pool,
      agentOptions: config.agentOptions
    };

    if (config.proxy) {
      options.proxy = config.proxy;
    }

    options.headers["User-Agent"] = config.userAgent;

    config.cookieJar = config.cookieJar || exports.createCookieJar();

    return resourceLoader.download(config.url, options, config.cookieJar, null, (err, responseText, res) => {
      if (err) {
        reportInitError(err, config);
        return;
      }

      // The use of `res.request.uri.href` ensures that `window.location.href`
      // is updated when `request` follows redirects.
      config.html = responseText;
      config.url = res.request.uri.href;

      const contentType = res.headers["content-type"];

      if (config.parsingMode === "auto" && (
        contentType === "application/xml" ||
        contentType === "text/xml" ||
        contentType === "application/xhtml+xml")) {
        config.parsingMode = "xml";
      }

      processHTML(config);
    });
  }
  return req;
};

exports.serializeDocument = function (doc) {
  return domToHtml([doc]);
};

function processHTML(config) {
  const window = exports.jsdom(config.html, config).defaultView;
  const features = JSON.parse(JSON.stringify(window.document.implementation._features));

  let docsLoaded = 0;
  const totalDocs = config.scripts.length + config.src.length;

  if (!window || !window.document) {
    reportInitError(new Error("JSDOM: a window object could not be created."), config);
    return;
  }

  function scriptComplete() {
    docsLoaded++;

    if (docsLoaded >= totalDocs) {
      window.document.implementation._features = features;

      process.nextTick(() => {
        if (config.onload) {
          config.onload(window);
        }
        if (config.done) {
          config.done(null, window);
        }
      });
    }
  }

  function handleScriptError() {
    // nextTick so that an exception within scriptComplete won't cause
    // another script onerror (which would be an infinite loop)
    process.nextTick(scriptComplete);
  }

  if (config.scripts.length > 0 || config.src.length > 0) {
    window.document.implementation._addFeature("FetchExternalResources", ["script"]);
    window.document.implementation._addFeature("ProcessExternalResources", ["script"]);
    window.document.implementation._addFeature("MutationEvents", ["2.0"]);

    for (const scriptSrc of config.scripts) {
      const script = window.document.createElement("script");
      script.className = "jsdom";
      script.onload = scriptComplete;
      script.onerror = handleScriptError;
      script.src = scriptSrc;

      window.document.body.appendChild(script);
    }

    for (const scriptText of config.src) {
      const script = window.document.createElement("script");
      script.onload = scriptComplete;
      script.onerror = handleScriptError;
      script.text = scriptText;

      window.document.documentElement.appendChild(script);
      window.document.documentElement.removeChild(script);
    }
  } else if (window.document.readyState === "complete") {
    scriptComplete();
  } else {
    window.addEventListener("load", scriptComplete);
  }
}

function setGlobalDefaultConfig(config) {
  config.pool = config.pool !== undefined ? config.pool : {
    maxSockets: 6
  };

  config.agentOptions = config.agentOptions !== undefined ? config.agentOptions : {
    keepAlive: true,
    keepAliveMsecs: 115 * 1000
  };

  config.userAgent = config.userAgent || "Node.js (" + process.platform + "; U; rv:" + process.version + ")";
}

function getConfigFromArguments(args) {
  const config = {};
  if (typeof args[0] === "object") {
    Object.assign(config, args[0]);
  } else {
    for (const arg of args) {
      switch (typeof arg) {
        case "string":
          config.somethingToAutodetect = arg;
          break;
        case "function":
          config.done = arg;
          break;
        case "object":
          if (Array.isArray(arg)) {
            config.scripts = arg;
          } else {
            Object.assign(config, arg);
          }
          break;
      }
    }
  }

  if (!config.done && !config.created && !config.onload) {
    throw new Error("Must pass a \"created\", \"onload\", or \"done\" option, or a callback, to jsdom.env");
  }

  if (config.somethingToAutodetect === undefined &&
      config.html === undefined && !config.file && !config.url) {
    throw new Error("Must pass a \"html\", \"file\", or \"url\" option, or a string, to jsdom.env");
  }

  config.scripts = ensureArray(config.scripts);
  config.src = ensureArray(config.src);
  config.parsingMode = config.parsingMode || "auto";

  config.features = config.features || {
    FetchExternalResources: false,
    ProcessExternalResources: false,
    SkipExternalResources: false
  };

  if (!config.url && config.file) {
    config.url = toFileUrl(config.file);
  }

  setGlobalDefaultConfig(config);

  return config;
}

function reportInitError(err, config) {
  if (config.created) {
    config.created(err);
  }
  if (config.done) {
    config.done(err);
  }
}

function ensureArray(value) {
  let array = value || [];
  if (typeof array === "string") {
    array = [array];
  }
  return array;
}

function setParsingModeFromExtension(config, filename) {
  if (config.parsingMode === "auto") {
    const ext = path.extname(filename);
    if (ext === ".xhtml" || ext === ".xml") {
      config.parsingMode = "xml";
    }
  }
}
