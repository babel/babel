
var ClassExpr = class {
  m() {
    return ClassExpr;
  }
}

var TempClass = ClassExpr;
ClassExpr = 42;

expect(42).toBe(new TempClass().m());
expect(TempClass.name).toBe('');

//////////////////////////////////////////////////////////////////////////////

var ClassExpr2 = class ClassExprInner {
  m() {
    return ClassExprInner;
  }
}

TempClass = ClassExpr2;
ClassExpr2 = 42;

expect(TempClass).toBe(new TempClass().m());
expect(TempClass.name).toBe('ClassExprInner');

//////////////////////////////////////////////////////////////////////////////

class ClassDef {
  m() {
    return ClassDef;
  }
}

var TempClass = ClassDef;
ClassDef = 42;

expect(TempClass).toBe(new TempClass().m());
// IE does not have a name property on functions.
expect(TempClass.name === 'ClassDef' || TempClass.name === undefined).toBe(true);
