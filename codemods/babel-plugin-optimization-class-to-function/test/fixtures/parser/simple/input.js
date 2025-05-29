class StatementParser {
  constructor(opts) {
    this.opts = opts;
  }

  parseExprAtom() {

  }

  parseTopLevel() {
    return this.parseExprAtom();
  }
}

class Parser extends StatementParser{
  constructor(opts) {
    super(opts);
  }

  parse() {
    return this.parseTopLevel();
  }

  parseExpression() {}
}

var v8intrinsic = superClass => class V8IntrinsicMixin extends superClass {
  parseV8Intrinsic() {
    if (this.match(54)) {
      const v8IntrinsicStartLoc = this.state.startLoc;
      const node = this.startNode();
      this.next();
      if (tokenIsIdentifier(this.state.type)) {
        const name = this.parseIdentifierName();
        const identifier = this.createIdentifier(node, name);
        this.castNodeTo(identifier, "V8IntrinsicIdentifier");
        if (this.match(10)) {
          return identifier;
        }
      }
      this.unexpected(v8IntrinsicStartLoc);
    }
  }
  parseExprAtom(refExpressionErrors) {
    return this.parseV8Intrinsic() || super.parseExprAtom(refExpressionErrors);
  }
};
