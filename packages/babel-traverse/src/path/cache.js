let wm = new WeakMap();

// To implement clear we need to export a facade.
export default {
  clear() {
    wm = new WeakMap();
  },

  delete(k) {
    return wm.delete(k)
  },

  get(k) {
    return wm.get(k)
  },

  has(k) {
    return wm.has(k)
  },

  set(k, v) {
    wm.set(k, v);
    return wm;
  },
};
