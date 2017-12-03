const VERSION = '1.2.5';

const GLOBAL = (function() {
  try { return global.global; } catch (x) {}
  try { return self.self; } catch (x) {}
  return null;
})();

exports.version = VERSION;
exports.global = GLOBAL;

const ownNames = Object.getOwnPropertyNames;
const hasOwn = Object.prototype.hasOwnProperty;
const ownSymbols = Object.getOwnPropertySymbols;
const getDesc = Object.getOwnPropertyDescriptor;
const defineProp = Object.defineProperty;

function toObject(val) {
  if (val == null) // null or undefined
    throw new TypeError(val + ' is not an object');

  return Object(val);
}

function forEachDesc(obj, fn) {
  ownNames(obj).forEach(name => fn(name, getDesc(obj, name)));
  if (ownSymbols) ownSymbols(obj).forEach(name => fn(name, getDesc(obj, name)));
}

function mergeProp(target, name, desc, enumerable) {
  if (desc.get || desc.set) {
    let d = { configurable: true };
    if (desc.get) d.get = desc.get;
    if (desc.set) d.set = desc.set;
    desc = d;
  }

  desc.enumerable = enumerable;
  defineProp(target, name, desc);
}

function mergeProps(target, source, enumerable) {
  forEachDesc(source, (name, desc) => mergeProp(target, name, desc, enumerable));
}

exports.class = function makeClass(base, def) {
  if (!def) {
    def = base;
    base = Object;
  }

  let proto = Object.create(base && base.prototype);
  let statics = {};

  def(
    obj => mergeProps(proto, obj, false),
    obj => mergeProps(statics, obj, false),
    proto,
    base
  );

  let ctor = proto.constructor;
  ctor.prototype = proto;
  forEachDesc(statics, (name, desc) => defineProp(ctor, name, desc));
  if (base) {
    Object.setPrototypeOf ? Object.setPrototypeOf(ctor, base) : ctor.__proto__ = base;
  }

  return ctor;
};

exports.spread = function spread(initial) {
  return {
    a: initial || [],
    s() {
      for (let i = 0; i < arguments.length; ++i)
        this.a.push(arguments[i]);
      return this;
    },
    i(list) {
      if (Array.isArray(list)) {
        this.a.push.apply(this.a, list);
      } else {
        for (let item of list)
          this.a.push(item);
      }
      return this;
    },
  };
};

exports.objd = function objd(obj) {
  return toObject(obj);
};

exports.arrayd = function arrayd(obj) {
  if (Array.isArray(obj)) {
    return {
      at(skip, pos) { return obj[pos]; },
      rest(skip, pos) { return obj.slice(pos); },
    };
  }

  let iter = toObject(obj)[Symbol.iterator]();

  return {
    at(skip) {
      let r;
      while (skip--) r = iter.next();
      return r.value;
    },
    rest(skip) {
      let a = [];
      let r;
      while (--skip) r = iter.next();
      while (r = iter.next(), !r.done) a.push(r.value);
      return a;
    },
  };
};

exports.obj = function obj(target) {
  return {
    obj: target,
    p(props) {
      mergeProps(target, props, true);
      return this;
    },
    c(name, props) {
      let desc = getDesc(props, '_');
      mergeProp(target, name, getDesc(props, '_'), true);
      return this;
    },
    s(props) {
      for (let name in props._) {
        hasOwn.call(props._, name) && defineProp(target, name, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: props._[name],
        });
      }
      return this;
    },
  };
};

//// async

exports.async = function asyncFunction(iter) {
  return new Promise((resolve, reject) => {
    resume('next', undefined);
    function resume(type, value) {
      try {
        let result = iter[type](value);
        if (result.done) {
          resolve(result.value);
        } else {
          Promise.resolve(result.value).then(
            x => resume('next', x),
            x => resume('throw', x));
        }
      } catch (x) {
        reject(x);
      }
    }
  });
};

exports.asyncIter = function asyncIter(obj) {
  let method = obj[Symbol.asyncIterator] || obj[Symbol.iterator];
  return method.call(obj);
};

exports.asyncGen = function asyncGen(iter) {
  let front = null;
  let back = null;

  let aIter = {
    next(val) { return send('next', val); },
    throw(val) { return send('throw', val); },
    return(val) { return send('return', val); },
  };

  aIter[Symbol.asyncIterator] = function() { return this; };

  return aIter;

  function send(type, value) {
    return new Promise((resolve, reject) => {
      let x = { type, value, resolve, reject, next: null };
      if (back) {
        // If list is not empty, then push onto the end
        back = back.next = x;
      } else {
        // Create new list and resume generator
        front = back = x;
        resume(type, value);
      }
    });
  }

  function settle(type, value) {
    switch (type) {
      case 'return':
        front.resolve({ value, done: true });
        break;
      case 'throw':
        front.reject(value);
        break;
      default:
        front.resolve({ value, done: false });
        break;
    }

    front = front.next;

    if (front) resume(front.type, front.value);
    else back = null;
  }

  function resume(type, value) {
    try {
      let result = iter[type](value);
      value = result.value;

      if (value && typeof value === 'object' && '_esdown_await' in value) {
        if (result.done)
          throw new Error('Invalid async generator return');

        Promise.resolve(value._esdown_await).then(
          x => resume('next', x),
          x => resume('throw', x));
      } else {
        settle(result.done ? 'return' : 'normal', result.value);
      }
    } catch (x) {
      settle('throw', x);
    }
  }
};

////
