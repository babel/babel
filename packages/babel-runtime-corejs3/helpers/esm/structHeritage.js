import structRegistry from "./structRegistry.js";
function _structHeritage(t) {
  var e = structRegistry();
  if (0 === arguments.length) return e.o;
  if (null === t) return e.n;
  if (!e.l(t)) throw new TypeError("Structs can only extend other structs or null");
  return t;
}
export { _structHeritage as default };