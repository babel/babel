namespace a {
  namespace b {}
  namespace c { var x }
  namespace d {
    namespace e {}
  }
}

namespace WithTypes {
  namespace a { type A = 1 }
  namespace b { interface B {} }
  namespace c { import C = a }
  namespace d { declare class D {} }
}

namespace WithValues {
  namespace a { class A {} }
  namespace b { enum B {} }
  namespace c { function C() {} }
  namespace d { var D }
  namespace e { E; }
}
