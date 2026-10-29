var _obj, _obj6;
let i = 0,
  k = "x";
const proto = {
  x: 1
};
const a = babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj = {}, proto), {}, {
  m() {
    return babelHelpers.superPropGet(_obj, "x", this) + i;
  }
});
while (i < 2) {
  let _obj2;
  f(babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj2 = {}, proto), {}, {
    m() {
      return babelHelpers.superPropGet(_obj2, k, this);
    }
  }));
}
outer: for (let j = 0; j < 2; j++) {
  let _obj3;
  const o = babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj3 = {}, proto), {}, {
    get [k]() {
      return babelHelpers.superPropGet(_obj3, "x", this) + j;
    }
  });
  for (const p of [o]) {
    let _obj4;
    g(babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj4 = {}, p), {}, {
      m() {
        return babelHelpers.superPropSet(_obj4, "x", p, this, 0);
      }
    }));
  }
  continue outer;
}
do i++; while (i < 5 && f((_obj5 => babelHelpers.objectSpread2(_obj5, {}, {
  m() {
    return babelHelpers.superPropGet(_obj5, "x", this) + i;
  }
}))(babelHelpers.setPrototypeOf(babelHelpers.objectSpread2({}, proto), babelHelpers.getPrototypeOf({
  __proto__: proto
})))));
for (const o = babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj6 = {}, proto), {}, {
  m() {
    return () => babelHelpers.superPropGet(_obj6, "x", this);
  }
}); i; i--) f(o);
const make = value => {
  var _obj7;
  return babelHelpers.objectSpread2(babelHelpers.setPrototypeOf(babelHelpers.objectSpread2(_obj7 = {}, {}), babelHelpers.getPrototypeOf({
    __proto__: {
      x: value
    }
  })), {}, {
    m() {
      return babelHelpers.superPropGet(_obj7, "x", this);
    }
  });
};
class A {
  field = (_obj8 => babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj8 = {}, proto), {}, {
    m() {
      return babelHelpers.superPropGet(_obj8, "x", this);
    }
  }))();
}
function h(o = (_obj9 => babelHelpers.objectSpread2(babelHelpers.objectSpread2(_obj9 = {}, proto), {}, {
  m() {
    return babelHelpers.superPropGet(_obj9, "x", this);
  }
}))()) {
  return o;
}
function* gen() {
  var _obj0;
  const o = babelHelpers.objectSpread2(babelHelpers.setPrototypeOf(babelHelpers.objectSpread2(_obj0 = {}, proto), babelHelpers.getPrototypeOf({
    __proto__: {
      x: yield 1
    }
  })), {}, {
    *m() {
      yield babelHelpers.superPropGet(_obj0, "x", this);
    }
  });
  return o;
}
