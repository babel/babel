"use strict";

const DOMException = require("../web-idl/DOMException");
const EventTarget = require("./generated/EventTarget");
const addConstants = require("../utils").addConstants;
const blobSymbols = require("./blob-symbols");

function FileReaderEventTarget() {
  if (!(this instanceof FileReaderEventTarget)) {
    throw new TypeError("DOM object constructor cannot be called as a function.");
  }
  EventTarget.setup(this);
}

FileReaderEventTarget.prototype = Object.create(EventTarget.interface.prototype);

module.exports = function createFileReader(window) {
  const ProgressEvent = window.ProgressEvent;

  class FileReader extends FileReaderEventTarget {
    constructor() {
      super();
      this.error = null;
      this.readyState = FileReader.EMPTY;
      this.result = null;
      this.onloadstart = null;
      this.onprogress = null;
      this.onload = null;
      this.onabort = null;
      this.onerror = null;
      this.onloadend = null;
    }
    readAsArrayBuffer(file) {
      readFile(this, file, "buffer");
    }
    readAsBinaryString(file) {
      readFile(this, file, "binary");
    }
    readAsDataURL(file) {
      readFile(this, file, "dataUrl");
    }
    readAsText(file, encoding) {
      readFile(this, file, "text", encoding);
    }
    abort() {
      if (this.readyState === this.DONE || this.readyState === this.EMPTY) {
        this.result = null;
        return;
      }
      if (this.readyState === this.LOADING) {
        this.readyState = this.DONE;
      }
      this.dispatchEvent(new ProgressEvent("abort"));
      this.dispatchEvent(new ProgressEvent("loadend"));
    }

    get _ownerDocument() {
      return window.document;
    }
  }

  addConstants(FileReader, {
    EMPTY: 0,
    LOADING: 1,
    DONE: 2
  });

  function readFile(self, file, format, encoding) {
    if (self.readyState === self.LOADING) {
      throw new DOMException(DOMException.INVALID_STATE_ERR);
    }
    if (file[blobSymbols.closed]) {
      self.error = new DOMException(DOMException.INVALID_STATE_ERR);
      self.dispatchEvent(new ProgressEvent("error"));
    }

    self.readyState = self.LOADING;
    self.dispatchEvent(new ProgressEvent("loadstart"));

    process.nextTick(() => {
      let data = file[blobSymbols.buffer];
      if (!data) {
        data = new Buffer("");
      }
      self.dispatchEvent(new ProgressEvent("progress", {
        lengthComputable: !isNaN(file.size),
        total: file.size,
        loaded: data.length
      }));

      process.nextTick(() => {
        self.readyState = self.DONE;
        switch (format) {
          default:
          case "buffer":
            const ab = new ArrayBuffer(data.length);
            const view = new Uint8Array(ab);
            for (let i = 0; i < data.length; ++i) {
              view[i] = data[i];
            }
            self.result = ab;
            break;
          case "binary":
            self.result = data.toString("binary");
            break;
          case "dataUrl":
            let dataUrl = "data:";
            if (file.type) {
              dataUrl += file.type + ";";
            }
            if (/text/i.test(file.type)) {
              dataUrl += "charset=utf-8,";
              dataUrl += data.toString("utf8");
            } else {
              dataUrl += "base64,";
              dataUrl += data.toString("base64");
            }
            self.result = dataUrl;
            break;
          case "text":
            if (encoding) {
              encoding = encoding.toLowerCase();
              if (encoding === "utf-16" || encoding === "utf16") {
                encoding = "utf-16le";
              }
            } else {
              encoding = "utf8";
            }
            self.result = data.toString(encoding);
            break;
        }

        self.dispatchEvent(new ProgressEvent("load"));

        process.nextTick(() => {
          if (self.readyState !== self.LOADING) {
            self.dispatchEvent(new ProgressEvent("loadend"));
          }
        });
      });
    });
  }

  return FileReader;
};
