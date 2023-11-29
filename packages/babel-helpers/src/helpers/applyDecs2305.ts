/* @minVersion 7.21.0 */

// @ts-expect-error helper
import checkInRHS from "checkInRHS";
// @ts-expect-error helper
import setFunctionName from "setFunctionName";
// @ts-expect-error helper
import toPropertyKey from "toPropertyKey";

/**
  Enums are used in this file, but not assigned to vars to avoid non-hoistable values
*/

const enum PROP_KIND {
  FIELD = 0,
  ACCESSOR = 1,
  METHOD = 2,
  GETTER = 3,
  SETTER = 4,
  CLASS = 5, // only used in assertValidReturnValue

  STATIC = 8,

  DECORATORS_HAVE_THIS = 16,
}

type DecoratorFinishedRef = { v?: boolean };
type DecoratorContextAccess = {
  get?: (target: object) => any;
  set?: (target: object, value: any) => void;
  has: (target: object) => boolean;
};
type DecoratorContext = {
  kind: "accessor" | "method" | "getter" | "setter" | "field" | "class";
  name: string;
  static: boolean;
  private: boolean;
  access?: DecoratorContextAccess;
  metadata?: any;
  addInitializer?: (initializer: Function) => void;
};
type DecoratorInfo = [
  fn: Function | Function[],
  kind: PROP_KIND,
  name: string,
  any?,
  Function?,
];

function _bindPropCall(obj: any, name: string, before?: Function) {
  return function (_this: any, value?: any) {
    if (before) {
      before(_this);
    }
    return obj[name].call(_this, value);
  };
}

function createAddInitializerMethod(
  initializers: Function[],
  decoratorFinishedRef: DecoratorFinishedRef,
) {
  decoratorFinishedRef.v = false;
  return function addInitializer(initializer: Function) {
    if (decoratorFinishedRef.v) {
      throw new Error(
        "attempted to call addInitializer after decoration was finished",
      );
    }
    assertCallable(initializer, "An initializer", true);
    initializers.push(initializer);
  };
}

function memberDec(
  dec: Function,
  thisArg: any,
  name: string,
  desc: PropertyDescriptor,
  initializers: Function[],
  kind: PROP_KIND,
  isStatic: boolean,
  isPrivate: boolean,
  value: any,
  hasPrivateBrand: Function,
  metadata: any,
) {
  function assertInstanceIfPrivate(target: any) {
    if (!hasPrivateBrand(target)) {
      throw new TypeError(
        "Attempted to access private element on non-instance",
      );
    }
  }

  var decoratorFinishedRef: DecoratorFinishedRef = {};
  var ctx: DecoratorContext = {
    kind: ["field", "accessor", "method", "getter", "setter", "field"][
      kind
    ] as any,

    name: isPrivate ? "#" + name : toPropertyKey(name),
    static: isStatic,
    private: isPrivate,
    metadata: metadata,
  };

  ctx.addInitializer = createAddInitializerMethod(
    initializers,
    decoratorFinishedRef,
  );

  var get, set;
  if (!isPrivate && (kind === PROP_KIND.FIELD || kind === PROP_KIND.METHOD)) {
    get = function (target: any) {
      return target[name];
    };
    if (kind === PROP_KIND.FIELD) {
      set = function (target: any, v: any) {
        target[name] = v;
      };
    }
  } else if (kind === PROP_KIND.METHOD) {
    // Assert: isPrivate is true.
    get = function (_this: any) {
      if (isPrivate) {
        assertInstanceIfPrivate(_this);
      }
      return desc.value;
    };
  } else {
    // Assert: If kind === 0, then isPrivate is true.
    var t = kind === PROP_KIND.FIELD || kind === PROP_KIND.ACCESSOR;

    if (t || kind === PROP_KIND.GETTER) {
      get = _bindPropCall(desc, "get", isPrivate && assertInstanceIfPrivate);
    }
    if (t || kind === PROP_KIND.SETTER) {
      set = _bindPropCall(desc, "set", isPrivate && assertInstanceIfPrivate);
    }
  }

  var access: DecoratorContextAccess = (ctx.access = {
    has: isPrivate
      ? // @ts-expect-error no thisArg
        hasPrivateBrand.bind()
      : function (target: object) {
          return name in target;
        },
  });
  if (get) access.get = get;
  if (set) access.set = set;

  try {
    return dec.call(thisArg, value, ctx);
  } finally {
    decoratorFinishedRef.v = true;
  }
}

