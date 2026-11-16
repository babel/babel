class A extends (module {}) {}
class B extends (module {}).x {}
class C extends (module {})() {}
class D extends new (module {})() {}
class E extends new new (module {}).x()() {}
(class extends (module {}) {});
class F extends f(module {}) {}
class G extends [module {}][0] {}
class H extends module {}
{}
new module {}();