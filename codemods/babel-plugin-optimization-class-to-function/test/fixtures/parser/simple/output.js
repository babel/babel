var _Parser_this, _Parser_constructor_dynamic, _Parser_parseExprAtom_dynamic;
function _v8intrinsic_parseV8Intrinsic() {
  if (_Parser_this.match(54)) {
    const v8IntrinsicStartLoc = _Parser_this.state.startLoc;
    const node = _Parser_this.startNode();
    _Parser_this.next();
    if (tokenIsIdentifier(_Parser_this.state.type)) {
      const name = _Parser_this.parseIdentifierName();
      const identifier = _Parser_this.createIdentifier(node, name);
      _Parser_this.castNodeTo(identifier, "V8IntrinsicIdentifier");
      if (_Parser_this.match(10)) {
        return identifier;
      }
    }
    _Parser_this.unexpected(v8IntrinsicStartLoc);
  }
}
function _v8intrinsic_parseExprAtom(__super, refExpressionErrors) {
  return _v8intrinsic_parseV8Intrinsic() || __super(refExpressionErrors);
}
class Parser {
  constructor() {
    _Parser_constructor_dynamic = _StatementParser_constructor;
    _Parser_parseExprAtom_dynamic = _StatementParser_parseExprAtom;
    _Parser_this = {};
    _Parser_constructor.apply(null, arguments);
  }
  parse() {
    return _Parser_parse.apply(null, arguments);
  }
  parseExpression() {
    return _Parser_parseExpression.apply(null, arguments);
  }
}
function _StatementParser_constructor(opts) {
  _Parser_this.opts = opts;
}
function _StatementParser_parseExprAtom() {}
function _StatementParser_parseTopLevel() {
  return _Parser_parseExprAtom_dynamic();
}
function _Parser_constructor(opts) {
  _StatementParser_constructor(opts);
}
function _Parser_parse() {
  return _StatementParser_parseTopLevel();
}
function _Parser_parseExpression() {}
var v8intrinsic = superClass => class v8intrinsic extends superClass {
  constructor() {
    super(...arguments);
    _Parser_parseExprAtom_dynamic = _v8intrinsic_parseExprAtom.bind(null, _Parser_parseExprAtom_dynamic);
  }
};
