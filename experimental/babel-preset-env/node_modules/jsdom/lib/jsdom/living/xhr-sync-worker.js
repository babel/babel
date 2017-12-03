"use strict";

const util = require("util");

const jsdom = require("../../jsdom");
const xhrSymbols = require("./xmlhttprequest-symbols");

const chunks = [];

process.stdin.on("data", chunk => {
  chunks.push(chunk);
});

process.stdin.on("end", () => {
  const buffer = Buffer.concat(chunks);
  const doc = jsdom.jsdom();
  const xhr = new doc.defaultView.XMLHttpRequest();
  const flag = JSON.parse(buffer.toString(), (k, v) => {
    if (v && v.type === "Buffer" && v.data) {
      return new Buffer(v.data);
    }
    return v;
  });
  flag.synchronous = false;
  xhr[xhrSymbols.flag] = flag;
  const properties = xhr[xhrSymbols.properties];
  properties.readyState = doc.defaultView.XMLHttpRequest.OPENED;
  try {
    xhr.addEventListener("load", () => {
      process.stdout.write(JSON.stringify({ properties }), () => {
        process.exit(0);
      });
    }, false);
    xhr.addEventListener("error", error => {
      process.stdout.write(JSON.stringify({ properties, error: error.stack || util.inspect(error) }), () => {
        process.exit(0);
      });
    }, false);
    xhr.send(flag.body);
  } catch (error) {
    process.stdout.write(JSON.stringify({ properties, error: error.stack || util.inspect(error) }), () => {
      process.exit(0);
    });
  }
});
