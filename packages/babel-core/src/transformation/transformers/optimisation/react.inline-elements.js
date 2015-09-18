import { react } from "babel-types";
import * as t from "babel-types";

export let metadata = {
  optional: true
};

function hasRefOrSpread(attrs) {
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (t.isJSXSpreadAttribute(attr)) return true;
    if (isJSXAttributeOfName(attr, "ref")) return true;
  }
  return false;
}

function isJSXAttributeOfName(attr, name) {
  return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
}
export let visitor = {
  JSXElement(node, parent, scope, file) {
    // filter
    let open = node.openingElement;
    if (hasRefOrSpread(open.attributes)) return;

    // init
    let isComponent = true;
    let props       = t.objectExpression([]);
    let obj         = t.objectExpression([]);
    let key         = t.nullLiteral();
    let type        = open.name;

    if (t.isJSXIdentifier(type) && react.isCompatTag(type.name)) {
      type = t.stringLiteral(type.name);
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
    pushElemProp("ref", t.nullLiteral());

    if (node.children.length) {
      let children = react.buildChildren(node);
      children = children.length === 1 ? children[0] : t.arrayExpression(children);
      pushProp(props.properties, t.identifier("children"), children);
    }

    // props
    for (let i = 0; i < open.attributes.length; i++) {
      let attr = open.attributes[i];
      if (isJSXAttributeOfName(attr, "key")) {
        key = attr.value;
      } else {
        pushProp(props.properties, attr.name, attr.value || t.identifier("true"));
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
};
