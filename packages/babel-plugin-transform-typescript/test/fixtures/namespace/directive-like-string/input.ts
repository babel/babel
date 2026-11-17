namespace Directive {
  "use strict";
  var x = 1;
}

namespace NotDirective {
  ("use strict");
  var y = 1;
}

namespace AfterBareString {
  "a";
  ("use strict");
  var z = 1;
}