function assertCallable(fn: any, hint: string, throwUndefined?: boolean) {
  if (typeof fn !== "function") {
    if (throwUndefined || fn !== void 0) {
      throw new TypeError(hint + " must be a function");
    }
  }
}

function assertValidReturnValue(kind: PROP_KIND, value: any) {
  if (value === void 0) return true;

  var type = typeof value;

  if (kind === PROP_KIND.ACCESSOR) {
    if (type !== "object" || !value) {
      throw new TypeError(
        "accessor decorators must return an object with get, set, or init properties or void 0",
      );
    }
    assertCallable(value.get, "accessor.get");
    assertCallable(value.set, "accessor.set");
    assertCallable(value.init, "accessor.init");
  } else if (type !== "function") {
    throw new TypeError(
      (kind === PROP_KIND.FIELD
        ? "field"
        : kind === PROP_KIND.CLASS
          ? "class"
          : "method") + " decorators must return a function or void 0",
    );
  }
}

function applyMemberDec(
  ret: Function[],
  Class: any,
  decInfo: DecoratorInfo,
  decoratorsHaveThis: number,
  name: string,
  kind: PROP_KIND,
  isStatic: boolean,
  isPrivate: boolean,
  initializers: Function[],
  hasPrivateBrand: Function,
  metadata: any,
) {
  var decs = decInfo[0],
    decVal = decInfo[3];

  if (!decoratorsHaveThis && !Array.isArray(decs)) {
    decs = [decs];
  }

  var desc: PropertyDescriptor = {},
    init: Function | Function[] = [],
    key: "get" | "set" | "value" =
      kind === PROP_KIND.GETTER
        ? "get"
        : kind === PROP_KIND.SETTER
          ? "set"
          : "value",
    value: any;

  if (isPrivate) {
    if (kind === PROP_KIND.FIELD || kind === PROP_KIND.ACCESSOR) {
      desc = {
        get: function (this: any) {
          return decVal(this);
        },
        set: function (this: any, value: any) {
          decInfo[4](this, value);
        },
      };
    } else {
      desc[key] = decVal;
    }
    if (kind !== PROP_KIND.FIELD) {
      if (kind === PROP_KIND.ACCESSOR) {
        setFunctionName(desc.set, "#" + name, "set");
      }
      setFunctionName(desc[key], "#" + name, key);
    }
  } else if (kind !== PROP_KIND.FIELD) {
    desc = Object.getOwnPropertyDescriptor(Class, name);
  }

  if (kind === PROP_KIND.ACCESSOR) {
    value = {
      get: desc.get,
      set: desc.set,
    };
  } else if (kind === PROP_KIND.METHOD) {
    value = desc.value;
  } else if (kind === PROP_KIND.GETTER) {
    value = desc.get;
  } else if (kind === PROP_KIND.SETTER) {
    value = desc.set;
  }

  var newValue;

  var inc = decoratorsHaveThis ? 2 : 1;

  for (var i = decs.length - 1; i >= 0; i -= inc) {
    var dec = (decs as Function[])[i];

    newValue = memberDec(
      dec,
      decoratorsHaveThis ? (decs as Function[])[i - 1] : undefined,
      name,
      desc,
      initializers,
      kind,
      isStatic,
      isPrivate,
      value,
      hasPrivateBrand,
      metadata,
    );

    if (!assertValidReturnValue(kind, newValue)) {
      if (kind === PROP_KIND.FIELD) {
        // empty
      } else if (kind === PROP_KIND.ACCESSOR) {
        value = {
          get: newValue.get || value.get,
          set: newValue.set || value.set,
        };

        newValue = newValue.init;
      } else {
        value = newValue;
        newValue = void 0;
      }

      if (newValue !== void 0) {
        init.push(newValue);
      }
    }
  }

  if (kind === PROP_KIND.FIELD || kind === PROP_KIND.ACCESSOR) {
    ret.push(function (instance: any, value: any) {
      for (var i = init.length - 1; i >= 0; i--) {
        value = (init as Function[])[i].call(instance, value);
      }
      return value;
    });
  }

  if (kind !== PROP_KIND.FIELD) {
    if (kind === PROP_KIND.ACCESSOR) {
      desc.get = value.get;
      desc.set = value.set;
    } else if (kind === PROP_KIND.METHOD) {
      desc.value = value;
    } else if (kind === PROP_KIND.GETTER) {
      desc.get = value;
    } else if (kind === PROP_KIND.SETTER) {
      desc.set = value;
    }

    if (isPrivate) {
      if (kind === PROP_KIND.ACCESSOR) {
        ret.push(_bindPropCall(desc, "get"), _bindPropCall(desc, "set"));
      } else {
        ret.push(kind === PROP_KIND.METHOD ? value : Function.call.bind(value));
      }
    } else {
      Object.defineProperty(Class, name, desc);
    }
  }
}

