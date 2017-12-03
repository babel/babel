"use strict";
const validateNames = require("./helpers/validate-names");
const createDocumentTypeInternal = require("./document-type").create;

module.exports = function (core) {
  core.DOMImplementation.prototype.hasFeature = function () {
    return true;
  };

  core.DOMImplementation.prototype.createDocumentType = function (qualifiedName, publicId, systemId) {
    if (arguments.length < 3) {
      throw new TypeError("Expected 3 arguments to createDocumentType");
    }

    qualifiedName = String(qualifiedName);
    publicId = String(publicId);
    systemId = String(systemId);

    validateNames.qname(qualifiedName);

    return createDocumentTypeInternal(core, this._ownerDocument, qualifiedName, publicId, systemId);
  };

  core.DOMImplementation.prototype.createDocument = function (namespace, qualifiedName, doctype) {
    namespace = namespace !== null ? String(namespace) : namespace;
    qualifiedName = qualifiedName === null ? "" : String(qualifiedName);
    if (doctype === undefined) {
      doctype = null;
    }

    const document = new core.Document({ parsingMode: "xml" });

    let element = null;
    if (qualifiedName !== "") {
      element = document.createElementNS(namespace, qualifiedName);
    }

    if (doctype !== null) {
      document.appendChild(doctype);
    }

    if (element !== null) {
      document.appendChild(element);
    }

    return document;
  };

  core.DOMImplementation.prototype.createHTMLDocument = function (title) {
    // Let doc be a new document that is an HTML document.
    // Set doc's content type to "text/html".
    const document = new core.HTMLDocument({ parsingMode: "html" });

    // Create a doctype, with "html" as its name and with its node document set
    // to doc. Append the newly created node to doc.
    const doctype = createDocumentTypeInternal(core, this, "html", "", "");
    document.appendChild(doctype);

    // Create an html element in the HTML namespace, and append it to doc.
    const htmlElement = document.createElementNS("http://www.w3.org/1999/xhtml", "html");
    document.appendChild(htmlElement);

    // Create a head element in the HTML namespace, and append it to the html
    // element created in the previous step.
    const headElement = document.createElement("head");
    htmlElement.appendChild(headElement);

    // If the title argument is not omitted:
    if (title !== undefined) {
      // Create a title element in the HTML namespace, and append it to the head
      // element created in the previous step.
      const titleElement = document.createElement("title");
      headElement.appendChild(titleElement);

      // Create a Text node, set its data to title (which could be the empty
      // string), and append it to the title element created in the previous step.
      titleElement.appendChild(document.createTextNode(title));
    }

    // Create a body element in the HTML namespace, and append it to the html
    // element created in the earlier step.
    htmlElement.appendChild(document.createElement("body"));

    // doc's origin is an alias to the origin of the context object's associated
    // document, and doc's effective script origin is an alias to the effective
    // script origin of the context object's associated document.

    return document;
  };
};
