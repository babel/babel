import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _initializerDefineProperty(e, i, r, l) {
  r && _Object$defineProperty(e, i, {
    enumerable: r.enumerable,
    configurable: r.configurable,
    writable: r.writable,
    value: r.initializer ? r.initializer.call(l) : void 0
  });
}
export { _initializerDefineProperty as default };