class A extends (module {}) {}
class B extends f(module {}) {}
class C extends [module {}][0] {}
class D extends new (module {}) {}
class E extends new (f(module {})) {}
class F extends class extends module {} {} {}
class G extends (module { class H extends module {} }) {}
