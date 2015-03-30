import * as react from "../../helpers/react";
import * as t from "../../../types";

export var metadata = {
  optional: true
};

function hasRefOrSpread(attrs) {
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (t.isJSXSpreadAttribute(attr)) return true;
    if (isJSXAttributeOfName(attr, "ref")) return true;
  }
  return false;
}

function isJSXAttributeOfName(attr, name) {
  return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
}

export function JSXElement(node, parent, scope, file) {
  // filter
  var open = node.openingElement;
  if (hasRefOrSpread(open.attributes)) return;

  // init
  var isComponent = true;
  var props       = t.objectExpression([]);
  var obj         = t.objectExpression([]);
  var key         = t.literal(null);
  var type        = open.name;

  if (t.isJSXIdentifier(type) && react.isCompatTag(type.name)) {
    type = t.literal(type.name);
    isComponent = false;
  }

  function pushElemProp(key, value) {
    pushProp(obj.properties, t.identifier(key), value);
  }

  function pushProp(objProps, key, value) {
    objProps.push(t.property("init", key, value));
  }

  // metadata
  pushElemProp("type", type);
  pushElemProp("ref", t.literal(null));

  if (node.children.length) {
    pushProp(props.properties, t.identifier("children"), t.arrayExpression(react.buildChildren(node)));
  }

  // props
  for (var i = 0; i < open.attributes.length; i++) {
    var attr = open.attributes[i];
    if (isJSXAttributeOfName(attr, "key")) {
      key = attr.value;
    } else {
      pushProp(props.properties, attr.name, attr.value);
    }
  }

  if (isComponent) {
    props = t.callExpression(file.addHelper("default-props"), [t.memberExpression(type, t.identifier("defaultProps")), props]);
  }

  pushElemProp("props", props);

  // key
  pushElemProp("key", key);

  return obj;
}
