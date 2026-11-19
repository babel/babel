import defer * as a from "a";
import defer * as c from "c";
import * as b from "b";

later(() => {
  use(a.x, b, c);
});
