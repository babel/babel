import defer * as x1 from "x";
import * as y from "y";
import * as x2 from "x";

later(() => {
  use(x1, x2, y);
});
