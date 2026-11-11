import defer * as a from "a";
import * as b from "b";

later(() => {
  use(a.x, b);
});
