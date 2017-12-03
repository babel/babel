"use strict";

const HTTP_STATUS_CODES = require("http").STATUS_CODES;
const spawnSync = require("child_process").spawnSync;

const xhrUtils = require("./xhr-utils");
const DOMException = require("../web-idl/DOMException");
const xhrSymbols = require("./xmlhttprequest-symbols");
const blobSymbols = require("./blob-symbols");
const formDataSymbols = require("./form-data-symbols");
const utils = require("../utils");
const documentBaseURLHelper = require("./helpers/document-base-url");

const forbiddenRequestHeaders = new RegExp("^(?:" + [
  "Accept-Charset",
  "Accept-Encoding",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Connection",
  "Content-Length",
  "Cookie",
  "Cookie2",
  "Date",
  "DNT",
  "Expect",
  "Host",
  "Keep-Alive",
  "Origin",
  "Referer",
  "TE",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "User-Agent",
  "Via",
  "Sec-.*",
  "Proxy-.*"
].join("|") + ")$", "i");
const uniqueResponseHeaders = new RegExp("^(?:" + [
  "content-type",
  "content-length",
  "user-agent",
  "referer",
  "host",
  "authorization",
  "proxy-authorization",
  "if-modified-since",
  "if-unmodified-since",
  "from",
  "location",
  "max-forwards"
].join("|") + ")$", "i");

const allowedRequestMethods = ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE"];
const forbiddenRequestMethods = ["TRACK", "TRACE", "CONNECT"];

