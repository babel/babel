{
  let _computedKeyDecs, _computedKey, _init_computedKey, _init_extra_computedKey;
  "class binding in plain class, decorated field, and computed keys";
  const errs = [];
  const fns = [];
  const capture = function (fn) {
    fns.push(fn);
    return () => {};
  };
  const assertUninitialized = function (fn) {
    try {
      fn();
    } catch (err) {
      errs.push(err);
    } finally {
      return () => {};
    }
  };
  capture(() => K);
  assertUninitialized(() => K);
  class K {
    static #_ = [_init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(this, [], [[_computedKeyDecs, 0, _computedKey]]).e;
    constructor() {
      _init_extra_computedKey(this);
    }
    [(_computedKeyDecs = [capture(() => K), assertUninitialized(() => K)], _computedKey = babelHelpers.toPropertyKey((capture(() => K), assertUninitialized(() => K))))] = _init_computedKey(this);
  }
  const E = ReferenceError;
  expect(errs.map(e => e.constructor)).toEqual([E, E, E]);
  const C = K;
  expect(fns.map(fn => fn())).toEqual([C, C, C]);
  K = null;
  expect(fns.map(fn => fn())).toEqual([null, C, C]);
}
{
  let _initClass, _classDecs, _computedKeyDecs2, _computedKey2, _init_computedKey2, _init_extra_computedKey2;
  "class binding in decorated class, decorated field, and computed keys";
  const errs = [];
  const fns = [];
  const capture = function (fn) {
    fns.push(fn);
    return () => {};
  };
  const assertUninitialized = function (fn) {
    try {
      fn();
    } catch (err) {
      errs.push(err);
    } finally {
      return () => {};
    }
  };
  _classDecs = [capture(() => _K), assertUninitialized(() => _K)];
  let _K, _t_K;
  {
    let _K;
    class K {
      static #_ = {
        e: [_init_computedKey2, _init_extra_computedKey2],
        c: [_K, _initClass]
      } = babelHelpers.applyDecs2311(this, _classDecs, [[_computedKeyDecs2, 0, _computedKey2]]);
      constructor() {
        _init_extra_computedKey2(this);
      }
      //todo: add the assertUninitialized decorator when we properly implement class tdz
      [(_computedKeyDecs2 = capture(() => _K), _computedKey2 = babelHelpers.toPropertyKey(capture(() => _K)))] = _init_computedKey2(this);
      static #_2 = _initClass();
    }
    _t_K = _K;
  }
  _K = _t_K;
  const E = ReferenceError;
  expect(errs.map(e => e.constructor)).toEqual([E]);
  const C = _K;
  expect(fns.map(fn => fn())).toEqual([C, C, C]);
  [_K = null] = [];
  expect(fns.map(fn => fn())).toEqual([null, C, C]);
}
{
  let _initClass2, _classDecs2, _computedKeyDecs3, _computedKey3, _init_computedKey3, _init_extra_computedKey3;
  "class binding in decorated class, decorated static field, and computed keys";
  const errs = [];
  const fns = [];
  const capture = function (fn) {
    fns.push(fn);
    return () => {};
  };
  const assertUninitialized = function (fn) {
    try {
      fn();
    } catch (err) {
      errs.push(err);
    } finally {
      return () => {};
    }
  };
  _classDecs2 = [capture(() => _K2), assertUninitialized(() => _K2)];
  let _K2, _t_K2;
  {
    let _K2;
    new class extends babelHelpers.identity {
      static [class K {
        static [(_computedKeyDecs3 = capture(() => _K2), _computedKey3 = babelHelpers.toPropertyKey(capture(() => _K2)), "_")];
        static #_ = (() => {
          delete this._;
          ({
            e: [_init_computedKey3, _init_extra_computedKey3],
            c: [_K2, _initClass2]
          } = babelHelpers.applyDecs2311(this, _classDecs2, [[_computedKeyDecs3, 8, _computedKey3]]));
        })();
      }];
      //todo: add the assertUninitialized decorator when we properly implement class tdz
      [_computedKey3] = _init_computedKey3();
      constructor() {
        super(_K2), (() => {
          _init_extra_computedKey3();
        })(), _initClass2();
      }
    }();
    _t_K2 = _K2;
  }
  _K2 = _t_K2;
  const E = ReferenceError;
  expect(errs.map(e => e.constructor)).toEqual([E]);
  const C = _K2;
  expect(fns.map(fn => fn())).toEqual([C, C, C]);
  ({
    K: _K2 = null
  } = {});
  expect(fns.map(fn => fn())).toEqual([null, C, C]);
}
{
  "class binding in decorated class, decorated static method, and computed keys with await";
  (async (_initStatic, _initClass3, _classDecs3, _computedKeyDecs4, _computedKey4) => {
    const errs = [];
    const fns = [];
    const capture = function (fn) {
      fns.push(fn);
      return () => {};
    };
    const assertUninitialized = function (fn) {
      try {
        fn();
      } catch (err) {
        errs.push(err);
      } finally {
        return () => {};
      }
    };
    _classDecs3 = [capture(await (() => _K3)), assertUninitialized(await (() => _K3))];
    let _K3, _t_K3;
    {
      let _K3;
      class K {
        static #_ = (() => {
          ({
            e: [_initStatic],
            c: [_K3, _initClass3]
          } = babelHelpers.applyDecs2311(this, _classDecs3, [[_computedKeyDecs4, 10, _computedKey4]]));
          _initStatic(this);
        })();
        //todo: add the assertUninitialized decorator when we properly implement class tdz
        static [(_computedKeyDecs4 = capture(await (() => _K3)), _computedKey4 = babelHelpers.toPropertyKey(capture(await (() => _K3))))]() {}
        static #_2 = _initClass3();
      }
      _t_K3 = _K3;
    }
    _K3 = _t_K3;
    const E = ReferenceError;
    expect(errs.map(e => e.constructor)).toEqual([E]);
    const C = _K3;
    expect(fns.map(fn => fn())).toEqual([C, C, C]);
    [_K3] = [null];
    expect(fns.map(fn => fn())).toEqual([null, C, C]);
  })();
}
