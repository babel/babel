import defer * as a from "a";
import defer * as b from "b";
import * as c from "lazy";

later(() => {
  use(a.x, b, c);
});
