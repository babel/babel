import { types as tt } from "./tokentype";
import { Parser } from "./state";
import { reservedWords } from "./identifier";

const pp = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp.toAssignable = function (node, isBinding) {
  if (node) {
    switch (node.type) {
    case "Identifier":
    case "ObjectPattern":
    case "ArrayPattern":
    case "AssignmentPattern":
      break;

    case "ObjectExpression":
      node.type = "ObjectPattern";
      for (let i = 0; i < node.properties.length; i++) {
        let prop = node.properties[i];
        if (prop.type === "SpreadProperty") continue;
        if (prop.kind !== "init") this.raise(prop.key.start, "Object pattern can't contain getter or setter");
        this.toAssignable(prop.value, isBinding);
      }
      break;

    case "ArrayExpression":
      node.type = "ArrayPattern";
      this.toAssignableList(node.elements, isBinding);
      break;

    case "AssignmentExpression":
      if (node.operator === "=") {
        node.type = "AssignmentPattern";
        delete node.operator;
      } else {
        this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
      }
      break;

    case "MemberExpression":
      if (!isBinding) break;

    default:
      this.raise(node.start, "Assigning to rvalue");
    }
  }
  return node;
};

// Convert list of expression atoms to binding list.

pp.toAssignableList = function (exprList, isBinding) {
  let end = exprList.length;
  if (end) {
    let last = exprList[end - 1];
    if (last && last.type === "RestElement") {
      --end;
    } else if (last && last.type === "SpreadElement") {
      last.type = "RestElement";
      let arg = last.argument;
      this.toAssignable(arg, isBinding);
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") {
        this.unexpected(arg.start);
      }
      --end;
    }
  }
  for (let i = 0; i < end; i++) {
    let elt = exprList[i];
    if (elt) this.toAssignable(elt, isBinding);
  }
  return exprList;
};

// Convert list of expression atoms to a list of

pp.toReferencedList = function (exprList) {
  return exprList;
};

// Parses spread element.

pp.parseSpread = function (refShorthandDefaultPos) {
  let node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(refShorthandDefaultPos);
  return this.finishNode(node, "SpreadElement");
};

pp.parseRest = function () {
  let node = this.startNode();
  this.next();
  node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();
  return this.finishNode(node, "RestElement");
};

// Parses lvalue (assignable) atom.

pp.parseBindingAtom = function () {
  switch (this.type) {
  case tt.name:
    return this.parseIdent();

  case tt.bracketL:
    let node = this.startNode();
    this.next();
    node.elements = this.parseBindingList(tt.bracketR, true, true);
    return this.finishNode(node, "ArrayPattern");

  case tt.braceL:
    return this.parseObj(true);

  default:
    this.unexpected();
  }
};

pp.parseBindingList = function (close, allowEmpty, allowTrailingComma) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) first = false;
    else this.expect(tt.comma);
    if (allowEmpty && this.type === tt.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break;
    } else if (this.type === tt.ellipsis) {
      elts.push(this.parseAssignableListItemTypes(this.parseRest()));
      this.expect(close);
      break;
    } else {
      var left = this.parseMaybeDefault();
      this.parseAssignableListItemTypes(left);
      elts.push(this.parseMaybeDefault(null, null, left));
    }
  }
  return elts;
};

pp.parseAssignableListItemTypes = function (param) {
  return param;
};

// Parses assignment pattern around given atom if possible.

pp.parseMaybeDefault = function (startPos, startLoc, left) {
  startLoc = startLoc || this.startLoc;
  startPos = startPos || this.start;
  left = left || this.parseBindingAtom();
  if (!this.eat(tt.eq)) return left;

  let node = this.startNodeAt(startPos, startLoc);
  node.operator = "=";
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};

// Verify that a node is an lval — something that can be assigned
// to.

pp.checkLVal = function (expr, isBinding, checkClashes) {
  switch (expr.type) {
  case "Identifier":
    if (this.strict && (reservedWords.strictBind(expr.name) || reservedWords.strict(expr.name)))
      this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
    if (checkClashes) {
      if (checkClashes[expr.name]) {
        this.raise(expr.start, "Argument name clash in strict mode");
      } else {
        checkClashes[expr.name] = true;
      }
    }
    break;

  case "MemberExpression":
    if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
    break;

  case "ObjectPattern":
       for (let i = 0; i < expr.properties.length; i++) {
      var prop = expr.properties[i];
      if (prop.type === "Property") prop = prop.value;
      this.checkLVal(prop, isBinding, checkClashes);
    }
    break;

  case "ArrayPattern":
    for (let i = 0; i < expr.elements.length; i++) {
      let elem = expr.elements[i];
      if (elem) this.checkLVal(elem, isBinding, checkClashes);
    }
    break;

  case "AssignmentPattern":
    this.checkLVal(expr.left, isBinding, checkClashes);
    break;

  case "SpreadProperty":
  case "RestElement":
    this.checkLVal(expr.argument, isBinding, checkClashes);
    break;

  case "ParenthesizedExpression":
    this.checkLVal(expr.expression, isBinding, checkClashes);
    break;

  default:
    this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
  }
};