function applyMemberDecs(
  Class: any,
  decInfos: DecoratorInfo[],
  instanceBrand: Function,
  metadata: any,
) {
  var ret: Function[] = [];
  var protoInitializers: Function[];
  var staticInitializers: Function[];
  var staticBrand = function (_: any) {
    return checkInRHS(_) === Class;
  };

  var existingProtoNonFields = new Map();
  var existingStaticNonFields = new Map();

  function pushInitializers(initializers: Function[]) {
    if (initializers) {
      ret.push(function (instance: any) {
        for (var i = 0; i < initializers.length; i++) {
          initializers[i].call(instance);
        }
        return instance;
      });
    }
  }

  for (var i = 0; i < decInfos.length; i++) {
    var decInfo = decInfos[i];

    // skip computed property names
    if (!Array.isArray(decInfo)) continue;

    var kind = decInfo[1];
    var name = decInfo[2];
    var isPrivate = decInfo.length > 3;

    var decoratorsHaveThis = kind & PROP_KIND.DECORATORS_HAVE_THIS;
    var isStatic = !!(kind & PROP_KIND.STATIC);

    kind &= 7 /* 0b111 */;

    if (kind !== PROP_KIND.FIELD && !isPrivate) {
      var existingNonFields = isStatic
        ? existingStaticNonFields
        : existingProtoNonFields;

      var existingKind = existingNonFields.get(name) || 0;

      if (
        existingKind === true ||
        (existingKind === PROP_KIND.GETTER && kind !== PROP_KIND.SETTER) ||
        (existingKind === PROP_KIND.SETTER && kind !== PROP_KIND.GETTER)
      ) {
        throw new Error(
          "Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " +
            name,
        );
      }
      existingNonFields.set(
        name,
        !existingKind && kind > PROP_KIND.METHOD ? kind : true,
      );
    }

    applyMemberDec(
      ret,
      isStatic ? Class : Class.prototype,
      decInfo,
      decoratorsHaveThis,
      name,
      kind,
      isStatic,
      isPrivate,
      isStatic
        ? (staticInitializers = staticInitializers || [])
        : (protoInitializers = protoInitializers || []),
      isStatic && isPrivate ? staticBrand : instanceBrand,
      metadata,
    );
  }

  pushInitializers(protoInitializers);
  pushInitializers(staticInitializers);
  return ret;
}

function applyClassDecs(
  targetClass: any,
  classDecs: Function[],
  decoratorsHaveThis: number,
  metadata: any,
) {
  var initializers: Function[] = [];
  var newClass = targetClass;
  var name = targetClass.name;

  for (var i = classDecs.length - 1; i >= 0; i -= decoratorsHaveThis ? 2 : 1) {
    var decoratorFinishedRef: DecoratorFinishedRef = {};

    try {
      var nextNewClass = classDecs[i].call(
        decoratorsHaveThis ? classDecs[i - 1] : undefined,
        newClass,
        {
          kind: "class",
          name: name,
          addInitializer: createAddInitializerMethod(
            initializers,
            decoratorFinishedRef,
          ),
          metadata,
        },
      );
    } finally {
      decoratorFinishedRef.v = true;
    }
  }

  return [
    defineMetadata(
      assertValidReturnValue(PROP_KIND.CLASS, nextNewClass)
        ? newClass
        : nextNewClass,
      metadata,
    ),
    function () {
      for (var i = 0; i < initializers.length; i++) {
        initializers[i].call(newClass);
      }
    },
  ];
}