const tokenRegexp = /^(?:(?![\x00-\x1F\x7F \t\(\)<>@,;:\\"\/\[\]?={}])[\x00-\x7F])+$/;
const fieldValueRegexp = /^(?:(?![\x00-\x1F\x7F])[\x00-\xFF])*$/;

const XMLHttpRequestResponseType = [
  "",
  "arraybuffer",
  "blob",
  "document",
  "json",
  "text"
];

module.exports = function createXMLHttpRequest(window) {
  const Event = window.Event;
  const ProgressEvent = window.ProgressEvent;
  const Blob = window.Blob;
  const FormData = window.FormData;
  const XMLHttpRequestEventTarget = window.XMLHttpRequestEventTarget;
  const XMLHttpRequestUpload = window.XMLHttpRequestUpload;

  class XMLHttpRequest extends XMLHttpRequestEventTarget {
    constructor() {
      super();
      if (!(this instanceof XMLHttpRequest)) {
        throw new TypeError("DOM object constructor cannot be called as a function.");
      }
      this.upload = new XMLHttpRequestUpload();
      this.upload._ownerDocument = window.document;

      this[xhrSymbols.flag] = {
        synchronous: false,
        withCredentials: false,
        mimeType: null,
        auth: null,
        method: undefined,
        responseType: "",
        requestHeaders: {},
        baseUrl: "",
        uri: "",
        userAgent: "",
        timeout: 0,
        body: undefined,
        formData: false
      };

      this[xhrSymbols.properties] = {
        send: false,
        timeoutStart: 0,
        timeoutId: 0,
        timeoutFn: null,
        client: null,
        responseHeaders: {},
        responseBuffer: null,
        responseCache: null,
        responseTextCache: null,
        responseXMLCache: null,
        readyState: XMLHttpRequest.UNSENT,
        status: 0,
        statusText: ""
      };
      this.onreadystatechange = null;
    }
    get readyState() {
      return this[xhrSymbols.properties].readyState;
    }
    get status() {
      return this[xhrSymbols.properties].status;
    }
    get statusText() {
      return this[xhrSymbols.properties].statusText;
    }
    get responseType() {
      return this[xhrSymbols.flag].responseType;
    }
    set responseType(responseType) {
      const flag = this[xhrSymbols.flag];
      if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (this.readyState === XMLHttpRequest.OPENED && flag.synchronous) {
        throw new DOMException(DOMException.INVALID_ACCESS_ERR);
      }
      if (XMLHttpRequestResponseType.indexOf(responseType) === -1) {
        responseType = "";
      }
      flag.responseType = responseType;
    }
    get response() {
      const properties = this[xhrSymbols.properties];
      if (properties.responseCache) {
        return properties.responseCache;
      }
      let res = "";
      switch (this.responseType) {
        case "":
        case "text":
          res = this.responseText;
          break;
        case "arraybuffer":
          if (!properties.responseBuffer) {
            return null;
          }
          res = (new Uint8Array(properties.responseBuffer)).buffer;
          break;
        case "blob":
          if (!properties.responseBuffer) {
            return null;
          }
          res = new Blob([(new Uint8Array(properties.responseBuffer)).buffer]);
          break;
        case "document":
          res = this.responseXML;
          break;
        case "json":
          if (this.readyState !== XMLHttpRequest.DONE || !properties.responseBuffer) {
            res = null;
          }
          try {
            res = JSON.parse(properties.responseBuffer.toString());
          } catch (e) {
            res = null;
          }
          break;
      }
      properties.responseCache = res;
      return res;
    }
    get responseText() {
      const properties = this[xhrSymbols.properties];
      if (this.responseType !== "" && this.responseType !== "text") {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (this.readyState !== XMLHttpRequest.LOADING && this.readyState !== XMLHttpRequest.DONE) {
        return "";
      }
      if (properties.responseTextCache) {
        return properties.responseTextCache;
      }
      const responseBuffer = properties.responseBuffer;
      if (!responseBuffer) {
        return "";
      }
      const res = responseBuffer.toString();
      properties.responseTextCache = res;
      return res;
    }
    get responseXML() {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      if (this.responseType !== "" && this.responseType !== "document") {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (this.readyState !== XMLHttpRequest.DONE) {
        return null;
      }
      if (properties.responseXMLCache) {
        return properties.responseXMLCache;
      }
      const contentType = flag.mimeType || this.getResponseHeader("Content-Type");
      if (contentType && !contentType.match(/^(?:text\/html|text\/xml|application\/xml|.*?\+xml)(?:;.*)*$/)) {
        return null;
      }
      const responseBuffer = properties.responseBuffer;
      if (!responseBuffer) {
        return null;
      }
      const resText = responseBuffer.toString();
      const res = new window.Document({ parsingMode: "xml" });
      res._htmlToDom.appendHtmlToDocument(resText, res);
      properties.responseXMLCache = res;
      return res;
    }
    get timeout() {
      return this[xhrSymbols.flag].timeout;
    }
    set timeout(val) {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      if (flag.synchronous) {
        throw new DOMException(DOMException.INVALID_ACCESS_ERR);
      }
      flag.timeout = val;
      clearTimeout(properties.timeoutId);
      if (val > 0 && properties.timeoutFn) {
        properties.timeoutId = setTimeout(
          properties.timeoutFn,
          Math.max(0, val - ((new Date()).getTime() - properties.timeoutStart))
        );
      } else {
        properties.timeoutFn = null;
        properties.timeoutStart = 0;
      }
    }
    get withCredentials() {
      return this[xhrSymbols.flag].withCredentials;
    }
    set withCredentials(val) {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      if (!(this.readyState === XMLHttpRequest.UNSENT || this.readyState === XMLHttpRequest.OPENED)) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (properties.send) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (flag.synchronous) {
        throw new DOMException(DOMException.INVALID_ACCESS_ERR);
      }
      flag.withCredentials = val;
    }

    abort() {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      clearTimeout(properties.timeoutId);
      properties.timeoutFn = null;
      properties.timeoutStart = 0;
      const client = properties.client;
      if (client) {
        client.abort();
      }
      if (!(this.readyState === XMLHttpRequest.UNSENT ||
          (this.readyState === XMLHttpRequest.OPENED && !properties.send) ||
          this.readyState === XMLHttpRequest.DONE)) {
        properties.send = false;
        readyStateChange(this, XMLHttpRequest.DONE);
        if (!(flag.method === "HEAD" || flag.method === "GET")) {
          this.upload.dispatchEvent(new ProgressEvent("progress"));
          this.upload.dispatchEvent(new ProgressEvent("abort"));
          this.upload.dispatchEvent(new ProgressEvent("loadend"));
        }
        this.dispatchEvent(new ProgressEvent("progress"));
        this.dispatchEvent(new ProgressEvent("abort"));
        this.dispatchEvent(new ProgressEvent("loadend"));
      }
      properties.readyState = XMLHttpRequest.UNSENT;
    }
    getAllResponseHeaders() {
      const properties = this[xhrSymbols.properties];
      const readyState = this.readyState;
      if ([XMLHttpRequest.UNSENT, XMLHttpRequest.OPENED].indexOf(readyState) >= 0) {
        return "";
      }
      return Object.keys(properties.responseHeaders)
        .filter(key => {
          const keyLc = key.toLowerCase();
          return keyLc !== "set-cookie" && keyLc !== "set-cookie2";
        })
        .map(key => {
          return [key, properties.responseHeaders[key]].join(": ");
        }, this).join("\r\n");
    }

    getResponseHeader(header) {
      const properties = this[xhrSymbols.properties];
      const readyState = this.readyState;
      if ([XMLHttpRequest.UNSENT, XMLHttpRequest.OPENED].indexOf(readyState) >= 0) {
        return null;
      }
      const keys = Object.keys(properties.responseHeaders);
      let n = keys.length;
      const responseHeaders = {};
      while (n--) {
        const key = keys[n];
        responseHeaders[key.toLowerCase()] = properties.responseHeaders[key];
      }
      const key = header.toLowerCase();
      if (key === "set-cookie" || key === "set-cookie2") {
        return null;
      }
      const value = responseHeaders[key];
      return typeof value !== "undefined" ? String(value) : null;
    }

    open(method, uri, async, user, password) {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      const argumentCount = arguments.length;
      if (argumentCount < 2) {
        throw new TypeError("Not enought arguments");
      }
      if (!tokenRegexp.test(method)) {
        throw new DOMException(DOMException.SYNTAX_ERR);
      }
      const upperCaseMethod = method.toUpperCase();
      if (forbiddenRequestMethods.indexOf(upperCaseMethod) !== -1) {
        throw new DOMException(DOMException.SECURITY_ERR);
      }

      const client = properties.client;
      if (client && typeof client.abort === "function") {
        client.abort();
      }

      if (allowedRequestMethods.indexOf(upperCaseMethod) !== -1) {
        method = upperCaseMethod;
      }
      if (typeof async !== "undefined") {
        flag.synchronous = !async;
      } else {
        flag.synchronous = false;
      }
      if (flag.responseType && flag.synchronous) {
        throw new DOMException(DOMException.INVALID_ACCESS_ERR);
      }
      if (flag.synchronous && flag.timeout) {
        throw new DOMException(DOMException.INVALID_ACCESS_ERR);
      }
      flag.method = method;

      const baseUrl = documentBaseURLHelper.documentBaseURL(this._ownerDocument).toString();
      flag.baseUrl = baseUrl;
      const urlObj = new utils.URL(uri, baseUrl);
      flag.uri = urlObj.href;

      flag.userAgent = this._ownerDocument._defaultView.navigator.userAgent;

      if (argumentCount >= 4 && (user || password)) {
        flag.auth = {
          user,
          pass: password
        };
      }
      flag.requestHeaders = {};
      properties.send = false;
      properties.requestBuffer = null;
      properties.requestCache = null;
      readyStateChange(this, XMLHttpRequest.OPENED);
    }

    overrideMimeType(mime) {
      if ([XMLHttpRequest.LOADING, XMLHttpRequest.DONE].indexOf(this.readyState) >= 0) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      this[xhrSymbols.flag].mimeType = mime;
    }

    send(body) {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      const self = this;
      if (this.readyState !== XMLHttpRequest.OPENED || properties.send) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }

      if (!flag.body &&
          body !== undefined &&
          body !== null &&
          body !== "" &&
          !(flag.method === "HEAD" || flag.method === "GET")) {
        if (body instanceof FormData) {
          flag.formData = true;
          const formData = [];
          for (const entry of body[formDataSymbols.entries]) {
            let val;
            if (entry.value instanceof Blob) {
              const blob = entry.value;
              val = {
                name: entry.name,
                value: blob[blobSymbols.buffer],
                options: {
                  filename: blob.name,
                  contentType: blob.type,
                  knownLength: blob.size
                }
              };
            } else {
              val = entry;
            }
            formData.push(val);
          }
          flag.body = formData;
        } else if (body instanceof Blob) {
          flag.body = body[blobSymbols.buffer];
        } else if (body instanceof ArrayBuffer) {
          flag.body = new Buffer(new Uint8Array(body));
        } else if (typeof body !== "string") {
          flag.body = String(body);
        } else {
          flag.body = body;
        }
      }

      if (flag.synchronous) {
        const flagStr = JSON.stringify(flag);
        const res = spawnSync(
          process.execPath,
          [require.resolve("./xhr-sync-worker.js")],
          {
            input: flagStr
          }
        );
        if (res.status !== 0) {
          throw new Error(res.stderr.toString());
        }
        if (res.error) {
          if (typeof res.error === "string") {
            res.error = new Error(res.error);
          }
          throw res.error;
        }
        const response = JSON.parse(res.stdout.toString(), (k, v) => {
          if (k === "responseBuffer" && v && v.data) {
            return new Buffer(v.data);
          }
          return v;
        });
        response.properties.readyState = XMLHttpRequest.LOADING;
        this[xhrSymbols.properties] = response.properties;

        readyStateChange(self, XMLHttpRequest.DONE);
        if (response.error) {
          this.dispatchEvent(new ProgressEvent("error"));
          this.dispatchEvent(new ProgressEvent("loadend"));
          throw new DOMException(DOMException.NETWORK_ERR, response.error);
        } else {
          const responseBuffer = this[xhrSymbols.properties].responseBuffer;
          const contentLength = this.getResponseHeader("content-length") || "0";
          const bufferLength = parseInt(contentLength, 10) || responseBuffer.length;
          const progressObj = { lengthComputable: false };
          if (bufferLength !== 0) {
            progressObj.total = bufferLength;
            progressObj.loaded = bufferLength;
            progressObj.lengthComputable = true;
          }
          this.dispatchEvent(new ProgressEvent("load"));
          this.dispatchEvent(new ProgressEvent("loadend", progressObj));
        }
      } else {
        properties.send = true;

        this.dispatchEvent(new ProgressEvent("loadstart"));

        const client = xhrUtils.createClient(this,
          (err, response) => {
            if (err) {
              if (client) {
                client.removeAllListeners();
              }
              readyStateChange(self, XMLHttpRequest.DONE);
              if (!(flag.method === "HEAD" || flag.method === "GET")) {
                self.upload.dispatchEvent(new ProgressEvent("error", err));
                self.upload.dispatchEvent(new ProgressEvent("loadend"));
              }
              self.dispatchEvent(new ProgressEvent("error", err));
              self.dispatchEvent(new ProgressEvent("loadend"));
              return;
            }
            receiveResponse(self, response);
          }
        );
        properties.client = client;
        if (client) {
          if (body !== undefined &&
            body !== null &&
            body !== "" &&
            !(flag.method === "HEAD" || flag.method === "GET")) {
            setDispatchProgressEvents(this);
          }
          if (this.timeout > 0) {
            properties.timeoutStart = (new Date()).getTime();
            properties.timeoutFn = function () {
              client.abort();
              if (!(self.readyState === XMLHttpRequest.UNSENT ||
                  (self.readyState === XMLHttpRequest.OPENED && !properties.send) ||
                  self.readyState === XMLHttpRequest.DONE)) {
                properties.send = false;
                readyStateChange(self, XMLHttpRequest.DONE);
                if (!(flag.method === "HEAD" || flag.method === "GET")) {
                  self.upload.dispatchEvent(new ProgressEvent("progress"));
                  self.upload.dispatchEvent(new ProgressEvent("timeout"));
                  self.upload.dispatchEvent(new ProgressEvent("loadend"));
                }
                self.dispatchEvent(new ProgressEvent("progress"));
                self.dispatchEvent(new ProgressEvent("timeout"));
                self.dispatchEvent(new ProgressEvent("loadend"));
              }
              properties.readyState = XMLHttpRequest.UNSENT;
            };
            properties.timeoutId = setTimeout(properties.timeoutFn, this.timeout);
          }
        }
      }
      flag.body = undefined;
      flag.formData = false;
    }

    setRequestHeader(header, value) {
      const flag = this[xhrSymbols.flag];
      const properties = this[xhrSymbols.properties];
      if (arguments.length !== 2) {
        throw new TypeError();
      }
      value = String(value);
      if (!tokenRegexp.test(header) || !fieldValueRegexp.test(value)) {
        throw new DOMException(DOMException.SYNTAX_ERR);
      }
      if (this.readyState !== XMLHttpRequest.OPENED || properties.send) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      if (forbiddenRequestHeaders.test(header)) {
        return;
      }
      const keys = Object.keys(flag.requestHeaders);
      let n = keys.length;
      while (n--) {
        const key = keys[n];
        if (key.toLowerCase() === header.toLowerCase()) {
          flag.requestHeaders[key] += ", " + value;
          return;
        }
      }
      flag.requestHeaders[header] = value;
    }

    toString() {
      return "[object XMLHttpRequest]";
    }

    get _ownerDocument() {
      return window.document;
    }
  }

  utils.addConstants(XMLHttpRequest, {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  });

  function readyStateChange(xhr, readyState) {
    if (xhr.readyState !== readyState) {
      const readyStateChangeEvent = new Event("readystatechange");
      const properties = xhr[xhrSymbols.properties];
      properties.readyState = readyState;
      xhr.dispatchEvent(readyStateChangeEvent);
    }
  }

  function receiveResponse(xhr, response) {
    const properties = xhr[xhrSymbols.properties];
    let byteOffset = 0;
    const statusCode = response.statusCode;

    properties.status = statusCode;
    properties.statusText = response.statusMessage || HTTP_STATUS_CODES[statusCode] || "OK";

    const headers = {};
    const headerMap = {};
    const rawHeaders = response.rawHeaders;
    const n = Number(rawHeaders.length);
    for (let i = 0; i < n; i += 2) {
      const k = rawHeaders[i];
      const kl = k.toLowerCase();
      const v = rawHeaders[i + 1];
      if (k.match(uniqueResponseHeaders)) {
        if (headerMap[kl] !== undefined) {
          delete headers[headerMap[kl]];
        }
        headers[k] = v;
      } else if (headerMap[kl] !== undefined) {
        headers[headerMap[kl]] += ", " + v;
      } else {
        headers[k] = v;
      }
      headerMap[kl] = k;
    }
    properties.responseHeaders = headers;
    const contentLength = xhr.getResponseHeader("content-length") || "0";
    const bufferLength = parseInt(contentLength, 10) || 0;
    const progressObj = { lengthComputable: false };
    if (bufferLength !== 0) {
      progressObj.total = bufferLength;
      progressObj.loaded = 0;
      progressObj.lengthComputable = true;
    }
    properties.responseBuffer = new Buffer(0);
    properties.responseCache = null;
    properties.responseTextCache = null;
    properties.responseXMLCache = null;
    readyStateChange(xhr, XMLHttpRequest.HEADERS_RECEIVED);
    properties.client.on("data", chunk => {
      properties.responseBuffer = Buffer.concat([properties.responseBuffer, chunk]);
      properties.responseCache = null;
      properties.responseTextCache = null;
      properties.responseXMLCache = null;
    });
    response.on("data", chunk => {
      byteOffset += chunk.length;
      progressObj.loaded = byteOffset;
      readyStateChange(xhr, XMLHttpRequest.LOADING);
      if (progressObj.total !== progressObj.loaded) {
        xhr.dispatchEvent(new ProgressEvent("progress", progressObj));
      }
    });
    properties.client.on("end", () => {
      clearTimeout(properties.timeoutId);
      properties.timeoutFn = null;
      properties.timeoutStart = 0;
      properties.client = null;
      readyStateChange(xhr, XMLHttpRequest.DONE);
      xhr.dispatchEvent(new ProgressEvent("load"));
      xhr.dispatchEvent(new ProgressEvent("loadend", progressObj));
    });
  }

  function setDispatchProgressEvents(xhr) {
    const client = xhr[xhrSymbols.properties].client;

    client.on("request", req => {
      xhr.upload.dispatchEvent(new ProgressEvent("loadstart"));
      req.on("response", () => {
        let total = 0;
        let lengthComputable = false;
        const length = parseInt(xhrUtils.getRequestHeader(client.headers, "content-length"), 10);
        if (length) {
          total = length;
          lengthComputable = true;
        }
        const progress = {
          lengthComputable,
          total,
          loaded: total
        };
        xhr.upload.dispatchEvent(new ProgressEvent("progress", progress));

        xhr.upload.dispatchEvent(new ProgressEvent("load"));
        xhr.upload.dispatchEvent(new ProgressEvent("loadend"));
      });
    });
  }

  return XMLHttpRequest;
};
