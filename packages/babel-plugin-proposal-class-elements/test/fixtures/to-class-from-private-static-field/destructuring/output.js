var _priv = babelHelpers.temporalUndefined;

class A {
  static test() {
    [babelHelpers.classStaticPrivateFieldDestructureSet2(this, A, _priv, _ => _priv = _)._] = [3];
  }

}

_priv = 2;
