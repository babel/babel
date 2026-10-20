namespace Parenthesized {
  ("use strict");
  foo;
}

namespace Bare {
  "use strict";
  foo;
}

namespace NotFirst {
  foo;
  ("not a prologue");
}

namespace Outer {
  namespace Inner {
    ("use strict");
  }
  ("not a prologue");
}