function defineMetadata(Class: any, metadata: any) {
  return Object.defineProperty(
    Class,
    Symbol.metadata || Symbol.for("Symbol.metadata"),
    { configurable: true, enumerable: true, value: metadata },
  );
}

/**
  Basic usage:

  applyDecs(
    Class,
    [
      // member decorators
      [
        decs,               // dec, or array of decs, or array of this values and decs
        0,                  // kind of value being decorated
        'prop',             // name of public prop on class containing the value being decorated,
        '#p',               // the name of the private property (if is private, void 0 otherwise),
      ]
    ],
    [
      // class decorators
      dec1, dec2
    ]
  )
  ```

  Fully transpiled example:

  ```js
  @dec
  class Class {
    @dec
    a = 123;

    @dec
    #a = 123;

    @dec
    @dec2
    accessor b = 123;

    @dec
    accessor #b = 123;

    @dec
    c() { console.log('c'); }

    @dec
    #c() { console.log('privC'); }

    @dec
    get d() { console.log('d'); }

    @dec
    get #d() { console.log('privD'); }

    @dec
    set e(v) { console.log('e'); }

    @dec
    set #e(v) { console.log('privE'); }
  }


  // becomes
  let initializeInstance;
  let initializeClass;

  let initA;
  let initPrivA;

  let initB;
  let initPrivB, getPrivB, setPrivB;

  let privC;
  let privD;
  let privE;

  let Class;
  class _Class {
    static {
      let ret = applyDecs(
        this,
        [
          [dec, 0, 'a'],
          [dec, 0, 'a', (i) => i.#a, (i, v) => i.#a = v],
          [[dec, dec2], 1, 'b'],
          [dec, 1, 'b', (i) => i.#privBData, (i, v) => i.#privBData = v],
          [dec, 2, 'c'],
          [dec, 2, 'c', () => console.log('privC')],
          [dec, 3, 'd'],
          [dec, 3, 'd', () => console.log('privD')],
          [dec, 4, 'e'],
          [dec, 4, 'e', () => console.log('privE')],
        ],
        [
          dec
        ]
      );

      initA = ret[0];

      initPrivA = ret[1];

      initB = ret[2];

      initPrivB = ret[3];
      getPrivB = ret[4];
      setPrivB = ret[5];

      privC = ret[6];

      privD = ret[7];

      privE = ret[8];

      initializeInstance = ret[9];

      Class = ret[10]

      initializeClass = ret[11];
    }

    a = (initializeInstance(this), initA(this, 123));

    #a = initPrivA(this, 123);

    #bData = initB(this, 123);
    get b() { return this.#bData }
    set b(v) { this.#bData = v }

    #privBData = initPrivB(this, 123);
    get #b() { return getPrivB(this); }
    set #b(v) { setPrivB(this, v); }

    c() { console.log('c'); }

    #c(...args) { return privC(this, ...args) }

    get d() { console.log('d'); }

    get #d() { return privD(this); }

    set e(v) { console.log('e'); }

    set #e(v) { privE(this, v); }
  }

  initializeClass(Class);
 */

export default function applyDecs2305(
  targetClass: object,
  memberDecs: DecoratorInfo[],
  classDecs: Function[],
  classDecsHaveThis: number,
  instanceBrand: Function,
  parentClass: any,
) {
  if (arguments.length >= 6) {
    var parentMetadata =
      parentClass[Symbol.metadata || Symbol.for("Symbol.metadata")];
  }
  var metadata = Object.create(
    parentMetadata === void 0 ? null : parentMetadata,
  );
  var e = applyMemberDecs(targetClass, memberDecs, instanceBrand, metadata);
  if (!classDecs.length) defineMetadata(targetClass, metadata);
  return {
    e: e,
    // Lazily apply class decorations so that member init locals can be properly bound.
    get c() {
      // The transformer will not emit assignment when there are no class decorators,
      // so we don't have to return an empty array here.
      return (
        classDecs.length &&
        applyClassDecs(targetClass, classDecs, classDecsHaveThis, metadata)
      );
    },
  };
}
