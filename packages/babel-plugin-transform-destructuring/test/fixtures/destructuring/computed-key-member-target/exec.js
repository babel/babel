// https://github.com/babel/babel/issues/18363
const original = {};
let target = original;
function key() {
  target = {};
  return "x";
}
({ [key()]: target.x } = { x: 1 });
expect(original.x).toBeUndefined();
expect(target.x).toBe(1);

var order = [];
var obj = {
  get t() {
    order.push("target");
    return {};
  },
};
var keyObj = {
  toString() {
    order.push("toPropertyKey");
    return "x";
  },
};
({
  [(order.push("key"), keyObj)]: obj.t.x,
} = { x: 1 });
expect(order).toEqual(["key", "toPropertyKey", "target"]);

var evaluated = false;
var obj2 = {
  get t() {
    evaluated = true;
    return {};
  },
};
expect(() => {
  ({ [(() => { throw new Error("key"); })()]: obj2.t.x } = { x: 1 });
}).toThrow("key");
expect(evaluated).toBe(false);

var k = "x";
var out = {};
({ [k]: out[(k = "y")] } = { x: 1, y: 2 });
expect(out).toEqual({ y: 1 });

var log = [];
var a = {}, b = {};
({
  [(log.push("k1"), "p")]: a[(log.push("t1"), "p")],
  [(log.push("k2"), "q")]: b[(log.push("t2"), "q")],
} = { p: 1, q: 2 });
expect(log).toEqual(["k1", "t1", "k2", "t2"]);
expect(a.p).toBe(1);
expect(b.q).toBe(2);

var events = [];
var nestedTarget = {};
var nestedSource = {
  get nested() {
    events.push("source");
    return { x: 7 };
  },
};
({ nested: { x: nestedTarget[(events.push("target"), "x")] } } = nestedSource);
expect(events).toEqual(["source", "target"]);
expect(nestedTarget.x).toBe(7);

var nestedOriginal = {};
var nestedTarget2 = nestedOriginal;
function nestedKey() {
  nestedTarget2 = {};
  return "n";
}
({ [nestedKey()]: { x: nestedTarget2.x } } = { n: { x: 1 } });
expect(nestedOriginal.x).toBeUndefined();
expect(nestedTarget2.x).toBe(1);

var deepLog = [];
var deepTarget = {};
var deepSource = {
  get a() {
    deepLog.push("a");
    return {
      get b() {
        deepLog.push("b");
        return { c: 3 };
      },
    };
  },
};
({ a: { b: { c: deepTarget[(deepLog.push("target"), "c")] } } } = deepSource);
expect(deepLog).toEqual(["a", "b", "target"]);
expect(deepTarget.c).toBe(3);

var restLog = [];
var restTarget = {};
var restSource = {
  get r() {
    restLog.push("source");
    return { y: 1 };
  },
};
({ r: { ...restTarget[(restLog.push("target"), "rest")] } } = restSource);
expect(restLog).toEqual(["source", "target"]);
expect(restTarget.rest).toEqual({ y: 1 });

var arrayLog = [];
var arrayTarget = {};
({
  [(arrayLog.push("key"), "arr")]: [arrayTarget[(arrayLog.push("target"), 0)]],
} = {
  get arr() {
    arrayLog.push("source");
    return [5];
  },
});
expect(arrayLog).toEqual(["key", "source", "target"]);
expect(arrayTarget[0]).toBe(5);

var defaultOriginal = {};
var defaultTarget = defaultOriginal;
var defaultSource = {
  get x() {
    defaultTarget = {};
    return 1;
  },
};
({ x: defaultTarget.x = 0 } = defaultSource);
expect(defaultOriginal.x).toBe(1);
expect(defaultTarget.x).toBeUndefined();

// the default is used
defaultTarget = defaultOriginal = {};
({
  x: defaultTarget.x = 0,
} = {
  get x() {
    defaultTarget = {};
    return undefined;
  },
});
expect(defaultOriginal.x).toBe(0);
expect(defaultTarget.x).toBeUndefined();

var defaultLog = [];
var defaultObj = {
  get t() {
    defaultLog.push("target");
    return {};
  },
};
({
  [(defaultLog.push("key"), "x")]: defaultObj.t[
    (defaultLog.push("property"), "x")
  ] = (defaultLog.push("default"), 0),
} = {
  get x() {
    defaultLog.push("read");
  },
});
expect(defaultLog).toEqual(["key", "target", "property", "read", "default"]);

var propTarget = {};
var propName = "a";
({
  x: propTarget[propName] = 0,
} = {
  get x() {
    propName = "b";
    return 1;
  },
});
expect(propTarget).toEqual({ a: 1 });

var plain;
({ x: plain = 0 } = {});
expect(plain).toBe(0);
[plain = 5] = [];
expect(plain).toBe(5);

var primLog = [];
const primKey = {
  [Symbol.toPrimitive]() {
    primLog.push("toPropertyKey");
    return "x";
  },
};
var primObj = {
  get t() {
    primLog.push("target");
    return {};
  },
};
({ [primKey]: primObj.t.x } = { x: 1 });
expect(primLog).toEqual(["toPropertyKey", "target"]);
