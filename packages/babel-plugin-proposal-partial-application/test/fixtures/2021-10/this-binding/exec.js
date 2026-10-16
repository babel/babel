"use strict";
function getThis() {
  return this;
}
expect(getThis~()()).toBe(undefined);
expect(getThis~().call({})).toBe(undefined);

const o = {
  m() {
    return ((x) => x)~(this);
  },
};
expect(o.m()()).toBe(o);
