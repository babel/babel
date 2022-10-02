function thisExpr() {
  return <p>{this.Foo}</p>;
}
function thisJSX() {
  return <this.Foo />;
}
class A extends B {
  superExpr() {
    return <p>{super.Foo}</p>;
  }
  superJSX() {
    return <super.Foo />;
  }
}
function argumentsExpr() {
  return <p>{arguments.Foo}</p>;
}
function argumentsJSX() {
  return <arguments.Foo />;
}
function newTargetExpr() {
  return <p>{new.target.Foo}</p>;
}
function newTargetJSX() {
  return <new.target.Foo />;
}
