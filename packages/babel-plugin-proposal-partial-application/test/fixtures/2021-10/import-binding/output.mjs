import { f, reassign } from "./f.js";
const g = (_f => function (_argPlaceholder) {
  return _f(_argPlaceholder);
})(f);
reassign();
g(1);
