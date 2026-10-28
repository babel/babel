function make(proto, obj = { __proto__: proto, m() { return super.x; }, ...{} }) {
  return obj;
}
