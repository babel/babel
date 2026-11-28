import { f, reassign } from "./f.js";
import * as ns from "./ns.js";
const g = (_f => function (_argPlaceholder) {
  return _f(_argPlaceholder);
})(f);
reassign();
g(1);
((_ns$f, _ns) => function (_argPlaceholder2) {
  return _ns$f.call(_ns, _argPlaceholder2);
})(ns.f, ns);
